import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import RenderExtras from './RenderExtras';
import Icon from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { crearCarritoAction, crearDrinksAction } from "../../store/actions/carritoActions";
import { crearIndexAction } from '../../store/actions/indexProductAction';


const RenderPedido = ( {item, index}) => { 
    const [open, setOpen] = useState(false);

    // Info de REDUX
    const dispatch = useDispatch();
    const carrito = useSelector((state) => state.carrito.carrito);
    const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));
    const guardarIndex = (index) => dispatch(crearIndexAction(index));

    const activeIndex = useSelector((state) => state.indexProductReducer.index); 

    //Funcion para abrir los extras
    const handleOpen = (index) => {
        //setOpen(!open);
        if(index === activeIndex){
          guardarIndex(null);
        }
        if(index !== activeIndex){
          guardarIndex(index);  
        }
    }
    
    const eliminar = (index) => {
      const pedido = carrito.filter((carrito, indice) => indice !== index);
      guardarCarrito(pedido);
    }

    const drinks = useSelector((state) => state.carrito.drinks);
    const guardarDrinks = (drinks) => dispatch(crearDrinksAction(drinks));
    
    const eliminarDrinks = (index) => {
      console.log("ESTO ES INDEX DE DRINKS", index)
      const pedidoDrinks = drinks.filter((drinks, indice) => indice !== index);
      guardarDrinks(pedidoDrinks);
    }

    const isDrink = item.hasOwnProperty('alcohol');

    if(!isDrink){
    return (
        <View>
          <View style={styles.containProd}>
            { item.extras.length > 0 ? <TouchableOpacity onPress={() => handleOpen(index)}>
              <Text style={styles.text}>{index !== activeIndex ? <Icon name="pluscircle" size={20} color="white" /> :
              <Icon name="minuscircle" size={20} color="white" />} {item.name}</Text>
            </TouchableOpacity> :  <Text style={styles.text}> {item.name}</Text>}
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity style={styles.button} onPress={() => eliminar(index)}>
               <Icon name="delete" size={25} color="orange" />
              </TouchableOpacity>
            </View>
            
          </View>
          {(typeof activeIndex === 'number' && activeIndex === index) ? <FlatList 
            data={item.extras} 
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => <RenderExtras item={item} index={index} />}
            /> : null}
        </View>
      );
  } else {
    return (
      <View style={styles.containProd}>
        <Text style={styles.text}> {item.name}</Text>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.price}>${item.price}</Text>
          <TouchableOpacity style={styles.button} onPress={() => eliminarDrinks(index - carrito.length)}>
           <Icon name="delete" size={25} color="orange" />
          </TouchableOpacity>
        </View>
      </View>
  
  );
  }
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
