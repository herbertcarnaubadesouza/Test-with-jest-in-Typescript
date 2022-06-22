FROM node

WORKDIR /app

COPY package.json ./

COPY ./tsconfig.json ./tsconfig.json


RUN npm install


COPY . .

EXPOSE 3333


CMD ["npm","run","dev"] 