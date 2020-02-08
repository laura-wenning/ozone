# Environment Folder
Holds the various environment variables. This document contains the basic environment variables

## react-server.env
VIRTUAL_HOST - the url of the react server for nginx-proxy
VIRTUAL_PORT - the port of the container for nginx proxy (default 80)
PORT - the port the react-server will run on

LETSENCRYPT_HOST - the url of the react server for nginx-letsencrypt
LETSENCRYPT_EMAIL - the email for TLS expiry for nginx-letsencrypt