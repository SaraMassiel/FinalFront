import { reservas } from '../Services/datosReserva' 
import { TarjetaReserva } from '../componentes/TarjetaReserva' 

export function ListaReserva () {
    return (
        <section className='row g-4 my-5'>
            {
                reservas.map((reserva) => (
                    <div className='col-md-4' key={reserva.id}>
                        <TarjetaReserva reserva={reserva} />
                    </div>
                ))
            }
        </section>
    )
}

export function listarReservas () {
    //1. Guardar los datos de los usaurios que llegan del API
    const[reserva, setReserva] = useState([])

    //2. Guardar el estado del consumo del API en una variable (saber si el servidor ya me respondio)
    const[cargando, setCargando] = useState(true)

    //3. Guardar si los hay los errores que nos mande el API
    const[error, setError] = useState('')

    //4. Funcion asincrona para comunicarme con el api
    async function cargarReservas(){
        try{
            const datos = await listarReservas()
            setReserva(datos)
        }catch{
            setError("No fue posible cargar las reservas") //como obtengo el error del api?
        }finally{
            setCargando(false)
        }
    }

    //5. Funcion que se ejecuta cuando el componente se carga (aparece en pantalla)
    function alCargarComponente(){
        cargarReservas()
    }
    useEffect(alCargarComponente,[])

    //6. Funcion para pintar la informacion
    function pintarReserva(reserva){
        return(
            <div className="col-md-4" key={reserva.id}>
                < TarjetaReserva reserva={reserva} />
            </div>
        )
}

    //7. Rutina para el manejo de la carga y el render de informacion
    if (cargando){
        return(
            <p className="text-center my-5">Cargando reservas...</p>
        )
    }

    if (error != '') {
        return (
            <div className="alert alert-danger my-5">{error}</div>
        )
    }

    //Si todo esta OK hago el render
    return (
        <>
            <section className="row g-4 my-5">
                {reservas.map(pintarReserva)}
            </section>
        </>
    )
}   