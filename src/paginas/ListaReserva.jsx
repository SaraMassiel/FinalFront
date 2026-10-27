
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarReservas as obtenerReservas } from '../Services/servicioReserva.js'
import { TarjetaReserva } from '../componentes/TarjetaReserva'
import '../estilos.css'

export function ListaReserva() {
  const [reservas, setReservas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarReservas() {
      try {
        const datos = await obtenerReservas()
        setReservas(datos)
      } catch (error) {
        console.error('Error al cargar reservas:', error)
        setError('No fue posible cargar las reservas.')
      } finally {
        setCargando(false)
      }
    }

    cargarReservas()
  }, [])

  return (
    <main className="lista-reservas-page">
      <header className="lista-reservas-header">
        <Link to="/home" className="reservas-volver">
          <i className="bi bi-arrow-left" />
          Volver a Home
        </Link>

        <span className="lista-reservas-eyebrow">
          PASEO · VIDA EN COMUNIDAD
        </span>

        <h1>Reservas <em>de la comunidad</em></h1>

        <p>Consulta las reservas registradas en tus espacios compartidos.</p>
      </header>

      <section className="lista-reservas-contenido">
        {cargando && (
          <p className="reservas-mensaje">
            Cargando reservas...
          </p>
        )}

        {!cargando && error && (
          <div className="reservas-error">
            {error}
          </div>
        )}

        {!cargando && !error && reservas.length === 0 && (
          <div className="reservas-vacias">
            <i className="bi bi-calendar2-check" />
            <h2>Aún no hay reservas</h2>
            <p>Cuando haya reservas registradas, aparecerán aquí.</p>
            <Link to="/home" className="reservas-boton">
              Regresar a Home
            </Link>
          </div>
        )}

        {!cargando && !error && reservas.length > 0 && (
          <div className="row g-4">
            {reservas.map((reserva) => (
              <div className="col-12 col-md-6 col-xl-4" key={reserva.id}>
                <TarjetaReserva reserva={reserva} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ListaReserva
