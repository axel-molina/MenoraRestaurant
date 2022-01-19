import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";

import { crearCarritoAction } from "../../store/actions/carritoActions";

const RenderExtras = ({item, index}) => {

  const dispatch = useDispatch();

  const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));

  const indexProd = useSelector((state) => state.indexProductReducer.index); 
  const carrito = useSelector((state) => state.carrito.carrito);

  //console.log("...Index del extra: ", index, "Index del producto: ", indexProd);

  const eliminarExtras = (index, indexProd) => {
    //const pedido = carrito.filter((carrito, indice) => indice !== index);
    const extras = carrito[indexProd].extras.filter((extras, indice) => indice !== index);
    const nuevoCarrito = [...carrito];
    nuevoCarrito[indexProd].extras = extras;
    console.log("Pedido sin extras:", extras)
    guardarCarrito(nuevoCarrito);
    //guardar extras nuevos
  }

    if(item){
        return (
            <View style={styles.contain}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={{ flexDirection: 'row'}}>
                <Text style={styles.price}> ${item.price}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    eliminarExtras(index, indexProd)
                    }}>
                  <Icon name="delete" size={25} color="orange" />
                </TouchableOpacity>
              </View>
            </View>
          );
        } else{
          return null;
        }
}

export default RenderExtras

const styles = StyleSheet.create({
    text:{
        color: '#828282',
        fontSize: 18,
      },
      contain: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 40,
      },
      button: {
        marginLeft: 10,
      },
      price: {
        color: '#828282',
        fontSize: 18,
      },
})
