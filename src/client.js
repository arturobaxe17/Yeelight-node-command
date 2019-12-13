const net = require('net');

var port = 55443;
var host = '192.168.0.100';

var socket = net.connect(port, host, function () {
    let address = socket.address();
   // console.log("Connected to " + host + ":" + port);
})

socket.on('error', function (err) {
    console.log("Error");
    console.log(err);
})

socket.on('data', function (data) {
    let message = data.toString();
    console.log("Received data: " + message);
    socket.end();
})

exports.sendRequest = function(request){
    console.log(request);
    socket.write(request);
}