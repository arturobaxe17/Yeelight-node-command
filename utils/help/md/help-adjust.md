### NOMBRE
    adjust


### SINTAXIS
```shell
npm run yeelight adjust {increase | decrease | circle} {bright | ct | color}
```

###  DESCRIPCION
Permite cambiar el brillo, CT o el color de la bombilla si saber el valor actual.


###  PARAMETROS
1. Acción:
    - `increase`: incrementa la propiedad especificada
    - `decrease`: decrementa la propiedad especificada
    - `circle`:   incrementa la propiedad especificada, después de llegar al valor máximo, vuelve al valor mínimo.
    
2. Propiedad:
    - `bright`: ajusta el brillo
    - `ct`:     ajusta la temperatura del color
    - `color`:  ajusta el color (para esta propiedad solo se permite la acción 'circle')


###  EJEMPLO COMANDO
Incrementar el brillo:
```shell
npm run yeelight adjust increase bright
```

###  EJEMPLO PETICION ENVIADA
```javascript
{ 
    id: 0, 
    method: 'set_adjust', 
    params: [ 'increase', 'bright' ] 
}
```

###  EJEMPLO RESPUESTA
```javascript
{
    id: 0, 
    result: [ 'ok' ] 
}