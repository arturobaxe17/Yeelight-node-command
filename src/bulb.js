const net = require('net');
const EventEmitter = require('events');

class LightBulb extends EventEmitter {
    constructor(host) {
        super();
        this.socket = null;
        this.port = 55443;
        this.host = host;
        this.connected = false;
    }

    connect() {
        if (this.socket) {
            this.disconnect();
        }

        this.socket = new net.Socket();

        this.socket.on('data', (data) => {
            let message = data.toString();
            let printMessage = JSON.parse(message);
            this.emit('data', printMessage);
        });

        this.socket.on('end', () => {
            this.disconnect();
        });

        this.socket.connect(this.port, this.host, () => {
            this.connected = true;
            this.emit('connected', this.host, this.port);
        });

        this.socket.on('close', () => {
        })

        this.socket.on('error', (err) => {
            console.log("Error");
            console.log(err);
            this.disconnect();
        });
    }

    disconnect() {
        this.connected = false;
        if (this.socket) {
            this.socket.destroy();
        }
        this.socket = null;
        this.emit('disconnected');
    }

    sendRequest(request) {
       if (!this.connected) {
           this.connect();
       }
       console.log(JSON.parse(request));
        this.socket.write(request);
    }
}

module.exports = LightBulb;