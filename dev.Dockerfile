FROM node:14.18.0-alpine
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./packages/api ./packages/api
COPY ./packages/storage ./packages/storage

COPY ./yarn* ./

RUN rm -rf node_modules && \
    yarn

CMD ["yarn", "--cwd", "/usr/src/app/packages/api", "start:dev" ]

