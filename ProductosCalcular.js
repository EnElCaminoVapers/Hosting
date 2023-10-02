let objetoPrecios = {}
function CargarPrecios() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            objetoPrecios = JSON.parse(res);
            console.log(objetoPrecios);
        }
    };
    xhttp.open("GET","datosPreciosYDelivery", false);
    xhttp.send();}
CargarPrecios();

const baseMlPrecios = objetoPrecios.PrecioLiquidoMl;
const baseMentPrecios = objetoPrecios.PrecioMent;
const baseNicoPrecios = objetoPrecios.PrecioNico;
const baseDCPrecios = objetoPrecios.DobleConcentrado;
const baseFrascoPrecio = Math.round(objetoPrecios.PrecioFrasco * dolar_blue * 0.2)/0.2;
console.log("jesus "+baseFrascoPrecio)

let arrayBaseMlIndex = []
let arrayBaseMlPrecios = []
let arrayBaseMentPrecios = []
let arrayBaseNicoPrecios = []
let arrayBaseDobleConcentrado = [];
let contadorSup = 0;
for(cantidad in baseMlPrecios){
    arrayBaseMlIndex[contadorSup]=parseInt(cantidad);
    arrayBaseMlPrecios[contadorSup]=Math.round(baseMlPrecios[cantidad]*dolar_blue*2)/2;
    arrayBaseMentPrecios[contadorSup]=Math.round(baseMentPrecios[cantidad]*dolar_blue*2)/2;
    arrayBaseNicoPrecios[contadorSup]=Math.round(baseNicoPrecios[cantidad]*dolar_blue*2)/2;
    arrayBaseDobleConcentrado[contadorSup]=Math.round(baseDCPrecios[cantidad]*dolar_blue*2)/2;
    //console.log(arrayBaseMlPrecios[contadorSup])
    contadorSup++;
}

contadorSup=0;

const cantidadEnvases = document.querySelector(".contenedor_Calculadora_Aniadir_Cantidad");
const envaseNuevo = document.querySelector(".contenedor_Calculadora_Aniadir_Envase");
const envaseViejoMl = document.querySelector(".contenedor_Calculadora_Aniadir_Ml");
const tiposSabores = document.querySelector(".saboresAniadidosTodo");

const botonAniadir = document.querySelector(".contenedor_Calculadora_Aniadir_Aniadir");

const contenedorProductosDetalles = document.querySelector(".contenedor_Precios_Detalles");

const detallesTotal = document.querySelector(".Contenedor_Total_Liq");

const calcular_Titulo = document.querySelector(".contenedor_Calculadora_Titulo");
const calcular_Titulo_Check = document.querySelector(".titulo_Check_Calc");

let arrayCantNico = [];
let arrayTipoNico = [];
let arrayCantMent = [];
let arrayTipoMent = [];
let arrayCantDC = [];
let arrayCant = [];
let arrayCantEnv = [];
let arrayHayFrasco = [];

let arrayTotal = [];
let arrayEnvTotal = [];
let arrayDesc = [];
let arrayTotalTodo = [];

let arraySabores = [];
let arrayEnvaseAdicional = []; 

let mlTotales = 0;
let mlNico = 0;
let mlMent = 0;
let mlDC = 0;
let indexPrecio = 0;
let indexMent = 0;
let indexNico = 0;
let indexDC = 0;

let contadorEtc = 0;

let stringSabores = "";

let cantidadTotalMl = 0;

botonAniadir.addEventListener("click",function(){
    //let cantidadMlMent = 0;
    //let cantidadMlNico = 0;
    let cantidadMl = 0
    let cantidadNiniosSabores = tiposSabores.childElementCount;
    let stringSabores = ``;
    if(cantidadEnvases.value>0){
        if(cantidadNiniosSabores !== 0){
            contadorEtc++;
            /*while (tiposSabores.firstChild) {
                tiposSabores.removeChild(tiposSabores.lastChild);
              }*/
            console.log(tiposSabores.children.item(0).children.item(2));
            arrayCantEnv[contadorEtc]=cantidadEnvases.value;
            if(envaseNuevo.checked){
                cantidadMl = 60
                arrayHayFrasco[contadorEtc]=true;
                arrayEnvaseAdicional[contadorEtc]="Con envase Adicional"
            }else{
                cantidadMl = envaseViejoMl.value;
                arrayHayFrasco[contadorEtc]=false;
                arrayEnvaseAdicional[contadorEtc]="Sin envase, el proveedor tiene uno o se lo envio a su domicilio"+"%0D%0A";
            }
            if(seleccionadoM!==0){
                arrayCantMent[contadorEtc] = cantidadMl;
                if(seleccionadoM===1){
                    arrayTipoMent[contadorEtc]=0.5;
                }else if(seleccionadoM===2){
                    arrayTipoMent[contadorEtc]=1;
                }else if(seleccionadoM===3){
                    arrayTipoMent[contadorEtc]=2;
                }else if(seleccionadoM===4){
                    arrayTipoMent[contadorEtc]=4;
                }
            }else{
                arrayCantMent[contadorEtc]=0;
                arrayTipoMent[contadorEtc]=0;
            }
            if(seleccionadoN!==0){
                arrayCantNico[contadorEtc] = cantidadMl;
                if(seleccionadoN===1){
                    arrayTipoNico[contadorEtc]=0.5;
                }else if(seleccionadoN===2){
                    arrayTipoNico[contadorEtc]=1;
                }else if(seleccionadoN===3){
                    arrayTipoNico[contadorEtc]=2;
                }
            }else{
                arrayTipoNico[contadorEtc]=0;
                arrayCantNico[contadorEtc]=0;
            }
            if(activoDC===true){
                arrayCantDC[contadorEtc]=cantidadMl;
            }else{arrayCantDC[contadorEtc]=0;

            }

            arrayCant[contadorEtc]=cantidadMl
            const agregado = elNew("div",{
                className: "detalles_Aniadidos"
            });
            contenedorProductosDetalles.append(agregado)
            const botonBorrar = elNew("button",{
                className: "boton_Aniadidos_Tot_Close",
                textContent: "X"
            })
            botonBorrar.addEventListener("click", function(){
                console.log(this.parentNode.parentNode);
                contadorEtc--;
                const indiceArrays = Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode)+1
                arrayCant.splice(indiceArrays,1);
                arrayCantEnv.splice(indiceArrays,1);
                arrayCantMent.splice(indiceArrays,1);
                arrayCantDC.splice(indiceArrays,1)
                arrayTipoMent.splice(indiceArrays,1);
                arrayCantNico.splice(indiceArrays,1);
                arrayTipoNico.splice(indiceArrays,1);
                arrayHayFrasco.splice(indiceArrays,1);

                arrayTotal.splice(indiceArrays,1);
                arrayEnvTotal.splice(indiceArrays,1);
                arrayDesc.splice(indiceArrays,1);
                arrayTotalTodo.splice(indiceArrays,1);

                arraySabores.splice(indiceArrays,1);

                if(this.parentNode.parentNode.childElementCount<=1){
                    calcular_Titulo.style.background = "transparent";
                    calcular_Titulo_Check.style.display = "none";
                }
                this.parentNode.remove();
                actualizarMinisSegunPrecio(contadorEtc)
                AniadirActualizarResTot()
            })
            agregado.append(botonBorrar);
            const agregadoEnv = elNew("div",{
                className: "detalles_Aniadidos_Env",
                textContent: "Cantidad: "+cantidadEnvases.value
            });
            agregado.append(agregadoEnv);
            const agregadoMl = elNew("div",{
                className: "detalles_Aniadidos_Ml",
                textContent: "Contenido: "+cantidadMl+"Ml"
            });
            agregado.append(agregadoMl);
            const agregadoSab = elNew("div",{
                className: "detalles_Aniadidos_Sab"
            });
            agregadoSab.innerHTML = stringSabores;
            agregado.append(agregadoSab);
            





            const detallesPrecioUniCont = elNew("div",{
                className: "detalles_Precio_Ml_Unitario_Contenedor"
            });

            agregado.append(detallesPrecioUniCont);

            const detallesPrecioUni = elNew("div",{
                className: "detalles_Precio_Ml_Unitario"
            });
            detallesPrecioUniCont.append(detallesPrecioUni);

            const detallesPrecioUniMent = elNew("div",{
                className: "detalles_Precio_Ment_Unitario"
            });
            detallesPrecioUniCont.append(detallesPrecioUniMent);

            const detallesPrecioUniNico = elNew("div",{
                className: "detalles_Precio_Nico_Unitario"
            });
            detallesPrecioUniCont.append(detallesPrecioUniNico);

            const detallesPrecioUniDC = elNew("div",{
                className: "detalles_Precio_Nico_Unitario"
            });
            detallesPrecioUniCont.append(detallesPrecioUniDC);





            const detallesPrecioDescCont = elNew("div",{
                className: "detalles_Precio_Ml_Unitario_Contenedor"
            });
            agregado.append(detallesPrecioDescCont);

            const detallesPrecioDesc = elNew("div",{
                className: "detalles_Precio_Ml_Unitario"
            });
            detallesPrecioDescCont.append(detallesPrecioDesc);

            const detallesPrecioDescMent = elNew("div",{
                className: "detalles_Precio_Ment_Unitario"
            });
            detallesPrecioDescCont.append(detallesPrecioDescMent);

            const detallesPrecioDescNico = elNew("div",{
                className: "detalles_Precio_Nico_Unitario"
            });
            detallesPrecioDescCont.append(detallesPrecioDescNico);
            const detallesPrecioDescDC = elNew("div",{
                className: "detalles_Precio_Nico_Unitario"
            });
            detallesPrecioDescCont.append(detallesPrecioDescDC);





            const detallesPrecioTotCont = elNew("div",{
                className: "detalles_Precio_Ml_Unitario_Contenedor"
            });
            agregado.append(detallesPrecioTotCont);

            const detallesPrecioTot = elNew("div",{
                className: "detalles_Precio_Ml_Unitario"
            });
            detallesPrecioTotCont.append(detallesPrecioTot);

            const detallesPrecioTotMent = elNew("div",{
                className: "detalles_Precio_Ment_Unitario"
            });
            detallesPrecioTotCont.append(detallesPrecioTotMent);

            const detallesPrecioTotNico = elNew("div",{
                className: "detalles_Precio_Nico_Unitario"
            });
            detallesPrecioTotCont.append(detallesPrecioTotNico);

            const detallesPrecioTotDC = elNew("div",{
                className: "detalles_Precio_Nico_Unitario"
            });
            detallesPrecioTotCont.append(detallesPrecioTotDC);


            
            const detallesPrecioUniTot = elNew("div",{
                className: "detalles_Precio_Total_Uni"
            });

            agregado.append(detallesPrecioUniTot);

            const detallesPrecioFrasco = elNew("div",{
                className: "detalles_Precio_Ml_Frasco"
                }
            );
            if(arrayHayFrasco[contadorEtc]){
                detallesPrecioFrasco.innerHTML = `Precio Frasco(Unidad): ${baseFrascoPrecio}$ x ${arrayCantEnv[contadorEtc]}`
            }else{
                detallesPrecioFrasco.innerHTML = `Precio Frasco: 0 $<br><b>No se hacen envios sin envase</b>`
            }
            agregado.append(detallesPrecioFrasco);

            
            const detallesPrecioTotTot = elNew("div",{
                className: "detalles_Precio_Total"
            });
            agregado.append(detallesPrecioTotTot);
            

            const detallesPrecioDescD = elNew("div",{
                className: "detalles_Precio_Total"
            });
            agregado.append(detallesPrecioDescD);
            

            const detallesPrecioT = elNew("div",{
                className: "detalles_Precio_Total"
            });
            agregado.append(detallesPrecioT);

            const detallesEspacioT = elNew("div",{
                className: "detalles_Precio_Espacio"
            });
            detallesEspacioT.innerHTML = "&nbsp;"
            agregado.append(detallesEspacioT);

            
            arraySabores[contadorEtc]="";
            for(w=0;w<tiposSabores.childElementCount;w++){
                let stringSinSabor=tiposSabores.children.item(w).children.item(1).innerText;
                stringSinSabor = stringSinSabor.replace("Sabor ","")
                arraySabores[contadorEtc]+="%20"+"%20"+"%20"+tiposSabores.children.item(w).children.item(2).value+"%20"+"%"+"%20"+stringSinSabor+"%0D%0A";
            }

            const saboresAniadidotes = document.querySelector(".saboresAniadidosTodo");

            while (saboresAniadidotes.firstChild) {
                console.log("vava")
                saboresAniadidotes.removeChild(saboresAniadidotes.lastChild);
              }
              document.querySelector(".contenedor_Calculadora_Aniadir_Cantidad").value = 0;
              activarBotonAniadir();
              GenerarPrecioAct(contadorEtc);
            calcular_Titulo.style.background = "green";
            calcular_Titulo_Check.style.display = "inline-block";
            //contenedorPreciosTotales.style.display = "block";
        }else{
            alert("Debe añadir sabores");
        }
    }else{
        alert("Debe especificar una cantidad de productos");
    }
    
});

function GenerarPrecioAct(indexP){
    for(let s=1;s<arrayCant.length;s++){
        mlTotales += arrayCant[s]*arrayCantEnv[s];
        mlNico += arrayCantNico[s]*arrayCantEnv[s];
        mlMent += arrayCantMent[s]*arrayCantEnv[s];
        mlDC += arrayCantDC[s]*arrayCantEnv[s];
    }
    for(let n=0;n<=arrayBaseMlIndex.length;n++){
        console.log(n)
        if(mlTotales>=arrayBaseMlIndex[n]){
            indexPrecio = n;
        }
        if(mlMent>=arrayBaseMlIndex[n]){
            indexMent = n;
        }
        if(mlNico>=arrayBaseMlIndex[n]){
            indexNico = n;
        }
        if(mlDC>=arrayBaseMlIndex[n]){
            indexDC = n;
        }
    }
    arrayTotal[contadorEtc]= arrayBaseMlPrecios[1]*arrayCant[indexP] + arrayBaseMentPrecios[1]*arrayCantMent[indexP]*arrayTipoMent[indexP] + arrayBaseNicoPrecios[1]*arrayCantNico[indexP]*arrayTipoNico[indexP]+arrayBaseDobleConcentrado[1]*arrayCantDC[indexP];
    for (e=0; e<contadorEtc;e++){
        arrayDesc[e+1]= ((arrayBaseMlPrecios[1]-arrayBaseMlPrecios[indexPrecio])*arrayCant[e+1] + (arrayBaseMentPrecios[1]-arrayBaseMentPrecios[indexMent])*arrayCantMent[e+1]*arrayTipoMent[e+1] + (arrayBaseNicoPrecios[1]-arrayBaseNicoPrecios[indexNico])*arrayCantNico[e+1]*arrayTipoNico[e+1]+(arrayBaseDobleConcentrado[1]-arrayBaseDobleConcentrado[indexDC])*arrayCantDC[e+1])*arrayCantEnv[e+1]
        arrayTotalTodo[e+1]= arrayTotal[e+1]*arrayCantEnv[e+1]-arrayDesc[e+1]+baseFrascoPrecio*arrayHayFrasco[e+1]*arrayCantEnv[e+1];
    }
    //arrayDesc[contadorEtc]= ((arrayBaseMlPrecios[1]-arrayBaseMlPrecios[indexPrecio])*arrayCant[indexP] + (arrayBaseMentPrecios[1]-arrayBaseMentPrecios[indexMent])*arrayCantMent[indexP]*arrayTipoMent[indexP] + (arrayBaseNicoPrecios[1]-arrayBaseNicoPrecios[indexNico])*arrayCantNico[indexP]*arrayTipoNico[indexP])*arrayCantEnv[indexP]
    //arrayTotalTodo[contadorEtc]= (arrayBaseMlPrecios[indexPrecio]*arrayCant[indexP] + arrayBaseMentPrecios[indexMent]*arrayCantMent[indexP]*arrayTipoMent[indexP] + arrayBaseNicoPrecios[indexNico]*arrayCantNico[indexP]*arrayTipoNico[indexP] + arrayHayFrasco[indexP]*baseFrascoPrecio)*arrayCantEnv[indexP];
    actualizarMinisSegunPrecio(indexP);
}

function actualizarMinisSegunPrecio(indexP){
    if(contenedorProductosDetalles.childElementCount>0){
        for(t=0;t<indexP;t++){
            console.log(indexPrecio)
            const contenedor = contenedorProductosDetalles.children.item(t)
            console.log(contenedor);
            
            const contenedorUni = contenedor.children.item(4);
            const contenedorDesc = contenedor.children.item(5);
            const contenedorTot = contenedor.children.item(6);

            contenedorUni.children.item(0).innerHTML = `Precio ${arrayBaseMlPrecios[1]*arrayCant[indexP]}&nbsp;`
            contenedorUni.children.item(1).innerHTML = `Mentolado ${arrayBaseMentPrecios[1]*arrayCantMent[indexP]*arrayTipoMent[indexP]}&nbsp;`
            contenedorUni.children.item(2).innerHTML = `Nicotina ${arrayBaseNicoPrecios[1]*arrayCantNico[indexP]*arrayTipoNico[indexP]}&nbsp;`
            contenedorUni.children.item(3).innerHTML = `Doble Concentrado ${arrayBaseDobleConcentrado[1]*arrayCantDC[indexP]}&nbsp;`

            contenedorDesc.children.item(0).innerHTML = `Descuento ${(arrayBaseMlPrecios[1]-arrayBaseMlPrecios[indexPrecio])*arrayCant[indexP]}&nbsp;`
            contenedorDesc.children.item(1).innerHTML = `Mentolado ${(arrayBaseMentPrecios[1]-arrayBaseMentPrecios[indexMent])*arrayCantMent[indexP]*arrayTipoMent[indexP]}&nbsp;`
            contenedorDesc.children.item(2).innerHTML = `Nicotina ${(arrayBaseNicoPrecios[1]-arrayBaseNicoPrecios[indexNico])*arrayCantNico[indexP]*arrayTipoNico[indexP]}&nbsp;`
            contenedorDesc.children.item(3).innerHTML = `Doble Concentrado ${(arrayBaseDobleConcentrado[1]-arrayBaseDobleConcentrado[indexDC])*arrayCantDC[indexP]}&nbsp;`
            
            contenedorTot.children.item(0).innerHTML = `Total ${arrayBaseMlPrecios[indexPrecio]*arrayCant[indexP]}&nbsp;`
            contenedorTot.children.item(1).innerHTML = `Mentolado ${arrayBaseMentPrecios[indexMent]*arrayCantMent[indexP]*arrayTipoMent[indexP]}&nbsp;`
            contenedorTot.children.item(2).innerHTML = `Nicotina ${arrayBaseNicoPrecios[indexNico]*arrayCantNico[indexP]*arrayTipoNico[indexP]}&nbsp;`
            contenedorTot.children.item(3).innerHTML = `Doble Concentrado ${arrayBaseDobleConcentrado[indexDC]*arrayCantDC[indexP]}&nbsp;`

            console.log(contenedorUni);
            console.log(contenedorDesc);
            console.log(contenedorTot);

            console.log(contenedor.children.item(7))

            contenedor.children.item(7).innerHTML = `Total(Unidad): ${arrayTotal[t+1]} x ${arrayCantEnv[t+1]}`

            contenedor.children.item(9).innerHTML = `Precio: ${arrayTotal[t+1]*arrayCantEnv[t+1]+baseFrascoPrecio*arrayCantEnv[t+1]}`
            contenedor.children.item(10).innerHTML = `Descuento: ${arrayDesc[t+1]}`
            contenedor.children.item(11).innerHTML = `Total: ${arrayTotalTodo[t+1]}`
            AniadirActualizarResTot();

        }
        
    }
}

function AniadirActualizarResTot(){
    console.log(contenedorProductosDetalles.childElementCount)
    if(contenedorProductosDetalles.childElementCount>=1){
        detallesTotal.style.display="block";
        document.querySelector(".enviar_Whatsapp").style.display="block";
        
        const detallesLiqTot = document.querySelector(".Contenedor_Total_Liq_Tot");
        const detallesLiqDesc = document.querySelector(".Contenedor_Total_Liq_Desc");
        const detallesLiqLiq = document.querySelector(".Contenedor_Total_Liq_Liq");
        const detallesLiqEnvio = document.querySelector(".Contenedor_Total_Liq_Envio");
        const detallesLiqRes = document.querySelector(".Contenedor_Total_Liq_Res");

        let Total = 0;
        let Descuento = 0;
        let Liquidacion = 0;
        let sinEnv = false;

        for(let i=0;i<arrayCant.length-1;i++){
            Total += (arrayTotal[i+1]+arrayHayFrasco[i+1]*baseFrascoPrecio)*arrayCantEnv[i+1];
            Descuento += arrayDesc[i+1];
            Liquidacion += arrayTotalTodo[i+1];
            if(arrayHayFrasco[i+1]&&!sinEnv){}else{sinEnv=true;}
        }
        detallesLiqTot.innerText="Precio: "+Total;
        detallesLiqDesc.innerText="Descuento por cantidad "+Descuento;
        detallesLiqLiq.innerText="Total "+Liquidacion;
        if(sinEnv){detallesLiqEnvio.innerText="Envios: No se puede hacer envios sin envase"}else if(envioPrecio===-1){detallesLiqEnvio.innerText="Envios: Se ha superado la distancia máxima para hacer el envio"}else if(envioPrecio===-2){detallesLiqEnvio.innerText="Envios: A retirar en el domicilio del vendedor"}else if(envioPrecio===-3){detallesLiqEnvio.innerText="Envios: Debe ingresar Método de envio"}else{detallesLiqEnvio.innerText="Envio: "+envioPrecio}
        if(envioPrecio===-1||envioPrecio===-2||envioPrecio===-3){detallesLiqRes.style.display="none"}else{detallesLiqRes.style.display="block";detallesLiqRes.innerText="Total+Envio: "+(Liquidacion+envioPrecio)}
    }else{
        console.log("va")
        detallesTotal.style.display="none";
        document.querySelector(".enviar_Whatsapp").style.display="none";
    }
    
}

function ValidarTodo2(){
    console.log("pasa")
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
        if(validarDPTO.checked && datosDPTO.value==""){
            validarDPTO.scrollIntoView({ block: "center", behavior: "smooth" })
            spanNumero3.style.display = "block"
        }else{
            return true;
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
        return true;
    }
    }
    return false;
}

const botonW = document.querySelector(".botone_Whatsapp");
botonW.addEventListener("click",function(){
    paraEnviarWhatsapp = 1;
    stringSabores="";
    stringSabores+="-------------------------------------------------"+"%0D%0A"
    stringSabores+="Hola En El Camino Vapers, me gustaria pedir"+"%0D%0A"
    stringSabores+="-------------------------------------------------"+"%0D%0A"
            for (s=0;s<contadorEtc;s++){
                let adicional = "";
                let adicional2 = "";
                let espacionm = "%0D%0A";
                let espacioS = "";
                let plural = "";
                let contar = 0;
                let contar2 = 0;
                if(arrayCantEnv[s+1]>1){
                    plural = "s"
                }
                if(s>=1){
                    espacioS = "Y "
                }
                let stringTipoN = "";
                if(arrayTipoNico[s+1]!==0){
                    stringTipoN= "con "+arrayTipoNico[s+1]*3+"% de Nicotina";
                    contar++;
                }
                let stringTipoM = "";
                if(arrayTipoMent[s+1]!==0){
                    stringTipoM= "con "+arrayTipoMent[s+1]+"% de Mentolado";
                    contar++;
                }
                let stringDC = "";
                if(arrayTipoMent[s+1]!==0){
                    stringDC= "con 200% de Concentrado";
                    contar2++;
                }
                if(arrayTipoMent[s+1]!==0&&arrayTipoNico[s+1]!==0){
                    adicional= " y "
                }else if(arrayTipoMent[s+1]==0&&arrayTipoNico[s+1]==0&&arrayCantDC[s+1]==0){
                    espacionm = "";
                }
                if(arrayTipoMent[s+1]!==0||arrayTipoNico[s+1]!==0){
                    adicional2= " y "
                }
                stringSabores+=espacioS+arrayCantEnv[s+1]+" frasco"+plural+" "+stringTipoN+adicional+stringTipoM+adicional2+stringDC+espacionm+"de Sabor"+"%0D%0A"
                stringSabores+=arraySabores[s+1]
                stringSabores+="-------------------------------------------------"+"%0D%0A"
            }
    
    console.log(stringSabores);
    let valor = false;
    valor = ValidarTodo2();
            console.log(valor)
    if (valor == true){
        stringSabores += "================================================="+"%0D%0A"
        if(direccionParaMandar == "A retirar a domicilio del vendedor"){
            stringSabores += direccionParaMandar;
        }else{
        stringSabores += "Para enviar a "+direccionParaMandar+textoAMandarCat+"%0D%0A"
        }
        stringSabores += "================================================="+"%0D%0A"

        location.href = `https://api.whatsapp.com/send?phone=543416506882&text=${stringSabores}`
    }
    //location.href = `https://api.whatsapp.com/send?phone=543416506882&text=${stringSabores}`
})