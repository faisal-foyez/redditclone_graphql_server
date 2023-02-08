FROM node:12-stretch
WORKDIR /redditclone_graphql_server
COPY package-lock.json package.json ./
RUN npm ci
COPY . .

FROM node:18-alpine3.15
USER node
RUN mkdir /home/node/redditclone_graphql_server
WORKDIR /home/node/redditclone_graphql_server
COPY --from=0  --chown=node:node /redditclone_graphql_server .
CMD [ "node", "index.js" ]