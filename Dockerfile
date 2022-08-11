FROM ubuntu:latest

EXPOSE 8910

EXPOSE 8911

EXPOSE 5555

RUN apt update -y && apt install curl -y && curl -sL https://deb.nodesource.com/setup_16.x | bash -

RUN apt install -y nodejs && npm install --global yarn

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app
