import React, { Fragment } from 'react';

//Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/***** LAYOUT ******/
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';

/** Componentes ***/
import Clientes from './componentes/clientes/Clientes';
import NuevoCliente from './componentes/clientes/NuevoCliente';
import Pedidos from './componentes/pedidos/Pedidos';
import Productos from './componentes/productos/Productos';


function App() {
  return (
    <Router>

      <Fragment>
        <Header />

        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            {/* se usa con React Router Dom */}
            <Routes>
              <Route path="/" element={<Clientes/>} /> 

              <Route path="/clientes/nuevo" element={<NuevoCliente/>} />

              <Route path="/productos" element={<Productos/>} />

              <Route path="/pedidos" element={<Pedidos/>} />
            </Routes>
          </main>
        </div>

      </Fragment>
    </Router>

  )
}

export default App;
