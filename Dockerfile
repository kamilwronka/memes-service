FROM node:14.1.0-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
ENV NODE_ENV=production

COPY . .

RUN yarn build

ENTRYPOINT [ "yarn", "start:prod" ]