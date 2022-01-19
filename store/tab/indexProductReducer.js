import {
    COMENZAR_GUARDAR_INDEX,
    GUARDAR_INDEX_EXITO,
    GUARDAR_INDEX_ERROR,
} from '../types';

const initialState = {
    index: null,
    error: null,
    loading: false
 };

 export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_GUARDAR_INDEX:
            return {
                ...state,
                loading: action.payload
            }
        case GUARDAR_INDEX_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                index: action.payload,
            }
        case GUARDAR_INDEX_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}