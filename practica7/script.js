var map;

var coordenadas = {
    lat: 26.926088,
    lng: -101.424841
};

var propiedades = {
    center: coordenadas,
    zoom: 20
};

function obtieneDatos() {
    map = new google.maps.Map(document.getElementById("map"), propiedades);

    new google.maps.Marker({
        position: coordenadas,
        scaledSize: new google.maps.Size(50, 50),
        map: map
    });
}

var mapLeaflet = L.map('mapLeaflet').setView([26.926088, -101.424841], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapLeaflet);

L.marker([26.926088, -101.424841]).addTo(map)