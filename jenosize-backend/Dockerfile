FROM node:18-alpine
LABEL maintainer="Benz Nattapong.T"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=prod
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
