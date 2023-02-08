import React, { Fragment } from 'react';

//Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/***** LAYOUT ******/
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';

/** Componentes Clientes***/
import Clientes from './componentes/clientes/Clientes';
import NuevoCliente from './componentes/clientes/NuevoCliente';
import EditarCliente from './componentes/clientes/EditarCliente';

/** Componentes Productos***/
import Productos from './componentes/productos/Productos';
import NuevoProducto from './componentes/productos/NuevoProducto';
import EditarProducto from './componentes/productos/EditarProducto';


/** Componentes Pedidos***/

import Pedidos from './componentes/pedidos/Pedidos';



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
              <Route path="/clientes/editar/:id" element={<EditarCliente/>} />

              <Route path="/productos" element={<Productos/>} />
              <Route path="/productos/nuevo" element={<NuevoProducto/>} />
              <Route path="/productos/editar/:id" element={<EditarProducto/>} />

              <Route path="/pedidos" element={<Pedidos/>} />
            </Routes>
          </main>
        </div>

      </Fragment>
    </Router>

  )
}

export default App;
