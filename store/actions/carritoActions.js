import {
    COMENZAR_GUARDAR_CARRITO,
    GUARDAR_CARRITO_EXITO,
    GUARDAR_CARRITO_ERROR,
    COMENZAR_GUARDAR_DRINKS,
    GUARDAR_DRINKS_EXITO,
    GUARDAR_DRINKS_ERROR,
    COMENZAR_GUARDAR_TYPE,
    GUARDAR_TYPE_ERROR,
    GUARDAR_TYPE_EXITO,
    COMENZAR_GUARDAR_PAYMENT,
    GUARDAR_PAYMENT_ERROR,
    GUARDAR_PAYMENT_EXITO,
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
        try {
            dispatch(agregarDrinksExito(drinks));
        } catch (error) {
            dispatch(agregarDrinksError(true));
        }
    }
}

export function crearTypeAction(type){
    return (dispatch)=>{

        dispatch(agregarType());
        try {
            dispatch(agregarTypeExito(type));
        } catch (error) {
            dispatch(agregarTypeError(true));
        }
    }
}

export function crearPaymentAction(Payment){
    return (dispatch)=>{

        dispatch(agregarPayment());
        try {
            dispatch(agregarPaymentExito(Payment));
        } catch (error) {
            dispatch(agregarPaymentError(true));
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

const agregarType = () => ({
    type: COMENZAR_GUARDAR_TYPE,
    payload: true,
});

// si el carrito fue exitoso
const agregarTypeExito = (type) => ({
    type: GUARDAR_TYPE_EXITO,
    payload: type
});


// si hubo un error con el carrito
const agregarTypeError = (error) => ({
    type: GUARDAR_TYPE_ERROR,
    payload: error
});

const agregarPayment = () => ({
    type: COMENZAR_GUARDAR_PAYMENT,
    payload: true,
});

// si el carrito fue exitoso
const agregarPaymentExito = (Payment) => ({
    type: GUARDAR_PAYMENT_EXITO,
    payload: Payment
});


// si hubo un error con el carrito
const agregarPaymentError = (error) => ({
    type: GUARDAR_PAYMENT_ERROR,
    payload: error
});

