# Áudio local

Perguntas em português brasileiro, geradas com a voz sintética provisória `pt-br` do eSpeak NG (via @echogarden/espeak-ng-emscripten 0.3.5), a 145 palavras/minuto. Os MP3 podem ser substituídos por gravações humanas com os mesmos nomes. Os nomes correspondem ao conceito do catálogo; cada figura atual tem um MP3 com o nome de seu conceito (por exemplo, maca.mp3, gato.mp3 e girafa.mp3).

acerto.mp3 contém três notas senoidais suaves geradas para o projeto. Todos os arquivos são reproduzidos localmente pelo mesmo elemento HTML audio. Nenhuma dependência de síntese de voz é distribuída ou executada no navegador.

`tente-novamente.mp3` é uma nota suave de 330 Hz, com cerca de 0,4 segundo. Uma resposta incorreta toca esse arquivo pelo mesmo elemento de áudio do jogo e mostra um × vermelho suave no cartão escolhido, mantendo a pergunta para uma nova tentativa.

## Substituir pela voz da autora

Grave separadamente as perguntas correspondentes às figuras do catálogo atual, em um lugar silencioso, com voz natural e uma pequena pausa no início e no final. O Gravador do iPhone pode exportar M4A; converta para MP3 e substitua o arquivo correspondente, mantendo seu nome. O código não precisa mudar. Ao publicar uma nova gravação, atualize a versão de cache do áudio ou o nome do arquivo se o navegador mantiver a gravação anterior.
