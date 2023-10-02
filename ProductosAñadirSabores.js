const botonSaboresLista = document.querySelector(".boton_Aniadir_Sabores");
const contenedorSabores = document.querySelector(".contenedor_Sabores_Aniadidos")
const inputSaboresLista = document.querySelector(".selector_Sabores");

const cantidadNum = document.querySelector(".contenedor_Calculadora_Aniadir_Cantidad");

cantidadNum.addEventListener("change", function(){
    activarBotonAniadir();
})

const contenedorSaboresTodo = elNew("div",{
    className: "saboresAniadidosTodo"
})
contenedorSabores.append(contenedorSaboresTodo)
botonSaboresLista.addEventListener("click", todoJuntoJunto );
inputSaboresLista.addEventListener("keydown",function(e){
    //e.preventDefault();
    if((e.keyCode === 13)||(e.code === "Enter")){
        todoJuntoJunto();
    }
});

function todoJuntoJunto(){
    tareaAñadirSabores();
    activarBotonAniadir();
}
document.querySelector(".contenedor_Calculadora_Aniadir_Aniadir").disabled=true;
function activarBotonAniadir(){
    if(cantidadNum.value>0 && document.querySelector(".saboresAniadidosTodo").childNodes.length>0){
        document.querySelector(".contenedor_Calculadora_Aniadir_Aniadir").disabled=false;
    }else{
        document.querySelector(".contenedor_Calculadora_Aniadir_Aniadir").disabled=true;
    }
}
function tareaAñadirSabores(){
    let estaRepetido = false;
    const saboresX = document.querySelector(".selector_Sabores");
    const hijosSaboresAniadidos = contenedorSaboresTodo.childNodes;
    if(hijosSaboresAniadidos.length>0){
        for(detallesa in hijosSaboresAniadidos){
            const hijos2 = hijosSaboresAniadidos[detallesa].childNodes;
            for (detalles2a in hijos2){
                if(hijos2[detalles2a].tagName == "DIV"){
                    const saborazo = "Sabor " + saboresX.value
                   if(saborazo==hijos2[detalles2a].innerText){
                        estaRepetido = true;
                   }
                }
            }
        }
    }
    if((hijosSaboresAniadidos.length<4)&&(saboresX.value!=="")&&(estaRepetido===false)){
    const contenedorSaboresX = elNew("div",{
        className: "saboresAniadidos"
    })
    contenedorSaboresTodo.append(contenedorSaboresX)
    const saboresVal = "Sabor " + saboresX.value;
    console.log(saboresVal);
    const saboresXborrar = elNew("button",{
        className: "saboresAniadidosBorrar",
        textContent: "-"
    });
    saboresXborrar.addEventListener("click",function(){
        this.parentNode.remove();
        activarBotonAniadir();
    })
    contenedorSaboresX.append(saboresXborrar);
    const saboresXX = elNew("div",{
        className: "sabores_AniadidosDet",
        textContent: `${saboresVal}`,
      });
    contenedorSaboresX.append(saboresXX);
    const saboresPorcentaje = elNew("input",{
        className: "sabores_PorcentajeDet",
      });
    saboresPorcentaje.type = "number"
    saboresPorcentaje.max = 100;
    saboresPorcentaje.min = 10;
    //saboresPorcentaje.value = 100;
    saboresPorcentaje.style.width = "40px"
    saboresPorcentaje.addEventListener("keydown",function(){
        let contador = 0;
        const padreLLega = this.parentNode.parentNode;
        for(variable in padreLLega.childNodes){
            for(variable2 in padreLLega.childNodes[variable].childNodes){
                if(padreLLega.childNodes[variable].childNodes[variable2].type === "number"){
                    const inputNumero = padreLLega.childNodes[variable].childNodes[variable2]
                    contador += parseInt(inputNumero.value)
                }
            }
        }
        if(contador>99){
            this.value--;
        }
    });
    contenedorSaboresX.append(saboresPorcentaje)

    const calcularElem = Math.trunc(100 / hijosSaboresAniadidos.length)
    for(detalle in hijosSaboresAniadidos){
        const hijosPorcentaje = hijosSaboresAniadidos[detalle].childNodes;
        for (detalle2 in hijosPorcentaje){
            const elemento = hijosPorcentaje[detalle2];
            if((elemento.type === "number")){
                elemento.value = calcularElem;
            }
        }
    }

    inputSaboresLista.value = "";

}
}