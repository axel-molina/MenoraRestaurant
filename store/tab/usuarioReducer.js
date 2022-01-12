import {
    COMENZAR_GUARDAR_USUARIO,
    GUARDAR_USUARIO_EXITO,
    GUARDAR_USUARIO_ERROR,
} from '../types';

const initialState = {
    usuario: null,
    error: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_GUARDAR_USUARIO:
            return {
                ...state,
                loading: action.payload
            }
        case GUARDAR_USUARIO_EXITO:
            return {
                ...state,
                loading: false,
                usuario: action.payload,
            }
        case GUARDAR_USUARIO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}
