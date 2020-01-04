### NOMBRE
    help


### SINTAXIS
```shell
npm run yeelight help [comando]
```


### DESCRIPCION
Muestra la ayuda del programa. Se puede mostrar ayuda general o ayuda por comando.


### PARAMETROS
1. **Comando**: nombre del comando del que se quiere obtener ayuda. Opcional. La lista de comandos para los que se puede solicitar ayuda se lista en la siguiente tabla:


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

