import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types";

import clienteAxios from "../config/axios";
import swal from "sweetalert2";

// 1era fn Action
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      // insertar en la API
      await clienteAxios.post("/productos", producto);
      dispatch(agregarProductoExito(producto));
      swal.fire("Exitoso", "proceso exitoso", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));
      swal.fire({ icon: "error", title: "Error", text: "Hubo un error" });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

// consulta post db
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

// 2da fn Action
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const response = await clienteAxios("/productos");
      dispatch(descargaProductosExitos(response.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitos = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

//3era fn Action
export function eliminaProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    console.log(id);

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(productoEliminarExito());
      // si se elimina - pasar alerta
      swal.fire("Elimando!", "proceso exitoso", "success");
    } catch (error) {
      console.log(error);
      dispatch(productoEliminarError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const productoEliminarExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const productoEliminarError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

//4ta fn Action - fn que obtiene el producto para llenar el formulario
export function obtenerProductoEditarAction(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditar(producto));
  };
}

const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

// 5ta fn Action - Edita el registro en la api y state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError());
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_PRODUCTO_EDITAR,
  payload:true
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoError = () => ({
  type:PRODUCTO_EDITADO_ERROR,
  payload: true
})
