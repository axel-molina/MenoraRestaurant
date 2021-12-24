import {
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
} from '../types';


//Guardar categorias
export function guardarCategorias(categorias){
    return (dispatch)=>{
        
        dispatch(guardarCategorias());

        try {
            dispatch(guardarCategoriaExito(categorias));
        } catch (error) {
            dispatch(guardarCategoriaError(true));
        }
    }
}

const guardarCategorias = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true,
});

// si el guardado fue exitoso
const guardarCategoriaExito = (categorias) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: token
});


// si hubo un error con las categorias
const guardarCategoriaError = (error) => ({
    type: TOKEN_ERROR,
    payload: error
});
