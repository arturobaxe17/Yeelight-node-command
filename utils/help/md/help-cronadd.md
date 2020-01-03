### NOMBRE
    cronadd


### SINTAXIS
```shell
npm run yeelight cronadd [tiempo]
```


### DESCRIPCION
Inicia un timer tras el cual se apagará la bombilla. 


### PARAMETROS
1. Tiempo: número de minutos tras el cual se debe apagar la bombilla.
    
### EJEMPLO
Apagar la bombilla después de una hora:
```shell
npm run yeelight cronadd 60
```

### EJEMPLO PETICION ENVIADA
```javascript
{
    id: 0, 
    method: 'cron_add', 
    params: [ 0, 60, 0 ] 
}
```

### EJEMPLO RESPUESTA
```javascript
{
    id: 0, 
    result: [ 'ok' ] 
}