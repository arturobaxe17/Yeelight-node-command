### NOMBRE
    temp


### SINTAXIS
```shell
npm run yeelight temp [temperatura] <{sudden | smooth}> <duration>
```


### DESCRIPCION
Cambia el color de la luz en función del valor de temperatura introducido.


### PARAMETROS
1. **Temperatura**: valor de la temperatura [1700 (Rojo) - 6500 (Azul)]
2. **Efecto**: Tipo de cambio de brillo.
    - `sudden`: Cambia el color de la luz de inmediato
    - `smooth`: Cambia el color de la luz con un intervalo definido con el parametro de duración

3. **Duración**: El parámetro de duración solo se tendrá en cuenta con el efecto `smooth` y el valor introducido estará en segundos.


### EJEMPLO COMANDO
Cambio inmediato de color a azul:
```shell
npm run yeelight temp 6500 
npm run yeelight temp 6500 sudden
```


Cambio de color a rojo con un intervalo de 8 segundos:
```shell
npm run yeelight temp 1700 smooth 8
```


### EJEMPLO PETICION ENVIADA
```javascript
{ 
    id: 0, 
    method: 'set_ct_abx', 
    params: [ 1700, 'smooth', 8000 ] 
}
```


### EJEMPLO RESPUESTA
```javascript
{ 
    id: 0, 
    result: [ 'ok' ] 
}