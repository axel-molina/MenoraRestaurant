import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { COLORS, images } from "../../constants";
import { RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  crearPaymentAction,
  crearCarritoAction,
  crearDrinksAction,
  crearTypeAction,
} from "../../store/actions/carritoActions";

const Abonar = () => {
  const dispatch = useDispatch();

  const guardarType = (type) => dispatch(crearTypeAction(type));
  const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));
  const guardarDrinks = (drinks) => dispatch(crearDrinksAction(drinks));
  
  const carrito = useSelector((state) => state.carrito.carrito);
  const drinks = useSelector((state) => state.carrito.drinks);
  //const payment = useSelector((state) => state.carrito.payment);
  const type = useSelector((state) => state.carrito.type);
  const usuario = useSelector((state) => state.usuario.usuario);
  const token = useSelector((state) => state.token.token);
  
  const guardarPayment = (payment) => dispatch(crearPaymentAction(payment));
  
  //State del radio button
  const [value, setValue] = React.useState("");

  //state para mostrar input cupon
  const [showCupon, setShowCupon] = useState(false);

  //state para el cupon
  const [cupon, setCupon] = React.useState("");

  //state para el error
  const [error, setError] = React.useState("");

  //Cuando se precione cupon
  const handleCupon = () => {
    setShowCupon(!showCupon);
  };

  const navigation = useNavigation();

  // Abrir el browser de mercado pago
  const openBrowser = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "No se pudo abrir el link");
    }
  };

  //Cuando se preciona abonar
  const abonar = async () => {

    setError("");

    if(value !== "" ) { // && cupon === ""
      
    guardarPayment(value);

    //Extraer id drinks
    const filtrarIdDrinks = (drinks) => {
      const drinksAux = [];
      if (drinks.length && drinks.length > 0) {
        for (let i = 0; i < drinks.length; i++) {
          drinksAux.push(drinks[i].id);
        }
      }
      return drinksAux;
    };
    const idDrinks = filtrarIdDrinks(drinks);

    //Extraer id productos
    const filtrarIdProductos = (carrito) => {
      const productosAux = [];
      if (carrito.length && carrito.length > 0) {
        for (let i = 0; i < carrito.length; i++) {
          const aux = { extras: [] };
          aux.product = carrito[i].id;
          if (
            carrito[i].extras &&
            carrito[i].extras.length &&
            carrito[i].extras.length > 0
          ) {
            for (let j = 0; j < carrito[i].extras.length; j++) {
              aux.extras.push(carrito[i].extras[j]._id);
            }
          }
          productosAux.push(aux);
        }
      }

      return productosAux;
    };
    const idProducts = filtrarIdProductos(carrito);

    //Crear objeto de pago
    const orden = {
      products: idProducts,
      drinks: idDrinks,
      paymentType: value,
      type: type,
      address: usuario.address.lastUsed,
      comment: "",
    };

    // Enviar orden al servidor
    const consultarApi = async (orden) => {
      //console.log(orden)
      try {
        const url = "https://app-menora.herokuapp.com/orders";
        const data = await axios.post(url, orden, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data.data;
      } catch (error) {
        console.log("ERROR DE ABONAR(CONSULTA DE API): ", error);
      }
    };

    const ordenApi = await consultarApi(orden);

    //Abrir el link de mercado pago
    if (
      ordenApi.checkout &&
      (value === "account_money" || value === "credit_card")
    ) {
      openBrowser(ordenApi.checkout);
      guardarPayment("");
      guardarType("");
      guardarCarrito([]);
      guardarDrinks([]);
      navigation.navigate("Home");
    } else if (
      value === "cash" &&
      type !== "delivery" &&
      ordenApi === "La orden se ha creado correctamente"
    ) {
      navigation.navigate("PagoExitoso");
    } else {
      Alert.alert("Tu pedido ah sido enviado", "Gracias por tu compra", [
        { text: "OK", onPress: () => {
          guardarPayment("");
                    guardarType("");
                    guardarCarrito([]);
                    guardarDrinks([]);
          navigation.navigate("Home")
        } 
        }
      ]);
    }
  } else {
    setError("Seleccione una forma de pago");
  }
  };

  // Al verificar cupon
  const verificarCupon = async () => {
    console.log("Cupon: ", cupon);
    // verificar si el cupon no fue utilizado en la lista de users (redux), no deberia dejar enviar el pedido
    console.log(usuario.cupons);
    // si es valido que aparezca cupón valido y que permita abonar
    // hacer una request a url/discounts, esto me trae el descuento (fijo o porcentaje)
    // validar que el pedido minimo se cumpla
    // validar que no haya expirado

    //modiicar el front del precio con el descuento aplicado
    //mandar el codigo de descuento a la api
  }

  return (
    <ScrollView style={{ backgroundColor: "black" }}
    keyboardShouldPersistTaps='always'
    >
      <StatusBar backgroundColor="#000"></StatusBar>
      <Text
        style={{
          color: "white",
          fontSize: 45,
          textAlign: "center",
          marginTop: 10,
          marginBottom: 30,
          fontWeight: "bold",
        }}
      >
        Abonar
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Image
          source={images.favourite_food}
          style={{ width: 100, height: 130 }}
        ></Image>
      </View>
      <View style={{ marginLeft: 10 }}>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 2,
              marginBottom: 10,
            }}
          >
            <RadioButton
              value="cash"
              color={COLORS.primary}
              uncheckedColor={COLORS.primary}
              status={value === "cash" ? "checked" : "unchecked"}
              onValueChange={(value) => setChecked(value)}
            />
            <Text style={{ color: "white", marginTop: 6 }}>Efectivo</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 2,
              marginBottom: 10,
            }}
          >
            <RadioButton
              value="account_money"
              color={COLORS.primary}
              uncheckedColor={COLORS.primary}
              status={value === "account_money" ? "checked" : "unchecked"}
              onValueChange={(value) => setChecked(value)}
            />
            <Text style={{ color: "white", marginTop: 6 }}>Mercado pago</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 2,
              marginBottom: 10,
            }}
          >
            <RadioButton
              value="credit_card"
              color={COLORS.primary}
              uncheckedColor={COLORS.primary}
              status={value === "credit_card" ? "checked" : "unchecked"}
              onValueChange={(value) => setChecked(value)}
            />
            <Text style={{ color: "white", marginTop: 6 }}>
              Tarjeta de crédito / débito
            </Text>
          </View>
        </RadioButton.Group>
      </View>

      <TouchableOpacity onPress={() => handleCupon()}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 5,
            marginLeft: 17,
          }}
        >
          <Icon name="ticket" size={25} color={COLORS.primary} />
          <Text style={{ color: "white", marginLeft: 5 }}>Tengo un cupón</Text>
        </View>
      </TouchableOpacity>

      {showCupon
       ? (
        <View>
          <View style={{ marginHorizontal: 10 }}>
            <TextInput
              placeholder="Ingresar cupón"
              style={{
                borderRadius: 10,
                backgroundColor: "white",
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
              onChangeText={(text) => setCupon(text)}
            ></TextInput>
          </View>
          <TouchableOpacity onPress={() => verificarCupon()}>
            <Text style={{ color: COLORS.primary, fontSize: 18, marginHorizontal: 15 }}>Verificar cupón</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <Text style={{ color: 'red', textAlign: 'center', fontSize: 20, marginTop: 15 }}>{error}</Text>

      <Text style={styles.text}>Precio Total:</Text>

      <LinearGradient
        colors={["#ED1200", "#D9510C", "#EA8100"]}
        style={{
          padding: 12,
          borderRadius: 50,
          marginTop: 10,
          marginBottom: 30,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => abonar()}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              textAlign: "center",
              fontFamily: "Poppins-Regular",
            }}
          >
            ABONAR
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default Abonar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
