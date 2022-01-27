import {
    COMENZAR_GUARDAR_BOOLEAN,
    GUARDAR_BOOLEAN_EXITO,
    GUARDAR_BOOLEAN_ERROR,
} from '../types';

const initialState = {
    boolean: false,
    error: null,
    loading: false
 };

 export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_GUARDAR_BOOLEAN:
            return {
                ...state,
                loading: action.payload
            }
        case GUARDAR_BOOLEAN_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                boolean: action.payload,
            }
        case GUARDAR_BOOLEAN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}