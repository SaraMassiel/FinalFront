
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PanelFormulario from '../componentes/PanelFormulario'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { iniciarSesion } from '../Services/servicioAuth.js'

const IMAGEN = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85'

export function Login() {
  const navegar = useNavigate()
  const { estaLogueado, guardarSesion } = useSesion()

  const [datos, setDatos] = useState({
    correo: '',
    contraseña: '',
  })

  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mostrarContraseña, setMostrarContraseña] = useState(false)

  if (estaLogueado) {
    return <Navigate to="/home" replace />
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError('')

    if (!datos.correo.trim() || !datos.contraseña) {
      setError('Completa tu correo electrónico y contraseña.')
      return
    }

    setEnviando(true)

    try {
      const usuario = await iniciarSesion(
        datos.correo.trim(),
        datos.contraseña
      )

      guardarSesion(usuario)
      navegar('/home')
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'No fue posible iniciar sesión. Verifica tus datos.'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <PanelFormulario
      imagen={IMAGEN}
      titulo="Vivir bien empieza aquí."
      subtitulo="Tu comunidad, tus espacios, tus momentos. Todo comienza con una experiencia sencilla."
    >
      <div className="paseo-login">
        <Link to="/" className="paseo-login-back">
          <i className="bi bi-arrow-left me-2" />
          Crear una cuenta
        </Link>

        <div className="paseo-login-heading">
          <span className="paseo-login-eyebrow">
            <span />
            BIENVENIDO A PASEO
          </span>

          <h2>
            Qué bueno tenerte
            <br />
            <em>de vuelta.</em>
          </h2>

          <p>Ingresa a tu cuenta para continuar.</p>
        </div>

        {error && (
          <div className="paseo-login-alert" role="alert">
            <i className="bi bi-exclamation-circle-fill" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={manejarEnvio}>
          <div className="paseo-login-field">
            <label htmlFor="login-correo">
              Correo electrónico
            </label>

            <div className="paseo-login-input">
              <i className="bi bi-envelope" />

              <input
                id="login-correo"
                type="email"
                name="correo"
                placeholder="nombre@correo.com"
                value={datos.correo}
                onChange={manejarCambio}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="paseo-login-field">
            <label htmlFor="login-contrasena">
              Contraseña
            </label>

            <div className="paseo-login-input">
              <i className="bi bi-lock" />

              <input
                id="login-contrasena"
                type={mostrarContraseña ? 'text' : 'password'}
                name="contraseña"
                placeholder="Ingresa tu contraseña"
                value={datos.contraseña}
                onChange={manejarCambio}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="paseo-login-eye"
                onClick={() => setMostrarContraseña((anterior) => !anterior)}
                aria-label={
                  mostrarContraseña
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
              >
                <i
                  className={
                    mostrarContraseña
                      ? 'bi bi-eye-slash'
                      : 'bi bi-eye'
                  }
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="paseo-login-button"
            disabled={enviando}
          >
            {enviando ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                />
                Ingresando...
              </>
            ) : (
              <>
                Iniciar sesión
                <i className="bi bi-arrow-right ms-2" />
              </>
            )}
          </button>
        </form>

        <div className="paseo-login-divider">
          <span />
          <i className="bi bi-flower1" />
          <span />
        </div>

        <p className="paseo-login-register">
          ¿Aún no tienes una cuenta?
          <br />
          <Link to="/">
            Regístrate aquí
            <i className="bi bi-arrow-up-right ms-1" />
          </Link>
        </p>

        <div className="paseo-login-security">
          <i className="bi bi-shield-check" />
          Tu comunidad, más cerca.
        </div>
      </div>
    </PanelFormulario>
  )
}

export default Login
