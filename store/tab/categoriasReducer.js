import {
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
} from '../types';

const initialState = {
    categorias: [],
    error: null,
    loading: false
 };

 export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                categorias: action.payload,
            }
        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}