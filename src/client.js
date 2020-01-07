const client = require('./bulb.js');
const parser = require('./parser.js');
const newLine = '\r\n';
let host = '192.168.0.100';

const bulb = new client(host);

bulb.on('connected', (host, port) => {
    console.log(`Yeelight conectada: ${host}:${port}`);
});

bulb.on('data', (message) => {
    console.log(message);
});

bulb.on('disconnected', () => {
    console.log('Yeelight desconectada');
});

request = parser.inputToCommand();
if (request) {
    createRequest(request.id, request.method, request.params);
}

function createRequest(id, method, params) {
    let request = new Object();

    request.id = id;
    request.method = method;
    request.params = [];

    for (let param in params) {
        request.params.push(params[param]);
    }

    var jsonRequest = JSON.stringify(request) + newLine;
    bulb.sendRequest(jsonRequest);

}

setTimeout(function () {
    bulb.disconnect();
}, 1000);

