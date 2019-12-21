const net = require('net');

const connection = {
    port: 55443,
    host: '192.168.0.100'
}

var socket = net.connect(connection.port, connection.host, function () {
    let address = socket.address();
   // console.log("Connected to " + host + ":" + port);
})

socket.on('error', function (err) {
    console.log("Error");
    console.log(err);
})

socket.on('data', function (data) {
    let message = data.toString();
    let printMessage =  JSON.stringify(JSON.parse(message),null,3);
    console.log("\r\nData: \r\n" + printMessage);
    socket.end();
})

exports.sendRequest = function(request){
    let printRequest = JSON.stringify(JSON.parse(request),null,3);
    
    console.log(printRequest);
    socket.write(request);
}