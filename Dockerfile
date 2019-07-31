FROM nginx:alpine
COPY --from=node /app/dist/macinodds /usr/share/ngnix/html