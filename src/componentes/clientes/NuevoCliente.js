import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';



const NuevoCliente = ({history}) => {

    let navigate = useNavigate();

    // cliente = state, guardarCliente = funcion para guardar el state
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el cliente escribe en el state
        guardarCliente({
            // obtener copia del state actual
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    // Añade en la Rest API un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault();

        //enviar peticion a axios
        clienteAxios.post('/clientes', cliente)
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
                        'Felicidades! registro exitoso',
                        res.data.mensaje,
                        'success'
                    )
                }
                
                // Redireccionar
                navigate('/', {replace:true});
            });
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
            <h2>Nuevo cliente</h2>

            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()} />
                </div>

            </form>

        </Fragment>
    );
}

export default NuevoCliente;