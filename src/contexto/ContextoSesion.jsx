import {useContext, useState, createContext} from 'react'

//1. Crear el contexto dentro de la app
const ContextoSesion = createContext(null)

const CLAVE = 'sesionPaseoApp'

//2. Leer la sesión guardada en el navegador
function leerSesionGuardada() {
    try {
        const texto = localStorage.getItem(CLAVE)
        return texto ? JSON.parse(texto) : null
    } catch (error) {
        return null
}
}

//3. Creo un proveedor de sesión para envolver toda la app y guardar a quien esté autenticado
export function ProveedorSesion ({children}) {
    const [usuario, setUsuario] = useState (leerSesionGuardada)

    function guardarSesion (usuarioLogueado) {
        localStorage.setItem(CLAVE, JSON.stringify(usuarioLogueado))
        setUsuario(usuarioLogueado)
    }

    function cerrarSesion () {
        localStorage.removeItem(CLAVE)
        setUsuario(null)
    }

    const valor = {
        usuario,
        estaLogueado: usuario !== null,
        esAdministrador: usuario?.rol == 'ADMINISTRADOR',
        guardarSesion,
        cerrarSesion,
    }

    return (
        <ContextoSesion.Provider value = {valor}>
            {children}
        </ContextoSesion.Provider>
    )
}

export function useSesion() {
    return useContext(ContextoSesion)
}