FROM node:18 AS builder

WORKDIR /app

COPY yarn.lock package.json .

RUN yarn install && yarn cache clean

COPY services services
COPY libs libs
COPY contracts contracts
COPY tsconfig.json nest-cli.json supergraph-config.yaml .

RUN yarn run supergraph:compose

RUN cd contracts && yarn && yarn run gen:typings

RUN yarn run nest build contracts
RUN yarn run nest build affiliate-network
RUN yarn run nest build api-gateway
RUN yarn run nest build campaign
RUN yarn run nest build click
RUN yarn run nest build offer
RUN yarn run nest build traffic-source

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock .

RUN yarn install --frozen-lockfile --prod && yarn cache clean

COPY --from=builder /app/dist dist
COPY --from=builder /app/contracts contracts
