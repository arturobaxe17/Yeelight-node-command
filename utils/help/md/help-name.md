### NOMBRE
    name

### SINTAXIS
```shell    
Yeelight>name [nombre]
```

### DESCRIPCION
Cambia el nombre local de la bombilla.


### PARAMETROS
1. **Nombre**: nuevo valor del nombre de la bombilla.

### EJEMPLO COMANDO
Cambia el nombre de la bombila a 'bombilla-escritorio':
```shell
Yeelight>name bombilla-escritorio
```

### EJEMPLO PETICION ENVIADA
```javascript
{ 
    id: 0, 
    method: 'set_name', 
    params: [ 'bombilla-escritorio' ] 
}
```


### EJEMPLO RESPUESTA
```javascript
{ 
    id: 0, 
    result: [ 'ok' ] 
}
```