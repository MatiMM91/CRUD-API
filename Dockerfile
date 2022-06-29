FROM node:18

FROM mysql:5.7

FROM alpine

ARG HTTP_PROXY_AUTH

RUN apk update && apk add git

WORKDIR /app

COPY package.json package-lock.json

RUN npm install

COPY . .

CMD ["npm", "start"]