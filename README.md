# Instruções

## Instalação

Instale com: `yarn install` ou `yarn install --force`

Para referência, o ambiente de desenvolvimento usava:

- yarn 0.17.9
- node v7.8.0
- sass 3.5.1

## Build

Para gerar o build de produção: `yarn run build`

## Execução

`yarn run server`

## Testes

Com o servidor rodando (passo anterior) execute no terminal:
```node node_modules/tape/bin/tape ./test/**/*.js | node node_modules/tap-diff/distributions/cli.js```

O yarn não deixa o Nightmare rodar todos os testes, assim é mais conveniente rodar diretamente no terminal.