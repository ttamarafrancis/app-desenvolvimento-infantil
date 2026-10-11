"""Generate static Portuguese question audio; not needed to run the website.

Install kokoro-onnx==0.6.1 and soundfile==0.14.0 in an isolated environment.
Download model-files-v1.1/kokoro-v1.0.onnx and voices-v1.0.bin from
https://github.com/thewh1teagle/kokoro-onnx/releases .
Requires ffmpeg. Example:
python tools/generate_voice.py --model-dir /tmp/kokoro-model
"""
import argparse
import json
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import onnxruntime as rt
import soundfile as sf
from kokoro_onnx import Kokoro


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model-dir", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    output = args.output_dir or root / "assets/audio/voz-dora"
    source = (root / "script.js").read_text()
    catalog = re.search(r"const FIGURES\s*=\s*(\[[\s\S]*?\]);", source).group(1)
    figures = json.loads(re.sub(r",\s*]", "]", catalog))
    questions = {figure["concept"]: figure["question"] for figure in figures}
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg is required to create MP3 files")
    rt.disable_telemetry_events()
    options = rt.SessionOptions()
    options.intra_op_num_threads = 2
    options.inter_op_num_threads = 1
    session = rt.InferenceSession(
        str(args.model_dir / "kokoro-v1.0.onnx"),
        sess_options=options,
        providers=["CPUExecutionProvider"],
    )
    engine = Kokoro.from_session(session, str(args.model_dir / "voices-v1.0.bin"))
    with tempfile.TemporaryDirectory(prefix="question-voice-") as temp:
        temporary = Path(temp)
        for concept, question in questions.items():
            if not re.fullmatch(r"[a-z0-9-]+", concept):
                raise ValueError(f"Invalid audio filename: {concept}")
            samples, rate = engine.create(
                question, voice="pf_dora", speed=0.92, lang="pt-br"
            )
            if not np.isfinite(samples).all() or np.max(np.abs(samples)) < 0.01:
                raise RuntimeError(f"Invalid or silent audio: {concept}")
            # A short lead-in avoids clipping the first syllable on mobile players.
            samples = np.concatenate([np.zeros(int(rate * 0.08)), samples, np.zeros(int(rate * 0.12))])
            wav = temporary / f"{concept}.wav"
            mp3 = temporary / f"{concept}.mp3"
            sf.write(wav, samples, rate, subtype="PCM_16")
            subprocess.run(
                ["ffmpeg", "-v", "error", "-i", str(wav), "-af",
                 "loudnorm=I=-19:TP=-2:LRA=7", "-ar", "24000", "-codec:a",
                 "libmp3lame", "-q:a", "3", str(mp3)], check=True
            )
            print(f"{concept}: {question} ({len(samples) / rate:.2f}s)", flush=True)
        # Write repository outputs only after the complete batch succeeds.
        output.mkdir(parents=True, exist_ok=True)
        for concept in questions:
            shutil.copyfile(temporary / f"{concept}.mp3", output / f"{concept}.mp3")
    print(f"Saved {len(questions)} questions to {output}", flush=True)


if __name__ == "__main__":
    main()
