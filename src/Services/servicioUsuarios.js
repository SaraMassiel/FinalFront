import {clienteApi} from './ClienteApi';

const RUTA = '/usuarios'

export async function guardarUsuario (usuario) {
    try {
        const respuesta = await clienteApi.post(RUTA, usuario)
        return respuesta.data
    } catch (error) {
        console.error ("Error al guardar el usuario:", error)
        throw error
    }
}

export async function listarUsuario (usuario) {
    try {
        const respuesta = await clienteApi.get(RUTA)
        return respuesta.data
    } catch (error) {
        console.error ("Error al listar los usuarios:", error)
        throw error
    }
}

export async function modificiarUsuario (id, usuario) {
    try {
        const respuesta = await clienteApi.put(RUTA + '/' + id, usuario)
        return respuesta.data
    } catch (error) { 
        console.error ("Error al modificar el usuario:", error)
        throw error
    }
}

export async function eliminarUsuario (id) {
    try {
        const respuesta = await clienteApi.delete(RUTA + '/' + id)
        return respuesta.data
    } catch (error) { 
        console.error ("Error al eliminar el usuario:", error)
        throw error
    }
}

