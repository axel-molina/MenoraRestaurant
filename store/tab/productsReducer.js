import {
    COMENZAR_GUARDAR_PRODUCTO,
    GUARDAR_PRODUCTO_EXITO,
    GUARDAR_PRODUCTO_ERROR,
} from '../types';

const initialState = {
    products: [],
    error: null,
    loading: false
 };

 export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_GUARDAR_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }
        case GUARDAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload,
            }
        case GUARDAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}