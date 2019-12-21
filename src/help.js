//npm run help

exports.printHelp = function(section){
    if (section == 'general' || section == null){
        console.log("Programa de linea de comandos para controlar bombilla Yeelight.\r\n");
        console.log("El formato de los comandos a ejecutar es el siguiente: ");
        console.log("   - npm run yeelight <command> [params]");
        console.log("   - npm start <command> [params]\r\n");
        console.log("Para ver la lista de comandos permitidos utilizar el comando: ");
        console.log("     npm run yeelight help commands\r\n");
    } else if (section == 'commands'){
        console.log("COMMANDS");
        console.log("    on        - Enciende la bombilla");
        console.log("    off       - Apaga la bombilla");
        console.log("    toggle    - Cambia el estado de la bombilla");
        console.log("    <color>   - Cambia a un color concreto");
        console.log("                Parametros: {red | green | blue | white | orange | yellow}")
        console.log("    rgb       - Cambia a un color en formato RGB");
        console.log("                Parametros: R = [0 - 255] G = [0 - 255] B = [0 - 255]")
        console.log("    get       - Solicita los parametros a la bombilla");
        console.log("    bright    - Cambia el valor del brillo");
        console.log("                Parametros: Brillo = [0 - 100]");
        console.log("    temp      - Cambia el valor de la temperatura de la luz");
        console.log("                Parametros: Temperatura = [1700 (Rojo) - 6500 (Azul)]");
        console.log("    hsv       - Cambia a un color en formato HSV ");
        console.log("                Parametros: Hue = [0 - 359]");
        console.log("                            Saturation = [0 - 100]");
        console.log("    startflow - Inicia el modo color flow");
        console.log("    stopflow  - Para el modo de color flow");
        console.log("    cronadd   - Inicia timer para apagar la bombilla");
        console.log("    cronget   - Recupera el valor del timer actual");
        console.log("    crondel   - Elimina el timer actual");
        console.log("    adjust    - Ajusta el valor sin saber el actual");
        console.log("                Parametros: Accion = {increase | decrease | circle}");
        console.log("                            Propiedad = {bright | ct | color}");
        console.log("    name      - Cambia el nombre local de la bombilla");
        console.log("                Parametros: Nombre");
        console.log("\r\n");
    }

}