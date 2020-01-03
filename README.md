# Yeelight-node-command

Aplicación creada en node.js para controlar mediante linea de comando bombillas **Yeelight**.

 ## ¿Cómo se utiliza?

 En primer lugar, se debe activar la opción de [LAN Control](https://www.yeelight.com/faqs/lan_control).

Los pasos a seguir son los siguientes:
1. Obtener la dirección IP de la bombilla que se quiere controlar.
2. En el fichero [client.js](./src/client.js) sustituir el valor `XXX.XXX.X.XXX` con la dirección IP de la bombilla:
    ```javascript
    const connection = {
        port: 55443,
        host: 'XXX.XXX.X.XXX'
    }
    ```
3. Desde la consola nos situariemos en el directorio dónde se encuentre el programa.
4. Ejecutar el comando que se quiere ejecutar. El formato del comando es:
    ```shell
    npm run yeelight <command> [params]
    ```

## Comandos implementados

La lista de comandos implementados y sus parámetros se resume en la siguiente tabla:

| Comando   | Descripción                                                                      |
|-----------|----------------------------------------------------------------------------------|
| on        | Enciende la bombilla                                                             |
| off       | Apaga la bombilla                                                                |
| toggle    | Cambia el estado de la bombilla entre apagado y encendido                        |
| color     | Cambia el color de la bombilla a un color concreto mediante el literal del color |
| rgb       | Cambia el color de la bombilla a un color concreto mediante los valores de RGB   |
| hsv       | Cambia el color de la bombilla a un color concreto mediante los valores de HSV   |
| bright    | Cambia el valor del brillo de la bombilla                                        |
| temp      | Cambia el valor de la temperatura de la luz de la bombilla                       |
| get       | Solicita los valores de las propiedades de la bombilla                           |
| startflow | Inicia el modo de color flow                                                     |
| stopflow  | Detiene el modo de color flow                                                    |
| cronadd   | Inicial un timer para apagar la bombilla                                         |
| cronget   | Recuper el valor del timer actual                                                |
| crondel   | Elimina el timer actual                                                          |
| adjust    | Ajusta brillo, temperatura o color sin saber el valor actual                     |
| name      | Cambia el nombre local de la bombilla                                            |