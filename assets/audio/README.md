# Áudio local

Perguntas em português brasileiro, geradas com a voz sintética provisória `pt-br` do eSpeak NG (via @echogarden/espeak-ng-emscripten 0.3.5), a 145 palavras/minuto. Os MP3 podem ser substituídos por gravações humanas com os mesmos nomes. Os nomes correspondem ao conceito do catálogo; o conjunto atual usa menina.mp3, menino.mp3, casa.mp3, bola.mp3, arvore.mp3, nuvem.mp3, arco-iris.mp3, lua.mp3, sol.mp3 e carro.mp3.

acerto.mp3 contém três notas senoidais suaves geradas para o projeto. Todos os arquivos são reproduzidos localmente pelo mesmo elemento HTML audio. Nenhuma dependência de síntese de voz é distribuída ou executada no navegador.

`tente-novamente.mp3` é uma nota suave de 330 Hz, com cerca de 0,4 segundo, usada junto ao × vermelho no cartão incorreto. O jogo mantém a rodada e permite novas tentativas.

## Substituir pela voz da autora

Grave separadamente as perguntas correspondentes às figuras do catálogo atual, em um lugar silencioso, com voz natural e uma pequena pausa no início e no final. O Gravador do iPhone pode exportar M4A; converta para MP3 e substitua o arquivo correspondente, mantendo seu nome. O código não precisa mudar. Ao publicar uma nova gravação, atualize a versão de cache do áudio ou o nome do arquivo se o navegador mantiver a gravação anterior.
