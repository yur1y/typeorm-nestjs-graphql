FROM node:20-alpine 

WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY --chown=node:node . .

RUN pnpm build

USER node

CMD [ "pnpm", "start:dev" ]