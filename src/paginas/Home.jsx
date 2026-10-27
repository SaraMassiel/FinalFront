import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { listarEspacio as obtenerEspacios } from '../Services/servicioEspacio.js'

const IMAGEN_PORTADA =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85'

const IMAGEN_POR_DEFECTO =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=85'

export function Home() {
  const navegar = useNavigate()
  const { usuario, esAdministrador, cerrarSesion } = useSesion()

  const [espacios, setEspacios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarEspacios() {
      try {
        const datos = await obtenerEspacios()
        setEspacios(datos || [])
      } catch (err) {
        console.error('Error al cargar espacios en Home:', err)
        setError('No fue posible cargar los espacios.')
      } finally {
        setCargando(false)
      }
    }

    cargarEspacios()
  }, [])

  function salir() {
    cerrarSesion()
    navegar('/login')
  }

  return (
    <main className="paseo-home">
      <nav className="paseo-nav">
        <div className="paseo-nav-inner">
          <Link to="/home" className="paseo-brand">
            <span className="paseo-brand-icon">
              <i className="bi bi-buildings-fill" />
            </span>
            <span>
              <strong>PASEO</strong>
              <small>VIDA EN COMUNIDAD</small>
            </span>
          </Link>

          <div className="paseo-nav-actions">
            <span className="paseo-user">
              <i className="bi bi-person-circle" />
              <span>
                Hola, {usuario?.nombres?.split(' ')[0] || 'residente'}
                <small>
                  {esAdministrador ? 'Administrador' : 'Residente'}
                </small>
              </span>
            </span>

            {esAdministrador && (
              <Link to="/espacios" className="paseo-nav-link">
                <i className="bi bi-sliders2 me-1" />
                Gestionar espacios
              </Link>
            )}

            <Link to="/reservas" className="paseo-nav-link">
              Mis reservas
            </Link>

            <button
              type="button"
              onClick={salir}
              className="paseo-logout"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <i className="bi bi-box-arrow-right" />
            </button>
          </div>
        </div>
      </nav>

      <section
        className="paseo-hero"
        style={{ backgroundImage: url("${IMAGEN_PORTADA}") }}
      >
        <div className="paseo-hero-shade" />
        <div className="paseo-container paseo-hero-content">
          <span className="paseo-eyebrow paseo-eyebrow-light">
            <i className="bi bi-geo-alt-fill me-2" />
            SABANETA · ANTIOQUIA
          </span>

          <h1>
            El placer de
            <br />
            <em>sentirte en casa.</em>
          </h1>

          <p>
            Tu comunidad, tus espacios, tus momentos.
            Todo lo que necesitas para disfrutar tu hogar,
            en un solo lugar.
          </p>

          <div className="paseo-hero-actions">
            <Link to="/reservas" className="paseo-button paseo-button-gold">
              Reservar un espacio
              <i className="bi bi-arrow-up-right ms-2" />
            </Link>

            {esAdministrador && (
              <Link
                to="/espacios"
                className="paseo-button paseo-button-glass"
              >
                <i className="bi bi-plus-lg me-2" />
                Añadir espacio
              </Link>
            )}
          </div>

          <div className="paseo-hero-note">
            <span className="paseo-note-line" />
            VIVIR BIEN EMPIEZA EN CASA
          </div>
        </div>

        <div className="paseo-hero-index">
          <span>01</span>
          <span className="paseo-index-line" />
          <span>{String(espacios.length || 3).padStart(2, '0')}</span>
        </div>
      </section>

      <section className="paseo-intro paseo-container">
        <div>
          <span className="paseo-eyebrow">ESPACIOS PARA DISFRUTAR</span>
          <h2>
            Cada día tiene
            <br />
            algo <em>especial.</em>
          </h2>
        </div>
        <p>
          Hay lugares que hacen que una casa se sienta como un hogar.
          Descubre los espacios compartidos que hacen especial vivir aquí.
        </p>
      </section>

      <section className="paseo-zones paseo-container">
        {cargando && (
          <p className="espacios-mensaje text-center py-4">Cargando espacios...</p>
        )}

        {!cargando && error && (
          <div className="espacios-error text-center py-4">{error}</div>
        )}

        {!cargando && !error && espacios.length === 0 && (
          <div className="espacios-vacios text-center py-4">
            <p>No hay espacios registrados en este momento.</p>
          </div>
        )}

        {!cargando && !error && espacios.length > 0 && (
          <div className="paseo-zones-grid">
            {espacios.map((espacio, indice) => {
              const nombre = espacio.nombre || 'Espacio común'
              const categoria = espacio.tipo || espacio.categoria || 'ZONA COMÚN'
              const descripcion = espacio.descripcion || 'Espacio disponible para la comunidad.'
              const imagen = espacio.foto || espacio.imagen || IMAGEN_POR_DEFECTO

              return (
                <article className="paseo-zone-card" key={espacio.id || indice}>
                  <div className="paseo-zone-image">
                    <img src={imagen} alt={nombre} loading="lazy" />
                    <span className="paseo-zone-number">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <span className="paseo-zone-icon">
                      <i className="bi bi-buildings" />
                    </span>
                  </div>

                  <div className="paseo-zone-body">
                    <span className="paseo-eyebrow">{categoria}</span>
                    <h3>{nombre}</h3>
                    <p>{descripcion}</p>
                    <Link to="/reservas" className="paseo-text-link">
                      Descubrir y reservar
                      <i className="bi bi-arrow-right ms-2" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      <section className="paseo-cta-wrap paseo-container">
        <div className="paseo-cta">
          <div className="paseo-cta-copy">
            <span className="paseo-eyebrow paseo-eyebrow-light">
              TU PRÓXIMO MOMENTO COMIENZA AQUÍ
            </span>
            <h2>
              Haz espacio
              <br />
              para <em>disfrutar.</em>
            </h2>
            <p>
              Organiza tus planes y reserva las zonas comunes
              de forma sencilla.
            </p>
            <div className="paseo-cta-actions">
              <Link to="/listareservas" className="paseo-button paseo-button-gold">
                Ir a mis reservas
                <i className="bi bi-arrow-up-right ms-2" />
              </Link>

              <Link to="/listaespacios" className="paseo-button paseo-button-gold">
                Ver espacios disponibles
                <i className="bi bi-buildings ms-2" />
              </Link>
            </div>
          </div>
          <div className="paseo-cta-decoration" aria-hidden="true">
            <i className="bi bi-flower1" />
          </div>
        </div>
      </section>

      <footer className="paseo-footer">
        <div className="paseo-container paseo-footer-inner">
          <Link to="/home" className="paseo-brand paseo-brand-footer">
            <span className="paseo-brand-icon">
              <i className="bi bi-buildings-fill" />
            </span>
            <span>
              <strong>PASEO</strong>
              <small>VIDA EN COMUNIDAD</small>
            </span>
          </Link>

          <div className="paseo-footer-project">
            <span className="paseo-footer-line" />
            <br />
            <p>Proyecto Globant <span>-</span> CESDE</p>

            <div className="paseo-footer-students">
              <strong className="paseo-footer-label">ESTUDIANTES :</strong>
              <br />
              <small>Sara Massiel Alvarez Beltran</small>
              <br />
              <small>Geraldinne Jaramillo Avendano</small>
            </div>
            <br /><br />
          </div>

          <p className="paseo-footer-motto">
            Un mejor lugar para vivir,
            <br />
            juntos.
          </p>
        </div>
      </footer>
    </main>
  )
}

export default Home