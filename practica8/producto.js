class Producto {
    constructor(id, nombre, codigo) {
        this.Id = id
        this.Nombre = nombre
        this.Codigo = codigo
    }

    editar = () => {
        try {
            db.collection("productos")
            .doc(this.Id)
            .update({
                nombre: this.Nombre,
                codigo: this.Codigo
            })
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    borrar = () => {
        try {
            db.collection('productos').doc(this.Id).delete()
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    guardar = () => {
        try {
            db.collection('productos').add({
                nombre: this.Nombre,
                codigo: this.Codigo
            })
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}