import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Layout } from './pages/Layout';
import { Proyectos } from './pages/Proyectos';
import { Login } from './pages/Login';
import { Usuarios } from './pages/Usuarios';
import { Register } from './pages/Register';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/proyectos">Proyectos</NavLink>
          </li>
          <li>
            <NavLink to="/usuarios">Usuarios</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="proyectos" element={<Layout />}>
          <Route index element={<Proyectos />} />
        </Route>

        <Route path="usuarios" element={<Usuarios />} />

        <Route path="*" element={<h2>No encontramos la página :p</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
