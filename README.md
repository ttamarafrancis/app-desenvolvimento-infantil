# App Desenvolvimento Infantil

Aplicativo educativo infantil com atividades de linguagem, comunicação e associação de figuras.

Projeto acadêmico da graduação em **Inteligência Artificial**, que poderá ser utilizado também em atividades de **extensão universitária**. O público são crianças, com acompanhamento de familiares, educadores ou responsáveis conforme necessário.

O objetivo é oferecer jogos gratuitos, sem anúncios, sem login e sem coleta desnecessária de dados. Esta versão não usa analytics, cookies, armazenamento de respostas ou serviços externos de imagens. É um **recurso lúdico e educativo: não realiza diagnóstico, tratamento ou avaliação clínica**.

## Primeira atividade: Encontre a Figura

A criança lê uma pergunta como “Onde está a bola?” e toca em uma das duas opções grandes. Uma resposta diferente mostra um × vermelho suave no cartão escolhido e toca uma nota curta. A pergunta permanece e permite uma nova tentativa, sem punição. No acerto e na próxima rodada, a marca de erro desaparece. Uma resposta correta recebe uma mensagem positiva para leitores de tela, três estrelinhas e um som suave; após 2,2 segundos o jogo avança sozinho. Não há limite de tempo para responder. A comemoração respeita a preferência por movimentos reduzidos.

O jogo tenta reproduzir a primeira pergunta automaticamente. Se o navegador bloquear, aparece **Começar com som**: um toque libera o áudio. As próximas rodadas reproduzem a pergunta automaticamente. Cada rodada reproduz um arquivo MP3 local com a pergunta em português brasileiro; o **ícone de alto-falante** permite repetir. O som de acerto também é um MP3 local. Todos usam o mesmo elemento de áudio, liberado pelo toque inicial, sem depender da síntese de voz do Safari nem de serviços externos. Se a reprodução falhar, o jogo mostra uma mensagem e os controles nativos de áudio para tentar novamente.

As perguntas usam **Dora**, a voz feminina brasileira `pf_dora` do modelo neural Kokoro v1.0, em ritmo levemente mais calmo (0,92). Os MP3 ficam em `assets/audio/voz-dora/`, com volume de fala normalizado. O áudio pronto é o mesmo em todos os aparelhos e não depende de serviços de voz durante o jogo. Veja `assets/audio/README.md` para gerar novas perguntas ou substituir a voz. Nenhum sintetizador ou pacote adicional é necessário para executar o site.

As perguntas e as posições das opções são sorteadas. As 33 figuras atuais são menina, menino, casa, bola, árvore, nuvem, arco-íris, lua, sol, carro, maçã, uva, melancia, morango, banana, galinha, pato, gato, jacaré, girafa, elefante, cachorro, macaco, prato, colher, coelho, cavalo, vaca, passarinho, peixe, caneca, livro e leão. Variantes de um mesmo conceito não podem ser distratores entre si. O conceito da rodada anterior não se repete imediatamente.

## Executar

Tecnologias: **HTML, CSS e JavaScript**, sem framework ou etapa de build.

Com Python 3 instalado:

```sh
cd /workspace/app-desenvolvimento-infantil # no ambiente Codex; localmente, use a pasta do clone
python3 -m http.server 8000 --bind 0.0.0.0
```

Abra o servidor no navegador do seu ambiente de desenvolvimento. Em um computador local, use `http://localhost:8000`. Para testar em celular ou tablet na mesma rede local, use o endereço IP do computador e a porta 8000. Encerre o servidor com `Ctrl+C`.

Não são necessários chaves, banco de dados ou instalação de pacotes. Para uma hospedagem pública, use um serviço de arquivos estáticos com HTTPS.

## Estrutura e imagens

- `index.html`: estrutura acessível da página.
- `style.css`: interface infantil responsiva, com fundo em aquarela fornecido pela autora (`assets/fundo-aquarela.jpg`) e cartões pastel. A fonte arredondada Baloo 2 é servida localmente (licença em `assets/fonts/OFL.txt`).
- `script.js`: catálogo, sorteio, respostas e áudio.
- `assets/`: ilustrações fornecidas pelo projeto; veja a lista em `assets/README.md`.

33 novas ilustrações fornecidas pela autora estão em `assets/figuras/`, preservadas no formato JPEG original. As figuras do primeiro conjunto foram removidas. O fundo escolhido pela autora continua em `assets/fundo-aquarela.jpg`.

Se não houver imagens suficientes, aparecem placeholders textuais identificados para testar o fluxo. Com pelo menos duas imagens de conceitos distintos, o sorteio usa somente figuras carregadas.

Para adicionar uma figura, coloque a imagem em `assets/` e registre seu arquivo, nome, pergunta e conceito em `FIGURES`, no início de `script.js`. `GAME_CONFIG.optionCount` controla a quantidade de opções; esta versão foi projetada e validada para **duas**. Quantidades maiores precisarão de validação visual e de usabilidade antes de serem disponibilizadas.

## Acessibilidade e validação

A página inclui idioma português brasileiro, botões nativos com nomes acessíveis, foco visível, navegação por teclado, mensagens de status para leitores de tela e opção de reduzir movimentos. Não há limite de tempo para responder. A comemoração é curta, com som MP3 local de três notas e estrelas, sem flashes.

Verificação básica de JavaScript:

```sh
node --check script.js
```

Ao testar no navegador, verifique duas opções, tentativa após erro, mensagem após acerto, avanço automático, áudio automático e repetição do áudio e telas de celular/tablet. A reprodução precisa também de conferência auditiva no dispositivo real; não depende de uma voz instalada.

## Status

Primeira versão web funcional do jogo, em desenvolvimento. 33 ilustrações novas integradas; validação com usuários ainda pendente. PWA, Android, outros jogos e atividades de cores, animais, números e formas são possibilidades futuras e não fazem parte desta versão.
