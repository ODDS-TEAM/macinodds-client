# base image
FROM node:10.16.0 as BUILDER

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json /app/
RUN npm install @angular/cli --verbose
RUN npm install --production --verbose


# add app
COPY . /app

# start app
RUN npm run build 

FROM nginx:alpine AS WEBSERVER
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILDER /app/dist/macinodds/ /usr/share/nginx/html
