import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

// redirecionamiento
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate(); 
// navigate('/')


//ERROR DE PROPS
// import { useNavigate, useParams } from 'react-router-dom';
// y dentro de la funcion editarCliente,  capturamos el id de esta forma

// //Capturamos el id que viene por parametro
//     const { id } = useParams(); 
//     console.log(id);


function NuevoPedido(props) {

    //extraer Id de cliente
    const { id } = useParams();

    const navigate = useNavigate(); 

    //state
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);


    useEffect(() => {
        // obtener el cliente
        const consultarAPI = async () => {
            //consultar el cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        // llamar a la Api
        consultarAPI();

        //actualizar el total a apagar
        actualizarTotal();

    }, [productos]);

    const buscarProducto = async e => {
        e.preventDefault();

        //obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        // si no hay resultados una alaerta, de lo contrario agregarlo al state

        if (resultadoBusqueda.data[0]) {

            let productoResultado = resultadoBusqueda.data[0];
            // agregar la llave "producto" (copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            // ponerlo en el state
            guardarProductos([...productos, productoResultado])

        } else {
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
        guardarBusqueda(e.target.value);
    }

    //actualizar la cantidad de productos
    const restarProductos = i => {
        // copiar el arreglo original de productos
        const todosProductos = [...productos];

        //validar si esta en 0 no puede ir mas alla
        if (todosProductos[i].cantidad === 0) return;

        //decremento
        todosProductos[i].cantidad--;

        //almacenarlo en el state
        guardarProductos(todosProductos);

        //actualizar el total a apagar
        actualizarTotal();
    }

    const aumentarProductos = i => {
        // copiar el arreglo para no mutar el original
        const todosProductos = [...productos];

        // incrementarlo
        todosProductos[i].cantidad++;

        //almacenarlo en el state
        guardarProductos(todosProductos);

        //actualizar el total a apagar
        actualizarTotal();
    }

    // Elimina un producto del state
    const eliminarProductoPedido = id => {
        // con este codigo mantiene los que son diferente id, elimina el seleccionado
        const todosProductos = productos.filter(producto => producto.producto !== id);
        guardarProductos(todosProductos);
    }

    //Actualizar el total a pagar
    const actualizarTotal = () => {
        // si el arreglo de productos es igual a 0: el total es 0
        if (productos.length === 0) {
            guardarTotal(0);
            return;
        }

        // calcular el nuevo total
        let nuevoTotal = 0;

        //recorrer totos los productos, sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        //almacenar el total
        guardarTotal(nuevoTotal);
    }


    // Almacena el pedido en la BD
    const realizarPedido = async e => {
        e.preventDefault();

        // construir el objeto
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }

        // almacenarlo en la base de datos
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        // leer resultado
        if (resultado.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Correcto!',
                text: resultado.data.mensaje
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error al subir info a la base de datos',
                text: 'Vuelva a intentarlo'
            })
        }

        // redireccionar        
        navigate('/pedidos', {replace:true});
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
                        eliminarProductoPedido={eliminarProductoPedido}
                        index={index}
                    />
                ))}
            </ul>


            <p className='total'>Total a Pagar: <span>$ {total}</span></p>

            {total > 0 ? (
                <form
                    onSubmit={realizarPedido}
                >
                    <input type="submit"
                        className="btn btn-verde btn-block"
                        value="Realizar Pedido"
                    />
                </form>
            ) : null}

        </Fragment>
    )
}

export default NuevoPedido;
