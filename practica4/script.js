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
    var lat = pos.coords.latitude
    var lon = pos.coords.longitude
    x.innerHTML = ""
    y.innerHTML = ""
    x.innerHTML = `Latitud: ${lat}`
    y.innerHTML = `Longitud: ${lon}`
    initMap(lat, lon);
}

var initMap = (x, y) => {
    document.getElementById("map").src = `https://maps.googleapis.com/maps/api/staticmap?
    center=&zoom=13&scale=1&size=400x600&maptype=roadmap&key=AIzaSyD0Baz4xew2xXaKDxZPdRqmKWg0XidiktE&
    format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:Rodrigo%7C${x},+${y}`;
}