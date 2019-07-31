FROM node:latest as node
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/macinodds /usr/share/ngnix/html