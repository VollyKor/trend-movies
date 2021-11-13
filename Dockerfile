FROM node:16-alpine as trend-movies-front-builder

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . /app

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=trend-movies-front-builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]