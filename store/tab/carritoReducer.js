import {
    COMENZAR_GUARDAR_CARRITO,
    GUARDAR_CARRITO_EXITO,
    GUARDAR_CARRITO_ERROR,
    COMENZAR_GUARDAR_DRINKS,
    GUARDAR_DRINKS_EXITO,
    GUARDAR_DRINKS_ERROR,
} from '../types';

const initialState = {
    carrito: [],
    drinks: [],
    error: null,
    loading: false
 };

 export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_GUARDAR_DRINKS:
        case COMENZAR_GUARDAR_CARRITO:
            return {
                ...state,
                loading: action.payload
            }
        case GUARDAR_DRINKS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                drinks: action.payload,
            }
        case GUARDAR_CARRITO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                carrito: action.payload,
            }
        case GUARDAR_DRINKS_ERROR:
        case GUARDAR_CARRITO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}