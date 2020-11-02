import React from "react";
import { useHistory } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { eliminaProductoAction, obtenerProductoEditarAction } from "../actions/productoAction";
// swal
import swal from "sweetalert2";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleConfirmar = (id) => {
    // preguntar - sweet alert
    swal
      .fire({
        title: "Estas seguro?",
        text: "un producto que se elimina no se puede recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Eliminar!",
      })
      .then((result) => {
        if (result.value) {
          // pasar al action
          dispatch(eliminaProductoAction(id));
        }
      });
  };

  // Edicion

 /**fn que redirige solo cuando un producta esta activo, si no, no redirige, esto es para evitar
  * que haya un flash a la hora de editar dos productos de manera consecutiva!
  */
  const redirectEdicion = (producto) => {
    dispatch(obtenerProductoEditarAction(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className='font-weight-bold'>$ {precio}</span>
      </td>
      <td className='acciones'>
        <button
          className='btn btn-primary mr-2'
          onClick={() => redirectEdicion(producto)}>
          Editar
        </button>
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => handleConfirmar(id)}>
          Borrar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
