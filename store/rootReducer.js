import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";
import tokenReducer from "./tab/tokenReducer";
import categoriasReducer from "./tab/categoriasReducer";

export default combineReducers({
    tabReducer,
    token: tokenReducer,
    categorias: categoriasReducer,
})