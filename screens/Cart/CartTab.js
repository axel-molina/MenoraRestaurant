import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView } from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  dummyData,
} from "../../constants";



const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

const CartTab = ({productos, setProductos}) => {



 const renderPedido = ({ item }) => {
  return (
      <Text style={styles.numero}>{item.name} - {item.price}<Button onPress={() => eliminar(item.id)} title="Eliminar"></Button></Text>
    );
}

  const [text, onChangeText] = React.useState("");

  const alEscribir = (text) => {
    onChangeText(text);
  }

  const eliminar = (id) => {
    const pedido = productos.filter(producto => producto.id !== id);
    console.log(pedido)
    setProductos(pedido);
  }

  const comprar = () => {
    console.log(productos);
    console.log("Aclaraciones: " + text);
  }


  return (
    <ScrollView style={styles.container}>

      
      { productos.length !== 0 ? 
      (<View style={styles.inputContain}>
        <Text style={styles.numero}>Número de orden: #28112396</Text>
        <Text style={styles.numero}>Detalles de la orden:</Text>

        {/* Renderizado del pedido */}
      <FlatList 
      data={productos} 
      keyExtractor={(item, index) => index}
      renderItem={renderPedido}
      />

        <Text style={styles.numero}>Total:</Text>
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
        <TouchableOpacity onPress={comprar}>
          <Text style={styles.comprar}>COMPRAR</Text>
        </TouchableOpacity>
      </View>) : <Text style={styles.numero}>Aún no has hecho tu pedido</Text>}
    </ScrollView>
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
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    padding: SIZES.radius,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding,
    textAlign: 'center',
    fontFamily: "Poppins-Regular",
  }
})




export default CartTab;
