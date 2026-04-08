FROM node:20-alpine
WORKDIR /app

COPY package.json ./
COPY auth-service/package.json ./auth-service/
COPY movie-service/package.json ./movie-service/
COPY payment-service/package.json ./payment-service/
COPY shared/package.json ./shared/

RUN npm install

COPY shared ./shared
COPY payment-service ./payment-service

WORKDIR /app/payment-service

EXPOSE 8082
CMD ["npm", "start"]
