var map;

var coordenadas = {
    lat: 0,
    lng: 0
};

var propiedades = {
    center: coordenadas,
    zoom: 2
};

var obtieneDatos = async () => {
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
            <strong>País o provincia:</strong> ${lugar["Province/State"].length > 0 ? lugar["Province/State"] : lugar["Country/Region"]} <br/>
            <strong>Casos confirmados: </strong>${lugar.Confirmed} <br/>
            <strong>Muertes: </strong>${lugar.Deaths} <br/>
            <strong>Recuperados: </strong>${lugar.Recovered} <br/>
            `
                let infowindow = new google.maps.InfoWindow({
                    content: info
                })
                let marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(lugar.Latitude, lugar.Longitude),
                    title: "Marcador"
                })
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            })
        })
        .then(setMapOnAll(null))
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

var csvJSON = (csv) => {
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

