var x = document.getElementById("x");
var y = document.getElementById("y");

var obtieneDatos = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(escribeDatos);
    } else {
        x.innerHTML = "El navegador no dispone la capacidad de geolocalización";
    }
    
}

var escribeDatos = (pos) => {
    x.innerHTML = ""
    y.innerHTML = ""
    x.innerHTML = `Latitud: ${pos.coords.latitude}`
    y.innerHTML = `Longitud: ${pos.coords.longitude}`
}