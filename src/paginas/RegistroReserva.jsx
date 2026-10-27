
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PanelFormulario from '../componentes/PanelFormulario'
import { guardarReserva } from '../Services/servicioReserva.js'

const IMAGEN =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80'

function RegistroReserva() {
  const navegar = useNavigate()

  const [reserva, setReserva] = useState({
    fecha: '',
    tiempo: '',
  })

  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)

  const obtenerFechaLocal = () => {
    const hoy = new Date()
    const anio = hoy.getFullYear()
    const mes = String(hoy.getMonth() + 1).padStart(2, '0')
    const dia = String(hoy.getDate()).padStart(2, '0')

    return `${anio}-${mes}-${dia}`
  }

  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setReserva((anterior) => ({
      ...anterior,
      [name]: value,
    }))

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: '',
      general: '',
    }))
  }

  const validar = () => {
    const nuevosErrores = {}

    if (!reserva.fecha) {
      nuevosErrores.fecha = 'Selecciona una fecha.'
    } else if (reserva.fecha < obtenerFechaLocal()) {
      nuevosErrores.fecha = 'La fecha no puede ser anterior a hoy.'
    }

    if (!reserva.tiempo) {
      nuevosErrores.tiempo = 'Selecciona una hora.'
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

    setCargando(true)

    try {
      await guardarReserva(reserva)
      navegar('/home')
    } catch (error) {
      setErrores({
        general:
          error?.message || 'No fue posible registrar la reserva. Inténtalo nuevamente.',
      })
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="reserva-paseo">
      <PanelFormulario
        imagen={IMAGEN}
        titulo="Un espacio para disfrutar."
        subtitulo="Elige el día y la hora para disfrutar de las zonas comunes de PASEO."
        enlaceVolver="/home"
      >
        <div className="reserva-paseo-encabezado">
          <span className="reserva-paseo-etiqueta">
            <i className="bi bi-calendar2-check" />
            TU COMUNIDAD, TU ESPACIO
          </span>

          <h2>Nueva reserva</h2>
          <p>Planea tu próximo momento especial.</p>
        </div>

        {errores.general && (
          <div className="reserva-paseo-error" role="alert">
            <i className="bi bi-exclamation-circle" />
            {errores.general}
          </div>
        )}

        <form onSubmit={manejarEnvio} noValidate>
          <div className="reserva-paseo-campo">
            <label htmlFor="fecha">Fecha de uso</label>

            <div className={`reserva-paseo-input ${errores.fecha ? 'tiene-error' : ''}`}>
              <i className="bi bi-calendar-event" />
              <input
                id="fecha"
                type="date"
                name="fecha"
                min={obtenerFechaLocal()}
                value={reserva.fecha}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.fecha)}
                aria-describedby={errores.fecha ? 'error-fecha' : undefined}
              />
            </div>

            {errores.fecha && (
              <small id="error-fecha" className="reserva-paseo-ayuda-error">
                {errores.fecha}
              </small>
            )}
          </div>

          <div className="reserva-paseo-campo">
            <label htmlFor="tiempo">Hora de inicio</label>

            <div className={`reserva-paseo-input ${errores.tiempo ? 'tiene-error' : ''}`}>
              <i className="bi bi-clock" />
              <input
                id="tiempo"
                type="time"
                name="tiempo"
                value={reserva.tiempo}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.tiempo)}
                aria-describedby={errores.tiempo ? 'error-tiempo' : undefined}
              />
            </div>

            {errores.tiempo && (
              <small id="error-tiempo" className="reserva-paseo-ayuda-error">
                {errores.tiempo}
              </small>
            )}
          </div>

          <div className="reserva-paseo-nota">
            <i className="bi bi-info-circle" />
            <p>Verifica la fecha y la hora antes de confirmar tu solicitud.</p>
          </div>

          <button
            type="submit"
            className="reserva-paseo-boton"
            disabled={cargando}
          >
            {cargando ? (
              <>
                <span className="reserva-paseo-spinner" />
                Registrando reserva...
              </>
            ) : (
              <>
                Confirmar reserva
                <i className="bi bi-arrow-right" />
              </>
            )}
          </button>
        </form>

        <p className="reserva-paseo-pie">
          <i className="bi bi-shield-check" />
          Una experiencia más sencilla, en comunidad.
        </p>
      </PanelFormulario>
    </div>
  )
}

export default RegistroReserva
