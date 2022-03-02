import {
    COMENZAR_GUARDAR_ORDENES,
    GUARDAR_ORDENES_EXITO,
    GUARDAR_ORDENES_ERROR,
} from '../types';

const initialState = {
    ordenes: [],
    error: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_GUARDAR_ORDENES:
            return {
                ...state,
                loading: action.payload
            }
        case GUARDAR_ORDENES_EXITO:
            return {
                ...state,
                loading: false,
                ordenes: action.payload,
            }
        case GUARDAR_ORDENES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}
