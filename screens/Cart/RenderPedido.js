import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import RenderExtras from './RenderExtras';
import Icon from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { crearCarritoAction } from "../../store/actions/carritoActions";

const RenderPedido = ( {item, index}) => { 
    //console.log("ESTO ES index", index);
    //console.log("ESTO ES ITEM", item);
    // state para abrir los extras
    const [open, setOpen] = useState(false);

    // Info de REDUX
    const dispatch = useDispatch();
    const carrito = useSelector((state) => state.carrito.carrito);
    const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));

    //Funcion para abrir los extras
    const handleOpen = () => {
        setOpen(!open);
        //console.log("OPEN:", open);
    }

    //Funcion que cambia el icono del boton
    const handleIcon = () => {
        if(open){
            return(
                <Icon name="minuscircle" size={20} color="white" />
            )
        } else{
            return(
              <Icon name="pluscircle" size={20} color="white" />
            )
        }
    }

    const eliminar = (index) => {
      //console.log("ELIMINAR", index)
      const pedido = carrito.filter((carrito, indice) => indice !== index);
      //console.log("Pedido:", pedido)
      guardarCarrito(pedido);
    }
   
    return (
        <View>
          <View style={styles.containProd}>
            { item.extras.length > 0 ? <TouchableOpacity onPress={() => handleOpen()}>
              <Text style={styles.text}>{handleIcon()} {item.name}</Text>
            </TouchableOpacity> :  <Text style={styles.text}> {item.name}</Text>}
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity style={styles.button} onPress={() => {
                //setIndexProd(indexProducto);
                return eliminar(index) /*Index del producto principal*/
                }}>
               <Icon name="delete" size={25} color="orange" />
              </TouchableOpacity>
            </View>
            
          </View>
          {open ? <FlatList 
            data={item.extras} 
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <RenderExtras item={item} indexProd={props.indexProducto} />}
            /> : null}
        </View>
      );
  }

export default RenderPedido

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 22,
      marginHorizontal: 22,
    },
    detalles: {
      color: '#828282',
      fontSize: 22,
      marginBottom: 10,
    },
    text:{
      color: 'white',
      fontSize: 18,
    },
    containProd: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    inputContain:{
      flex: 1,
      marginBottom: 200, 
      width: "100%" 
    },
    comprar: {
      color: 'white',
      fontSize: 22,
      textAlign: 'center',
      fontFamily: "Poppins-Regular",
    },
    price: {
      color: 'white',
      fontSize: 18,
    },
    button: {
      marginLeft: 10,
    },
  })
