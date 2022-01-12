import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";
import tokenReducer from "./tab/tokenReducer";
import categoriasReducer from "./tab/categoriasReducer";
import productsReducer from "./tab/productsReducer";
import carritoReducer from "./tab/carritoReducer";
import usuarioReducer from "./tab/usuarioReducer";

export default combineReducers({
    tabReducer,
    token: tokenReducer,
    categorias: categoriasReducer,
    products: productsReducer,
    carrito: carritoReducer,
    usuario: usuarioReducer,
})