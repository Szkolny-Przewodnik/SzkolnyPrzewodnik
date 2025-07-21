ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
