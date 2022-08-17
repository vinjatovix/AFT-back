<h1 align="center">Welcome to Adestramento Actoral FT BackEnd 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
    <!-- <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" /> -->
  </a>
</p>

[![Release](https://heroku-badge.herokuapp.com/?app=aft-back)](https://heroku-badge.herokuapp.com/?app=aft-back)
[![Tests CI](https://github.com/vinjatovix/AFT-back/actions/workflows/tests.yml/badge.svg?branch=develop&event=push)](https://github.com/vinjatovix/AFT-back/actions/workflows/tests.yml)
[![CodeQL](https://github.com/vinjatovix/AFT-back/actions/workflows/codeql-analysis.yml/badge.svg?branch=develop)](https://github.com/vinjatovix/AFT-back/actions/workflows/codeql-analysis.yml)

# WIP

# 🏠 [Homepage](https://github.com/vinjatovix/AFT-back)
## Project URLs

[Lastest Release](https://aft-back.herokuapp.com)

[Swagger UI](https://aft-back.herokuapp.com/doc)

[Release changelog](https://github.com/vinjatovix/AFT-back/compare/0.0.1...0.1.0)

[Github Back](https://github.com/vinjatovix/AFT-back)

[Github Front](https://github.com/vinjatovix/aft-front)



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

Fullfilling this file will provide you all the configuration needed
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






<!--

#### Swagger

#### Validation Checks

### Useful links

### Log management, Metrics and Tracing -->

## Preparing a release

There is a npm script for perform a release preparation. Just execute (depending on the release type):

```sh
$ npm run prepare-release -- major
$ npm run prepare-release -- minor
$ npm run prepare-release -- patch
```

<!-- ## Contributors

## 🤝 Contributing -->
