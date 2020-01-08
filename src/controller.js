const Bulb = require('./bulb.js');
const Parser = require('./parser.js');
const Help = require('./help.js');
const config = require('../utils/config/config.json');
const defaultHost = '192.168.0.101';
const newLine = '\r\n';
let reqParams = {};
let getting = false;

let configuration = {
    consoling: config.config || false,
    host: config.host || defaultHost
}

const completions = ['on', 'off', 'setpower',
    'toggle', 'color', 'rgb',
    'red', 'green', 'blue', 'white',
    'orange', 'yellow', 'get', 'bright',
    'temp', 'hsv', 'startflow', 'stopflow',
    'cronadd', 'cronget', 'crondel', 'adjust',
    'name', 'help', 'cls', 'consoling'];

const cmdCtrl = require('readline').Interface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Yeelight>',
    completer
});

function completer(line) {
    var hits = completions.filter(function (c) {
        if (c.indexOf(line) == 0) {
            return c;
        }
    });
    return [hits && hits.length ? hits : completions, line];
}

cmdCtrl.prompt();

cmdCtrl.on('line', (line) => {
    parseLine(line);
    cmdCtrl.prompt();
}).on('close', () => {
    bulb.disconnect();
    console.log('Cerrando programa');
    process.exit(0);
});

const bulb = new Bulb(configuration.host);

bulb.on('connected', (host, port) => {
    // if () {
    //     console.log(`Yeelight conectada: ${host}:${port}`);
    // }
});

bulb.on('request', (request) => {
    let jRequest = JSON.parse(request);
    if (configuration.consoling) {
        cmdCtrl.prompt();

        console.log('\x1b[32m%s%s\x1b[0m', 'Cliente  => ', request.replace(/\s+/g, " "));
    }
    if (getting) {
        reqParams = jRequest.params;
    }
})

bulb.on('data', (message) => {
    if (configuration.consoling) {
        console.log('\x1b[36m%s%s\x1b[0m', 'Bombilla => ', JSON.stringify(message));
    } else if (message.result && !getting) {
        console.log('\x1b[36m%s%s\x1b[0m', 'Bombilla => ', message.result.toString());
    }

    if (getting) {
        getting = false;
        console.log('\r');
        for (let i in message.result) {
            if (reqParams[i] != '') {
                console.log('\x1b[36m%s\x1b[0m', `Bombilla => ${reqParams[i]}: ${message.result[i]}`);
            }
        }
    }
    cmdCtrl.prompt();
});

bulb.on('disconnected', () => {
    console.log('Yeelight desconectada');
});

function parseLine(line) {
    let input = line.split(' ');
    if (input[0] == 'get') {
        getting = true;
    }

    if (input == 'cls') {
        cmdCtrl.write('\u001B[0;0f');
        cmdCtrl.clearLine(process.stdout, 0);
    } else if (input[0] == 'help') {
        Help.printHelp(input[1]);
    } else if (input[0] == 'options') {
        console.log(configuration);
    } else if (input[0] == 'consoling') {
        if (input[1] == null) {
            configuration.consoling = !configuration.consoling;
        } else if (input[1] == 'on') {
            configuration.consoling = true;
        } else if (input[1] == 'off') {
            configuration.consoling = false;
        }
    } else if (input[0] == 'close') {
        bulb.disconnect();
        process.exit(0);
    } else {
        request = Parser.inputToCommand(input);
        if (request) {
            createRequest(request.id, request.method, request.params);
        }
    }
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

// setTimeout(function () {
//     bulb.disconnect();
// }, 1000);

