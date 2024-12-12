FROM node:22-alpine As builder

RUN mkdir app

WORKDIR /app

COPY ./package*.json ./

RUN npm config set registry http://registry.mojtel.ir/repository/npm-proxy/

RUN npm i --verbose

COPY . .

RUN npm run build

FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /var/www/site
COPY --from=builder /app/dist/assets /var/www/site/watch/assets