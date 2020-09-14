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
    iconAnchor: [32, 64],
})

const mapProperties = {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
};
const map = L.map('mapLeaflet').setView([37.786617, -122.404654], 5);
L.tileLayer(tilesProvider, mapProperties).addTo(map);

map.doubleClickZoom.disable();

$('#txtNumero').change(function (e) {
    e.preventDefault();
    contador = 0;
    puntos = [];
});

map.on('dblclick', function (e) {
    if (puntos.length < 10){
        let latLng = map.mouseEventToLatLng(e.originalEvent)
        puntos.push({ lat: latLng.lat, lng: latLng.lng });
        L.marker([latLng.lat, latLng.lng], { icon: newIcon }).addTo(map)
    }

    if (puntos.length === 10) {
        const polygonPoints = [];
        let coordenadas = "";
        const map2 = L.map('mapLeaflet2').setView([37.786617, -122.404654], 5);
        L.tileLayer(tilesArray[Math.floor(Math.random() * 3)], mapProperties).addTo(map2);  
        puntos.forEach(element => {
            polygonPoints.push([element.lat, element.lng])
            coordenadas += `lat: ${element.lat}, long: ${element.lng}`;
            L.marker([element.lat, element.lng], { icon: newIcon }).addTo(map2)
        });
        alert(coordenadas);
        L.polygon(polygonPoints).addTo(map);
        L.tileLayer(tilesArray[Math.floor(Math.random() * 3)], mapProperties).addTo(map);  
    }

})