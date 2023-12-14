<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição

O I Keep é um aplicativo desenvolvido com Nest, Angular e Ionic inspirado no Google Keep. Ele oferece uma plataforma simples e eficiente para fazer anotações rápidas, listas de tarefas, e organização de ideias. Com uma interface intuitiva e design limpo, o I Keep é projetado para facilitar a gestão de informações importantes em seu dia a dia.

## Considerações Técnicas e Decisões Arquiteturais

A IKeep-api foi desenvolvida adotando os princípios da Clean Architecture, uma abordagem que visa desacoplar bibliotecas e frameworks do núcleo da aplicação. Essa arquitetura é altamente benéfica para a manutenção e escalabilidade do projeto, proporcionando uma estrutura organizada e de fácil compreensão para os desenvolvedores. Foi escolhido o framework Nest para desempenhar um papel extremamente importante na aplicação, e ele apresenta suas vantagens nos seguintes pontos:
- Modularidade
- Escalabilidade
- Facilidade de testes
- Injeção de dependência

A IKeep-api é robustamente testada com uma ampla cobertura de testes unitários para cada caso de uso, proporcionando segurança e confiabilidade durante refatorações ou implementação de novas funcionalidades. A biblioteca Vitest foi adotada para facilitar a criação e execução desses testes, contribuindo para a estabilidade e manutenibilidade contínua do código. Como banco de dados, foi escolhido o PostgreSQL.

## Instalação

1. Certifique-se de que o Node.js na versao 20.10 esteja instalado em seu computador.

2. Clone o Repositório:
   
```bash
$ git clone https://github.com/Cristiano-woody/i-keep-api
```
3. Instale as Dependências:

```bash
$ npm install
```
  
4. Suba um container Docker com o banco de dados PostgreSQL chamado i-keep. Para isso, você pode seguir o tutorial disponível em: [Tutorial](https://felixgilioli.medium.com/como-rodar-um-banco-de-dados-postgres-com-docker-6aecf67995e1).

## Executando o aplicativo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
