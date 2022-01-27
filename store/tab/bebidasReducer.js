import {
    COMENZAR_GUARDAR_BEBIDAS,
    GUARDAR_BEBIDAS_EXITO,
    GUARDAR_BEBIDAS_ERROR,
} from '../types';

const initialState = {
    bebidas: [],
    error: null,
    loading: false
 };

 export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_GUARDAR_BEBIDAS:
            return {
                ...state,
                loading: action.payload
            }
        case GUARDAR_BEBIDAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                bebidas: action.payload,
            }
        case GUARDAR_BEBIDAS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}