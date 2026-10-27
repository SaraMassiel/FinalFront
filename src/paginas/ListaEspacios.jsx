
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarEspacio as obtenerEspacios } from '../Services/servicioEspacio.js'
import { TarjetaEspacio } from '../componentes/TarjetaEspacio'
import '../estilos.css'

export function ListaEspacios() {
  const [espacios, setEspacios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarEspacios() {
      try {
        const datos = await obtenerEspacios()
        setEspacios(datos)
      } catch (error) {
        console.error('Error al cargar espacios:', error)
        setError('No fue posible cargar los espacios.')
      } finally {
        setCargando(false)
      }
    }

    cargarEspacios()
  }, [])

  return (
    <main className="lista-espacios-page">
      <header className="lista-espacios-header">
        <Link to="/home" className="espacios-volver">
          <i className="bi bi-arrow-left" />
          Volver a Home
        </Link>

        <span className="lista-espacios-eyebrow">
          PASEO · VIDA EN COMUNIDAD
        </span>

        <h1>Nuestros <em>espacios</em></h1>

        <p>Descubre las zonas comunes disponibles para disfrutar.</p>
      </header>

      <section className="lista-espacios-contenido">
        {cargando && (
          <p className="espacios-mensaje">Cargando espacios...</p>
        )}

        {!cargando && error && (
          <div className="espacios-error">{error}</div>
        )}

        {!cargando && !error && espacios.length === 0 && (
          <div className="espacios-vacios">
            <i className="bi bi-buildings" />
            <h2>Aún no hay espacios registrados</h2>
            <p>Cuando se registren espacios, aparecerán aquí.</p>
            <Link to="/home" className="espacios-boton">
              Regresar a Home
            </Link>
          </div>
        )}

        {!cargando && !error && espacios.length > 0 && (
          <div className="row g-4">
            {espacios.map((espacio) => (
              <div className="col-12 col-md-6 col-xl-4" key={espacio.id}>
                <TarjetaEspacio espacio={espacio} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ListaEspacios
