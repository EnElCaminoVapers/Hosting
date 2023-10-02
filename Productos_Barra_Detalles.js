const checkbox_DC = document.getElementById("cboxDC");
const checkbox_Men = document.getElementById("cboxMen");
const checkbox_Nic = document.getElementById("cboxNic");
const div_Men = document.getElementById("men_mg");
const div_Nic = document.getElementById("nico_mg");

div_Men.style.display = "none";
div_Nic.style.display = "none";

let activoDC = false;
let activoM = 0;
let activoN = 0;
let seleccionadoM = 0;
let seleccionadoN = 0;

checkbox_DC.addEventListener("change",function(){
    if(this.checked){
        activoDC = true;
    }else{
        activoDC = false;
    }
})

checkbox_Men.addEventListener("change",function(){
    console.log("funciona");
    if(this.checked){
        seleccionadoM = 0;
        div_Men.style.display = "inline-block";
        if (activoM||0){
        reiniciarNinios(niniosMent);
        }
    } else{
        seleccionadoM = 0;
        div_Men.style.display = "none";
        if (activoM||0){
            reiniciarNinios(niniosMent);
        }
    }
});

checkbox_Nic.addEventListener("change",function(){
    console.log("funciona");
    if(this.checked){
        seleccionadoN = 0;
        div_Nic.style.display = "inline-block";
        if (activoN||0){
            reiniciarNinios(niniosNico);
        }
    } else{
        seleccionadoN = 0;
        div_Nic.style.display = "none";
        if (activoN||0){
            reiniciarNinios(niniosNico);
        }
    }
});


const todoPadreMent = document.querySelector(".contenedor_Menta");
const niniosMent = todoPadreMent.getElementsByTagName("*");

const todoPadreNico = document.querySelector(".contenedor_Nicotina");
const niniosNico = todoPadreNico.getElementsByTagName("*");

const ment1 = document.querySelector('.select_ment_1');
const ment2 = document.querySelector('.select_ment_2');
const ment3 = document.querySelector('.select_ment_3');
const ment4 = document.querySelector('.select_ment_4');

const nico1 = document.querySelector('.select_nico_1');
const nico2 = document.querySelector('.select_nico_2');
const nico3 = document.querySelector('.select_nico_3');

ment1.addEventListener('click',function(){
    reiniciarNinios(niniosMent);
    this.style.backgroundColor = 'red';
    this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    activoM = 1;
    seleccionadoM = 1;
});

ment2.addEventListener('click',function(){
    reiniciarNinios(niniosMent);
    this.style.backgroundColor = 'red';
    this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    activoM = 1;
    seleccionadoM = 2;
});

ment3.addEventListener('click',function(){
    reiniciarNinios(niniosMent);
    this.style.backgroundColor = 'red';
    this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    activoM = 1;
    seleccionadoM = 3;
});

ment4.addEventListener('click',function(){
    reiniciarNinios(niniosMent);
    this.style.backgroundColor = 'red';
    this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    activoM = 1;
    seleccionadoM = 4;
});

nico1.addEventListener('click',function(){
    reiniciarNinios(niniosNico);
    this.style.backgroundColor = 'red';
    this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    activoN = 1;
    seleccionadoN = 1;
});

nico2.addEventListener('click',function(){
    reiniciarNinios(niniosNico);
    this.style.backgroundColor = 'red';
    this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    activoN = 1;
    seleccionadoN = 2;
});

nico3.addEventListener('click',function(){
    reiniciarNinios(niniosNico);
    this.style.backgroundColor = 'red';
    this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    activoN = 1;
    seleccionadoN = 3;
});

function reiniciarNinios(ninios){
    for(i=0; i<ninios.length;i++){
        ninios[i].style.backgroundColor = 'rgba(0, 0, 0, 0)';
        ninios[i].style.borderColor = 'rgba(255, 255, 255, 0)';
    };
}

function ocultarMl(){
    const baseMl = document.querySelector(".contenedor_Calculadora_Aniadir_Ml_Div");
//contenedor_Calculadora_Aniadir_Ml_Div
}
document.querySelector(".contenedor_Calculadora_Aniadir_Ml_Div").style.display = "none";
document.querySelector(".contenedor_Calculadora_Aniadir_Envase").addEventListener("change",function(){
    if (this.checked){
        document.querySelector(".contenedor_Calculadora_Aniadir_Ml_Div").style.display = "none";
    }else{
        document.querySelector(".contenedor_Calculadora_Aniadir_Ml_Div").style.display = "inline-block";
    }
});
