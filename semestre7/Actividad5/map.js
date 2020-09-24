const tilesProvider = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
var contador = 0;
var numeroPuntos = 0;
var puntos = [];
var banderaIcono = true;

const icono1 = L.icon({
  iconUrl: "./Map_marker.png",
  iconSize: [30, 60],
  iconAnchor: [30, 60],
  popupAnchor: [-3, -76],
});

const map = L.map("map").setView([37.786617, -122.404654], 5);

L.tileLayer(tilesProvider, {
  maxZoom: 17,
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
}).addTo(map);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    L.marker([pos.lat, pos.lng], { icon: icono1 }).addTo(map)
    guardarUbicacion(pos.lat, pos.lng, 'Automatico');
  }, error => {
    var latInput = prompt('ingresa latitud');
    var longInput = prompt('ingresa longitud');
    var pos = {
      lat: parseFloat(latInput),
      lng: parseFloat(longInput)
    }
    L.marker([pos.lat, pos.lng], { icon: icono1 }).addTo(map)
    guardarUbicacion(pos.lat, pos.lng, 'Manual');
  });
} else {
  
}

async function guardarUbicacion(latitud, longitud, medio) {
  const res = await db.collection('WatchPosition').add({
    latitud: latitud,
    longitud: longitud,
    tipo: medio
  }).then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}