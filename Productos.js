function calcularAlturaVideo(){
    const body = document.querySelector("body");
    const marco = document.querySelector(".fondo_Overflow");
    console.log(body.clientWidth);
    bodyAncho = body.clientWidth;
    bodyAlto = body.clientHeight;
    console.log("ancho "+bodyAncho+" alto "+bodyAlto);
    marco.style.position = "relative";
    marco.style.Width = "100%";
    marco.style.Height = "100%"
    marco.style.overflow = "hidden";
    const video = document.querySelector(".contenedor_Fondo");
    video.style.display = "block !important";
    //video.style.display = "none";
    if(bodyAncho/bodyAlto>1.90){
        video.style.Width = bodyAncho;
        video.style.Height = "auto";
    }else{
        video.style.Height = bodyAlto;
        video.style.Width = "auto";
    }
}

const frasco = 0.35;

let valorResMultipleDir = [];

const randomData = 15;


const botonCalculadoraActivar = document.querySelector(".contenedor_Calculadora_Aniadir_Aniadir");

//botonCalculadoraActivar.addEventListener('click',aniadirCalculadoraResultados);

const contenedorCalculadora = document.querySelector('.contenedor_Calculadora_Aniadidos');

function aniadirCalculadoraResultados(){
    contenedorCalculadora.innerHTML += `<div class="contenedor_Calculadora_Aniadidos_Base"> ${randomData}hola<button class="contenedor_Calculadora_Aniadidos_Base_Cerrar">x</button></div>`;
    const contenedorItems = document.querySelectorAll('.contenedor_Calculadora_Aniadidos_Base');
    const longitud = contenedorItems.length;
    let itemCreado = contenedorItems[longitud-1];
    console.log(itemCreado);
    itemCreado.addEventListener('click',function(e){console.log(e+"hola")})

}

const xData = 40;
const container = el('.container');

const observeInsertion = new MutationObserver((records, observer) => {
  records.forEach(rec => {
    rec.addedNodes.forEach(node => {
      console.log(`Added some exotic stuff: ${node.textContent}`);
    })
  });
});

//observeInsertion.observe(container, {
//  childList: true
//});





































