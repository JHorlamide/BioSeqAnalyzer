FROM node:16-alpine

WORKDIR /client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
