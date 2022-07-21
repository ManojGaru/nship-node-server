FROM node:16-alpine
EXPOSE 5000

WORKDIR /nship-server

COPY ./package.json .

RUN npm i

COPY . .

CMD [ "npm","start" ]
