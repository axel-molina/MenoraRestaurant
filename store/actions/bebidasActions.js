import {
    COMENZAR_GUARDAR_BEBIDAS,
    GUARDAR_BEBIDAS_EXITO,
    GUARDAR_BEBIDAS_ERROR,
} from '../types';


//crear nuevo carrito
export function crearBebidasAction(bebidas){
    return (dispatch)=>{
        
        dispatch(agregarBebidas());
       
        try {
            dispatch(agregarBebidasExito(bebidas));
        } catch (error) {
            dispatch(agregarBebidasError(true));
        }
    }
}

const agregarBebidas = () => ({
    type: COMENZAR_GUARDAR_BEBIDAS,
    payload: true,
});

// si el carrito fue exitoso
const agregarBebidasExito = (bebidas) => ({
    type: GUARDAR_BEBIDAS_EXITO,
    payload: bebidas
});


// si hubo un error con el carrito
const agregarBebidasError = (error) => ({
    type: GUARDAR_BEBIDAS_ERROR,
    payload: error
});

