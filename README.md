# App Desenvolvimento Infantil

Aplicativo educativo infantil com atividades de linguagem, comunicação e associação de figuras.

Projeto de **extensão universitária** da graduação em **Inteligência Artificial**. O público são crianças, com acompanhamento de familiares, educadores ou responsáveis conforme necessário.

O objetivo é oferecer jogos gratuitos, sem anúncios, sem login e sem coleta desnecessária de dados. Esta versão não usa analytics, cookies, armazenamento de respostas ou serviços externos de imagens. É um **recurso lúdico e educativo: não realiza diagnóstico, tratamento ou avaliação clínica**.

## Primeira atividade: Encontre a Figura

A criança lê uma pergunta como “Onde está a bola?” e toca em uma das duas opções grandes. Uma resposta diferente mostra um × vermelho suave no cartão escolhido e toca uma nota curta. A pergunta permanece e permite uma nova tentativa, sem punição. No acerto e na próxima rodada, a marca de erro desaparece. Uma resposta correta recebe uma mensagem positiva para leitores de tela, três estrelinhas sobre o cartão escolhido e um tilintar curto de sininhos sintetizados localmente; após 2,2 segundos o jogo avança sozinho. Não há limite de tempo para responder. A comemoração respeita a preferência por movimentos reduzidos.

O jogo tenta reproduzir a primeira pergunta automaticamente. Se o navegador bloquear, aparece **Começar com som**: um toque libera o áudio. As próximas rodadas reproduzem a pergunta automaticamente. Cada rodada reproduz um arquivo MP3 local com a pergunta em português brasileiro; o **ícone de alto-falante** permite repetir. O som de acerto também é um MP3 local. Todos usam o mesmo elemento de áudio, liberado pelo toque inicial, sem depender da síntese de voz do Safari nem de serviços externos. Se a reprodução falhar, o jogo mostra uma mensagem e os controles nativos de áudio para tentar novamente.

Todas as **40 perguntas** usam os MP3 gerados no **ElevenLabs** e enviados pela autora, preservados em `assets/audio/voz-elevenlabs/`. `GAME_CONFIG.questionAudioPath` aponta para esse conjunto completo. Os arquivos da voz anterior, Dora, permanecem como referência em `assets/audio/voz-dora/`. O áudio pronto é o mesmo em todos os aparelhos e não depende de serviços de voz durante o jogo. Veja `assets/audio/README.md` para adicionar perguntas ou trocar a voz. Nenhum sintetizador, chave de API ou pacote adicional é necessário para executar o site.

As perguntas e as posições das opções são sorteadas. As 40 figuras atuais são menina, menino, casa, bola, árvore, nuvem, arco-íris, lua, sol, carro, maçã, uva, melancia, morango, banana, galinha, pato, gato, jacaré, girafa, elefante, cachorro, macaco, prato, colher, coelho, cavalo, vaca, passarinho, peixe, caneca, livro, leão, olhos, boca, nariz, pé, mão, pão e tênis. As perguntas aceitam singular e plural, como “Onde estão os olhos?”. Variantes de um mesmo conceito não podem ser distratores entre si. O conceito da rodada anterior não se repete imediatamente.

## Executar

Tecnologias: **HTML, CSS e JavaScript**, sem framework ou etapa de build.

Com Python 3 instalado:

```sh
cd /workspace/app-desenvolvimento-infantil # no ambiente Codex; localmente, use a pasta do clone
python3 -m http.server 8000 --bind 0.0.0.0
```

Abra o servidor no navegador do seu ambiente de desenvolvimento. Em um computador local, use `http://localhost:8000`. Para testar em celular ou tablet na mesma rede local, use o endereço IP do computador e a porta 8000. Encerre o servidor com `Ctrl+C`.

Não são necessários chaves, banco de dados ou instalação de pacotes. Para uma hospedagem pública, use um serviço de arquivos estáticos com HTTPS.

## Salvar no celular e usar sem internet

O jogo é um **aplicativo web instalável (PWA)**, disponível em [Encontre a Figura](https://ttamarafrancis.github.io/app-desenvolvimento-infantil/). O botão **Salvar no celular** abre a instalação quando o navegador oferece essa opção, ou mostra instruções para adicionar o jogo à tela inicial.

- **Android:** abrir no Chrome e escolher **Instalar aplicativo** ou **Adicionar à tela inicial** pelo menu.
- **iPhone/iPad:** abrir no Safari, tocar em **Compartilhar** e escolher **Adicionar à Tela de Início**.
- Se o link foi aberto dentro do WhatsApp, primeiro usar a opção de abrir no navegador.

Na primeira visita, mantenha a conexão até aparecer **Pronto para usar sem internet**. Esse aviso confirma que a página, as 40 figuras, os 40 áudios do ElevenLabs, os efeitos, a fonte, o fundo e os ícones foram salvos. Depois é possível abrir o jogo pelo ícone e brincar offline. O navegador gerencia esse armazenamento local. São armazenados somente arquivos do aplicativo, sem respostas ou dados pessoais das crianças.

O ícone reutiliza a ilustração do elefante enviada pela autora, exportada em PNG nos tamanhos de 192 e 512 pixels. As figuras originais continuam preservadas. O aplicativo abre em uma janela própria quando instalado por um navegador que oferece esse recurso. A instalação real e a liberação inicial do áudio devem ser conferidas nos celulares usados pelas famílias.

## Estrutura e imagens

- `index.html`: estrutura acessível da página.
- `style.css`: interface infantil responsiva, com fundo em aquarela fornecido pela autora (`assets/fundo-aquarela.jpg`) e cartões pastel. A fonte arredondada Baloo 2 é servida localmente (licença em `assets/fonts/OFL.txt`).
- `script.js`: catálogo, sorteio, respostas e áudio.
- `manifest.webmanifest`: nome, ícones e abertura pela tela inicial.
- `pwa.js`: instalação e confirmação de que o download offline está completo.
- `service-worker.js`: armazenamento dos arquivos necessários e reprodução de trechos de áudio offline.
- `assets/`: ilustrações fornecidas pelo projeto; veja a lista em `assets/README.md`.
- `ENTREGA.md`: roteiro de apresentação do projeto de extensão e orientações para os testes com famílias.

40 novas ilustrações fornecidas pela autora estão em `assets/figuras/`, preservadas no formato JPEG original. As figuras do primeiro conjunto foram removidas. O fundo escolhido pela autora continua em `assets/fundo-aquarela.jpg`.

Se não houver imagens suficientes, aparecem placeholders textuais identificados para testar o fluxo. Com pelo menos duas imagens de conceitos distintos, o sorteio usa somente figuras carregadas.

Para adicionar uma figura, coloque a imagem em `assets/` e registre seu arquivo, nome, pergunta e conceito em `FIGURES`, no início de `script.js`. `GAME_CONFIG.optionCount` controla a quantidade de opções; esta versão foi projetada e validada para **duas**. Quantidades maiores precisarão de validação visual e de usabilidade antes de serem disponibilizadas.

## Acessibilidade e validação

A página inclui idioma português brasileiro, botões nativos com nomes acessíveis, foco visível, navegação por teclado, mensagens de status para leitores de tela e opção de reduzir movimentos. Não há limite de tempo para responder. A comemoração é curta, com sininhos em volume baixo no MP3 local e estrelas sobre o cartão correto, sem flashes. Detalhes dos efeitos estão em `assets/audio/README.md`.

Verificação básica de JavaScript:

```sh
node --check script.js
```

Ao testar no navegador, verifique duas opções, tentativa após erro, mensagem após acerto, avanço automático, áudio automático e repetição do áudio e telas de celular/tablet. A reprodução precisa também de conferência auditiva no dispositivo real; não depende de uma voz instalada.

Para verificar o modo offline, espere o aviso de download completo, desconecte a rede e recarregue a página. Confira as figuras e o áudio, a repetição, uma resposta incorreta e uma resposta correta seguida da próxima pergunta. Os testes locais também verificaram as 40 perguntas offline, as condições de instalação do Chrome, os pedidos de trechos de MP3 e a conservação da versão instalada quando uma atualização falha. Isso não substitui o teste em um iPhone ou Android real.

Para publicar atualizações, altere a versão de `CACHE_NAME` e dos URLs de CSS e JS em `service-worker.js` junto das versões correspondentes em `index.html`. Mantenha `CONCEPTS` e a lista de arquivos offline em sincronia com `FIGURES` e `GAME_CONFIG.questionAudioPath`. A versão nova só assume o controle depois de salvar todos os arquivos; os arquivos antigos são removidos após esse sucesso. Uma falha no download preserva a versão completa já instalada.

## Status

Versão web instalável do jogo, com 40 ilustrações e perguntas do ElevenLabs, preparada para uso offline. A validação com famílias e o teste de instalação nos aparelhos reais ainda estão pendentes. Uma versão para lojas de aplicativos, outros jogos e atividades de cores, animais, números e formas são possibilidades futuras.
