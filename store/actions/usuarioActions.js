import {
    COMENZAR_GUARDAR_USUARIO,
    GUARDAR_USUARIO_EXITO,
    GUARDAR_USUARIO_ERROR,
} from '../types';


//crear nuevo usuario
export function crearUsuarioAction(usuario){
    return (dispatch)=>{
        
        dispatch(agregarUsuario());
        //console.log("DESDE REDUX: ",usuario)
        try {
            dispatch(agregarUsuarioExito(usuario));
        } catch (error) {
            dispatch(agregarUsuarioError(true));
        }
    }
}

const agregarUsuario = () => ({
    type: COMENZAR_GUARDAR_USUARIO,
    payload: true,
});

// si el carrito fue exitoso
const agregarUsuarioExito = (usuario) => ({
    type: GUARDAR_USUARIO_EXITO,
    payload: usuario
});


// si hubo un error con el carrito
const agregarUsuarioError = (error) => ({
    type: GUARDAR_USUARIO_ERROR,
    payload: error
});

