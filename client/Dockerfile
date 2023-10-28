FROM node:20.9.0-alpine

WORKDIR /client

COPY . /client/

RUN npm i -g pnpm

RUN pnpm i

CMD [ "pnpm", "run", "dev", "--host" ]