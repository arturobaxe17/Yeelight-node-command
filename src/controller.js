const Bulb = require('./bulb.js');
const Finder = require('./finder.js');
const Parser = require('./parser.js');
const Help = require('./help.js');
const LoadingBar = require('./loadingBar.js');
const config = require('../utils/config/config.json');
const newLine = '\r\n';
let reqParams = {};
let getting = false;
let bulb;
let bulbTries = 0;
let timeout;
const retries = 20;

const helper = new Help();
const progress = new LoadingBar(retries);


let configuration = {
    consoling: config.config || false,
    host: config.host,
    port: config.port
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

cmdCtrl.on('line', (line) => {
    parseLine(line);
    cmdCtrl.prompt();
}).on('close', () => {
    try {
        bulb.disconnect();
    } catch (e) {
        //console.log(e);
    }
    console.log('Cerrando programa');
    process.exit(0);
});

const finder = new Finder();

finder.on('finding', () => {
    console.log('Buscando...');
    retryCast(1000, retries);
});

function retryCast(interval, retries) {
    progress.start();
    timeout = setInterval(() => {
        bulbTries++;

        progress.step();
        // console.log('Reintento ' + bulbTries);
        finder.allCast();
        if (bulbTries >= retries) {
            progress.stop();
            clearInterval(timeout);
            console.log('No se ha encontrado ninguna bombilla');
            cmdCtrl.question('Indroduce la IP de la bombilla: ', (answer) => {
                createBulb(answer, configuration.port);
                cmdCtrl.prompt();
            });
        }
    }, interval);
}

finder.on('found', (host, port, name, response) => {
    try {
        progress.stop();
    } catch (e) {

    }
    clearInterval(timeout);
    bulbFound = true;
    createBulb(host, port);
    configuration.host = host;
    configuration.port = port;
    console.log(`Bombilla encontrada: ${name}`);
    console.log(`Conexión: ${host}:${port}`);
    cmdCtrl.prompt();
});

function createBulb(host, port) {
    bulb = new Bulb(host, port);

    bulb.on('connected', (host, port) => {
        //console.log(`Yeelight conectada: ${host}:${port}`);
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
    });

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
}

function parseLine(line) {
    let input = line.split(' ');
    if (input[0] == 'get') {
        getting = true;
    }

    if (input == 'cls') {
        cmdCtrl.write('\u001B[0;0f');
        cmdCtrl.clearLine(process.stdout, 0);
    } else if (input[0] == 'help') {
        helper.printHelp(input[1]);
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
        console.log("Consoling: " + configuration.consoling);
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