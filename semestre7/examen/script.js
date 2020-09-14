const mapLeaflet = L.map('mapLeaflet').setView([26.926088, -101.424841], 20);
const customIcon = L.icon({
    iconUrl: 'https://www.interbolivia.com/wp-content/uploads/2018/12/pulse.gif',
    iconSize: [32, 32],
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapLeaflet);
L.marker([26.926088, -101.424841], {icon: customIcon}).addTo(mapLeaflet)


const tilesProvider = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

var contador = 0;
var numeroPuntos = 0;
var puntos = [];
const newIcon = L.icon({
    iconUrl:'./Map_marker.png',
    iconSize:[30,60],
    iconAnchor:[30,60],
    popupAnchor:[-3,-76]
})

const map = L.map('map').setView([37.786617, -122.404654], 5);

L.tileLayer(tilesProvider, {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

map.doubleClickZoom.disable();

  $('#txtNumero').change(function (e) { 
      e.preventDefault();
    numeroPuntos = document.getElementById('txtNumero').value;
    contador = 0;
    puntos = [];
  });


  map.on('dblclick',function(e){
    let latLng = map.mouseEventToLatLng(e.originalEvent)
    contador++;
    puntos.push({lat: latLng.lat, lng: latLng.lng});
    L.marker([latLng.lat,latLng.lng],{icon: newIcon}).addTo(map)

    if(contador == numeroPuntos)
    {        
        var polygonPoints = [];
        puntos.forEach(element => {
            polygonPoints.push([element.lat, element.lng])
        });
        L.polygon(polygonPoints).addTo(map);
    }

})