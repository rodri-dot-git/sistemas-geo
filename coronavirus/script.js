var map
var markers = []

const query = window.location.search

const urlParams = new URLSearchParams(query)
const idioma = urlParams.get('idioma')
if (idioma.length == 0) {
    idioma = 'es'
}

document.getElementById('idioma').value = idioma

var script = document.createElement('script')
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD0Baz4xew2xXaKDxZPdRqmKWg0XidiktE&callback=obtieneDatos&language=${idioma}`
document.head.appendChild(script)

var coordenadas = {
    lat: 0,
    lng: 0
};

var propiedades = {
    center: coordenadas,
    zoom: 3
}

function obtieneDatos(){
    map = new google.maps.Map(document.getElementById("map"), propiedades);
    var d = new Date()
    d.setDate(d.getDate() - 1)
    d = d.format('m-d-Y')
    fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${d}.csv`)
    .then((response) => response.text())
    .then((data) => {
        var datos = csvJSON(data)
        datos.forEach(lugar => {
            let info = `
            <strong>País o provincia:</strong> ${lugar.Combined_Key} <br/>
            <strong>Casos confirmados totales: </strong>${lugar.Confirmed} <br/>
            <strong>Muertes: </strong>${lugar.Deaths} <br/>
            <strong>Recuperados: </strong>${lugar.Recovered} <br/>
            <strong>Activos: </strong>${lugar.Confirmed - lugar.Deaths - lugar.Recovered} <br/>
            `
            let infowindow = new google.maps.InfoWindow({
                content: info
            })
            let marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(lugar.Lat, lugar.Long_),
                title: `${lugar.Combined_Key}"`
            })
            markers.push(marker)
            marker.addListener('click', () => {
                infowindow.open(map, marker);
            })
        })

        var makerCluster = new MarkerClusterer(map, markers, {
            imagePath : 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            maxZoom: 10

        });
    })
}
function csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result
}

function cambiaIdioma(){

}