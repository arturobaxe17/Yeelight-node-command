const net = require('net');
const EventEmitter = require('events');

class LightBulb extends EventEmitter {
    constructor(host) {
        super();
        this.connected = false;
        this.socket = null;
        this.port = 55443;
        this.host = host;
    }

    connect() {
        if (this.socket) {
            this.disconnect();
        }

        this.socket = new net.Socket();

        this.socket.on('data', (data) => {
            let message = data.toString();
            let printMessage = JSON.parse(message);
            console.log("\r\nData: ");
            console.log(printMessage);
            this.emit('data');
        });

        this.socket.on('end', () => {
            this.disconnect();
        });

        this.socket.connect(this.port, this.host, () => {
            this.emit('connected');
        });

        this.socket.on('close', () => {
            this.disconnect();
        });

        this.socket.on('error', (err) => {
            console.log("Error");
            console.log(err);
            this.disconnect();
        });
    }

    disconnect() {
        this.connnected = false;
        if (this.socket) {
            this.socket.destroy();
        }
        this.socket = null;
        this.emit('disconnected');
    }

    sendRequest(request) {
        let printRequest = JSON.parse(request);
        console.log(printRequest);
        this.socket.write(request);
        this.emit('data');
    }
}

module.exports = LightBulb;