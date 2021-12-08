FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

ENV PORT 80

EXPOSE 80

CMD ["./bin/www"]