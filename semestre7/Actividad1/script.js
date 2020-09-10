const mapLeaflet = L.map('mapLeaflet').setView([26.926088, -101.424841], 20);
const customIcon = L.icon({
    iconUrl: 'https://www.interbolivia.com/wp-content/uploads/2018/12/pulse.gif',
    iconSize: [32, 32],
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapLeaflet);
L.marker([26.926088, -101.424841], {icon: customIcon}).addTo(mapLeaflet)