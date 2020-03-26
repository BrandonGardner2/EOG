FROM node:13.10.1 as build

WORKDIR /app
COPY ./package.json yarn.lock .eslintrc.js tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.17.9
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
