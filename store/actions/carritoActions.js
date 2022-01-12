import {
    COMENZAR_GUARDAR_CARRITO,
    GUARDAR_CARRITO_EXITO,
    GUARDAR_CARRITO_ERROR,
} from '../types';


//crear nuevo carrito
export function crearCarritoAction(carrito){
    return (dispatch)=>{
        
        dispatch(agregarCarrito());
        console.log("DESDE REDUX: ",carrito)
        try {
            //console.log("DESDE REDUX: ",carrito)
            dispatch(agregarCarritoExito(carrito));
        } catch (error) {
            dispatch(agregarCarritoError(true));
        }
    }
}

const agregarCarrito = () => ({
    type: COMENZAR_GUARDAR_CARRITO,
    payload: true,
});

// si el carrito fue exitoso
const agregarCarritoExito = (carrito) => ({
    type: GUARDAR_CARRITO_EXITO,
    payload: carrito
});


// si hubo un error con el carrito
const agregarCarritoError = (error) => ({
    type: GUARDAR_CARRITO_ERROR,
    payload: error
});

