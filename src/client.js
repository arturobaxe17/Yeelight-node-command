const client = require('./bulb.js');
const controller = require('./controller.js');
const newLine = '\r\n';
let host = '192.168.0.100';

const bulb = new client(host);

request = controller.inputToCommand();

bulb.connect();

if (request) {
    createRequest(request.id, request.method, request.params);
}

bulb.on('connected', () => {
    //console.log("Cliente conectado"); 
});

bulb.on('datos', () => {
    //console.log("Cliente data"); 
});

bulb.on('disconnected', () => {
    //console.log('Cliente desconectado');
});

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
}, 300);

