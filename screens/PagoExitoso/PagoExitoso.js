import React from 'react'
import { StyleSheet, Text, View, StatusBar,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
//redux
import { useDispatch, useSelector } from "react-redux";
import { crearPaymentAction, crearCarritoAction, crearDrinksAction, crearTypeAction } from "../../store/actions/carritoActions";
import { setSelectedTab } from '../../store/tab/tabActions';

const PagoExitoso = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const guardarPayment = (payment) => dispatch(crearPaymentAction(payment));
    const guardarType = (type) => dispatch(crearTypeAction(type));
    const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));
    const guardarDrinks = (drinks) => dispatch(crearDrinksAction(drinks));

    const selectedTab = useSelector((state) => state.tabReducer.selectedTab);

    return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar backgroundColor="#000"></StatusBar>
                <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{ width: 150, borderRadius: 100, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginBottom: 18, marginRight: 5 }}>
                    <Icon name="food" size={100} color="white"/>
                </View>
                </LinearGradient>
            <Text style={{ color: 'white', fontSize: 36, marginTop: 20, fontWeight: 'bold' }}>Pedido confirmado</Text>
            <Text style={{ color: 'white', fontSize: 18, marginTop: 20 }}>Haz la fila para abonar en la caja</Text>
            <LinearGradient
        colors={["#ED1200", "#D9510C", "#EA8100"]}
        style={{
          padding: 12,
          borderRadius: 50,
          marginTop: 50,
          marginBottom: 30,
          marginHorizontal: 10,
          paddingHorizontal: 20, 
        }}
      >
        <TouchableOpacity onPress={() => {
                    guardarPayment("");
                    guardarType("");
                    guardarCarrito([]);
                    guardarDrinks([]);
                    setSelectedTab("Inicio")
                    navigation.navigate('MainLayout')
                }
            }>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              textAlign: "center",
              fontFamily: "Poppins-Regular",
            }}
          >
            VOLVER AL HOME
          </Text>
        </TouchableOpacity>
      </LinearGradient>
        </View>
    )
}

export default PagoExitoso

const styles = StyleSheet.create({})
