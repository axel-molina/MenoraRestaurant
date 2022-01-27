import {
    COMENZAR_GUARDAR_BOOLEAN,
    GUARDAR_BOOLEAN_EXITO,
    GUARDAR_BOOLEAN_ERROR,
} from '../types';


//crear nuevo carrito
export function crearBooleanAction(boolean){
    return (dispatch)=>{
        
        dispatch(agregarBoolean());
        //console.log("DESDE REDUX: ",carrito)
        try {
            //console.log("DESDE REDUX: ",carrito)
            dispatch(agregarBooleanExito(boolean));
        } catch (error) {
            dispatch(agregarBooleanError(true));
        }
    }
}

const agregarBoolean = () => ({
    type: COMENZAR_GUARDAR_BOOLEAN,
    payload: true,
});

// si el carrito fue exitoso
const agregarBooleanExito = (boolean) => ({
    type: GUARDAR_BOOLEAN_EXITO,
    payload: boolean
});


// si hubo un error con el carrito
const agregarBooleanError = (error) => ({
    type: GUARDAR_BOOLEAN_ERROR,
    payload: error
});

