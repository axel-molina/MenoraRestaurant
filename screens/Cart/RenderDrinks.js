import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { crearCarritoAction } from "../../store/actions/carritoActions";
import { crearIndexAction } from '../../store/actions/indexProductAction';

const RenderDrinks = ( {item, index}) => { 

    // Info de REDUX
    const dispatch = useDispatch();
    const drinks = useSelector((state) => state.carrito.drinks);
    const guardarDrinks = (drinks) => dispatch(crearDrinksAction(drinks));
    
    const eliminarDrinks = (index) => {
      const pedidoDrinks = drinks.filter((drinks, indice) => indice !== index);
      guardarDrinks(pedidoDrinks);
    }
   
    return (
          <View style={styles.containProd}>
            <Text style={styles.text}> {item.name}</Text>
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity style={styles.button} onPress={() => eliminar(index)}>
               <Icon name="delete" size={25} color="orange" />
              </TouchableOpacity>
            </View>
          </View>
      
      );
  }

export default RenderDrinks

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
