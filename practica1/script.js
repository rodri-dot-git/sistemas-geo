function initMap() {
    // The location of Uluru
    var uluru = {
        lat: 25.774,
        lng: -80.190
    };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    // The marker, positioned at Uluru
    // var marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map
    // });


    var bermudaTriangle;

    map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);

    var triangleCoords = [
        new google.maps.LatLng(25.774252, -80.190262),
        new google.maps.LatLng(18.466465, -66.118292),
        new google.maps.LatLng(32.321384, -64.75737)
    ];

    bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#FF0000",
        fillOpacity: 0.35
    });

    google.maps.event.addListener(bermudaTriangle, 'mouseover', function () {
        bermudaTriangle.setOptions({
            editable: true
        });
    });
    google.maps.event.addListener(bermudaTriangle, 'mouseout', function () {
        bermudaTriangle.setOptions({
            editable: false
        });
    });

    bermudaTriangle.setMap(map);

    // Add a listener for the click event
    google.maps.event.addListener(bermudaTriangle, 'click', showArrays);

    infowindow = new google.maps.InfoWindow();
}

function showArrays(event) {

    // Since this Polygon only has one path, we can call getPath()
    // to return the MVCArray of LatLngs
    var vertices = this.getPath();

    var contentString = "<b>Bermuda Triangle Polygon</b><br />";
    contentString += "Clicked Location: <br />" + event.latLng.lat() + "," + event.latLng.lng() + "<br />";

    // Iterate over the vertices.
    for (var i = 0; i < vertices.length; i++) {
        var xy = vertices.getAt(i);
        contentString += "<br />" + "Coordinate: " + i + "<br />" + xy.lat() + "," + xy.lng();
    }

    // Replace our Info Window's content and position
    infowindow.setContent(contentString);
    infowindow.setPosition(event.latLng);

    infowindow.open(map);
}  
}