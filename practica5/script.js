var initMap = () => {
    var pos = {
        lat: 21.152639,
        lng: -101.711598
    };
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 14,
            center: pos
        });
    info = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((posi) => {
            position = {
                lat: posi.coords.latitude,
                lng: posi.coords.latitude
            }
            info.setPosition(position)
            info.setContent("<img src='https://www.weber.com/on/demandware.static/Sites-MX-Site/-/default/dwef5681a3/images/logo.png'>")
            info.open(map)
        });
    } else {
        console.error("No permitido")
    }
}