### NOMBRE
    cronget
    

### SINTAXIS
```shell
Yeelight>cronget
```


### DESCRIPCION
Recupera el valor en minutos del timer actual.


### EJEMPLO PETICION ENVIADA
```javascript
{ 
    id: 0, 
    method: 'cron_get', 
    params: [ 0 ] 
}
```


### EJEMPLO RESPUESTA
```javascript
{
    id: 0, 
    result: [ { type: 0, delay: 60, mix: 0 } ] 
}
```
