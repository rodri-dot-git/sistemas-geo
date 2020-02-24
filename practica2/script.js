var navegador = document.getElementById("navegador");
var datos = navegador.getElementsByTagName("li");

var obtieneDatos = () => {
    datos[0].innerHTML = `Nombre del navegador es: ${navigator.appCodeName}`;
    datos[1].innerHTML = `La versión del navegador es: ${navigator.appVersion}`;
    datos[2].innerHTML = `Estatus de internet: ${navigator.onLine ? "Conectado" : "Sin Conexion"}`;
    datos[3].innerHTML = `Plataforma: ${navigator.platform}`;
}
var limpiar = () => {
    datos[0].innerHTML = "";
    datos[1].innerHTML = "";
    datos[2].innerHTML = "";
    datos[3].innerHTML = "";
}