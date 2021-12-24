import {
    AGREGAR_TOKEN,
    TOKEN_ERROR,
    TOKEN_EXITO,
} from '../types';

const initialState = {
    token: null,
    error: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case AGREGAR_TOKEN:
            return {
                ...state,
                loading: action.payload
            }
        case TOKEN_EXITO:
            return {
                ...state,
                loading: false,
                token: action.payload,
            }
        case TOKEN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}
