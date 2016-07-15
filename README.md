[![Build Status](https://snap-ci.com/VamosJuntas/vamosjuntas-api/branch/master/build_image)](https://snap-ci.com/VamosJuntas/vamosjuntas-api/branch/master)

# VamosJuntas REST API

## Installation

Install [Brew](http://brew.sh/) in your Mac and then install Mongo:

```
brew install mongodb
```

Install services in brew to manage MongoDb:


```
brew tap homebrew/services
```


Install project dependencies:

```
npm install
```

## MongoDB

With brew and brew services installed (see above), manage Mongo with following commands:

### Start

```
brew services start mongodb
```

### Stop

```
brew services stop mongodb
```

### Restart

```
brew services restart mongodb
```

## Tests

Test script will run the folling commands: **lint > unit > integration**

```
npm test
```

### Lint

```
npm run lint
```

### Unit

```
npm run unit-test
```

### Integration

**Note:** Before you should start mongodb service.

```
npm run integration-test
```

## Docker

### Starts docker machine

```
docker-machine start

docker-machine env

eval $(docker-machine env)
```

###  Build images

```
docker-compose -f docker-compose-dev.yml build db

docker-compose -f docker-compose-dev.yml build test

OR

docker-compose -f docker-compose-dev.yml build web
```

### Start API

```
docker-compose -f docker-compose-dev.yml up web
```

It will expose the 3000 port in the docker machine. You can check it by typing `docker ps`.

### Tests

#### Runs test script

```
docker-compose -f docker-compose-dev.yml run test
```

#### Lint

```
docker-compose -f docker-compose-dev.yml run test npm run lint
```

#### Unit

```
docker-compose -f docker-compose-dev.yml run test npm run unit-test
```

#### Integration

```
docker-compose -f docker-compose-dev.yml run test npm run integration-test
```
