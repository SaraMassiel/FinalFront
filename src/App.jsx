import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistroUsuario from './paginas/RegistroUsuario'
import Home from './paginas/Home'
import RegistroEspacio from './paginas/RegistroEspacio'
import RegistroReserva from './paginas/RegistroReserva'
import {ListaEspacios} from './paginas/ListaEspacios'
import { ListaReserva } from './paginas/ListaReserva'
import { ListaUsuario } from './paginas/ListaUsuario'
import { ProveedorSesion } from './contexto/ContextoSesion'
import {Login} from './paginas/Login'

function App() {
  return (
    <ProveedorSesion>
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas: cualquiera puede entrar */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RegistroUsuario />} />

        {/* Rutas privadas: solo usuarios logueados */}
        <Route element={<RutaPrivada />}>
          <Route path="/home" element={<Home />} />
          <Route path="/reservas" element={<RegistroReserva />} />
          <Route path="/listaespacios" element={<ListaEspacios />} />
        </Route>

         {/* Rutas por rol: solo ADMINISTRADOR */}
        <Route element={<RutaPorRol rolesPermitidos={['ADMINISTRADOR']} />}> 
          <Route path="/espacios" element={<RegistroEspacio />} />
          <Route path="/listareservas" element={<ListaReserva />} />
          <Route path="/listausuarios" element={<ListaUsuario />} />
        </Route>

        {/* Cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
    </ProveedorSesion>

  )
}

export default App
