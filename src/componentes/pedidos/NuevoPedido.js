import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';



//ERROR DE PROPS
// import { useNavigate, useParams } from 'react-router-dom';
// y dentro de la funcion editarCliente,  capturamos el id de esta forma

// //Capturamos el id que viene por parametro
//     const { id } = useParams(); 
//     console.log(id);


function NuevoPedido() {

    //extraer Id de cliente
    const { id } = useParams();

    //state
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);


    useEffect(() => {
        // obtener el cliente
        const consultarAPI = async () => {
            //consultar el cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        // llamar a la Api
        consultarAPI();

    }, []);

    const buscarProducto = async e => {
        e.preventDefault();

        //obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
        
        // si no hay resultados una alaerta, de lo contrario agregarlo al state

        if(resultadoBusqueda.data[0]){
            
            let productoResultado = resultadoBusqueda.data[0];
            // agregar la llave "producto" (copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            // ponerlo en el state
            guardarProductos([...productos, productoResultado])

        }else {
            //no hay resultados
            Swal.fire({
                icon: "error",
                title: 'No hay resultados',
                text: 'Realiza otro tipo de busqueda'
            })
        }

    }

    //Almacenar una busqueda en el state
    const leerDatosBusqueda = e => {
        guardarBusqueda( e.target.value );
    }

    //actualizar la cantidad de productos
    const restarProductos = i => {
        // copiar el arreglo original de productos
        const todosProductos = [...productos];

        //validar si esta en 0 no puede ir mas alla
        if(todosProductos[i].cantidad === 0) return;

        //decremento
        todosProductos[i].cantidad--;

        //almacenarlo en el state
        guardarProductos(todosProductos);
    }

    const aumentarProductos = i => {
        // copiar el arreglo para no mutar el original
        const todosProductos = [...productos];

        // incrementarlo
        todosProductos[i].cantidad++;

        //almacenarlo en el state
        guardarProductos(todosProductos);
    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>

            <FormBuscarProducto 
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadProducto 
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        index={index}
                    />
                ))}
            </ul>


            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
            </div>

        </Fragment>
    )
}

export default NuevoPedido;
