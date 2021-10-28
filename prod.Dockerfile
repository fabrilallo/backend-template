##############################################################################
# Step 1 : Builder image
FROM node:15.3.0-alpine AS builder
WORKDIR /usr/src/app
ENV NODE_ENV production


RUN npm i -g lerna
COPY ./lerna.json .
COPY ./package.json ./
COPY ./packages/api ./packages/api
COPY ./packages/api ./packages/api
COPY ./packages/storage ./packages/storage
COPY ./yarn* ./
RUN rm -rf node_modules && \
    yarn install --production\
    lerna bootstrap && \
    yarn build

###############################################################################
# Step 2 : Run image
FROM node:15.3.0-alpine@sha256:98c899a40aed3f8bb1a042b45350aa873e533aef8f512d840e363326c2a184fc AS runner
RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 \
    -O /usr/local/bin/dumb-init && \
    chmod +x /usr/local/bin/dumb-init && \
    apk add curl  # used for healthcheck
ENV NODE_ENV production
USER node
ENV NPM_CONFIG_LOGLEVEL error
WORKDIR /usr/src/app
COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./lerna.json ./
COPY --chown=node:node ./yarn* ./
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/packages/api ./packages/api
COPY --chown=node:node --from=builder /usr/src/app/packages/storage ./packages/storage
COPY --chown=node:node ./packages/api/package* ./packages/api/


# RUN yarn install 
CMD [ "dumb-init", "yarn", "--cwd", "/usr/src/app/packages/api", "start" ]

