var map;

var coordenadas = {
    lat: 0,
    lng: 0
};

var propiedades = {
    center: coordenadas,
    zoom: 20
};

function obtieneDatos() {
    map = new google.maps.Map(document.getElementById("map"), propiedades);
    var d = new Date()
    d.setDate(d.getDate() - 1)
    d = d.format('m-d-Y')
    // fetch(`https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/${d}.csv`, {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     dataType: 'text/csv'
    // })
    //     .then(response => console.log(response))
    //     .then(data => {
    //     console.log(data)
    //     })
    //     .catch(error => console.log(error))
    fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${d}.csv`, {
            method: 'GET',
            mode: 'no-cors',
            dataType: 'text/csv'
        })
    .then((response) => {
        console.log(response)
        //d3.csvParse(response.text)
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
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

