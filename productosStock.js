//const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);
//const el = (sel, par) => (par ||document).querySelector(sel);

const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);
const el = (sel, par) => (par ||document).querySelector(sel);

let objetoStock = {};
function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            objetoStock = JSON.parse(res);
            console.log(objetoStock);
        }
    };
    xhttp.open("GET","datoStock", false);
    xhttp.send();}
loadXMLDoc();
console.log(objetoStock);
console.log(objetoStock["Linea Descr"])
console.log(objetoStock.Productos.ProductosStock)

const contenedorProductos = document.querySelector(".contenedor_Productos");
const indiceProductos = document.querySelector(".seleccionar_Indice_Linea");

const lineaObjetoStock = Object.getOwnPropertyNames(objetoStock.Productos.ProductosDescr);
const longitudLinea = Object.keys(objetoStock["Linea Descr"]).length
const longitudLineaPD = Object.keys(objetoStock["Productos"]["ProductosDescr"]).length
const longitudLineaS = Object.keys(objetoStock["Productos"]["ProductosStock"]).length
const longitudLineaI = Object.keys(objetoStock["Productos"]["ProductosImg"]).length

const conDescripcion = objetoStock["Descr_Activada"]

if ((longitudLinea===longitudLineaPD)&&(longitudLineaS===longitudLineaI)&&(longitudLineaPD===longitudLineaI)){
    console.log("Datos cargados correctamente");
}else{
    console.log("Error no se posee la longitud deseada");
    console.log(longitudLinea);
    console.log(longitudLineaPD);
    console.log(longitudLineaS);
    console.log(longitudLineaI);
}
const productoStockBase = objetoStock["Productos"]["ProductosStock"]; 
const productoDescrBase = objetoStock["Productos"]["ProductosDescr"]; 
const productoImgBase = objetoStock["Productos"]["ProductosImg"]; 

const direccionventana = window.location.hash
let tieneElHash = false
if (direccionventana.includes("#slide")){
    tieneElHash = true;
}else{
    tieneElHash = false;
};

let contadorL = 0;
let alturamaxLinea = 0;
for(linea in productoStockBase){
    contadorL++
    console.log(linea);
    console.log(productoStockBase[linea]);
    const contenedorLineaX = elNew("li",{
        className: "contenedor_Linea",
        id: `slide${contadorL}`
        //textContent: `${i}st ${xData}`,
      });
    //contenedorLineaX.style.left = ((contadorL * 100) - 100)+"vw";
    /*if((tieneElHash===false)&&(contadorL===1)){
      contenedorLineaX.style.opacity = 1;
    }*/
    contenedorProductos.append(contenedorLineaX);
    const contenedorLineaXNombre = elNew("div",{
        className: "contenedor_Linea_X_Nombre",
        textContent: `${linea}`,
      });
    contenedorLineaX.append(contenedorLineaXNombre);
    console.log("eso "+conDescripcion)
    const contenedorLineaXDescr = elNew("div",{
        className: "contenedor_Linea_X_Descr",
        textContent: `${objetoStock["Linea Descr"][linea]}`,
      });
    contenedorLineaX.append(contenedorLineaXDescr);
    for(producto in productoStockBase[linea]){
        const contenedorProductosX = elNew("div",{
            className: "marco_Productos_X",
            //textContent: `${i}st ${xData}`,
          });
        contenedorLineaX.append(contenedorProductosX);
        
        const marcoImgProductosX = elNew("div",{
            className: "marco_Productos_Imagenes",
            //textContent: `${i}st ${xData}`,
          });
        contenedorProductosX.append(marcoImgProductosX);
        
        const imagenProductosX = elNew("img",{
            className: "productos_Imagenes_Producto",
            //textContent: `${i}st ${xData}`,
          });
        imagenProductosX.src = "Data Productos/"+productoImgBase[linea][producto];
        marcoImgProductosX.append(imagenProductosX);
        
        const imagenAgotadoProductosX = elNew("img",{
            className: "productos_Imagenes_Agotado",
            //textContent: `${i}st ${xData}`,
          });
        imagenAgotadoProductosX.src = "Data Productos 0/agotado.png";
        marcoImgProductosX.append(imagenAgotadoProductosX);

        const tituloNombreProductos = elNew("div",{
            className: "marco_Titulo_ProductoX",
            textContent: `${producto}`,
          });
        contenedorProductosX.append(tituloNombreProductos);
        
        if(conDescripcion === true){
        const descripcionProductosX = elNew("div",{
            className: "marco_Descr_ProductoX",
            textContent: `${productoDescrBase[linea][producto]}`,
          });
        contenedorProductosX.append(descripcionProductosX);
        tituloNombreProductos.style.borderBottom = "0px";
        }
        if(objetoStock["Productos"]["ProductosStock"][linea][producto]===true){
            const indiceListaSabores = document.getElementById("listaFormatosSabores");
            const nombreListaSabores = elNew("option",{
                className: "opciones_Data_ListX",
                value: `${producto} ${linea}`,
                textContent: `${objetoStock["Linea Breve"][linea]}`
            })
            indiceListaSabores.append(nombreListaSabores)
        }
        
        if (productoStockBase[linea][producto]===true){
            console.log("Producto "+producto+" tiene stock")
            imagenAgotadoProductosX.style.display = "none";
        }else{
            console.log("Producto "+producto+" no tiene stock")
            imagenAgotadoProductosX.style.display = "inline-block";
        }
    }
    //if(alturamaxLinea<contenedorLineaX.clientHeight){alturamaxLinea = contenedorLineaX.clientHeight}
    //document.querySelector(".contenedor_Productos").style.height = alturamaxLinea+"px";
    //document.querySelector(".contenedor_Productos").style.width = "100vw"
    //contenedorLineaX.style.height = alturamaxLinea+"px";
    const longitudLinea = contenedorLineaX.clientHeight;
    console.log(tieneElHash)
    if(tieneElHash){let subcadena = direccionventana.slice(-1); if((contadorL+"")===subcadena){
        const longitudLinea2 = contenedorLineaX.clientHeight;
        document.querySelector(".contenedor_Productos").style.height = longitudLinea2+"px";
        document.querySelector(".contenedor_Productos").style.width = "100vw";

    }}else if((tieneElHash===false)&&(contadorL===1)){
          const longitudLinea2 = contenedorLineaX.clientHeight;
          document.querySelector(".contenedor_Productos").style.height = longitudLinea2+"px";
          document.querySelector(".contenedor_Productos").style.width = "100vw";
    }

    const indiceS = elNew("li",{
        className: "contenedor_IndiceX",
      })
    indiceProductos.append(indiceS)

    const indiceX = elNew("a",{
        className: `contenedor_IndiceA linkSlide${contadorL}`,
        textContent: `${linea}`,
        href: `#slide${contadorL}`
      })
    indiceX.addEventListener("click",function(){
        document.querySelector(".contenedor_Productos").style.height = longitudLinea+"px";
        document.querySelector(".contenedor_Productos").style.width = "100vw"
            });

    indiceS.append(indiceX)
    /*if((contadorL===1)&&(!tieneElHash)){
      indiceX.dispatchEvent("click_event");
    }*/

}
const indiceCorregir = document.querySelectorAll(".contenedor_IndiceA")[0];
indiceCorregir.click()
window.scroll(document.clientHeight);
console.log(indiceCorregir)
console.log(document.querySelector(`.linkSlide1`))

const todoLinkLinea = document.querySelectorAll('.contenedor_IndiceA');

const longitudAdicionalesPD = Object.keys(objetoStock["Adicionales"]["AdicionalesDescr"]).length
const longitudAdicionalesS = Object.keys(objetoStock["Adicionales"]["AdicionalesStock"]).length
const longitudAdicionalesI = Object.keys(objetoStock["Adicionales"]["AdicionalesImg"]).length

if ((longitudAdicionalesPD===longitudAdicionalesS)&&(longitudAdicionalesS===longitudAdicionalesI)){
  console.log("Datos cargados correctamente");
}else{
  console.log("Error no se posee la longitud deseada");
  console.log(longitudAdicionalesPD);
  console.log(longitudAdicionalesS);
  console.log(longitudAdicionalesI);
}

const productoStockAdicionales = objetoStock["Adicionales"]["AdicionalesStock"]; 
const productoDescrAdicionales = objetoStock["Adicionales"]["AdicionalesDescr"]; 
const productoImgBaseAdicionales = objetoStock["Adicionales"]["AdicionalesImg"]; 

const contenedorAdicionales = document.querySelector(".contenedor_Adicionales");

for (adicional in productoStockAdicionales){
    
    const contenedorAdiconalesX = elNew("div",{
    className: "marco_Productos_X",
    //textContent: `${i}st ${xData}`,
    });
    contenedorAdicionales.append(contenedorAdiconalesX);

    const marcoImgAdicionalesX = elNew("div",{
      className: "marco_Productos_Imagenes",
      //textContent: `${i}st ${xData}`,
    });
    contenedorAdiconalesX.append(marcoImgAdicionalesX)

    const imagenAdicionalesX = elNew("img",{
      className: "productos_Imagenes_Producto",
      //textContent: `${i}st ${xData}`,
    });
    imagenAdicionalesX.src = "Data Adicionales/"+productoImgBaseAdicionales[adicional];
    marcoImgAdicionalesX.append(imagenAdicionalesX);
  
    const imagenAgotadoAdicionalesX = elNew("img",{
      className: "productos_Imagenes_Agotado",
      //textContent: `${i}st ${xData}`,
    });
    imagenAgotadoAdicionalesX.src = "Data Productos 0/agotado.png";
    marcoImgAdicionalesX.append(imagenAgotadoAdicionalesX);

    if (productoStockBase[linea][producto]===true){
      console.log("Producto "+producto+" tiene stock")
      imagenAgotadoAdicionalesX.style.display = "none";
    }else{
      console.log("Producto "+producto+" no tiene stock")
      imagenAgotadoAdicionalesX.style.display = "inline-block";
    }

    const tituloNombreAdicionales = elNew("div",{
      className: "marco_Titulo_ProductoX",
      textContent: `${adicional}`,
    });
    contenedorAdiconalesX.append(tituloNombreAdicionales);
  
    const descripcionAdicionalesX = elNew("div",{
      className: "marco_Descr_ProductoX",
      textContent: `${productoDescrAdicionales[adicional]}`,
    });
    contenedorAdiconalesX.append(descripcionAdicionalesX);
}













