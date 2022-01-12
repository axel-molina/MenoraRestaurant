import {
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
} from '../types';
import { useDispatch, useSelector } from "react-redux";


//Descargar las categorias de la base de datos
export function obtenerCategoriasAction(categorias){ 
    
    return async (dispatch)=>{
        
        dispatch(descargarCategorias());

        try {
            dispatch(descargarCategoriaExito(categorias));
        } catch (error) {
            dispatch(descargarCategoriaError(error));
        }
    }
}

// si se descargo las categorias
const descargarCategorias = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true,
});

// si la descarga fue exitosa
const descargarCategoriaExito = categorias => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: categorias,
});


// si hubo un error con las categorias
const descargarCategoriaError = (error) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: error
});
