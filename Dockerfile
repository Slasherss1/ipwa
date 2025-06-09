FROM node:18-alpine AS build
WORKDIR /build
ADD . .
RUN [ "npm", "ci" ]
RUN [ "npm", "run", "build" ]

FROM httpd:alpine AS runtime
RUN apk add --no-cache certbot certbot-apache
COPY httpd.conf /usr/local/apache2/conf/httpd.conf
COPY cli.ini /etc/letsencrypt/cli.ini
COPY --from=build /build/dist/ipwa/browser /usr/local/apache2/htdocs/ipwa
COPY <<EOF /usr/local/apache2/htdocs/ipwa/.htaccess
RewriteEngine on
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ /ipwa/index.html
EOF
RUN chmod +rx /usr/local/apache2/htdocs/ipwa/.htaccess
COPY entrypoint.sh entrypoint.sh
EXPOSE 80
EXPOSE 443
CMD ["sh", "entrypoint.sh"]