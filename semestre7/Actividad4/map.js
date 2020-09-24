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

const icono2 = L.icon({
    iconUrl: "./Map_marker2.png",
    iconSize: [50, 60],
    iconAnchor: [30, 60],
    popupAnchor: [-3, -76],
  });

const map = L.map("map").setView([37.786617, -122.404654], 5);

L.tileLayer(tilesProvider, {
  maxZoom: 17,
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
}).addTo(map);

map.doubleClickZoom.disable();

$("#txtNumero").change(function (e) {
  e.preventDefault();
  numeroPuntos = document.getElementById("txtNumero").value;
  contador = 0;
  puntos = [];
});

map.on("dblclick", function (e) {
  if (numeroPuntos > 2) {
    if (contador < numeroPuntos) {
      let latLng = map.mouseEventToLatLng(e.originalEvent);
      contador++;
      puntos.push({ lat: latLng.lat, lng: latLng.lng });
      
      if(banderaIcono)
      {
        L.marker([latLng.lat, latLng.lng], { icon: icono1 }).addTo(map);
        banderaIcono = !banderaIcono;
      }
      else {
        L.marker([latLng.lat, latLng.lng], { icon: icono2 }).addTo(map);
        banderaIcono = !banderaIcono;
      }

      if (contador == numeroPuntos) {
        guardarYMostrarPoligono(puntos);   
      }
    }

  }
  else{
      alert('Se necesitan minimo 3 marcadores')
  }
});


async function guardarYMostrarPoligono(puntos)
{
    var poligono = [];
    puntos.forEach((element) => {

        poligono.push([element.lat, element.lng]);
    });
    const res = await db.collection('Poligonos').add({
        coordenadas: JSON.stringify(poligono)
      }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        L.polygon(poligono).addTo(map);
     }).catch(function(error) {
        console.error("Error adding document: ", error);
    });

}
