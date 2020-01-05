### NOMBRE
    rgb

### SINTAXIS
```shell
npm run yeelight rgb [red value] [green value] [blue value] <{sudden | smooth}> <duration>
```

### DESCRIPCION
Cambia el color de la luz en función del valor RGB introducido.

### PARAMETROS
1. **Red value** `[0 - 255]`

2. **Green value** `[0 - 255]`

3. **Blue value** `[0 - 255]`

4. **Efecto**: Tipo de cambio de brillo.
    - `sudden`: Cambia el color de la luz de inmediato
    - `smooth`: Cambia el color de la luz con un intervalo definido con el parametro de duración

5. **Duració**n: El parámetro de duración solo se tendrá en cuenta con el efecto `smooth` y el valor introducido estará en segundos.

### EJEMPLO
Cambio inmediato de color a azul:
```shell
npm run yeelight rgb 0 0 255 
npm run yeelight rgb 0 0 255 sudden
```
    
Cambio de color a azul con un intervalo de 2 segundos:
```shell
npm run yeelight rgb 0 0 255 smooth 2
```

### EJEMPLO PETICION ENVIADA
```javascript
{ 
    id: 0, 
    method: 'set_rgb', params: [ 66047 ] 
}
```


### EJEMPLO RESPUESTA
```javascript
{ 
    id: 0, 
    result: [ 'ok' ] 
}
```
    