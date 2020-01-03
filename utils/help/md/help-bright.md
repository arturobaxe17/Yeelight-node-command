### NOMBRE
    bright


### SINTAXIS
```shell    
npm run yeelight bright [brillo] <{sudden | smooth}> <duration>
```

### DESCRIPCION
Cambia el valor del brillo de la bombilla. 

### PARAMETROS    
1. Brillo: Rango de valores permitido para el brillo `[0 - 100]`
2. Efecto: Tipo de cambio de brillo.
    - `sudden`: Cambia el color de la luz de inmediato
    - `smooth`: Cambia el color de la luz con un intervalo definido con el parametro de duración
3. Duración: El parámetro de duración solo se tendrá en cuenta con el efecto `smooth`. El valor introducido estará en segundos.


### EJEMPLO COMANDO
Cambio inmediato de de brillo al 10%:
```shell
npm run yeelight bright 10
npm run yeelight bright 10 sudden
``` 
Cambio de brillo al 20% con un intervalo de 5 segundos:
```shell
npm run yeelight bright smooth 5
```

### EJEMPLO PETICION ENVIADA
```javascript
{
    id: 0, 
    method: 'set_bright', 
    params: [ 20, 'smooth', 5000 ] 
}
```

### EJEMPLO RESPUESTA
```javascript
{
    id: 0, 
    result: [ 'ok' ] 
}
```
    