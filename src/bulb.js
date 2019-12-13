var client = require('./client.js');
var controller = require('./controller.js');

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

    var jsonRequest = JSON.stringify(request) + '\r\n';
    client.sendRequest(jsonRequest);
}