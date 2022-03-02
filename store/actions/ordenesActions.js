import {
    COMENZAR_GUARDAR_ORDENES,
    GUARDAR_ORDENES_EXITO,
    GUARDAR_ORDENES_ERROR,
} from '../types';

//Descargar las categorias de la base de datos
export function obtenerOrdenesAction(ordenes){ 
    
    return async (dispatch)=>{
        
        dispatch(descargarOrdenes());

        try {
            dispatch(descargaOrdenesExito(ordenes));
        } catch (error) {
            dispatch(descargaOrdenesError(error));
        }
    }
}

// si se descargo las ordenes
const descargarOrdenes = () => ({
    type: COMENZAR_GUARDAR_ORDENES,
    payload: true,
});

// si la descarga fue exitosa
const descargaOrdenesExito = ordenes => ({
    type: GUARDAR_ORDENES_EXITO,
    payload: ordenes,
});


// si hubo un error con las ordenes
const descargaOrdenesError = (error) => ({
    type: GUARDAR_ORDENES_ERROR,
    payload: error
});
