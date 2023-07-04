FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN apk update && apk add curl

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]