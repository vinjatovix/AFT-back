<h1 align="center">Welcome to Adestramento Actoral FT BackEnd 👋</h1>

# 🏠 [Homepage](https://github.com/vinjatovix/AFT-back)

[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)](https://heroku-badge.herokuapp.com/?app=heroku-badge)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://shields.io/)
[![GitHub release](https://img.shields.io/github/release/vinjatovix/AFT-back.svg)](https://GitHub.com/Naereen/StrapDown.js/releases/)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=bugs)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=vinjatovix_AFT-back&metric=coverage)](https://sonarcloud.io/summary/new_code?id=vinjatovix_AFT-back)

[![GitHub issues](https://img.shields.io/github/issues/vinjatovix/AFT-back.svg)](https://GitHub.com/Naereen/StrapDown.js/issues/)
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/vinjatovix/AFT-back.svg)](https://GitHub.com/Naereen/StrapDown.js/issues?q=is%3Aissue+is%3Aclosed)

## Project URLs

[Lastest Release](https://aft-back.herokuapp.com)

[Swagger UI](https://aft-back.herokuapp.com/doc)

[Github Back](https://github.com/vinjatovix/AFT-back)

[Release back changelog](https://github.com/vinjatovix/AFT-back/compare/0.1.1...0.1.2)

[Github Front](https://github.com/vinjatovix/aft-front)

[Release front changelog](https://github.com/vinjatovix/aft-front/compare/0.1.1...0.1.2)

# Introduction and motivation

REST API for the management of Productions tasks on AFT

# Architecture and Technical Design

WIP

## Folder structure

    .
    ├── .github
    │   ├── workflows
    │   └── dependabot.yml
    ├── .husky
    │   ├── _
    │   └── ...
    ├── config                              # App configurations
    │   └── cfg.json
    ├── migrations                          # Migrations by semantic versioning
    │   ├── x.x.x
    │   └── ...
    ├── mongodb                             # Directory for docker
    │   ├── data
    │   │   ├── db                          # Docker volume
    │   │   ├── dump                        # Dumps by environment
    │   │   │   ├── PRO
    │   │   │   └── ...
    │   │   └── log
    │   ├── scripts                         # Docker DB management scripts
    │   └── docker-compose.yml
    ├── public                              # Compiled react files from front build
    ├── src
    │   ├── api
    │   │   ├── common                      # Common files across the api
    │   │   │   ├── shared
    │   │   │   ├── swagger
    │   │   │   │   ├── index.js
    │   │   │   │   └── schemas.js
    │   │   │   └── repository.js
    │   │   └── ...                         # Entity Folder
    │   │       ├── swagger
    │   │       │   ├── index.js
    │   │       │   └── schemas.js
    │   │       ├── controller.js
    │   │       ├── repository.js
    │   │       ├── router.js
    │   │       └── service.js
    │   ├── db                              # Database files
    │   ├── middlewares
    │   ├── models
    │   ├── service
    │   │   ├── swagger                     # Main swagger UI folder
    │   │   ├── service.js                  # Koa service
    │   │   └── ...
    │   ├── services                        # Other services
    │   ├── main.js
    │   └── ...
    ├── tasks                               # Release and others
    ├── test
    │   ├── fixtures
    │   ├── shared
    │   └── unit
    │       ├── api
    │       │   └── ...                     # Entity test folder
    │       │       └── xxx.test.js
    │       ├── models
    │       │   └── Model.test.js
    │       └── services
    │           └── xxx.test.js
    ├── README.md
    └── ...

# Getting started

WIP

## Prerequisites

- [Node.js](https://nodejs.org/es/) v12.22.12
- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)
- [EditorConfig editor plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Local development

A `.env_EXAMPLE` is provided, but the application needs a `.env`, so you can do:

```sh
$ cp .env_EXAMPLE .env
```

Full filling this file will provide you all the configuration needed
to start the application in a local environment, except the secrets.
Due to security concerns, we can't keep secrets (passwords) in the codebase.

On the first run, an admin user is created with the .env parameters.

### For set up a mongo docker.

```sh
$ npm run docker
```

### Dumping ENV DB to docker

```sh
$ npm run restoreDB $ENV $PASSWORD
```

Several environments copies can be stored locally and you can restore them anytime with:

```sh
$ npm run restoreDump $ENV
```

## Usage

```sh
$ npm start
```

## Run tests

```sh
$ npm run test

$ npm run test:coverage
```

## Preparing a release

There is a npm script for perform a release preparation. Just execute (depending on the release type):

```sh
$ npm run prepare-release -- major
$ npm run prepare-release -- minor
$ npm run prepare-release -- patch
```

<!-- ## Contributors

## 🤝 Contributing -->
