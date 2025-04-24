#!/bin/sh
if [ $DOMAIN -a $EMAIL ]; then
    if [ ! -e /usr/local/apache2/.configured ]; then
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
        touch /usr/local/apache2/.configured
    fi
fi
httpd-foreground