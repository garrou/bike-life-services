# bike-life-services

Backend of [bike-life](https://github.com/1-irdA/bike-life)    

## Environments variables  

This project use .env file for config, before launch, create a .env file at project root.       

```sh
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_DATABASE=
POSTGRES_PORT=

DOCKER_POSTGRES_HOST=

SERVER_PORT=

SECRET_TOKEN=
```

## First start

```
sh first.sh
```

## Docker     

```sh
docker build -t bls .
docker-compose up [-d]
```

## Tests

```sh
npm test
```