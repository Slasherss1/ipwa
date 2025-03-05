# Ipwa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.
This project depends on the [Backend server](https://github.com/Slasherss1/ipwa-backend2)

## Things to change
Change following files:
- `Dockerfile`:
    | Line | What to change | Note |
    | --- | --- | --- |
    | 7 | ``apiEndpoint: `http://localhost/api`,`` | Change url to backend endpoint |

- `httpd.conf`:
    | Line | What to change | Note |
    | --- | --- | --- |
    | 233 | `ServerAdmin you@example.com` | Change to webmaster's email |
    | 242 | `ServerName www.example.com` | Change to final domain name |
    | 312 | `ServerName www.example.com` | See above |
    | 314 | `SSLCertificateFile /cert/live/<domain>/cert.pem` | Change `<domain>` to the domain name above |
    | 315 | `SSLCertificateKeyFile /cert/live/<domain>/privkey.pem` | Change `<domain>` to the domain name above |
    | 316 | `SSLCertificateChainFile /cert/live/<domain>/chain.pem` | Change `<domain>` to the domain name above |
- (Optional) `src/assets/icons/*` - You can change the icons to your own 