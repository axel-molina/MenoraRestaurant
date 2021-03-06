import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import {
  COLORS,
  SIZES,
  
} from "../../constants";
import { useSelector } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import RenderPedido from "./RenderPedido";
import { useNavigation } from '@react-navigation/native';


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

  // Info de REDUX
  const carrito = useSelector((state) => state.carrito.carrito);
  const drinks = useSelector((state) => state.carrito.drinks);

    //UseEffect para actualizar la cantidad de productos
    useEffect(() => {
      setQtyItems(carrito.length + drinks.length);
      let totalVar = 0;
      if(carrito.length && carrito.length > 0 ){
        for(let i = 0; i < carrito.length; i++){
        totalVar += carrito[i].price;
        for(let j = 0; j < carrito[i].extras.length; j++){
          totalVar += carrito[i].extras[j].price;
        }
      }
    }
    if(drinks.length && drinks.length > 0 ){
      for(let i = 0; i < drinks.length; i++){
      totalVar += drinks[i].price;
    }
  }
    setTotal(totalVar.toFixed(2));
    } , [carrito, drinks]); 

  const [text, onChangeText] = React.useState("");

  const alEscribir = (text) => {
    if(text.length < 200)
    {
      onChangeText(text);
    }
  }

  const navigation = useNavigation();

  const comprar = () => {
    
    //console.log(carrito)
    if(carrito.length > 0){
      navigation.navigate("MedioDeEnvio", { total: total, text: text })
    } else {
      Alert.alert(
        "Error",
        "No puedes comprar solo bebidas",
        [
          { text: "OK"}
        ]
      );
    }
  }

  
  return (
    <View style={styles.container}>
      { qtyItems !== 0 ? 
      (<View style={styles.inputContain}>
        <Text style={styles.detalles}>Detalles de la orden</Text>
        <Text style={{color: 'white', fontSize: 20, borderBottomColor: 'white', borderBottomWidth: 1, marginBottom: 20,}}>??? {qtyItems} items</Text>
        {/* Renderizado del pedido */}
      {carrito.length || drinks.length ? <FlatList 
      data={[...carrito, ...drinks]} 
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => <RenderPedido item={item} index={index} />}
      /> : null}

        <Text style={{ color: 'white', fontSize: 20, marginTop: 30,  borderTopColor: 'white', borderTopWidth: 1, }}>Total: ${total}</Text>
        <View style={styles.input}>
            <UselessTextInput
              multiline
              placeholder="??Quer??s aclarar algo?"
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
      </View>) : <Text style={styles.aviso}>A??n no hay productos en el carrito</Text> }
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
