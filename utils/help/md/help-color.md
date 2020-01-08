### NOMBRE
    color


### SINTAXIS
```shell
Yeelight><color> {red | green | blue | white | orange | yellow}
```

### DESCRIPCION
Cambia el color de la luz a uno de los predefinidos en la siguiente lista:
- `red`
- `green`
- `blue`
- `white`
- `orange`
- `yellow`

Este comando se puede utilizar sin necesidad de escribir `color`, poniendo directamente el nombre del color al cual se quiere cambiar la bombilla.


### PARAMETROS
1. **Color**: color al cual se quiere cambiar. Solo se permiten los valores especificados en la lista.


### EJEMPLO COMANDO
Cambio de color a naranja:
```shell
Yeelight>color orange
Yeelight>orange
```

### EJEMPLO PETICION ENVIADA
```javascript
{
    id: 0, 
    method: 'set_rgb', 
    params: [ 16744192 ] 
}
```


### EJEMPLO RESPUESTA
```javascript
{
    id: 0, 
    result: [ 'ok' ] 
}
```
    
    