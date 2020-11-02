import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from '../actions/productoAction';
import {useHistory} from 'react-router-dom'

const EditarProducto = () => {

  const [producto,setProducto] = useState({
    nombre:'',
    precio:''
  });

  const dispatch = useDispatch();
  const history = useHistory();
  // fn que llena el formulario de forma reactiva al elegir un producto a editar
  const productoeditar = useSelector((state) => state.productos.productoeditar);

// llena el state de formulario automaticamente 
  useEffect(()=>{
    setProducto(productoeditar);
  },[productoeditar]);

  // leer datos del formulario
  const handleChange = e => {
    setProducto({
      ...producto,
      [e.target.name]:e.target.value
    });
  }

  const {nombre,precio} = producto;

  const handleEditar = e => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));
    history.push('/');
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Editar Producto
            </h2>

            <form
            onSubmit={handleEditar}
            >
              <div className='form-group'>
                <label>Nombre del producto</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ej. PAN'
                  name='nombre'
                  value={nombre}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
