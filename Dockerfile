FROM node:20-alpine AS build
LABEL authors="hrytsev"

#ENV MAIL_USER=843059001@smtp-brevo.com
#ENV MAIL_PASS=Pd931NLItyObHMQX
#ENV LOGIN=hrytsev;
#ENV PASSWORD=vaop;

ENV PORT=3000

COPY . /app
WORKDIR /app

EXPOSE 3000

RUN npm install  && npx tsc && npm prune --production

CMD ["node", "dist/index.js"]