const help = require('./help.js');

const methodDictionary = {
    'on': 'set_power',
    'off': 'set_power',
    'toggle': 'toggle',
    'color': 'set_rgb',
    'colour': 'set_rgb',
    'rgb': 'set_rgb',
    'red': 'set_rgb',
    'green': 'set_rgb',
    'blue': 'set_rgb',
    'white': 'set_rgb',
    'orange': 'set_rgb',
    'yellow': 'set_rgb',
    'get': 'get_prop',
    'bright': 'set_bright',
    'temp': 'set_ct_abx',
    'hsv': 'set_hsv',
    'startflow': 'start_cf',
    'stopflow': 'stop_cf',
    'cronadd': 'crond_add',
    'cronget': 'cron_get',
    'crondel': 'cron_del',
    'adjust': 'set_adjust',
    'name': 'set_name'
}

const allParams = ["power",
    "bright",
    "ct",
    "rgb",
    "hue",
    "sat",
    "color_mode",
    "flowing",
    "delayoff",
    "flow_params",
    "music_on",
    "name"
];

let params = [];

exports.inputToCommand = function () {
    let id = 0;
    let args = inputToArray();
    let func = args[0];
    let params = [];

    for (let i = 1; i < args.length; i++) {
        params.push(args[i]);
    }

    if (func == 'help') {
        help.printHelp(params[0]);
        process.exit(0);
    } else {
        let command = createNewCommand(id, func, params);
        if (command.method) {
            return command;
        } else {
            console.log("Entrada incorrecta: " + func);
            process.exit(0);
        }
    }
}

function createNewCommand(id, func, params) {
    let command = new Object();
    command.id = id;
    command.method = methodDictionary[func];
    command.params = parseParams(func, params, command);
    return command;
}

function inputToArray() {
    let inArgs = process.argv.slice(2).toString();
    let args = inArgs.split(',');
    return args;
}

function parseParams(func, values, object) {
    switch (func) {
        case 'on':
            params = ["on"];
            break;
        case 'off':
            params = ["off"];
            break;
        case 'toggle':
        case 'stopflow':
            params = [];
            break;
        case 'color':
        case 'colour':
            params = getColor(values);
            break;
        case 'red':
        case 'green':
        case 'blue':
        case 'white':
        case 'orange':
        case 'yellow':
            params = getColor([func]);
            break;
        case 'rgb':
            rgbParams(values);
            break;
        case 'get':
            getParams(values);
            break;
        case 'bright':
            brightParams(values);
            break;
        case 'temp':
            tempParams(values);
            break;
        case 'hsv':
            hsvParams(values);
            break;
        case 'startflow':
            params.push(4);
            params.push(0);
            params.push("1000, 2, 2700, 100, 500, 1,255, 10, 5000, 7, 0,0, 500, 2, 5000, 1");
            break;
        case 'cronadd':
            params.push(0); //Apagar la bombilla, valor fijo
            let minutes = getMinutes(values);
            params.push(minutes);
        case 'cronget':
        case 'crondel':
            params.push(0); //Apagar la bombilla, valor fijo
            break;
        case 'adjust':
            let command = adjustParams(values);
            if (command) {
                object.method = command;
            }
            break;
        case 'name':
            let name = getName(values);
            params.push(name);
            break;
    }
    if (params) {
        return params;
    } else {
        console.log("Parametros no encontrados para la funcion: " + func + ". Parametros: " + values);
        process.exit(0);
    }
}

function getColor(values) {
    let colorCommand = values[0].toString();
    let color = [];
    switch (colorCommand) {
        case 'red':
            color.push(calculateRGBColor(255, 0, 0));
            break;
        case 'green':
            color.push(calculateRGBColor(0, 255, 0));
            break;
        case 'blue':
            color.push(calculateRGBColor(0, 0, 255));
            break;
        case 'white':
            color.push(calculateRGBColor(255, 255, 255));
            break;
        case 'orange':
            color.push(16744192);
            break;
        case 'yellow':
            color.push(calculateRGBColor(255, 255, 0));
            break;
        default:
            color.push(calculateRGBColor(255, 255, 255));
    }
    return color;
}

function rgbParams(values) {
    let color = parseRGB(values);
    params.push(calculateRGBColor(color.red, color.green, color.blue));
    let effect = getEffect(values[3]);
    if (effect) {
        params.push(effect);
    }
    if (effect == 'smooth') {
        let duration = getDuration(values[4]);
        if (duration) {
            params.push(duration);
        }
    }
}

function getParams(values) {
    for (prop in values) {
        params.push(values[prop]);
    }

    if (params.length == 0) {
        params = allParams;
    }
}

function brightParams(values) {
    let brightness = getBrightness(values);
    params.push(brightness);
    let effect = getEffect(values[1]);
    if (effect) {
        params.push(effect);
    }
    if (effect == 'smooth') {
        let duration = getDuration(values[2]);
        if (duration) {
            params.push(duration);
        }
    }
}

function adjustParams(values) {
    let action = getAction(values);
    let prop = getProperties(values);
    let percentage = values[2];
    let duration = values[3];

    if (percentage) {
        percentage = validateRange(percentage, 0, 100);
        if (action == 'decrease') {
            percentage *= -1;
        }
        params.push(percentage);
        if (duration) {
            duration = duration * 1000;
            params.push(duration);
        }
        return 'adjust_' + prop;
    } else {
        params.push(action);
        params.push(prop);
    }
}

function tempParams(values) {
    let temperature = getTemperature(values);
    params.push(temperature);
    let effect = getEffect(values[1]);
    if (effect) {
        params.push(effect);
    }
    if (effect == 'smooth') {
        let duration = getDuration(values[2]);
        if (duration) {
            params.push(duration);
        }
    }
}

function hsvParams(values) {
    let hue = getHue(values);
    let sat = getSaturation(values);
    params.push(hue);
    params.push(sat);

    let effect = getEffect(values[2]);
    if (effect) {
        params.push(effect);
    }
    if (effect == 'smooth') {
        let duration = getDuration(values[3]);
        if (duration) {
            params.push(duration);
        }
    }
}

function getDuration(inDuration) {
    let duration = null;
    if (inDuration) {
        duration = parseInt(1000 * inDuration);
    }
    return duration;
}

function getEffect(inEffect) {
    let effect = null;
    if (inEffect != undefined) {
        if (inEffect == 'smooth') {
            effect = inEffect;
        } else if (inEffect == 'sudden') {
            effect = null;
        } else {
            console.log('Valor incorrecto para el efecto: ' + inEffect);
        }
    }
    return effect;
}

function getAction(values) {
    let action = values[0];
    if (action !== 'increase' && action !== 'decrease' && action !== 'circle') {
        console.log("Valor de accion incorrecto para la funcion adjust: " + action);
        process.exit(0);
    }
    return action;
}

function getProperties(values) {
    let properties = values[1];
    if (properties !== 'bright' && properties !== 'ct' && properties !== 'color') {
        console.log("Valor de propiedad incorrecto para la funcion adjust: " + values[0]);
        process.exit(0);
    }
    return properties;
}

function getName(values) {
    let name = values[0];
    return name;
}

function calculateRGBColor(red, green, blue) {
    let RGBValue = parseInt((red * 65536) + (green * 256) + blue);
    return RGBValue;
}

function parseRGB(values) {
    let RGB = validateRGB(values[0], values[1], values[2]);
    let color = new Object();
    color.red = parseInt(RGB.red);
    color.green = parseInt(RGB.green);
    color.blue = parseInt(RGB.blue);
    return color;
}

function getBrightness(values) {
    let brightness = validateRange(values[0], 0, 100);
    if (!Number.isInteger(brightness)) {
        console.log("Parametros insuficientes para el brillo: " + values);
        process.exit(0);

    }
    return brightness;
}

function getHue(values) {
    let hue = validateRange(values[0], 0, 359);
    if (!Number.isInteger(hue)) {
        console.log("Parametros insuficientes para la temperatura: " + values);
        process.exit(0);
    }
    return hue;
}

function getSaturation(values) {
    let saturation = validateRange(values[1], 0, 100);
    if (!Number.isInteger(saturation)) {
        console.log("Parametros insuficientes para la saturacion: " + values);
        process.exit(0);
    }
    return saturation;
}

function getMinutes(values) {
    let minutes = validateRange(values[0], 0, 1440);
    if (!Number.isInteger(minutes)) {
        console.log("Parametros insuficientes para los minutos: " + values);
        process.exit(0);
    }
    return minutes;
}

function getTemperature(values) {
    let temperature = validateRange(values[0], 1700, 6500);
    if (!Number.isInteger(temperature)) {
        console.log("Parametros insuficientes para la temperatura: " + values);
        process.exit(0);
    }
    return temperature;
}

function validateRange(value, min, max) {
    let validValue = parseInt(value);

    if (isNaN(value)) {
        console.log("Valor entrado incorrecto: " + value);
        process.exit(0);
    }

    if (validValue > max) {
        validValue = max;
    } else if (validValue < min) {
        validValue = min;
    }
    return validValue;
}

function validateRGB(r, g, b) {
    let RGB = {};

    RGB.red = validateRange(r, 1, 255);
    RGB.green = validateRange(g, 1, 255);
    RGB.blue = validateRange(b, 1, 255);

    if ((RGB.red + RGB.green + RGB.blue) == 0) {
        console.log("Aviso: Los valores entrados para RGB son incorrectos\r\nRed: " + RGB.red + "\r\nGreen: " + RGB.green + "\r\nBlue: " + RGB.blue);
        process.exit(0);
    }

    if (isNaN(RGB.red) || isNaN(RGB.green) || isNaN(RGB.blue)) {
        console.log("Parametros insuficientes para determinar el color RGB.\r\nRed: " + RGB.red + "\r\nGreen: " + RGB.green + "\r\nBlue: " + RGB.blue);
        process.exit(0);
    }
    return RGB;
}