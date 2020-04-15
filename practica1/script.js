function initMap() {
    // The location of Uluru
    var uluru = {
        lat: 25.774,
        lng: -80.190
    };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 14,
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
    new google.maps.Polygon({
        map: map,
        paths: redCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        draggable: true,
    });
}