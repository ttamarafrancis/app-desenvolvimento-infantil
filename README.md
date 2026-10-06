# App Desenvolvimento Infantil

Aplicativo educativo infantil com atividades de linguagem, comunicação e associação de figuras.

Projeto acadêmico da graduação em **Inteligência Artificial**, que poderá ser utilizado também em atividades de **extensão universitária**. O público são crianças, com acompanhamento de familiares, educadores ou responsáveis conforme necessário.

O objetivo é oferecer jogos gratuitos, sem anúncios, sem login e sem coleta desnecessária de dados. Esta versão não usa analytics, cookies, armazenamento de respostas ou serviços externos de imagens. É um **recurso lúdico e educativo: não realiza diagnóstico, tratamento ou avaliação clínica**.

## Primeira atividade: Encontre a Figura

A criança lê uma pergunta como “Onde está o cachorro?” e toca em uma das duas opções grandes. Uma resposta diferente permite tentar novamente, sem punição. Uma resposta correta recebe uma mensagem positiva, três estrelinhas e um som suave; após 2,2 segundos o jogo avança sozinho. Uma resposta diferente mantém a rodada. Não há limite de tempo para responder. A comemoração respeita a preferência por movimentos reduzidos.

Um toque inicial em **Começar a brincar** libera o som conforme as regras dos navegadores móveis. Cada rodada tenta falar automaticamente a pergunta; **Ouvir a pergunta** permite repetir. A voz usa a síntese de voz do navegador, com idioma `pt-BR`. A disponibilidade e a qualidade da voz dependem do navegador e do sistema operacional; instale uma voz em português brasileiro no dispositivo se necessário. Alguns sistemas podem usar serviços de voz online. O aplicativo envia à API de voz apenas a pergunta, sem dados da criança. Se o áudio não estiver disponível, a pergunta continua visível e o jogo permanece utilizável.

As perguntas e as posições das opções são sorteadas. Gato e gato com novelos são variantes do mesmo conceito e nunca são usados como distratores entre si. O conceito da rodada anterior não se repete imediatamente.

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
- `style.css`: interface responsiva em creme, verde suave e tons naturais.
- `script.js`: catálogo, sorteio, respostas e áudio.
- `assets/`: ilustrações fornecidas pelo projeto; veja a lista em `assets/README.md`.

Seis ilustrações fornecidas pela autora já estão em `assets/`, preservadas no formato JPEG original: cachorro, gato com novelos, bola, carro, menina e menino. A variante `gato.png` ainda é opcional e não entra no sorteio enquanto estiver ausente. Sem imagens suficientes, aparecem **placeholders textuais identificados**, não desenhos inventados. Eles permitem testar o fluxo, mas não substituem a atividade de associação palavra-imagem. Com pelo menos duas imagens de conceitos distintos, o sorteio passa a usar somente figuras carregadas.

Para adicionar uma figura, coloque a imagem em `assets/` e registre seu arquivo, nome, pergunta e conceito em `FIGURES`, no início de `script.js`. `GAME_CONFIG.optionCount` controla a quantidade de opções; esta versão foi projetada e validada para **duas**. Quantidades maiores precisarão de validação visual e de usabilidade antes de serem disponibilizadas.

## Acessibilidade e validação

A página inclui idioma português brasileiro, botões nativos com nomes acessíveis, foco visível, navegação por teclado, mensagens de status para leitores de tela e opção de reduzir movimentos. Não há limite de tempo para responder. A comemoração é curta, com som local de três notas e estrelas, sem flashes.

Verificação básica de JavaScript:

```sh
node --check script.js
```

Ao testar no navegador, verifique duas opções, tentativa após erro, mensagem após acerto, avanço automático, áudio automático e repetição do áudio e telas de celular/tablet. A fala precisa também de conferência auditiva em um dispositivo com voz `pt-BR`.

## Status

Primeira versão web funcional do jogo, em desenvolvimento. Seis ilustrações integradas; validação com usuários ainda pendente. PWA, Android, outros jogos e atividades de cores, animais, números e formas são possibilidades futuras e não fazem parte desta versão.
