
const fs = require('fs');

let configString = fs.readFileSync('config.json');
let config = JSON.parse(configString);

export default config;