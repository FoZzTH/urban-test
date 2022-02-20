FROM node:16.1.0

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

COPY .env ./dist/
WORKDIR ./dist

CMD node src/index.js