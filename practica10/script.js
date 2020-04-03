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

    var icono = {
        url: "https://www.interbolivia.com/wp-content/uploads/2018/12/pulse.gif", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        icon: icono,
        scaledSize: new google.maps.Size(50, 50),
        map: map
    });

    if (navigator.geolocation) {
        setInterval(function () {
            moverPosicion(marker);
        }, 3000);
    }
}

function moverPosicion(marker) {
    navigator.geolocation.getCurrentPosition(posicion => {
        var pos = {
            lat: posicion.coords.latitude,
            lng: posicion.coords.longitude
        };

        marker.setPosition(
            new google.maps.LatLng(
                posicion.coords.latitude,
                posicion.coords.longitude
            )
        );
        map.panTo(
            new google.maps.LatLng(
                posicion.coords.latitude,
                posicion.coords.longitude
            )
        );

        map.setCenter(pos);
    });
}
