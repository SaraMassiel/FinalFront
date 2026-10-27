import clienteApi from './ClienteApi.js';

const RUTA = '/espacios'

export async function guardarEspacio (espacio) {
    try {
        const respuesta = await clienteApi.post(RUTA, espacio)
        return respuesta.data
    } catch (error) {
        console.error ("Error al guardar el espacio:", error)
        throw error
    }
}

export async function listarEspacio(espacio) {
    try {
        const respuesta = await clienteApi.get(RUTA)
        return respuesta.data
    } catch (error) {
        console.error ("Error al listar los espacios:", error)
        throw error
    }
}

export async function modificarEspacio (id, espacio) {
    try {
        const respuesta = await clienteApi.put(RUTA + '/' + id, espacio)
        return respuesta.data
    } catch (error) { 
        console.error ("Error al modificar el espacio:", error)
        throw error
    }
}

export async function eliminarEspacio (id) {
    try {
        const respuesta = await clienteApi.delete(RUTA + '/' + id)
        return respuesta.data
    } catch (error) { 
        console.error ("Error al eliminar el espacio:", error)
        throw error
    }
}
