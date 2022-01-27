import {
    COMENZAR_GUARDAR_CARRITO,
    GUARDAR_CARRITO_EXITO,
    GUARDAR_CARRITO_ERROR,
    COMENZAR_GUARDAR_DRINKS,
    GUARDAR_DRINKS_EXITO,
    GUARDAR_DRINKS_ERROR,
} from '../types';


//crear nuevo carrito
export function crearCarritoAction(carrito){
    return (dispatch)=>{

        dispatch(agregarCarrito());
        //console.log("DESDE REDUX: ",carrito)
        try {
            //console.log("DESDE REDUX: ",carrito)
            dispatch(agregarCarritoExito(carrito));
        } catch (error) {
            dispatch(agregarCarritoError(true));
        }
    }
}

export function crearDrinksAction(drinks){
    return (dispatch)=>{

        dispatch(agregarDrinks());
        //console.log("DESDE REDUX: ",carrito)
        try {
            console.log("DESDE REDUX DRINKS: ",drinks)
            dispatch(agregarDrinksExito(drinks));
        } catch (error) {
            dispatch(agregarDrinksError(true));
        }
    }
}



const agregarCarrito = () => ({
    type: COMENZAR_GUARDAR_CARRITO,
    payload: true,
});

// si el carrito fue exitoso
const agregarCarritoExito = (carrito) => ({
    type: GUARDAR_CARRITO_EXITO,
    payload: carrito
});


// si hubo un error con el carrito
const agregarCarritoError = (error) => ({
    type: GUARDAR_CARRITO_ERROR,
    payload: error
});

const agregarDrinks = () => ({
    type: COMENZAR_GUARDAR_DRINKS,
    payload: true,
});

// si el carrito fue exitoso
const agregarDrinksExito = (drinks) => ({
    type: GUARDAR_DRINKS_EXITO,
    payload: drinks
});


// si hubo un error con el carrito
const agregarDrinksError = (error) => ({
    type: GUARDAR_DRINKS_ERROR,
    payload: error
});

