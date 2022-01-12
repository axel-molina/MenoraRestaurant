import {
    COMENZAR_GUARDAR_PRODUCTO,
    GUARDAR_PRODUCTO_EXITO,
    GUARDAR_PRODUCTO_ERROR,
} from '../types';


//Descargar las categorias de la base de datos
export function obtenerProductosAction(products){ 
    
    return async (dispatch)=>{
        
        dispatch(guardarProductos());

        try {
            dispatch(guardarProductosExito(products));
        } catch (error) {
            dispatch(guardarProductosError(error));
        }
    }
}

// si se descargo las categorias
const guardarProductos = () => ({
    type: COMENZAR_GUARDAR_PRODUCTO,
    payload: true,
});

// si la descarga fue exitosa
const guardarProductosExito = products => ({
    type: GUARDAR_PRODUCTO_EXITO,
    payload: products,
});


// si hubo un error con las categorias
const guardarProductosError = (error) => ({
    type: GUARDAR_PRODUCTO_ERROR,
    payload: error
});