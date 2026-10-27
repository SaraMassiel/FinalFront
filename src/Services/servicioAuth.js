
import clienteApi from './ClienteApi.js'

export async function iniciarSesion(correo, contraseña) {
  const respuesta = await clienteApi.post('/usuarios/login', {
    correo: correo.trim(),
    contraseña
  })

  return respuesta.data
}
