const functions = ['on',
    'off',
    'toggle',
    'get',
    'rgb',
    'color',
    'bright'];

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
    "name",
    "bg_power",
    "bg_flowing",
    "bg_flow_params",
    "bg_ct",
    "bg_lmode",
    "bg_bright",
    "bg_rgb",
    "bg_hue",
    "bg_sat",
    "nl_br"
];

exports.inputToCommand = function () {
    let command = new Object();

    let args = inputToArray();
    let func = args[0];
    let params = [];

    for (let i = 1; i < args.length; i++) {
        params.push(args[i]);
    }

    command.id = 0;
    command.method = getMethod(func);
    command.params = getParams(func, params);

    if (command.method) {
        return command;
    } else {
        console.log("Entrada incorrecta: " + func);
        process.exit(0);
    }
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
    }
    if (method) {
        return method;
    } else {
        return false;
    }
}

function getParams(func, values) {
    let params = [];
    switch (func) {
        case 'on':
            params = ["on"];
            break;
        case 'off':
            params = ["off"];
            break;
        case 'toggle':
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
            let color = parseRGB(values);
            params.push(calculateRGBColor(color.red, color.green, color.blue));
            break;
        case 'get':
            params = allParams;
            break;
        case 'bright':
            let brightness = getBrightness(values);
            params.push(brightness);
            break;
    }
    if (params) {
        return params;
    } else {
        console.log("Parametros no encontrados comando de entrada: " + params);
        process.exit(0);
    }
}

function getColor(values) {

    let colorCommand = values[0].toString();
    console.log("valor:" + colorCommand);
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
    let RGBValue = (red * 65536) + (green * 256) + blue;
    return parseInt(RGBValue);

}

function parseRGB(values) {
    let RGB = validateRGB(values[0], values[1], values[2]);
    let color = new Object();
    color.red = parseInt(RGB[0]);
    color.green = parseInt(RGB[1]);
    color.blue = parseInt(RGB[2]);
    return color;
}

function getBrightness(values) {
    let brightness = validateBrightness(values[0]);
    if (Number.isInteger(brightness)) {
        return brightness;
    } else {
        console.log("Parametros insuficientes para el brillo: " + values);
        process.exit(0);
    }
}

function validateBrightness(value) {
    let brightness = parseInt(value);

    if (brightness > 100) {
        brightness = 100;
    } else if (brightness < 0) {
        brightness = 0;
    }
    if (isNaN(brightness)) {
        console.log("Valor de brillo incorrecto.\r\nBrightness: " + value);
        process.exit(0);
    }

    return brightness;
}

function validateRGB(r, g, b) {
    let RGB = [];

    let red = parseInt(r);
    let green = parseInt(g);
    let blue = parseInt(b);

    if (red > 255) {
        red = 255;
    } else if (red < 0) {
        red = 0;
    }

    if (green > 255) {
        green = 255;
    } else if (green < 0) {
        green = 0;
    }

    if (blue > 255) {
        blue = 255;
        console.log("entra por mayor de 255: " + blue);
    } else if (blue < 0) {
        blue = 0;
    }

    if ((red + green + blue) == 0) {
        console.log("Aviso: Los valores entrados para RGB son incorrectos\r\nRed: " + red + "\r\nGreen: " + green + "\r\nBlue: " + blue);
        process.exit(0);
    }

    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        console.log("Parametros insuficientes para determinar el color RGB.\r\nRed: " + red + "\r\nGreen: " + green + "\r\nBlue: " + blue);
        process.exit(0);
    }

    RGB.push(red);
    RGB.push(green);
    RGB.push(blue);
    return RGB;
}