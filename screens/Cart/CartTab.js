import React, {useState} from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Alert } from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  
} from "../../constants";
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
import Checkout from '../../utils/Checkout';



const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

// function Checkout() {
//   const [paymentResult, setPaymentResult] = useState(null);

//   const startCheckout = async () => {
//     try {
//       const payment = await MercadoPagoCheckout.createPayment({
//         publicKey: 'TEST-b56168fe-5b9b-49c0-9419-51cad5763a2c',
//         preferenceId: "114746594-bd3e1ecd-2067-4c97-b8b2-5b2727d44996",
//       });

//       setPaymentResult(payment);
//     } catch (err) {
//       Alert.alert('Something went wrong', err.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={startCheckout}>
//         <Text style={styles.text}>Start Payment</Text>
//       </TouchableOpacity>
//       <Text style={styles.text}>Payment: {JSON.stringify(paymentResult)}</Text>
//     </View>
//   );
// }


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
      
     <Checkout/>
      
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
      </View>) : <Text style={styles.aviso}>Aún no tenés productos en el carrito</Text>}
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
  },
  aviso: {
    textAlign: 'center',
  }
})




export default CartTab;
