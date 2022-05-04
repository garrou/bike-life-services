FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm cache clean & npm install & npm update

COPY . .

EXPOSE 8100

CMD npm start