FROM node:18-alpine as build
WORKDIR /build
ADD . .
RUN [ "npm", "ci" ]
COPY <<EOF src/environments/environment.ts
export const environment = {
    apiEndpoint: `http://localhost/api`,
    version: "v1.0.0",
    vapid: {
        pubkey: `${VAPID}`
    },
    production: true
};
EOF
RUN [ "npm", "run", "build" ]

FROM httpd:alpine as runtime
COPY httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build /build/dist /usr/local/apache2/htdocs/
COPY <<EOF /usr/local/apache2/htdocs/ipwa/.htaccess
RewriteEngine on
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ /ipwa/index.html
EOF
RUN chmod +rx /usr/local/apache2/htdocs/ipwa/.htaccess
EXPOSE 80
