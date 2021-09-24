FROM node:15-alpine as build

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./common ./common
COPY ./server ./server

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/common
RUN yarn build

WORKDIR /usr/src/app/server
RUN yarn build

FROM node:15-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/common/package.json /usr/src/app/common/package.json
COPY --from=build /usr/src/app/common/dist /usr/src/app/common/dist

COPY --from=build /usr/src/app/server/package.json /usr/src/app/server/package.json
COPY --from=build /usr/src/app/server/dist /usr/src/app/server/dist

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/server

CMD ["yarn", "start"]