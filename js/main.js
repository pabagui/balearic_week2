
//uso de método ready de jquery
$(() => {
    console.log('El DOM esta listo');
});

//uso de animación Jquery
$('#mostrarCarousel').on('click', function () {
    $("#carouselExampleDark").fadeIn(3000);
});


const carro = [];

let miFormulario = $('#formulario');//selector jquery
miFormulario.submit(function (e) { //uso de evento jquery

    e.preventDefault();

    let formulario = e.target;

    let numeroPasajeros = formulario.children[1].value;
    let numeroIsla = formulario.children[5].value;
    let numeroServicio = formulario.children[9].value;

    //console.log(numeroPasajeros);
    //console.log(numeroIsla);
    //console.log(numeroServicio);

    carro.push(numeroPasajeros); 
    carro.push(numeroIsla);
    carro.push(numeroServicio);

    console.log(carro);

    class isla {
        constructor(id , nombre , precio) {
            this.id = id;
            this.nombre = nombre;
            this.precio = precio;
        }
    
        sumaTasas(){
            this.precio = (this.precio * numeroPasajeros * 1.12).toFixed(0); //pasajeros input
        }
    
    }
    
    const islas =[];
    
    islas.push(new isla(1 , "Ibiza y Formentera" , 650));
    islas.push(new isla(2 ,"Mallorca" , 900));
    islas.push(new isla(3 , "Menorca" , 750));
    
    for (const isla of islas){
        isla.sumaTasas();
    }
    
    //console.log(islas);
    
    class servicio {
        constructor(id , nombre , precio) {
            this.id = id;
            this.nombre = nombre;
            this.precio = precio;
        }
    
        sumaIVA(){
            this.precio = (this.precio * numeroPasajeros * 1.19).toFixed(0); //pasajeros input
        }
    }
    
    const servicios = [];
    
    
    servicios.push(new servicio(1 , "Pick-up ida y vuelta al aeropuerto" , 50));
    servicios.push(new servicio(2 , "Tarde de Buceo" , 120));
    servicios.push(new servicio(3 , "Stand up paddle por 2 horas" , 35));
    servicios.push(new servicio(4 , "ningún servicio extra" , 0)); 
    
    for(const servicio of servicios){
        servicio.sumaIVA();
    }
    
    //console.log(servicios);
    
    
    class totalCompra{
        constructor(destino, extra){
            this.destino = destino;
            this.extra = extra;
    
        }
            
    }
    

    let encontradoIsla = islas.find(isla => isla.id == numeroIsla); // input isla
    let encontradoServicio = servicios.find(servicio => servicio.id == numeroServicio); //input servicio
    
    let precioTotal = parseInt(encontradoIsla.precio) + parseInt(encontradoServicio.precio);
    
    
    function cotizar() {
    

    
        //console.log(encontradoIsla.precio); 
        //console.log(encontradoServicio.precio);
    

    
        //console.log(precioTotal);

    }
    
    cotizar();
    
    
    
    //generar html a partir de un array:

    function mensajeFinal () {
      // crea un nuevo div con método append de Jquery y uso de animaciones


      $("#cotizar").append(`<div id ="newDiv"><p>Cotizaste un viaje a ${encontradoIsla.nombre} para ${numeroPasajeros} personas, contratando ${encontradoServicio.nombre} por un total de USD$ ${precioTotal}  .\n Para más información llena el formulario de contacto y nos comunicaremos a la brevedad contigo</p></div>`);


      $("#newDiv").css("color", "#2284E6")
                  .css("fontSize", "1.5rem")
                  .css("padding", "4rem")
                  .slideUp(10)
                  .slideDown(4000);
 
    }
    
    mensajeFinal ();

}); //uso de eventos



const clientes = [];

let contacto = $('#contacto'); //uso de selector jquery
contacto.submit(function (e) { //uso de evento jquery

    e.preventDefault();

    let formulario = e.target;

    let name = formulario.children[1].value;
    let lastName = formulario.children[5].value;
    let inputEmail4 = formulario.children[9].value;
    let inputPhone = formulario.children[13].value;

    //console.log(name);
    //console.log(lastName);
    //console.log(inputEmail4);
    //console.log(inputPhone);

    clientes.push(name); 
    clientes.push(lastName);
    clientes.push(inputEmail4);
    clientes.push(inputPhone);

    //console.log(clientes);

    localStorage.setItem('baseClientes' , JSON.stringify(clientes));

    let base = localStorage.getItem('baseClientes');

    base = JSON.parse(base);

    console.log(base);
    alert("Te contactaremos a la brevedad"); 
    
})







//API geolocalización

let ubicacion = navigator.geolocation.getCurrentPosition( mostrarUbicacion);

function mostrarUbicacion ( position ) {

    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(position.coords.latitude , position.coords.longitude);
    
}



//API CLIMA

let urlClimaIbiza = "https://api.openweathermap.org/data/2.5/weather?q=Ibiza&units=metric&appid=85af83e8354fd0cc1b31c0b7abbbf37a&lang=es";

$("#climaIbiza").click(function(){

    $.get( urlClimaIbiza , function(data){
        
        console.log(data);
        console.log(data.weather[0].description);
        let iconoClima = data.weather[0].icon;
        let iconoUrl = "https://openweathermap.org/img/wn/" + iconoClima + "@2x.png";
        

        let contenido = `<div id="climaIsla1">
                            <h3>${data.name}</h3>
                            <h3>${data.main.temp.toFixed(0)}°C</h3>
                            <img src="${iconoUrl}">
                            <p>Pronóstico: ${data.weather[0].description}</p>
                            <p>Temp máx: ${data.main.temp_max.toFixed(0)}°C</p>
                            <p>Temp mín: ${data.main.temp_min.toFixed(0)}°C</p>   
                        </div>`
        
             $("#formentera").append(contenido);

             $("#climaIsla1").css("color", "#2284E6") //uso de css en clima
                             .css("fontSize", "1rem")
                             .css("padding", "4rem")
                             .slideUp(5)
                             .slideDown(3000);   

 })

})



let urlClimaFormentera = "https://api.openweathermap.org/data/2.5/weather?lat=38.7191&lon=1.4587&units=metric&appid=85af83e8354fd0cc1b31c0b7abbbf37a&lang=es";

$("#climaFormentera").click(function(){

    $.get( urlClimaFormentera , function(data){
        
        console.log(data);
        console.log(data.weather[0].description);
        let iconoClima = data.weather[0].icon;
        let iconoUrl = "https://openweathermap.org/img/wn/" + iconoClima + "@2x.png";
        

        let contenido = `<div id="climaIsla2">
                            <h3>${data.name}</h3>
                            <h3>${data.main.temp.toFixed(0)}°C</h3>
                            <img src="${iconoUrl}">
                            <p>Pronóstico: ${data.weather[0].description}</p>
                            <p>Temp máx: ${data.main.temp_max.toFixed(0)}°C</p>
                            <p>Temp mín: ${data.main.temp_min.toFixed(0)}°C</p>   
                        </div>`
        
             $("#formentera").append(contenido);                                          

             $("#climaIsla2").css("color", "#2284E6") //uso de css en clima
                             .css("fontSize", "1rem")
                             .css("padding", "4rem")
                             .slideUp(5)
                             .slideDown(3000);
                             
 

 })

})



let urlClimaMallorca = "https://api.openweathermap.org/data/2.5/weather?q=Palma&units=metric&appid=85af83e8354fd0cc1b31c0b7abbbf37a&lang=es";

$("#climaMallorca").click(function(){

    $.get( urlClimaMallorca , function(data){
        
        console.log(data);
        console.log(data.weather[0].description);
        let iconoClima = data.weather[0].icon;
        let iconoUrl = "https://openweathermap.org/img/wn/" + iconoClima + "@2x.png";
        

        let contenido = `<div id="climaIsla3">
                            <h3>${data.name}</h3>
                            <h3>${data.main.temp.toFixed(0)}°C</h3>
                            <img src="${iconoUrl}">
                            <p>Pronóstico: ${data.weather[0].description}</p>
                            <p>Temp máx: ${data.main.temp_max.toFixed(0)}°C</p>
                            <p>Temp mín: ${data.main.temp_min.toFixed(0)}°C</p>   
                        </div>`
        
             $("#mallorca").append(contenido);

             $("#climaIsla3").css("color", "#2284E6") //uso de css en clima
                             .css("fontSize", "1rem")
                             .css("padding", "4rem")
                             .slideUp(5)
                             .slideDown(3000);


 })

})



let urlClimaMenorca = "https://api.openweathermap.org/data/2.5/weather?lat=39.9997&lon=3.835&units=metric&appid=85af83e8354fd0cc1b31c0b7abbbf37a&lang=es";

$("#climaMenorca").click(function(){

    $.get( urlClimaMenorca , function(data){
        
        console.log(data);
        console.log(data.weather[0].description);
        let iconoClima = data.weather[0].icon;
        let iconoUrl = "https://openweathermap.org/img/wn/" + iconoClima + "@2x.png";
        

        let contenido = `<div id="climaIsla4">
                            <h3>${data.name}</h3>
                            <h3>${data.main.temp.toFixed(0)}°C</h3>
                            <img src="${iconoUrl}">
                            <p>Pronóstico: ${data.weather[0].description}</p>
                            <p>Temp máx: ${data.main.temp_max.toFixed(0)}°C</p>
                            <p>Temp mín: ${data.main.temp_min.toFixed(0)}°C</p>   
                        </div>`
        
             $("#menorca").append(contenido);

             $("#climaIsla4").css("color", "#2284E6") //uso de css en clima
                             .css("fontSize", "1rem")
                             .css("padding", "4rem")
                             .slideUp(5)
                             .slideDown(3000);
  

 })

})




