var initMap = () => {
    var pos = {
        lat: 21.152639,
        lng: -101.711598
    };
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 16,
            center: pos
        });
    info = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            info.setPosition(pos)
            info.setContent("<img src='https://www.weber.com/on/demandware.static/Sites-MX-Site/-/default/dwef5681a3/images/logo.png'>")
            info.open(map)
            map.setCenter(pos)
        });
    } else {
        console.error("No permitido")
    }
}