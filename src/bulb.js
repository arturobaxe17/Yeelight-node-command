const client = require('./client.js');
const controller = require('./controller.js');
const newLine = '\r\n'

request = controller.inputToCommand();

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
    client.sendRequest(jsonRequest);
}