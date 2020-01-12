const EventEmitter = require('events');
const dgram = require('dgram');
const okResponse = 'HTTP/1.1 200 OK';
const options = {
    port: 1982,
    multiCastHost: '239.255.255.250',
    castMessage: 'M-SEARCH * HTTP/1.1\r\nMAN: \"ssdp:discover\"\r\nST: wifi_bulb\r\n',
}

class Finder extends EventEmitter {
    constructor() {
        super();
        this.socket = dgram.createSocket('udp4');
        this.found = false;
        this.find();
    }

    allCast() {
        const buffer = Buffer.from(options.castMessage);
        this.socket.send(buffer, 0, buffer.length, options.port, options.multiCastHost);
    }

    find() {
        this.socket.on('listening', () => {
            this.socket.addMembership(options.multiCastHost);
            this.allCast();
            this.emit('finding');
        });

        this.socket.on('message', (message) => {
            this.parseResponse(message);
        });

        try {
            this.socket.bind(options.port, () => {
              this.socket.setBroadcast(true)
            })
          } catch (ex) {
            throw ex;
          }
    }

    parseResponse(message){
        let response = message.toString().split('\r\n');
        if (response[0] == okResponse && !this.found){
            this.found = true;
            this.foundHost = response[4].substring(21, 34);
            this.foundPort = response[4].substring(35, 42);
            this.emit('found', this.foundHost, this.foundPort, response);
        }
    }
}

module.exports = Finder;