# Allow node to host below port 1024

sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
## Development server

`npm start`
`nodemon server.js`
## Useful commands

`sudo kill $(sudo lsof -t -i:80)`
## Build

Run `ng build` to build the project. Run `node server.js` to host both API and front-end applications.