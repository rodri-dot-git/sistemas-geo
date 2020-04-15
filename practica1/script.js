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


    var redCoords = [
        {lat: 25.774, lng: -80.190},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757}
    ];

      // Construct a draggable red triangle with geodesic set to true.
    var polygon = new google.maps.Polygon({
        map: map,
        paths: redCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        editable: true
    });

    google.maps.event.addListener(polygon.getPath(0), 'insert_at', function() {
        console.log(polygon);
    });
    google.maps.event.addListener(polygon.getPath(0), 'remove_at', function() {
        console.log(polygon);
    });
    google.maps.event.addListener(polygon.getPath(0), 'set_at', function() {
        console.log(polygon);
    });
}