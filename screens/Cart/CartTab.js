import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";


const CartTab = ({ productos }) => {

  const [text, onChangeText] = React.useState("¿Querés aclarar algo?");

  const alEscribir = (text) => {
    console.log(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.numero}>Número de orden: #28112396</Text>
      <Text style={styles.numero}>Detalles de la orden:</Text>
      <Text style={styles.numero}>1x {productos.name}</Text>
      <Text style={styles.numero}>Total:</Text>
      <TextInput
      style={styles.input}
      onChangeText={alEscribir}
      value={text}
      ></TextInput>
      <TouchableOpacity>
        <Text style={styles.numero}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    marginHorizontal: 22,
  },
  numero: {
    color: '#fff',
    fontSize: 22,
  },
  input: {
    height: 60,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#BBBDC1',
  }
})

export default CartTab;
