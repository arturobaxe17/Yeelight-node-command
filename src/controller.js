var help = require('./help.js');

var allParams = ["power",
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
    // "bg_power",
    // "bg_flowing",
    // "bg_flow_params",
    // "bg_ct",
    // "bg_lmode",
    // "bg_bright",
    // "bg_rgb",
    // "bg_hue",
    // "bg_sat",
    // "nl_br"
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
    command.method = getMethod(func);
    command.params = getParams(func, params);
    return command;
}

function inputToArray() {
    let inArgs = process.argv.slice(2).toString();
    let args = inArgs.split(',');
    return args;
}

function getMethod(func) {
    let method;
    switch (func) {
        case 'on':
        case 'off':
            method = "set_power";
            break;
        case 'toggle':
            method = "toggle";
            break;
        case 'color':
        case 'colour':
        case 'rgb':
        case 'red':
        case 'green':
        case 'blue':
        case 'white':
        case 'orange':
        case 'yellow':
            method = "set_rgb";
            break;
        case 'get':
            method = "get_prop";
            break;
        case 'bright':
            method = "set_bright";
            break;
        case 'temp':
            method = "set_ct_abx";
            break;
        case 'hsv':
            method = "set_hsv";
            break;
        case 'startflow':
            method = "start_cf";
            break;
        case 'stopflow':
            method = "stop_cf";
            break;
        case 'cronadd':
            method = "cron_add";
            break;
        case 'cronget':
            method = "cron_get";
            break;
        case 'crondel':
            method = "cron_del";
            break;
        case 'adjust':
            method = "set_adjust";
            break;
        case 'name':
            method = "set_name";
            break;
    }
    if (method) {
        return method;
    } else {
        return false;
    }
}

function getParams(func, values) {
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
            params = allParams;
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
            let action = getAction(values);
            let prop = getProperties(values);
            params.push(action);
            params.push(prop);
            break;
        case 'name':
            let name = getName(values);
            params.push(name);
            break;
    }
    if (params) {
        return params;
    } else {
        console.log("Parametros no encontrados comando de entrada: " + params);
        process.exit(0);
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

function tempParams(values) {
    console.log(values);
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