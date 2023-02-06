import React from 'react'

/* Este sirve para pasar entre rutas de una manera mas performance */
import { Link } from 'react-router-dom';

const Navegacion = () => (
    <aside className="sidebar col-3">
        <h2>Administración</h2>

        <nav className="navegacion">
            <Link to={"/"} className="clientes">Clientes</Link>
            <Link to={"/productos"} className="productos">Productos</Link>
            <Link to={"/pedidos"} className="pedidos">Pedidos</Link>
        </nav>
    </aside>
)

export default Navegacion;