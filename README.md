# Desafio Técnico BackEnd - Processo Seletivo XP Inc.

Projeto desenvolvido durante o processo seletivo da [XP Inc](https://www.xpinc.com/)
exclusivo para a turma XP em parceria com a [Trybe](https://www.betrybe.com/) na data de 24/07/22.

Descrição do desafio: Foi solicitado a criação de uma API de investimentos em ações simulando
um dia de um desenvolvedor BackEnd.

## Desafios

Meu maior desafio foi gerado por min mesmo, quando optei por deixar os testes
para o final e ter desenvolvido toda a aplicação sem ao menos configurar o
ambiente dos mesmos. Ao inicia-los percebi que precisaria de mais tempo
para a implementação.

Cedi muito tempo para a configuração do sequelize com
typescript, nunca antes tinha utilizado ambos em conjunto.

Gerenciar o tempo com o desafio técnico do processo seletivo junto com o curso
da trybe e seus projetos me exigiu uma grande gestão do meu tempo com qualidade.
## Aprendizados

Durante o desenvolvimento desse projeto tive que separar um tempo para estudar sobre o
mercado de investimentos e ações para então começar a planejar a estrutura do meu banco
de dados.

Após ter tido a experiência de desenvolver uma aplicação com o Sequelize junto ao TypeScript,
aprendi que é essencial pesquisar sobre cada ferramenta, documentação das mesmas e suas
compatibilidades antes de começar a implementa-las no projeto para que não haja tantos
imprevistos na hora do desenvolvimento.

Criei um diagrama no DRAWSQL que me permitiu ter uma melhor visualização do banco de dados
que foi fundamental para me conduzir durante a criação da aplicação. Percebi
o quanto é fundamental a utilização de metodologias ágeis para o gerenciamento e desenvolvimento
de projetos.
## Stack utilizada

**Back-end:** Node, Express, TypeScript, Docker, Docker-Compose, JWT, Sequelize, MySQL, joi.

**Testes:** Jest, SUPERTEST.
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT`
`MYSQL_HOST`
`MYSQL_DATABASE`
`MYSQL_USERNAME`
`MYSQL_PASSWORD`
`MYSQL_PORT`
`JWT_SECRET`


## Rodando localmente

Clone o projeto
```bash
  git clone git@github.com:SrTonn/desafio-xp.git
```

Entre no diretório do projeto
```bash
  cd desafio-xp
```

Instale as dependências
```bash
  yarn install
```

<details>
  <summary>Em caso de docker</summary>
  Suba o container
  
  ```bash
  docker-compose up -d
  ```

  Acesse o terminal do container
  ```bash
    docker exec -it app-investimentos bash
  ```
  ⚠️caso necessário instale as dependencias novamente e inicie o servidor⚠️
  ```bash
    yarn install
  ```
</details>
Inicie o servidor

```bash
yarn dev
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando
```bash
  yarn test
```
Para rodar os testes com coverage, rode o seguinte comando
```bash
  yarn test-coverage
```
### Cobertura dos testes:
![coberturaDeTeste-desafioXP](https://user-images.githubusercontent.com/30580384/180670907-d11f9bdd-76a4-441b-867d-935e70ffc891.png)

## Documentação

Durante o desenvolvimento da aplicação priorizei a criação de outras rotas além das
exigidas, pois de acordo com a regra de negócio são fundamentais para uma aplicação mais completa. Não tive tempo de qualidade para estudar a fundo uma ferramenta de documentação
apropriada, como o swagger. Por isso utilizei dos meus conhecimentos em markdown para
gerar uma documentação própria.

[Documentação](https://github.com/SrTonn/desafio-xp/blob/main/DocumentationAPI.md)


## Autor

- [Wellington Rodrigues](https://www.github.com/SrTonn)

