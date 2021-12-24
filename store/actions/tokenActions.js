import {
    AGREGAR_TOKEN,
    TOKEN_ERROR,
    TOKEN_EXITO,
} from '../types';


//crear nuevo token
export function crearTokenAction(token){
    return (dispatch)=>{
        
        dispatch(agregarToken());

        try {
            dispatch(agregarTokenExito(token));
        } catch (error) {
            dispatch(agregarTokenError(true));
        }
    }
}

const agregarToken = () => ({
    type: AGREGAR_TOKEN,
    payload: true,
});

// si el token fue exitoso
const agregarTokenExito = (token) => ({
    type: TOKEN_EXITO,
    payload: token
});


// si hubo un error con el token
const agregarTokenError = (error) => ({
    type: TOKEN_ERROR,
    payload: error
});

