//Cantidad de cuadras Radio
const cantidadKm = 4;
//Leer objetos html

let envioPrecio = -3;
let envioBackPrecio = -3;

const resultado_Envio_Contenedor = document.querySelector(".contenedor_Resultado_Envio");
const resultado_Datos_Adicionales = document.querySelector(".contenedor_Datos_Adicionales");
const resultado_Envio = document.querySelector(".resultado_Envio");
const resultado_Tiempo = document.querySelector(".tiempo_Resultado");
const resultado_Error = document.querySelector(".contenedor_Resultado_Error");
const mapaResultadosMultiples = document.querySelector(".mapa_Resultados_Multiples");
const mapaResultadosMultiplesDescr = document.querySelector(".mapa_Resultados_Multiples_Items_Descr");
const errorCantCuadras = document.querySelector(".contenedor_Resultado_Error");

const tituloCalculadora = document.querySelector(".Titulo_Envios");
const tituloCalculadoraCheck = document.querySelector(".titulo_Check");

const checkABuscar = document.getElementById("check_A_B");
const seccionMapa = document.querySelector(".seccion_Mapa");

const radioDPTO = document.getElementById("esDPTO");
const textoDPTO = document.getElementById("detallesDPTO")
const radioCasa = document.getElementById("esCasa");
const radioPI = document.getElementById("puntoIntermedio");

let direccionParaMandar = "";

let textoAMandarCat = "";

let paraEnviarWhatsapp = 0;

textoDPTO.addEventListener("change", ValidarTodo());

function ValidarTodo(){
    if(paraEnviarWhatsapp == 1){
    const spanNumero1 = document.getElementById("alerta1");
    const spanNumero2 = document.getElementById("alerta2");
    const spanNumero3 = document.getElementById("alerta3");
    
    const datosDPTO = document.getElementById("detallesDPTO"); 

    const validarCasa = document.getElementById("esCasa");
    const validarDPTO = document.getElementById("esDPTO");
    const validarPI = document.getElementById("puntoIntermedio");

    const irABuscarDomicilio = document.getElementById("check_A_B");

    if(validarCasa.checked || validarDPTO.checked || validarPI.checked||checkABuscar.checked){
        spanNumero1.style.display = "none";
        spanNumero2.style.display = "none";
        spanNumero3.style.display = "none";
        if(validarDPTO.checked && datosDPTO.value===""){
            validarDPTO.scrollIntoView({ block: "center", behavior: "smooth" })
            spanNumero3.style.display = "block"
        }else if(validarDPTO.checked && datosDPTO.value!==""){
            textoAMandarCat = " A mi departamento "+datosDPTO.value;
        }
        if(validarCasa.checked){
            textoAMandarCat = " A mi casa";
        }
        if(validarPI.checked){
            textoAMandarCat = " A un punto intermedio";
        }
        if(checkABuscar.checked){
            textoAMandarCat="";
        }
    }else{
        validarCasa.scrollIntoView({ block: "center", behavior: "smooth" })
        spanNumero2.style.display = "block";
    }
    if(direccionParaMandar == ""){
        irABuscarDomicilio.scrollIntoView({ block: "center", behavior: "smooth" })
        spanNumero1.style.display = "block"
        
    }else if(direccionParaMandar == "A retirar a domicilio del vendedor"){
        spanNumero1.style.display = "none";
        spanNumero2.style.display = "none";
        spanNumero3.style.display = "none";
    }
    }
}

radioDPTO.addEventListener("change",function(){
    if(this.checked){
        textoDPTO.style.display="inline-block";
    }
    ValidarTodo();
})
radioCasa.addEventListener("change",function(){
    if(this.checked){
        textoDPTO.style.display="none"
    }
    ValidarTodo();
})
radioPI.addEventListener("change",function(){
    if(this.checked){
        textoDPTO.style.display="none"
    }
    ValidarTodo();
})
resultado_Envio_Contenedor.style.display="none"

checkABuscar.addEventListener("change",function(){
    if(this.checked==true){
        seccionMapa.style.display="none";
        resultado_Envio_Contenedor.style.display="none"
        tituloCalculadora.style.background = "green";
        tituloCalculadoraCheck.style.display = "inline-block";
        envioPrecio = -2;
        AniadirActualizarResTot()
        direccionParaMandar = "A retirar a domicilio del vendedor"
        ValidarTodo();
    }else{
        direccionParaMandar = ""
        seccionMapa.style.display="block";
        if(resultado_Envio_Contenedor.innerHTML===""){
            tituloCalculadora.style.background = "transparent";
            tituloCalculadoraCheck.style.display = "none";
            ValidarTodo();
        }else{
            tituloCalculadora.style.background = "green";
            tituloCalculadoraCheck.style.display = "inline-block";
            resultado_Envio_Contenedor.style.display="block";
            envioPrecio = envioBackPrecio;
            AniadirActualizarResTot()
            ValidarTodo();
        }
    }})

//Funciones Calculadora

let DireccionRecibida = "";

const calcularDistanciaEntreDosCoordenadas = (lat1, lon1, lat2, lon2) => {
    // Convertir todas las coordenadas a radianes
    lat1 = gradosARadianes(lat1);
    lon1 = gradosARadianes(lon1);
    lat2 = gradosARadianes(lat2);
    lon2 = gradosARadianes(lon2);
    // Aplicar fórmula
    const RADIO_TIERRA_EN_KILOMETROS = 6371;
    let diferenciaEntreLongitudes = (lon2 - lon1);
    let diferenciaEntreLatitudes = (lat2 - lat1);
    let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIO_TIERRA_EN_KILOMETROS * c;
};


const gradosARadianes = (grados) => {
    return grados * Math.PI / 180;
};

function corregirNegativo(numero){
    if (Math.sign(numero)===-1){
        numero = numero * -1;
    }
    return numero;
}

function ObtenerGrados(lat1,lon1,lat2,lon2){
    lat1 = gradosARadianes(lat1);
    lon1 = gradosARadianes(lon1);
    lat2 = gradosARadianes(lat2);
    lon2 = gradosARadianes(lon2);
    let diferenciaEntreLongitudes = (lon2 - lon1);
    let diferenciaEntreLatitudes = (lat2 - lat1);
    let tangente = diferenciaEntreLongitudes/diferenciaEntreLatitudes;
    let angulo = Math.atan(tangente);
    let angulo2 = Math.atan2(diferenciaEntreLongitudes,diferenciaEntreLatitudes)
    return angulo2;
}

function sexo(lat1,lon1,lat2,lon2){
    lat1 = gradosARadianes(lat1);
    lon1 = gradosARadianes(lon1);
    lat2 = gradosARadianes(lat2);
    lon2 = gradosARadianes(lon2);
    let diferenciaEntreLongitudes = (lon2 - lon1);
    let diferenciaEntreLatitudes = (lat2 - lat1);
    console.log(diferenciaEntreLatitudes)
    console.log(diferenciaEntreLatitudes+diferenciaEntreLongitudes);
}

function potente(hip){
    
    /*
    
    const catetoOpuesto = Math.sqrt((Math.pow(hip,2))/2)
    const catetoOpuest2 = hip/Math.sqrt(2);
    console.log(catetoOpuest2)
    console.log(catetoOpuesto)
    const angulo = Math.sin(hip/catetoOpuesto)
    const angulo32 = Math.acos(catetoOpuesto/hip)
    console.log(angulo);
    console.log(angulo32)
    const angulo2 = (angulo *180)/Math.PI
    console.log(angulo2)
    const catetoAdyacente =Math.sqrt(Math.pow(hip,2)-Math.pow(catetoOpuesto,2))
    console.log(catetoAdyacente)
    console.log("tot "+(catetoAdyacente+catetoOpuesto))*/
}


function DevolverRecorrido(angulo,hip){
    console.log()
    AnguloGrados = angulo * 180/Math.PI
    if(AnguloGrados<0){AnguloGrados=AnguloGrados+360}
    anguloX = AnguloGrados*Math.PI/180
    console.log("Angulo Grados"+AnguloGrados)
    //if(AnguloGrados<0){positivox=-1}else{positivox=1;}
/*
    console.log("verver "+AnguloGrados)
    console.log("Angulo "+anguloX)
    console.log("tot "+ hip)
    Base = Math.sin(anguloX)* hip;
    console.log("base "+ Base)
    Base = corregirNegativo(Base)
    Altura = Math.cos(anguloX) * hip;
    console.log("altura "+ Altura)
    Altura = corregirNegativo(Altura)
    console.log(Base)
    console.log("pasa")
*/
    let anguloS = 0
    if(AnguloGrados<90){
        anguloS = AnguloGrados
    }else if(AnguloGrados<180){
        anguloS = AnguloGrados-90
    }else if(AnguloGrados<270){
        anguloS = AnguloGrados-180
    }else if(AnguloGrados<360){
        anguloS = AnguloGrados-270
    }
    console.log("hipotenusa "+hip)
    console.log("angulo "+anguloS)
    anguloS = anguloS*Math.PI/180
    console.log("Radianes "+anguloS)
    Base = Math.sin(anguloS)*hip
    Altura = Math.cos(anguloS)*hip

    console.log(Base)
    console.log(Altura)
    Recorrido = Base+Altura
    //if(AnguloGrados)
    /*if (((Base>1)&&(Altura>1))||((Base<1)&&(Altura<1))){
        Base = Base * -1
    }*/
    /*console.log("TanAlt "+(Altura*Math.tan(angulo)))
    console.log("TanBase "+(Base*Math.tan(angulo)))
    console.log("TanAlt2 "+(Altura*Math.tan(AnguloGrados)))
    console.log("TanBase2 "+(Base*Math.tan(AnguloGrados)))*/
    Recorrido = corregirNegativo(Recorrido);
    console.log("consigo "+ Recorrido)
    Recorrido = Math.round((Recorrido)*10)/10;
    console.log("Res :"+Recorrido)
    return Recorrido;
}

//Funciones Mapa

const proveedorMapa = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

const LocalizacionBase = [-32.944296,-60.665489];

var mapa = L.map('map').setView(LocalizacionBase, 10.5);

L.tileLayer(proveedorMapa, {maxZoom: 18}).addTo(mapa)

var circulo = L.circle(LocalizacionBase, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: cantidadKm * 1000
}).bindPopup("Radio Máximo").addTo(mapa);

var circulo2 = L.circle(LocalizacionBase, {
    color: 'Blue',
    fillColor: '#03f',
    fillOpacity: 0.5,
    radius: Math.trunc(Math.cos((45 * Math.PI) / 180)*cantidadKm*1000)
}).addTo(mapa);



//Ver y probar diferentes latitudes y longitudes
//mapa.addEventListener('click', function(e){sexo(LocalizacionBase[0],LocalizacionBase[1],e.latlng.lat,e.latlng.lng); potente(calcularDistanciaEntreDosCoordenadas(LocalizacionBase[0],LocalizacionBase[1],e.latlng.lat,e.latlng.lng)); console.log("Grados "+ObtenerGrados(LocalizacionBase[0],LocalizacionBase[1],e.latlng.lat,e.latlng.lng)*180/Math.PI+" Recorrido "+DevolverRecorrido(ObtenerGrados(LocalizacionBase[0],LocalizacionBase[1],e.latlng.lat,e.latlng.lng),calcularDistanciaEntreDosCoordenadas(LocalizacionBase[0],LocalizacionBase[1],e.latlng.lat,e.latlng.lng)))});



let inconoCruz = L.icon({
    iconUrl: "Data/cruz transparente.png",
    iconSize: [20,20],
    shadowSize: [20, 20],
    shadowUrl: "Data/cruz transparente sombra.png",
});

let marcador = new L.marker(LocalizacionBase, {icon: inconoCruz});

let polilinea = new L.polyline([LocalizacionBase, LocalizacionBase], {color:'red', weight:3});

//Obtener posicion actual

function ActivarUbicacionActual(){
    mapaResultadosMultiples.style.display = "none";
    mapaResultadosMultiplesDescr.style.display = "none";
    var success = function(position){
            mapa.removeLayer(marcador);
            mapa.removeLayer(polilinea);
        let latitud = position.coords.latitude,
            longitud = position.coords.longitude;
            //marcador = L.marker([-32.95, -60.7], {icon: inconoCruz}).addTo(mapa);
            polilinea = L.polyline([LocalizacionBase, [latitud, longitud]], {color:'red', weight:3}).addTo(mapa);
            marcador = L.marker([latitud, longitud], {icon: inconoCruz}).addTo(mapa);
            mapa.fitBounds([[latitud, longitud],LocalizacionBase],{ animate: true, duration: 2.5 });
            calcularIgualDireccion(latitud,longitud);
            devolverCantidadCuadras(LocalizacionBase,[latitud,longitud]);
            tituloCalculadora.style.background = "green";
            tituloCalculadoraCheck.style.display = "inline-block";
            AniadirActualizarResTot()
        }
    navigator.geolocation.getCurrentPosition(success, function(msg){
        console.error( msg );
        resultado_Envio.innerText = 0+'$';
        resultado_Tiempo.innerText = 0;
        mapa.removeLayer(marcador);
        mapa.removeLayer(polilinea);
        mapa.setView(LocalizacionBase, 10.5,{ animate: true, duration: 2.5 });
        },{enableHighAccuracy: true});
        radioPI.checked = true;
        ValidarTodo();
    }

//Obtener Direccion


function buscarPorDireccion(direccion){
    let objetoDireccion = {};
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener('readystatechange', function () {
        if ((this.readyState === this.DONE)&&(cajaTexto.value.trim()!=='')) {
            let valor = this.responseText;
            objetoDireccion = JSON.parse(valor);
        }
    });
    
    xhr.open('GET', 'https://trueway-geocoding.p.rapidapi.com/Geocode?address='+direccion+'%2C%20Rosario%2C%20Santa%20Fe%2C%20Argentina&language=en', false);
    xhr.setRequestHeader('X-RapidAPI-Key', 'c7e365b2b1msh75378eeefc4f69fp142d21jsn2b5b690b3577');
    xhr.setRequestHeader('X-RapidAPI-Host', 'trueway-geocoding.p.rapidapi.com');
    
    xhr.send(data);
    
    mapa.removeLayer(marcador);
    mapa.removeLayer(polilinea);
    mapaResultadosMultiples.style.display = "none";
    mapaResultadosMultiplesDescr.style.display = "none";
    while (mapaResultadosMultiples.firstChild) {
        mapaResultadosMultiples.removeChild(mapaResultadosMultiples.lastChild);
      }
    valorResMultipleDir = [];
    const tieneLetrasNumeros = verificarSiTieneTextoYNumeros(cajaTexto.value);
    if ((objetoDireccion.results===undefined)){
        mapa.removeLayer(marcador);
        mapa.removeLayer(polilinea);
        mapa.setView(LocalizacionBase, 10.5,{ animate: true, duration: 2.5 });
        window.alert('No esta funcionando el servicio de direcciones no se podran mostrar resultados');
        ValidarTodo();
    }else if((objetoDireccion.results.length==1)&&(objetoDireccion.results[0].street!==undefined)&&(objetoDireccion.results[0].house!==undefined)){
        direccionParaMandar = objetoDireccion.results[0].street+" "+objetoDireccion.results[0].house;
        let posicion =[ objetoDireccion.results[0].location.lat, objetoDireccion.results[0].location.lng];
        polilinea = L.polyline([LocalizacionBase, posicion], {color:'red', weight:3}).addTo(mapa);
        marcador = L.marker(posicion, {icon: inconoCruz}).addTo(mapa);
        mapa.fitBounds([posicion,LocalizacionBase],{ animate: true, duration: 2.5 });
        DireccionRecibida = objetoDireccion.results[0].street + " " + objetoDireccion.results[0].house;
        devolverCantidadCuadras(LocalizacionBase,posicion);
        tituloCalculadora.style.background = "green";
        tituloCalculadoraCheck.style.display = "inline-block";
        AniadirActualizarResTot()
        ValidarTodo();
    }else if ((objetoDireccion.results.length>1)&&(tieneLetrasNumeros[0]===true)){
        direccionParaMandar = objetoDireccion.results[0].street+" "+objetoDireccion.results[0].house;
        mapaResultadosMultiples.style.display = "block";
        mapaResultadosMultiplesDescr.style.display = "block";
        mapaResultadosMultiplesDescr.innerHTML = `Su Busqueda Tiro Varios Resultados`;
        for(i=0;i<objetoDireccion.results.length;i++){
            let variableAltura = ''
            if(objetoDireccion.results[i].house===undefined){
                 variableAltura = '';
            }else{
                variableAltura = objetoDireccion.results[i].house;
            }
            let elAddon = elNew("div", {
                className: "mapa_Resultados_Multiples_Items",
                textContent: `${objetoDireccion.results[i].street} ${variableAltura}`,
              });
            mapaResultadosMultiples.append(elAddon);
            valorResMultipleDir[i] = [objetoDireccion.results[i].location.lat, objetoDireccion.results[i].location.lng];
        }
        const mapaResultadosMultiples2 = mapaResultadosMultiples.getElementsByTagName("*");
        for(n=0;n<mapaResultadosMultiples2.length;n++){
            mapaResultadosMultiples2[n].addEventListener('click',function(){
                direccionParaMandar = objetoDireccion.results[n].street+" "+objetoDireccion.results[n].house;
                mapa.removeLayer(marcador);
                mapa.removeLayer(polilinea);
                let indice = Array.from(this.parentElement.children).indexOf(this);
                let direccion = valorResMultipleDir[indice];
                polilinea = L.polyline([LocalizacionBase, direccion], {color:'red', weight:3}).addTo(mapa);
                marcador = L.marker(direccion, {icon: inconoCruz}).addTo(mapa);
                mapa.fitBounds([direccion,LocalizacionBase],{ animate: true, duration: 2.5 });
                DireccionRecibida = this.textContent;
                devolverCantidadCuadras(LocalizacionBase,direccion);
                tituloCalculadora.style.background = "green";
                tituloCalculadoraCheck.style.display = "inline-block";
                AniadirActualizarResTot()
                ValidarTodo();
            });
        };
           
        
    }else if ((tieneLetrasNumeros[0]===true)&&(tieneLetrasNumeros[1]===true)){
        mapa.removeLayer(marcador);
        mapa.removeLayer(polilinea);
        mapa.setView(LocalizacionBase, 10.5,{ animate: true, duration: 2.5 });
        window.alert(`Error de Localizacion, no se ha encontrado la direccion
Intenta con abreviaciones P/Ej: "Buenos Aires" por "Bs Aires" o "Bs As"`);
    ValidarTodo();
    }else if((objetoDireccion.results[0].street===undefined)||((tieneLetrasNumeros[0]===false)&&(tieneLetrasNumeros[1]===true))){
        mapa.removeLayer(marcador);
        mapa.removeLayer(polilinea);
        mapa.setView(LocalizacionBase, 10.5,{ animate: true, duration: 2.5 });
        alert(`Debe especificar Calle`);
        direccionParaMandar = "";
        ValidarTodo();
    }
    else if((objetoDireccion.results[0].house===undefined)||((tieneLetrasNumeros[0]===true)&&(tieneLetrasNumeros[1]===false))){
        mapa.removeLayer(marcador);
        mapa.removeLayer(polilinea);
        mapa.setView(LocalizacionBase, 10.5,{ animate: true, duration: 2.5 });
        window.alert(`Debe especificar Altura`);
        direccionParaMandar = "";
        ValidarTodo();
    }
    else{
        window.alert(`Error Desconocido`);
        ValidarTodo();
    }
}
const cajaTexto = document.querySelector(".texto_Direccion");
checkEnvio = document.querySelector("#check_Dir")
checkEnvio.addEventListener("change",function(){
    if (this.checked){
        cajaTexto.style.display = "none";
        cajaTexto.value = "";
        ValidarTodo();
    }else{
        cajaTexto.style.display = "inline-block";
        ValidarTodo();
    }
});

function verificarSiTieneTextoYNumeros(cadena){
    const letrasDiccionario="abcdefghyjklmnñopqrstuvwxyz";
    const numerosDiccionario="0123456789";
    let verifLetras = false;
    let verifNumeros = false;
    for(i=0; i<cadena.length; i++){
        if (numerosDiccionario.indexOf(cadena.charAt(i),0)!=-1){
           verifNumeros = true;
           break;
        }
     }
    for(i=0; i<cadena.length; i++){
        if (letrasDiccionario.indexOf(cadena.charAt(i),0)!=-1){
           verifLetras = true;
           break;
        }
     }
    return [verifLetras,verifNumeros];
}

const Calcular_Envio = function(){
    if (checkEnvio.checked){
        ActivarUbicacionActual();
        window.alert('Nota: La ubicacion puede no ser precisa, en tal caso desactive la casilla ☐Utilizar direccion actual y escriba la direccion manualmente');
        ValidarTodo();
    }else if(cajaTexto.value.trim()!==''){
        buscarPorDireccion(cajaTexto.value);
        ValidarTodo();
    }
}

function devolverCantidadCuadras(loc1,loc2){
    console.log(calcularDistanciaEntreDosCoordenadas(loc1[0],loc1[1],loc2[0],loc2[1]));
    console.log(ObtenerGrados(loc1[0],loc1[1],loc2[0],loc2[1]))
    const cantidadKmADevolver = DevolverRecorrido(ObtenerGrados(loc1[0],loc1[1],loc2[0],loc2[1]),calcularDistanciaEntreDosCoordenadas(loc1[0],loc1[1],loc2[0],loc2[1]));
    if(cantidadKmADevolver<=cantidadKm){
        envioPrecio = Math.round(1.2*dolar_blue*cantidadKmADevolver/cantidadKm);
        envioBackPrecio = envioPrecio;
        resultado_Envio_Contenedor.style.display = "block";
        resultado_Envio_Contenedor.innerHTML = `Direccion de envio ${DireccionRecibida} || Kilometros ${cantidadKmADevolver} || Tiempo estimado ${convertirHoras(22*cantidadKmADevolver)} || Costo de envio ${Math.round(1.2*dolar_blue*cantidadKmADevolver/cantidadKm)} $`
        /*resultado_Envio_Contenedor.style.display = "block";
        resultado_Error.style.display = "none";
        resultado_Envio.innerText = Math.round(1.2*dolar_blue*cantidadKmADevolver/cantidadKm)+"$";
        resultado_Tiempo.innerText = convertirHoras(2.2*cantidadKmADevolver);*/
        AniadirActualizarResTot()
    }else{
        envioPrecio = -1;
        envioBackPrecio = envioPrecio;
        resultado_Envio_Contenedor.style.display = "block";
        resultado_Envio_Contenedor.innerHTML = `Su Direccion de envio ${DireccionRecibida} || Supera los ${cantidadKm} km || No se puede hacer el envio`
        /*resultado_Envio_Contenedor.style.display = "none";
        resultado_Error.style.display = "block";*/
        AniadirActualizarResTot()
    }
}

cajaTexto.addEventListener("keypress", function(event){
    if ((event.keyCode === 13)&&(this.value.trim()!=='')) {
        buscarPorDireccion(this.value);
        ValidarTodo();
    }});
document.querySelector(".boton_Ubi").addEventListener("click", Calcular_Envio);


function convertirHoras(tiempo){
    if (tiempo > 60){
        tiempo = Math.round(tiempo);
        let horas = Math.floor(tiempo/60)
        let resto_Minutos = tiempo - horas *60
        tiempo = horas + "Hs "+resto_Minutos + "Min"
    }else{
        tiempo = Math.round(tiempo);
        tiempo = tiempo + "Min"
    }
    return tiempo;
}

function calcularIgualDireccion (localizacionX, localizacionY){
    let objetoDireccionIgual = {};
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            let valor = this.responseText;
            objetoDireccionIgual = JSON.parse(valor);
            console.log(objetoDireccionIgual)
        }
    });
    
    xhr.open('GET', 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location='+localizacionX+'%2C'+localizacionY+'&language=en',false);
    xhr.setRequestHeader('X-RapidAPI-Key', 'c7e365b2b1msh75378eeefc4f69fp142d21jsn2b5b690b3577');
    xhr.setRequestHeader('X-RapidAPI-Host', 'trueway-geocoding.p.rapidapi.com');

    xhr.send(data);

    if(objetoDireccionIgual.results.length==1){
        direccionParaMandar = objetoDireccionIgual.results[0].street+" "+objetoDireccionIgual.results[0].house;
        mapaResultadosMultiples.style.display = "block";
        mapaResultadosMultiplesDescr.style.display = "block";
        mapaResultadosMultiplesDescr.innerHTML = `La Ubicacion recibida desde el Navegador es:`
        let variableAltura = ''
            if(objetoDireccionIgual.results[i].house===undefined){
                 variableAltura = '';
            }else{
                variableAltura = objetoDireccionIgual.results[i].house;
            }
            let elAddon = elNew("div", {
                className: "mapa_Resultados_Multiples_Items",
                textContent: `${objetoDireccionIgual.results[i].street} ${variableAltura}`,
              });
            elAddon.addEventListener('click',function(){
                mapa.removeLayer(marcador);
                mapa.removeLayer(polilinea);
                let indice = Array.from(this.parentElement.children).indexOf(this);
                let direccion = valorResMultipleDir[indice];
                polilinea = L.polyline([LocalizacionBase, direccion], {color:'red', weight:3}).addTo(mapa);
                marcador = L.marker(direccion, {icon: inconoCruz}).addTo(mapa);
                mapa.fitBounds([direccion,LocalizacionBase],{ animate: true, duration: 2.5 });
                DireccionRecibida = this.textContent;
                devolverCantidadCuadras(LocalizacionBase,direccion);
                ValidarTodo();
                
            });
            mapaResultadosMultiples.append(elAddon);
            valorResMultipleDir[i] = [objetoDireccionIgual.results[i].location.lat, objetoDireccionIgual.results[i].location.lng];
    }else if(objetoDireccionIgual.results.length>1){
        direccionParaMandar = objetoDireccion.results[0].street+" "+objetoDireccion.results[0].house;
        mapaResultadosMultiples.style.display = "block";
        mapaResultadosMultiplesDescr.style.display = "block";
        mapaResultadosMultiplesDescr.innerHTML = `La Ubicacion recibida desde el Navegador Tiro Varios Resultados`
        for(i=0;i<objetoDireccionIgual.results.length;i++){
            let variableAltura = ''
            if(objetoDireccionIgual.results[i].house===undefined){
                 variableAltura = '';
            }else{
                variableAltura = objetoDireccionIgual.results[i].house;
            }
            let elAddon = elNew("div", {
                className: "mapa_Resultados_Multiples_Items",
                textContent: `${objetoDireccionIgual.results[i].street} ${variableAltura}`,
              });
            mapaResultadosMultiples.append(elAddon);
            valorResMultipleDir[i] = [objetoDireccionIgual.results[i].location.lat, objetoDireccionIgual.results[i].location.lng];
            ValidarTodo();
        }
        const mapaResultadosMultiples2 = mapaResultadosMultiples.getElementsByTagName("*");
        for(n=0;n<mapaResultadosMultiples2.length;n++){
            mapaResultadosMultiples2[n].addEventListener('click',function(){
                direccionParaMandar = objetoDireccionIgual.results[n].street+" "+objetoDireccionIgual.results[n].house;
                mapa.removeLayer(marcador);
                mapa.removeLayer(polilinea);
                let indice = Array.from(this.parentElement.children).indexOf(this);
                let direccion = valorResMultipleDir[indice];
                polilinea = L.polyline([LocalizacionBase, direccion], {color:'red', weight:3}).addTo(mapa);
                marcador = L.marker(direccion, {icon: inconoCruz}).addTo(mapa);
                mapa.fitBounds([direccion,LocalizacionBase],{ animate: true, duration: 2.5 });
                DireccionRecibida = this.textContent;
                devolverCantidadCuadras(LocalizacionBase,direccion);
                ValidarTodo();
            });
        }
}
}

const porsiacaso = 550;