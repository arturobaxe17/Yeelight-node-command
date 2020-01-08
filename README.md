# Yeelight-node-command

Aplicación creada en node.js para controlar mediante linea de comando bombillas **Yeelight**.

 ## ¿Cómo se utiliza?

 En primer lugar, se debe activar la opción de [LAN Control](https://www.yeelight.com/faqs/lan_control).

Los pasos a seguir son los siguientes:
1. Obtener la dirección IP de la bombilla que se quiere controlar.
2. En el fichero [client.js](./src/client.js) sustituir el valor `XXX.XXX.X.XXX` con la dirección IP de la bombilla:
    ```javascript
        let host = 'XXX.XXX.X.XXX';
    ```
3. Desde la consola nos situariemos en el directorio dónde se encuentre el programa.

4. Ejecutar uno de los siguientes comandos:
    ```shell
    prompt>npm start
    prompt>npm run yeelight
    ```

5. Aparecerá el nuevo prompt: `Yeelight>`. Aquí introduciremos el comando que se quiere ejecutar. El formato del comando es:
    ```shell
    Yeelight><comando> [parametros]
    ```
6. Una vez introducido el comando se mostrarán los siguientes mensajes:
    1. Mensaje a enviar a la bombilla en formato JSON:
        ```javascript
        { id: 0, method: 'set_rgb', params: [ 16744192 ] }
        ```
    2. Mensaje de conexión a la bombilla, indicando IP y puerto:
        ```
        Yeelight conectada: 192.168.0.100:55443
        ```
    3. Mensaje recibido de la bombilla en formato JSON:
        ```javascript
        { id: 0, result: [ 'ok' ] }
        ```
    4. Mensaje de desconexión de la bombilla:
        ```
        Yeelight desconectada
        ```

## Comandos implementados

La lista de comandos implementados se resume en la siguiente tabla:

| Comando   | Descripción                                                                                                           |
|-----------|-----------------------------------------------------------------------------------------------------------------------|
| [on](./utils/help/md/help-on.md)               | Enciende la bombilla                                                             |
| [off](./utils/help/md/help-off.md)             | Apaga la bombilla                                                                |
| [toggle](./utils/help/md/help-toggle.md)       | Cambia el estado de la bombilla entre apagado y encendido                        |
| [color](./utils/help/md/help-color.md)         | Cambia el color de la bombilla a un color concreto mediante el literal del color |
| [rgb](./utils/help/md/help-rgb.md)             | Cambia el color de la bombilla a un color concreto mediante los valores de RGB   |
| [hsv](./utils/help/md/help-hsv.md)             | Cambia el color de la bombilla a un color concreto mediante los valores de HSV   |
| [bright](./utils/help/md/help-bright.md)       | Cambia el valor del brillo de la bombilla                                        |
| [temp](./utils/help/md/help-temp.md)           | Cambia el valor de la temperatura de la luz de la bombilla                       |
| [get](./utils/help/md/help-get.md)             | Solicita los valores de las propiedades de la bombilla                           |
| [startflow](./utils/help/md/help-startflow.md) | Inicia el modo de color flow                                                     |
| [stopflow](./utils/help/md/help-stopflow.md)   | Detiene el modo de color flow                                                    |
| [cronadd](./utils/help/md/help-cronadd.md)     | Inicia un timer para apagar la bombilla                                          |
| [cronget](./utils/help/md/help-cronget.md)     | Recupera el valor del timer actual                                               |
| [crondel](./utils/help/md/help-crondel.md)     | Elimina el timer actual                                                          |
| [adjust](./utils/help/md/help-adjust.md)       | Ajusta brillo, temperatura o color sin saber el valor actual                     |
| [name](./utils/help/md/help-name.md)           | Cambia el nombre local de la bombilla                                            |
| [help](./utils/help/md/help-help.md)           | Muestra la ayuda del programa                                                    |
| [cls](./utils/help/md/help-cls.md)             | Limpia el contenido de la pantalla                                               |
| [consoling](./utils/help/md/help-consoling.md) | Controla la habilitación de los mensajes a mostrar en la linea de comandos       |

## Pendiente implementar

- [ ] Permitir introducir los valores para el modo color flow.
- [ ] Implementar el comando de `set_scene`.
- [X] Matchear los parámetros solicitados en la función `get` con los valores devueltos por la bombilla.
- [ ] Fichero de configuración.
- [ ] Documentar las nuevas funciones `cls` y `consoling`.