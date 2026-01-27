FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

RUN adduser -D -H -u 1001 -s /sbin/nologin webuser

COPY --from=build /app/dist /usr/share/nginx/html

RUN chown -R webuser:webuser /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    && chown -R webuser:webuser /var/cache/nginx \
    && chown -R webuser:webuser /var/log/nginx \
    && chown -R webuser:webuser /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown -R webuser:webuser /var/run/nginx.pid

USER webuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]