### NOMBRE
    crondel


### SINTAXIS
```shell
Yeelight>crondel
```

### DESCRIPCION
Elimina el timer actual.


### EJEMPLO PETICION ENVIADA
```javascript
{ 
    id: 0, 
    method: 'cron_del', 
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