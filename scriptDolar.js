function cargarValorDolar(){
    let objeto = {};
    let respuesta = false;
    const http = new XMLHttpRequest();
    const url = 'https://api.bluelytics.com.ar/v2/latest';
    http.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            document.getElementsByClassName(".contenedor_Precios_Detalles").innerHTML += "hola" + this.responseText;
            let valor = this.responseText;
            objeto = JSON.parse(valor);
        }

    }
    http.open("GET", url, false);
    http.send();
    if (objeto.length === 0){
        return undefined;
    } else {
        return objeto;
    }
}

objetoDolar = cargarValorDolar();
dolar_blue = objetoDolar.blue.value_avg;

console.log(dolar_blue);
