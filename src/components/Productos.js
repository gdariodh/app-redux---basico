import React, { Fragment, useEffect } from "react";
import Producto from "./Producto";
// redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoAction';


const NuevoProducto = () => {

  const dispatch = useDispatch();
  const cargarProductos = () => dispatch(obtenerProductosAction());

  // cada vez que carga el componente
  useEffect(() => {
    cargarProductos();
    // eslint-disable-next-line
  }, []);

  // obtener state - reducers/index.js
  const productos = useSelector(state => state.productos.productos);
  const error = useSelector(state => state.productos.error);
  const cargando = useSelector(state => state.productos.loading);

  return (
    <Fragment>
      <h2 className='text-center my-5'>Listado de productos</h2>

      { error ? <p className='alert alert-danger text-center font-weight-bold'>Hubo un error!</p> : null}
      { cargando ? <p className='text-center'>Cargando...</p> : null}

      <table className='table table-striped'>
        <thead className='bg-primary table-dark'>
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {productos.length === 0 ? <tr><td>No hay Productos</td></tr> 
            : productos.map(producto => (
              <Producto 
                 key={producto.id}
                 producto={producto}
              />
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default NuevoProducto;
