rm -r ./pgdata
docker build -t bls .
docker-compose up -d