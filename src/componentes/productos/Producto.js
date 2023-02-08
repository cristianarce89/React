import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const Producto = ({producto}) => {

    //elimina un producto
    const eliminarProducto = id => {
        console.log('eliminando...', id);
    }

    const {_id, nombre, precio, imagen} = producto;

    return (
        <Fragment>
            <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">${precio}</p>
                        { imagen ? (
                            <img src={`http://localhost:5000/${imagen}`} alt="imagen" />
                        ) : null}
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarProducto(_id)} >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>            
        </Fragment>
    )
}

export default Producto;