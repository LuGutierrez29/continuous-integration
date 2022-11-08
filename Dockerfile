FROM nginx
RUN mkdir -p /home/app
COPY . /home/app
COPY . /usr/share/nginx/html
EXPOSE 80
STOPSIGNAL SIGTERM
CMD [ "nginx","-g","daemon off;" ]




