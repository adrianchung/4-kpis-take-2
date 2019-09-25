# 4 KPIs Take Two

## Description

The book [Accelerate](https://www.amazon.com/Accelerate-Software-Performing-Technology-Organizations/dp/1942788339) by Nicole Forsgren PhD, Jez Humble and Gene Kim talks about 4 KPIs of high performing teams. These KPIs are:
* Lead time: The time from code commit to production
* Deployment frequency: The number of times deployed to production per day
* Deployment failure rate: The percentage of time a deployment to production results in requiring remediation, whether it's a rollback, fix forward, patch release, etc.
* Mean time to restore: The amount of time it takes a failed deployment or failure in production to be resolved

This project aims to automate the calculation of lead time and deployment frequency using the JIRA Server API. It is highly dependent on the team's ability to manage code deployments using JIRA releases, and to consistently move cards to a 'Done' or a 'Closed' state upon completion. If cards are marked as 'Done' or 'Closed' *after* a release is marked complete, it will not be counted, as that would result in a negative lead time, which is impossible. 

Yes, there are many assumptions of the JIRA workflow, but in the absence of instrumenting these in the actual deployment pipeline of each team, this is the next best thing. Ideally we actually track these metrics by tracking code commits into version control and tagging/relating them to production deployments, as that truly measures when value is realized to the end customer. 

## Technologies / Main Libraries
* [nestjs](https://nestjs.com/): Used as a lightweight Node.js framework to serve up an API for pulling stats
* [JavaScript JIRA API for node.js](https://github.com/jira-node/node-jira-client): I need a JIRA client to access the API. Unfortunately this library uses basic auth as a V1 implementation and will need to migrate away from that once it's deprecated
* [jest](https://jestjs.io/): JavaScript testing framework
* [TypeScript starter repository](https://github.com/nestjs/typescript-starter): Used as a way to bootstrap my nestjs project

## Installation

```bash
$ npm install
```

## Setup

This project uses [dotenv](https://github.com/motdotla/dotenv#readme) to manage environment configuration. Create these files on your local system and fill in fields as appropriate.

```
# development.env
JIRA_HOST = <wheremyjirais.com>
JIRA_USERNAME = <myuser>
JIRA_USER_PASSWORD = <mypassword>

# test.env
JIRA_HOST = <wheremyjirais.com>
JIRA_USERNAME = <myuser>
JIRA_USER_PASSWORD = <mypassword>

# production.env
JIRA_HOST = <wheremyjirais.com>
JIRA_USERNAME = <myuser>
JIRA_USER_PASSWORD = <mypassword>
```

## Running the app (local)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# test it out
$ curl "http://localhost:3000/projects/MYKEY/stats?endDate=2019-12-31&startDate=2019-07-01"
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running with Docker
```bash
$ docker-compose build
$ docker-compose up
$ curl "http://localhost:3000/projects/MYKEY/stats?endDate=2019-12-31&startDate=2019-07-01"
```

## Development
I find it easiest to have 2 terminal windows open to see the results of your web application, along with tests running continuously to make sure you didn't break anything.

```bash
$ npm run start:dev
$ npm run test:watch
```

## License

This project is MIT licensed.
