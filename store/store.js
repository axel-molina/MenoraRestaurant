import { createStore } from 'redux';

const initialState = {
    productos: [],
    precio: [],
};

const reducerProductos = (state = initialState, action) => {
    return state
}

export default createStore(reducerProductos);