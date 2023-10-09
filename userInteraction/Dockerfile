FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY ./src ./src
COPY ./.env ./.env
CMD ["npm", "start"]