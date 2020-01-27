# Yeelight-node-command

Aplicación creada en node.js, sin dependencias, para controlar mediante linea de comando bombillas **Yeelight**.

La documentación respecto a la comunicación con la bombilla se puede encontrar [aquí](https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf).

 ## ¿Cómo se utiliza?

En primer lugar, se debe activar la opción de [LAN Control](https://www.yeelight.com/faqs/lan_control) de la bombilla que se quiere controlar.

Los pasos a seguir son los siguientes:
1. Desde la consola nos situariemos en el directorio dónde se encuentre el programa.

2. Ejecutar uno de los siguientes comandos:
    ```shell
    prompt>npm start
    prompt>npm run yeelight
    ```

3. Automaticamente se buscará la bombilla conectada a la red LAN. Si se ha podido encontrar la bombilla aparecerá el mensaje: 

    ```shell
    Bombilla encontrada: 'nombre bombilla'
    Conexión: hhhh.hhh.h.hhh:ppppp
    ```
    *Donde `h` se corresponde con la IP de la bombilla y `p` el puerto.*

    Aparecerá el nuevo prompt: `Yeelight>`. Aquí introduciremos el comando que se quiere ejecutar. El formato del comando es:
    ```shell
    Yeelight><comando> [parametros]
    ```

    Se puede utilizar la función de autocompletar pulsado la tecla `Tab`. Al pulsarla dos veces se muestran todos los comandos implementados.

4. Una vez introducido el comando se mostrará la respuesta de la bombilla
    ```shell
    Yeelight>Bombilla => 'respuesta'
    ```
5. Para finalizar el programa se puede introducir el comando `close` o bien pulsar la combinación de teclas `ctrl+C`.

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
| [options](./utils/help/md/help-options.md)     | Muestra los parámetros de configuración                                          |
| [close](./utils/help/md/help-close.md)         | Finaliza la conexión con la bombilla y cierra el programa                        |

## Pendiente implementar

- [ ] Permitir introducir los valores para el modo color flow.
- [ ] Implementar el comando de `set_scene`.