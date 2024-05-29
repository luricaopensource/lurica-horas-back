<h1 align="center">
  Finova Hourend - NestJS
</h1>

<p align="center">
    Finova Hourend is the Time Tracker Project's API
</p>

<p align="center">
    <a href="#">
        <img src="https://lurica.us/wp-content/themes/lurica/assets/images/logo.png" alt="Lurica-logo"/>
    </a>
</p>

## Description

[Hourend API](https://github.com/luricaopensource/lurica-horas-back) developed to track issues, create issues' reports and keep track of finances

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running migrations

```bash
# generate migrations (notice the use of PascalCase when naming the migration file)
yarn migration:generate db/migrations/{NameOfMigration}

# run migrations
yarn migration:run
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
