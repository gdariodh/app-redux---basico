import React, { useState } from "react";
// para usar las funciones del action
import { useDispatch, useSelector } from "react-redux";
// actions de redux
import { crearNuevoProductoAction } from "../actions/productoAction";
import {
  mostrarAlertaAction,
  ocultarAlertaAction,
} from "../actions/alertaAction";

const NuevoProducto = ({ history }) => {
  // paso 1 - invocamos la fn useDispatch
  const dispatch = useDispatch();
  // paso 2 - llamamos la fn del action
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  // useSelector para leer los cambios del state
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  // local
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validar
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlertaAction(alerta));
      return;
    }

    // si no hay errores - ocultamos la alerta
    dispatch(ocultarAlertaAction());

    const producto = { nombre, precio };
    // paso 3 - se llama la fn
    agregarProducto(producto);
    history.push("/");
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Agregar Nuevo Producto
            </h2>

            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Nombre del producto</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ej. PAN'
                  name='nombre'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Precio del producto</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Ej. $1000 CLP'
                  name='precio'
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                Agregar
              </button>
            </form>

            {cargando ? <p>Cargando...</p> : null}

            {error ? (
              <p className='alert alert-danger p2 mt-4 text-center'>
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
