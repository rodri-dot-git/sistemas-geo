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
    <tr id="${doc.id}">
        <td>
            <button class="btn btn-danger" onclick='borrar("${doc.id}")'>
            <i class="far fa-trash-alt"></i>
            </button>
            <button class="btn btn-success" onclick="editar('${doc.id}')">
            <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-primary" style="visibility: hidden" id="save${doc.id}" disabled="true" onclick="save('${doc.id}')">
            <i class="fas fa-save"></i>
            </button>
        </td>
        <td>
            <input id="nombre${doc.id}" type="text" value="${doc.data().nombre}" readonly="true" class="form-control"/>
        </td>
        <td>
            <input id="codigo${doc.id}" type="text" value="${doc.data().codigo}" readonly="true" class="form-control"/>
        </td>
    </tr>`)
    $("#tabla").append(item);
}

var editar = (id) => {
    $(`#nombre${id}`).attr("readonly", false)
    $(`#codigo${id}`).attr("readonly", false)
    $(`#save${id}`).prop("disabled", false)
    $(`#save${id}`).css('visibility','visible')
}

var save = (id) => {
    db.collection("productos")
        .doc(id)
        .set({
            nombre: $(`#nombre${id}`).val(),
            codigo: $(`#codigo${id}`).val()
        });
    $(`#nombre${id}`).attr("readonly", true)
    $(`#codigo${id}`).attr("readonly", true)
    $(`#save${id}`).prop("disabled", true)
    $(`#save${id}`).css('visibility','hidden')

}

var guardar = () => {
    var nombre = $("#nombre").val()
    var codigo = $("#clave").val()
    if (codigo.trim().length < 1)
        alert("No puede ser vacio")
    else if (nombre.trim().length < 1)
        alert("No puede ser vacio")
    else
        commit(nombre, codigo)

}

var commit = (nombre, codigo) => {
    db.collection('productos').add({
        nombre: nombre,
        codigo: codigo
    });

    $("#nombre").val('');
    $("#clave").val('');
}

var borrar = (id) => {
    db.collection('productos').doc(id).delete();
}