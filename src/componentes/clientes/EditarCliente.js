import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';



const EditarCliente = (props) => {

    //metodo navegacion
    let navigate = useNavigate();

    //Obtener el id de react
    const { id } = useParams();

    // cliente = state, datosCliente = funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //Query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        
        //Colocar en el state
        datosCliente(clienteConsulta.data)
    }


    //useEffect, cuando el componente carga
    useEffect( () => {
        consultarAPI();
    }, []);


    //leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el cliente escribe en el state
        datosCliente({
            // obtener copia del state actual
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    //Envia una peticion por axios para actualizar el cliente
    const actualizarCliente = e => {
        e.preventDefault();

        //Enviar peticion por axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
        .then(res => {
            //validar si hay errores de mongo
            if (res.data.code === 11000) {
                //alerta
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Ese cliente ya esta registrado'
            })

            } else {

                //alerta de sweetalert2
                Swal.fire(
                    'Correcto',
                    'Se actualizó correctamente',
                    'success'
                )
            }
            //redireccionar
            navigate('/', {replace:true});
        })
    }



    //validar el formulario
    const validarCliente = () => {
        //destructuring
        const { nombre, apellido, email, empresa, telefono } = cliente;

        //revisar que las propiedades del state tenga contenido, q todos los campos esten llenos para q se habilite el boton
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        //return true o false
        return valido;
    }

    return (
        <Fragment>
            <h2>Editar cliente</h2>

            <form onSubmit={actualizarCliente}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido} />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} value={cliente.empresa} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} value={cliente.email} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} value={cliente.telefono} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar cambios" disabled={validarCliente()} />
                </div>

            </form>

        </Fragment>
    );
}

export default EditarCliente;