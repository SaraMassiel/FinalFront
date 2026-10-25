import {panelFormulario} from '../componentes/PanelFormulario'

//Aquí va const imagen

export function Login() {
    const navegar = useNavigate()
    const {estaLogeado, guardarSesion} = useSesion()
    const {datos, setDatos} = useState({ correo: '', contraseña: ''})
    const {error, setError} = useState('')
    const {enviando, setEnviando} = useState(false)

    //Si ya tiene sesiion no hay que ver el login 
    if (estaLogeado) {
        return <Navigate to="/home" replace/>
    }

    function manejarCambio(evento) {
        const {name, value} = evento.target
        setDatos({...datos, [name]: value})
}

    async function manejarEnvio(evento) {
        evento.preventDefault()
        setError('')
        setEnviando(true)

        try {
            const usuario = await iniciarSesion(datos.correo, datos.contraseña)
            guardarSesion(usuario)
            navegar('/home')
        }catch (error) {
      setError(error.response?.data?.message || error.message || 'No fue posible iniciar sesión')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <PanelFormulario>
     
    </PanelFormulario>
  )
}
