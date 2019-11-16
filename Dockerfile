# First stage, build the frontend
FROM node:10.16.1

RUN npm install set https://registry.npm.taobao.org

ENV FRONTEND=/opt/frontend

WORKDIR $FRONTEND

COPY package.json $FRONTEND
COPY package-lock.json $FRONTEND
RUN npm install

COPY . $FRONTEND
RUN npm run build

FROM nginx:1.16.1

ENV HOME=/opt/app

WORKDIR $HOME

ENV SERVER_PORT 80
EXPOSE 80

CMD ["node", "index.js"]
#Copy frontend from the first stage
#COPY --from=0 /opt/frontend/build dist
#COPY nginx/ nginx/

#RUN rm -r /etc/nginx/conf.d \
# && ln -s $HOME/nginx /etc/nginx/conf.d

#RUN ln -sf /dev/stdout /var/log/nginx/access.log \
# && ln -sf /dev/stderr /var/log/nginx/error.log

#EXPOSE 80
