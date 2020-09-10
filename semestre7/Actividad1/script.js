const mapLeaflet = L.map('mapLeaflet').setView([26.926088, -101.424841], 20);
const customIcon = L.icon({
    iconUrl: 'https://i.pinimg.com/originals/90/a1/11/90a111619c271f5c44aeae01b51e4848.gif',
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapLeaflet);
L.marker([26.926088, -101.424841], {icon: customIcon}).addTo(mapLeaflet)