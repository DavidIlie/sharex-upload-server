FROM node:15-alpine as build

WORKDIR /usr/src/app

COPY ../package.json .
COPY ../yarn.lock .
COPY ../common ./common
COPY ../web ./web

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/common
RUN yarn build

WORKDIR /usr/src/app/web
RUN yarn build

FROM node:15-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/common/package.json /usr/src/app/common/package.json
COPY --from=build /usr/src/app/common/dist /usr/src/app/common/dist

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN mkdir -p /usr/src/app/web

COPY --from=build /usr/src/app/web/next.config.js /usr/src/app/web
COPY --from=build /usr/src/app/web/public /usr/src/app/web/public
COPY --from=build --chown=nextjs:nodejs /usr/src/app/web/.next /usr/src/app/web/.next
COPY --from=build /usr/src/app/web/node_modules /usr/src/app/web/node_modules
COPY --from=build /usr/src/app/web/package.json /usr/src/app/web/package.json

RUN yarn install --pure-lockfile --non-interactive --production

ENV NODE_ENV production

USER nextjs

EXPOSE 3000

WORKDIR /usr/src/app/web

CMD ["yarn", "start"]