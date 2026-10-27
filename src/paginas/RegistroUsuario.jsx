
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PanelFormulario from '../componentes/PanelFormulario'
import { guardarUsuario } from '../Services/servicioUsuarios.js'
import { useSesion } from '../contexto/ContextoSesion.jsx'

const IMAGEN =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80'

export function RegistroUsuario() {
  const [errorApi, setErrorApi] = useState('')
  const [cargando, setCargando] = useState(false)
  const navegar = useNavigate()
  const { guardarSesion } = useSesion()

  const [usuario, setUsuario] = useState({
    nombres: '',
    correo: '',
    contraseña: '',
    rol: 'USUARIO',
  })

  const [errores, setErrores] = useState({})

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }))

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: '',
    }))
  }

  function validar() {
    const nuevosErrores = {}

    if (!usuario.nombres.trim()) {
      nuevosErrores.nombres = 'Los nombres son obligatorios.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.correo.trim())) {
      nuevosErrores.correo = 'Ingresa un correo válido.'
    }

    if (usuario.contraseña.length < 6) {
      nuevosErrores.contraseña =
        'La contraseña debe tener mínimo 6 caracteres.'
    }

    return nuevosErrores
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()

    const nuevosErrores = validar()
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    setErrorApi('')
    setCargando(true)

    try {
      const usuarioGuardado = await guardarUsuario({
        ...usuario,
        nombres: usuario.nombres.trim(),
        correo: usuario.correo.trim(),
        rol: 'USUARIO',
      })

      guardarSesion(usuarioGuardado)
      navegar('/home')
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.mensaje ||
        'No fue posible registrar la cuenta. Verifica tus datos e inténtalo de nuevo.'

      setErrorApi(mensaje)
    } finally {
      setCargando(false)
    }
  }

  return (
    <PanelFormulario
      imagen={IMAGEN}
      titulo="Tu unidad residencial, en un solo lugar"
      subtitulo="Reserva zonas comunes y disfruta cada espacio de tu comunidad."
    >
      <div className="registro-paseo">
        <Link to="/login" className="registro-volver">
          <i className="bi bi-arrow-left me-2" />
          Volver al inicio de sesión
        </Link>

        <div className="registro-encabezado">
          <span className="registro-etiqueta">
            <span className="registro-punto" />
            BIENVENIDO A PASEO
          </span>

          <h2>Crea tu cuenta<span>.</span></h2>

          <p>
            Un hogar se disfruta más cuando todo está a tu alcance.
            Regístrate y empieza a descubrir tus espacios.
          </p>
        </div>

        {errorApi && (
          <div className="registro-alerta" role="alert">
            <i className="bi bi-exclamation-circle-fill" />
            <span>{errorApi}</span>
          </div>
        )}

        <form onSubmit={manejarEnvio} noValidate>
          <div className="registro-campo">
            <label htmlFor="registro-nombres">Nombre completo</label>

            <div className={`registro-input ${errores.nombres ? 'registro-input-error' : ''}`}>
              <i className="bi bi-person" />
              <input
                id="registro-nombres"
                type="text"
                name="nombres"
                placeholder="Tu nombre y apellidos"
                autoComplete="name"
                value={usuario.nombres}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.nombres)}
                aria-describedby={errores.nombres ? 'error-nombres' : undefined}
              />
            </div>

            {errores.nombres && (
              <small id="error-nombres" className="registro-error">
                {errores.nombres}
              </small>
            )}
          </div>

          <div className="registro-campo">
            <label htmlFor="registro-correo">Correo electrónico</label>

            <div className={`registro-input ${errores.correo ? 'registro-input-error' : ''}`}>
              <i className="bi bi-envelope" />
              <input
                id="registro-correo"
                type="email"
                name="correo"
                placeholder="tu@correo.com"
                autoComplete="email"
                value={usuario.correo}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.correo)}
                aria-describedby={errores.correo ? 'error-correo' : undefined}
              />
            </div>

            {errores.correo && (
              <small id="error-correo" className="registro-error">
                {errores.correo}
              </small>
            )}
          </div>

          <div className="registro-campo">
            <label htmlFor="registro-contrasena">Contraseña</label>

            <div className={`registro-input ${errores.contraseña ? 'registro-input-error' : ''}`}>
              <i className="bi bi-lock" />
              <input
                id="registro-contrasena"
                type="password"
                name="contraseña"
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                value={usuario.contraseña}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.contraseña)}
                aria-describedby={errores.contraseña ? 'error-contrasena' : undefined}
              />
            </div>

            {errores.contraseña && (
              <small id="error-contrasena" className="registro-error">
                {errores.contraseña}
              </small>
            )}

            <small className="registro-ayuda">
              <i className="bi bi-shield-check me-1" />
              Utiliza al menos 6 caracteres.
            </small>
          </div>

          <div className="registro-rol">
            <span className="registro-rol-icono">
              <i className="bi bi-house-heart" />
            </span>
            <span>
              <strong>Cuenta de residente</strong>
              <small>Podrás consultar y reservar los espacios disponibles.</small>
            </span>
            <i className="bi bi-check-circle-fill registro-rol-check" />
          </div>

          <button
            type="submit"
            className="registro-boton"
            disabled={cargando}
          >
            {cargando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Creando tu cuenta...
              </>
            ) : (
              <>
                Crear mi cuenta
                <i className="bi bi-arrow-right ms-2" />
              </>
            )}
          </button>
        </form>

        <p className="registro-login">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">Inicia sesión</Link>
        </p>

        <div className="registro-privacidad">
          <i className="bi bi-shield-lock" />
          Tu experiencia en comunidad comienza aquí.
        </div>
      </div>
    </PanelFormulario>
  )
}

export default RegistroUsuario
