#### Stage 1 #####
FROM node:16-alpine

WORKDIR /client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


#### Stage 2 #####
FROM nginx

COPY --from=0  /client/dist /usr/share/nginx/html


