const tilesProviders = [
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "https://tile.osm.ch/switzerland/{z}/{x}/{y}.png",
  "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
];
var contador = 0;
var iconoBandera = true;
const icono1 = L.icon({
  iconUrl: "./marca1.png",
  iconSize: [30, 60],
  iconAnchor: [30, 60],
  popupAnchor: [-3, -76],
});
const icono2 = L.icon({
  iconUrl: "./marca2.png",
  iconSize: [30, 60],
  iconAnchor: [30, 60],
  popupAnchor: [-3, -76],
});

const map = L.map("map").setView([37.786617, -122.404654], 5);

L.tileLayer(tilesProviders[0], {
  maxZoom: 17,
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
}).addTo(map);

map.doubleClickZoom.disable();

$("#sltTiles").change(function (e) {
  e.preventDefault();

  L.tileLayer(tilesProviders[this.value], {
    maxZoom: 17,
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  }).addTo(map);
});

map.on("dblclick", function (e) {
  let latLng = map.mouseEventToLatLng(e.originalEvent);
  if (contador % 3 === 0) {
    iconoBandera = !iconoBandera
  } 
  if(iconoBandera)
  {
    L.marker([latLng.lat, latLng.lng], { icon: icono1 }).addTo(map);
  }
  else {
    L.marker([latLng.lat, latLng.lng], { icon: icono2}).addTo(map);
  }
  contador++;

});

function reiniciarValores()
{

    map.eachLayer((layer) => {
        layer.remove();
      });

      contador = 0;
      $("#sltTiles").val(0);

    L.tileLayer(tilesProviders[0], {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      }).addTo(map);

     
}
