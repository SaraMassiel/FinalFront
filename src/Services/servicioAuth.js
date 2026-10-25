import { listarUsuarios } from './servicioUsuarios'

export async function iniciarSesion (correo, contraseña) {
    const usuarios = await listarUsuarios()

    function evaluarElMismoCorreo (usuario) {
        return usuario.correo.toLowerCase() == correo.toLowerCase()
    }

    const usuarioEncontrado = usuarios.find(evaluarElMismoCorreo)

    if (!usuarioEncontrado) {
        throw new Error('correo o contraseña incorrectos')
    }

    return usuarioEncontrado
}

