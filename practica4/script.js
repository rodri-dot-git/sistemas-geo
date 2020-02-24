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
    var dir = {
        lat: parseFloat(x),
        lng: parseFloat(y)
    };
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: dir
        });
    var marker = new google.maps.Marker({
        position: dir,
        map: map
    });
}