# Fonte da comemoração

Efeito: **Cheer**, arquivo `data/sounds/cheer.wav`, biblioteca **TuxMath / Tux4Kids**.

- Fonte: https://github.com/tux4kids/tuxmath/blob/febcf7b11a88e325694276f0da74725f8cdd99d2/data/sounds/cheer.wav
- Avisos de licença: https://github.com/tux4kids/tuxmath/blob/febcf7b11a88e325694276f0da74725f8cdd99d2/doc/README_DATA_LICENSES
- A documentação da fonte declara GPL para os recursos sem outra licença especificada. O arquivo original e o trecho adaptado são distribuídos sob GNU GPL; uma cópia da GPL versão 3 acompanha estes arquivos em `COPYING-GPL-3.0.txt`.
- Créditos: colaboradores do TuxMath / Tux4Kids. A documentação menciona Sam Hart, Bill Kendrick e material de domínio público, mas não identifica o autor individual nem a idade das vozes deste efeito específico. Não há declaração de apoio ou vínculo com o projeto.
- Original preservado: `cheer-original.wav`, sem alterações. Os avisos da fonte estão em `NOTICE-TUXMATH.txt`.

`../../plateia.mp3` é a adaptação feita para este projeto: recorte dos primeiros 1,85 segundos, entrada de 0,03 segundo, saída de 0,30 segundo, volume normalizado para -21 LUFS, pico verdadeiro limitado a -3 dBTP e conversão para MP3 mono de 24 kHz. A adaptação mantém a licença GPL da fonte. O áudio pronto também inclui crédito e URI da licença nos metadados.

Para reproduzir a adaptação, execute na raiz do repositório com ffmpeg:

```sh
ffmpeg -v error -y -i assets/audio/fontes/plateia/cheer-original.wav \
  -af 'atrim=start=0:end=1.85,asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.03,afade=t=out:st=1.55:d=0.30,loudnorm=I=-21:TP=-3:LRA=7' \
  -ar 24000 -codec:a libmp3lame -q:a 3 \
  -metadata 'title=Cheer - trecho para comemoração' \
  -metadata 'comment=Fonte: TuxMath/Tux4Kids, data/sounds/cheer.wav. Adaptação: recorte de 1,85 s, fades e volume. Licença GPL: https://www.gnu.org/licenses/gpl-3.0.html' \
  assets/audio/plateia.mp3
```
