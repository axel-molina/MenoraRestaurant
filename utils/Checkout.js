
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

export default function App() {
  const [paymentResult, setPaymentResult] = useState(null);

  const startCheckout = async () => {
    try {

        const payment = await MercadoPagoCheckout.createPayment({
                    publicKey: 'TEST-b56168fe-5b9b-49c0-9419-51cad5763a2c',
                    preferenceId: "114746594-bd3e1ecd-2067-4c97-b8b2-5b2727d44996",
                  });
            
                  setPaymentResult(payment);
    } catch (err) {
      Alert.alert('El pago fue cancelado', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startCheckout}>
        <Text style={styles.text}>Pagar con Mercado Pago</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Payment: {JSON.stringify(paymentResult)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 22,
      marginHorizontal: 22,
      backgroundColor: 'green',
    },
    text: {
        textAlign: 'center',
        color: 'white',
    }

});