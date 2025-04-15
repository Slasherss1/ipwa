#!/bin/sh
cat >> /usr/local/apache2/conf/httpd.conf <<EOF
ServerName $DOMAIN
ServerAdmin $EMAIL
<VirtualHost *:80>
    ServerName $DOMAIN
</VirtualHost>
EOF
httpd -k start
certbot --apache -n --keep -d $DOMAIN -m $EMAIL
httpd -k stop
httpd-foreground