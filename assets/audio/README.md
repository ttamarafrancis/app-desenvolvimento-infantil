# Áudio local

## Voz das perguntas

Os arquivos enviados pela autora e gerados no **ElevenLabs** estão em `voz-elevenlabs/`. Os dois lotes recebidos cobrem 20 perguntas: menina, menino, casa, bola, árvore, nuvem, arco-íris, lua, sol, carro, maçã, uva, melancia, morango, banana, galinha, pato, gato, jacaré e girafa. Os MP3 foram copiados integralmente, sem alterações no áudio. Os nomes `árvore.mp3`, `arcoiris.mp3`, `maçã.mp3` e `jacaré.mp3` foram padronizados para `arvore.mp3`, `arco-iris.mp3`, `maca.mp3` e `jacare.mp3`, correspondendo aos conceitos do catálogo. `GAME_CONFIG.questionAudioOverrides` seleciona explicitamente esses arquivos; novos lotes podem ser adicionados à mesma lista. O jogo reproduz os MP3 locais, sem consultar o ElevenLabs ou exigir uma chave de API.

As outras 20 perguntas continuam usando **Dora** (`pf_dora`), feminina e brasileira, do modelo neural **Kokoro v1.0**, até serem substituídas pelos próximos arquivos enviados. O conjunto original de 40 MP3 de Dora permanece em `voz-dora/`, nomeado pelo conceito do catálogo (por exemplo, `voz-dora/gato.mp3`). Esses arquivos foram gerados com `lang="pt-br"` e `speed=0.92`, normalizados para -19 LUFS, com pico verdadeiro limitado a -2 dBTP e pequenas pausas no início e no final.

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

Para adicionar novos áudios enviados, coloque-os em `voz-elevenlabs/` com o nome do conceito e acrescente o caminho em `GAME_CONFIG.questionAudioOverrides`. Conceitos sem uma entrada nessa lista continuam usando `GAME_CONFIG.questionAudioPath`. Para usar gravações humanas, também é possível registrar seus caminhos nessa lista. Para evitar áudio antigo em cache, use novos caminhos ao substituir arquivos e atualize a versão de `script.js` em `index.html`.

## Efeitos

`brilho.mp3` contém um tilintar curto de sininhos sintetizados localmente, em volume baixo, para acompanhar as estrelas do acerto. São quatro notas ascendentes de sol maior (sol, si, ré e sol), seguidas de dois sininhos mais agudos e discretos. Cada nota tem entrada suave de 6 ms, decaimento curto e parciais nas razões 1, 1,002, 2,756 e 5,404 para simular a ressonância de um sino. O sinal original dura 1,36 segundo e tem pico de 0,19; o arquivo mono de 24 kHz foi codificado em MP3 a 96 kbps. Termina antes do avanço automático de 2,2 segundos. Não utiliza gravações de terceiros.

`tente-novamente.mp3` contém uma nota suave de 330 Hz com cerca de 0,4 segundo. Os efeitos e a pergunta são reproduzidos pelo mesmo elemento HTML audio; respostas incorretas mantêm a rodada e mostram um × suave.
