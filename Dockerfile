FROM node:24-slim

WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build
CMD ["node", "build/index.js"]
