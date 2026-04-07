FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

# Optimize cache by copying package manifests first
COPY package.json ./
COPY auth-service/package.json ./auth-service/
COPY movie-service/package.json ./movie-service/
COPY shared/package.json ./shared/

RUN npm install

# Copy source code
COPY shared ./shared
COPY auth-service ./auth-service

WORKDIR /app/auth-service
RUN npx prisma generate

EXPOSE 8080
CMD ["npm", "start"]
