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
    tablaProductos.append(item);
}

var borrar = (id) => {
    var producto = new Producto(id, null, null)
    producto.borrar()
}

var editar = (id) => {
    $(`#nombre${id}`).attr("readonly", false)
    $(`#codigo${id}`).attr("readonly", false)
    $(`#save${id}`).prop("disabled", false)
    $(`#save${id}`).css('visibility','visible')
}

var save = (id) => {
    var producto = new Producto(id, $(`#nombre${id}`).val(), $(`#codigo${id}`).val())
    var x = producto.editar()
    if (x){
        $(`#nombre${id}`).attr("readonly", true)
        $(`#codigo${id}`).attr("readonly", true)
        $(`#save${id}`).prop("disabled", true)
        $(`#save${id}`).css('visibility','hidden')
    }
}

formAgregar.submit(function( event ) {
    debugger;
    event.preventDefault()
    var producto = new Producto(null, $('input[name=nombre]').val(), $('input[name=codigo]').val())
    producto.guardar()
    $('input[name=nombre]').val('')
    $('input[name=codigo]').val('')
    $('#ventanaAgregar').modal('hide');
});