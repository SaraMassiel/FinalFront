import { espacios } from '../Services/datosEspacios'
import { TarjetaEspacio } from '../componentes/TarjetaEspacio'

export function ListaEspacios () {
    return (
        <section className='row g-4 my-5'>
            {
                espacios.map((espacio) => (
                    <div className='col-md-4' key={espacio.id}>
                        <TarjetaEspacio espacio={espacio} />
                    </div>
                ))
            }
        </section>
    )
}

export function listarEspacio() {
      //1. Guardar los datos de los usaurios que llegan del API
    const[espacio, setEspacio] = useState([])

    //2. Guardar el estado del consumo del API en una variable (saber si el servidor ya me respondio)
    const[cargando, setCargando] = useState(true)

    //3. Guardar si los hay los errores que nos mande el API
    const[error, setError] = useState('')

    //4. Funcion asincrona para comunicarme con el api
    async function cargarEspacios(){
        try {
            const datos = await listarEspacio()
            setEspacio(datos)
        } catch {
            setError("No fue posible cargar los espacios")
        } finally {
            setCargando(false)
        }
    }

    //5. Funcion que se ejecuta cuando el componente se carga (aparece en pantalla)
    function alCargarComponente(){
        cargarEspacios()
    }

    useEffect(alCargarComponente,[])

    //6. Funcion para pintar la informacion
    function pintarEspacio(espacio){
        return (
            <div className="col-md-4" key={espacio.id}>
                <TarjetaEspacio espacio={espacio} />
            </div>
        )
    }

    //7. Rutina para el manejo de la carga y el render de informacion
    if (cargando) {
        return (
            <p className='text-center my-5'>Cargando espacios...</p>
        )
    }

    if (error != '') {
        return (
            <div className='alert alert-danger my-5 text-center'> {error} </div>
        )
    }

    //Si todo esta OK hago el render
    return (
        <>
            <section className="row g-4 my-5">
                {espacio.map(pintarEspacio)}
            </section>
        </>
    )
}