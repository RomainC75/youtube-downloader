FROM node:slim 
# FROM debian:sid-slim
# FROM node:latest

RUN apt-get update && apt-get install -y \


WORKDIR /app

COPY package*.json .
COPY tsconfig.json .

RUN npm install

# RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium

COPY . .

CMD [ "npm", "run", "start" ]