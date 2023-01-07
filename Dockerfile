FROM node:18-alpine AS builder

WORKDIR /app

COPY yarn.lock package.json .

RUN yarn install && yarn cache clean

COPY services services
COPY libs libs
COPY contracts contracts
COPY tsconfig.json nest-cli.json .

RUN yarn run nest build affiliate-network
RUN yarn run nest build traffic-source

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock .

RUN yarn install --frozen-lockfile --prod && yarn cache clean

COPY --from=builder /app/dist dist
COPY --from=builder /app/contracts contracts

#CMD ["node", "dist/services/affiliate-network/src/main.js"]
