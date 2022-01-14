import React, {useState, useEffect} from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Alert } from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  
} from "../../constants";
import { crearCarritoAction } from "../../store/actions/carritoActions";
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import RenderPedido from "./RenderPedido";


const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}



const CartTab = () => {

  // State para mostrar la cantidad de items en el carrito
  const [qtyItems, setQtyItems] = useState(0);
  const [total, setTotal] = useState(0);
  //const [indexProd, setIndexProd] = useState(0);
 

  // Info de REDUX
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito.carrito);
  const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));

    //UseEffect para actualizar la cantidad de productos
    useEffect(() => {
      setQtyItems(carrito.length);
      //console.log("Cantidad de items:", qtyItems);
      //calcula el total del precio
      let totalVar = 0;
      for(let i = 0; i < carrito.length; i++){
        //console.log("TOTALVAR:", totalVar);
        //console.log(carrito[i].price);
        totalVar += carrito[i].price;
        for(let j = 0; j < carrito[i].extras.length; j++){
          totalVar += carrito[i].extras[j].price;
        }
      }
      setTotal(totalVar.toFixed(2));
      //console.log("Total:", total);
    } , [carrito]); //no lee el cambio en el estado de redux

  //console.log("CARRITO desde cartab: ", carrito[0].price + carrito[1].price);

  const [text, onChangeText] = React.useState("");

  const alEscribir = (text) => {
    onChangeText(text);
  }

  const eliminarExtras = (index, indexProd) => {
    console.log("INDEXPROD:", indexProd)
    //const pedido = carrito.filter((carrito, indice) => indice !== index);
    //console.log("Pedido:", pedido)
    //guardarCarrito(pedido);
  }

  const comprar = () => {
    console.log("COMPRAR")
    //console.log(productos);
    console.log("Aclaraciones: " + text);
  }

  
  return (
    <View style={styles.container}>
      { qtyItems !== 0 ? 
      (<View style={styles.inputContain}>
        <Text style={styles.detalles}>Detalles de la orden</Text>
        <Text style={{color: 'white', fontSize: 20, borderBottomColor: 'white', borderBottomWidth: 1, marginBottom: 20,}}>• {qtyItems} items</Text>
        {/* Renderizado del pedido */}
      <FlatList 
      data={carrito} 
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => <RenderPedido item={item} index={index} />}
      />

        <Text style={{ color: 'white', fontSize: 20, marginTop: 30,  borderTopColor: 'white', borderTopWidth: 1, }}>Total: ${total}</Text>
        <View style={styles.input}>
            <UselessTextInput
              multiline
              placeholder="¿Querés aclarar algo?"
              numberOfLines={4}
              onChangeText={(text) => alEscribir(text)}
              //value={value}
              style={{ padding: SIZES.base }}
            />
        </View>
        <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{padding: 12, borderRadius: 50, marginTop: 10, marginBottom: 30,}}>
        <TouchableOpacity onPress={comprar}>
          <Text style={styles.comprar}>COMPRAR</Text>
        </TouchableOpacity>
        </LinearGradient>
      </View>) : <Text style={styles.aviso}>Aún no hay productos en el carrito</Text> }
    </View>
  );
};

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
  contain: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputContain:{
    flex: 1,
    marginBottom: 200, 
    width: "100%" 
  },
  input: {
    backgroundColor: COLORS.white,
            borderBottomColor: "#000000",
            borderBottomWidth: 1,
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
  },
  comprar: {
    color: COLORS.white,
    fontSize: 22,
    textAlign: 'center',
    fontFamily: "Poppins-Regular",
  },
  aviso: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: SIZES.padding,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    
  },
  price: {
    color: 'white',
    fontSize: 18,
  },
})




export default CartTab;
