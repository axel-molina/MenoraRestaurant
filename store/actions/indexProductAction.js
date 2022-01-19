import {
    COMENZAR_GUARDAR_INDEX,
    GUARDAR_INDEX_EXITO,
    GUARDAR_INDEX_ERROR,
} from '../types';


//crear nuevo index
export function crearIndexAction(index){
    return (dispatch)=>{
        
        dispatch(agregarIndex());
        console.log("INDEX DESDE REDUX: ",index)
        try {
            //console.log("DESDE REDUX: ",carrito)
            dispatch(agregarIndexExito(index));
        } catch (error) {
            dispatch(agregarIndexError(true));
        }
    }
}

const agregarIndex = () => ({
    type: COMENZAR_GUARDAR_INDEX,
    payload: true,
});

// si el index fue exitoso
const agregarIndexExito = (index) => ({
    type: GUARDAR_INDEX_EXITO,
    payload: index
});


// si hubo un error con el index
const agregarIndexError = (error) => ({
    type: GUARDAR_INDEX_ERROR,
    payload: error
});

