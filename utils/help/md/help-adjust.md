### NOMBRE
    adjust


### SINTAXIS
```shell
Yeelight>adjust {increase | decrease | circle} {bright | ct | color}
```

###  DESCRIPCION
Permite cambiar el brillo, CT o el color de la bombilla si saber el valor actual.


###  PARAMETROS
1. **Acción**:
    - `increase`: incrementa la propiedad especificada
    - `decrease`: decrementa la propiedad especificada
    - `circle`:   incrementa la propiedad especificada, después de llegar al valor máximo, vuelve al valor mínimo.
    
2. **Propiedad**:
    - `bright`: ajusta el brillo
    - `ct`:     ajusta la temperatura del color
    - `color`:  ajusta el color (para esta propiedad solo se permite la acción 'circle')

3. **Porcentaje**: opcional. Rango `[0 - 100]`

4. **Duración**: opcional, solo es obligatoria si hay porcentaje. Valor en segundos.

###  EJEMPLO COMANDO
Incrementar el brillo:
```shell
Yeelight>adjust increase bright
```

Decrementar el brillo un 10 en 5 segundos:
```shell
Yeelight>adjust decrease bright 10 5
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