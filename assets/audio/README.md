# Áudio local

## Voz das perguntas

Os 40 MP3 de perguntas estão em `voz-dora/`, nomeados pelo conceito do catálogo (por exemplo, `voz-dora/gato.mp3`). A voz é **Dora** (`pf_dora`), feminina e brasileira, do modelo neural **Kokoro v1.0**. Todos usam `lang="pt-br"` e `speed=0.92`. O volume foi normalizado para -19 LUFS, com pico verdadeiro limitado a -2 dBTP e pequenas pausas no início e no final.

Modelo: [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M), licença Apache 2.0. Inferência: [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx), licença MIT. Os arquivos do modelo vêm da release `model-files-v1.1` indicada na documentação do kokoro-onnx. Os pesos e as bibliotecas de geração não são enviados ao site; apenas os MP3 prontos. Não há chamadas externas de síntese de voz durante o jogo.

## Gerar novas perguntas

O site não exige essas dependências. Para gerar áudios em um ambiente de desenvolvimento com Python 3.12 e ffmpeg:

```sh
python3 -m venv /tmp/kokoro-voice-env
/tmp/kokoro-voice-env/bin/pip install kokoro-onnx==0.6.1 soundfile==0.14.0
mkdir -p /tmp/kokoro-model
curl -fL https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/kokoro-v1.0.onnx -o /tmp/kokoro-model/kokoro-v1.0.onnx
curl -fL https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/voices-v1.0.bin -o /tmp/kokoro-model/voices-v1.0.bin
# Na raiz do repositório:
/tmp/kokoro-voice-env/bin/python tools/generate_voice.py --model-dir /tmp/kokoro-model
```

O script lê as perguntas de `FIGURES` em `script.js`, usa dois threads de CPU e só grava os MP3 no repositório após gerar o lote completo com sucesso. A opção `--output-dir` permite preparar arquivos em outra pasta para revisão. Novos áudios devem ser conferidos antes da publicação. O catálogo atual usa objetos JSON, com vírgula final na lista, formato aceito pelo gerador.

Para usar gravações humanas, substitua os arquivos em `voz-dora/` mantendo os nomes, ou configure outra pasta em `GAME_CONFIG.questionAudioPath`. Para evitar áudio antigo em cache, use uma nova pasta e atualize a versão de `script.js` em `index.html`.

## Efeitos

`plateia.mp3` usa o efeito “Cheer” da biblioteca de sons do TuxMath/Tux4Kids. Foi adaptado dos primeiros 1,85 segundos de `data/sounds/cheer.wav`, com entrada e saída suaves, normalização para -21 LUFS e pico verdadeiro limitado a -3 dBTP. O MP3 termina antes do avanço automático de 2,2 segundos. Substitui a comemoração anterior sintetizada com Dora. A fonte não identifica a idade dos participantes; o efeito não é apresentado como um coro infantil confirmado.

O original, os avisos da fonte e a licença GPL estão preservados em `fontes/plateia/`. Veja [créditos e reprodução da adaptação](fontes/plateia/README.md). O áudio e suas adaptações mantêm a licença da fonte; nenhuma gravação ou modelo novo é necessário durante o jogo.

`tente-novamente.mp3` contém uma nota suave de 330 Hz com cerca de 0,4 segundo. Os efeitos e a pergunta são reproduzidos pelo mesmo elemento HTML audio; respostas incorretas mantêm a rodada e mostram um × suave.
