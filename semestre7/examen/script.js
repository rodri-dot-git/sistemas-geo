const tilesProvider = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

const tilesArray = ['https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png'];

var contador = 0;
var numeroPuntos = 0;
var puntos = [];
const newIcon = L.icon({
    iconUrl: './Map_marker.png',
    iconSize: [64, 64],
    iconAnchor: [64, 64],
    popupAnchor: [-3, -76]
})

const mapProperties = {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
};
const map = L.map('mapLeaflet').setView([37.786617, -122.404654], 5);
const map2 = L.map('mapLeaflet2').setView([37.786617, -122.404654], 5);

L.tileLayer(tilesProvider, mapProperties).addTo(map);

L.tileLayer(tilesProvider, mapProperties).addTo(map2);

map.doubleClickZoom.disable();

$('#txtNumero').change(function (e) {
    e.preventDefault();
    numeroPuntos = document.getElementById('txtNumero').value;
    contador = 0;
    puntos = [];
});

map.on('dblclick', function (e) {
    let latLng = map.mouseEventToLatLng(e.originalEvent)
    contador++;
    puntos.push({ lat: latLng.lat, lng: latLng.lng });
    L.marker([latLng.lat, latLng.lng], { icon: newIcon }).addTo(map)

    if (contador == numeroPuntos && contador >= 10) {
        var polygonPoints = [];
        puntos.forEach(element => {
            polygonPoints.push([element.lat, element.lng])
        });
        L.polygon(polygonPoints).addTo(map);
        L.polygon(polygonPoints).addTo(map2);
        L.tileLayer(tilesArray[Math.floor(Math.random() * 3)], mapProperties).addTo(map);  
        L.tileLayer(tilesArray[Math.floor(Math.random() * 3)], mapProperties).addTo(map2);  
    }

})