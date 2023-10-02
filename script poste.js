
async function hacerPeticion(){
    dato = await fetch('https://api.bluelytics.com.ar/v2/latest');
    dato = dato.json()
    return dato;
}
  
let variable = 0;

function cargar(){
    let objeto = {};
    let respuesta = false;
    const http = new XMLHttpRequest();
    const url = 'https://api.bluelytics.com.ar/v2/latest';
    http.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
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

objeto = cargar();
dolar_blue = objeto.blue.value_avg;