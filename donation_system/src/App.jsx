import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from './pages/Layout'
import { Proyectos} from './pages/Proyectos'
import "./App.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Layout />}>
            <Route index path="/" element = {<Proyectos />} />
            
            <Route path="*"         
              element={<>
                <h2>No encontramos la pagina :p</h2>
              </>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
