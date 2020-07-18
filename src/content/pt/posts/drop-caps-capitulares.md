---
title: 'Capitulares, edição revista (mas ainda remendada)'
description: 'O confuso estado da situação na Web de um floreado tipográfico intemporal.'
date: 2020-07-17
tags:
  - webdev
  - css
translationKey: drop-caps
---

Estamos em 2020 e, apesar de tudo o que está a acontecer *lá fora*, ao menos podemos sempre contar com os nossos padrões Web em constante evolução para salvar o nosso dia de trabalho, certo? Hmm? O que é que disse? Criar capitulares, ou *drop caps*, em CSS ainda é uma confusão? Os navegadores não conseguem decidir-se sobre como alinhar a tipografia? Bem, isso é um facto, mas em breve poderemos simplesmente declarar a propriedade `initial-letter` e dar o dia por terminado.

Só que esse *brevemente* ainda vai [demorar a chegar](https://caniuse.com/#feat=css-initial-letter).

Então parece que a nova propriedade `initial-letter` só está disponível para o Safari e dispositivos iOS (ou seja lá como for que o seu sistema operativo se chame agora), e nem sequer suporta fontes web. Perante esta triste realidade, alguns *developers* têm tentado ou dar a volta à situação, ou criar componentes HTML personalizados, [dividindo a primeira palavra e adicionando marcações ARIA para ajudar os utilizadores de leitores de ecrã](https://product.voxmedia.com/2019/6/17/18524029/the-ballad-of-drop-caps-and-design-systems), ou simplesmente desistir completamente de usar capitulares.

Já eu gosto bastante de capitulares. Quando construí este *website*, queria incluir esse efeito tipográfico, mas não considerei sustentável implementar toda uma solução em código só para poder analisar cada primeiro parágrafo e adicionar-lhe um monte de `div` extra. Acrescentar tudo à mão também não era uma opção. Além disso, quanto menor for a dívida técnica, na maior parte das vezes, tanto mais *acessível* será a solução. Assim sendo, continuei a remendar o problema, através de tentativa e erro.

Parece que, nas versões mais recentes de todos os principais navegadores em que pude fazer testes, eles pareciam comportar-se melhor quando se declara a `font-size` da capitular numa percentagem. Nem unidades `em`, nem `rem`. Uma percentagem. Ao menos sempre é uma unidade relativa... Entretanto, o Firefox no *desktop* parece não saber como aplicar a propriedade `line-height`, muito embora o Chrome tenha todo o prazer em fazê-lo. Mas basta acrescentar uma `margin-top` adequada e a maiúscula alinhará quase perfeitamente com o resto do texto.

No fim de contas, foi este o resultado.

````
p:first-of-type:first-letter {
  float: left;
  margin-right: 0.25rem;

  // Cautela com os números mágicos.
  font-size: 480%; // A abordagem mais harmoniosa entre os navegadores principais
  margin-top: .7rem; // As capitulares funcionam desde logo no Firefox para desktops
  line-height: 0.5em; // O Firefox para desktops parece não saber o que fazer com isto, mas sempre ajuda com o Chrome

  // E agora oremos para que todos os navegadores implementem isto o mais breve possível:
  -webkit-initial-letter: 3;
  initial-letter: 3;
}
````

Espero que isto lhe possa ser útil também.
