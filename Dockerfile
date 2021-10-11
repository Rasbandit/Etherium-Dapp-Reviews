FROM node:14.15.1 AS source

ARG NPM_AUTH_TOKEN

WORKDIR /app

RUN echo "//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}" >> "$HOME/.npmrc"

COPY . .

ENV REACT_APP_DISABLE_PENDO=true
ENV REACT_APP_DISABLE_NEWRELIC=true
ENV REACT_APP_DISABLE_INTERCOM=true
ENV REACT_APP_DISABLE_ANALYTICS=true

RUN npm install --silent

FROM registry.podium.com/engineering/ops/podium-images/nginx/1.17.8-alpine:master

COPY --from=source /app/build /var/www
