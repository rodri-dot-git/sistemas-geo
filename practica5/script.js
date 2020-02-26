var initMap = () => {
    var pos = {
        lat: 21.152639,
        lng: -101.711598
    };
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: pos
        });
    var info = google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            position = {
                lat: pos.coords.latitude,
                lng: pos.coords.latitude
            }
            info.setPosition(position)
            info.setContent(HTML)
            info.open(map)
        });
    } else {
        console.error("No permitido")
    }
}