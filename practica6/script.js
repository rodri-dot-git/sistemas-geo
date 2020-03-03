var firebaseConfig = {
    apiKey: "AIzaSyCbrFacBl0_rdGLFq_f5hAUzebOIQiKBmc",
    authDomain: "sistemas-geo-issc611.firebaseapp.com",
    databaseURL: "https://sistemas-geo-issc611.firebaseio.com",
    projectId: "sistemas-geo-issc611",
    storageBucket: "sistemas-geo-issc611.appspot.com",
    messagingSenderId: "491212432371",
    appId: "1:491212432371:web:a45f32b897897cc7d0e886"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

$(document).ready(function () {
    db.collection('productos').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                renderProductos(change.doc);
            } else if (change.type == 'removed') {
                $(`#${change.doc.id}`).remove()
            }
        });
    });
});

var renderProductos = (doc) => {
    var item = $(`
    <div class="row" style="margin: 5px" id="${doc.id}">
    <button class="col-1 btn btn-danger" onclick='borrar("${doc.id}")'>
    <i class="far fa-trash-alt"></i></button>
    <h3>
    <label class="col label label-default">${doc.data().nombre} ${doc.data().codigo}</label>
    </h3>
    </div>`)
    $("#contenedor").append(item);
}

var guardar = () => {
    db.collection('productos').add({
        nombre: $("#nombre").val(),
        codigo: $("#clave").val()
    });

    $("#nombre").val('');
    $("#clave").val('');
}

var borrar = (id) => {
    db.collection('productos').doc(id).delete();
}