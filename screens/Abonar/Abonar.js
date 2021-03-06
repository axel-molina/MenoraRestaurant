import React, { useState, useEffect } from "react";
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
  ActivityIndicator
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
  crearUsuarioAction
} from "../../store/actions/carritoActions";

const Abonar = ({ route }) => {
  const { total, text, direccion } = route.params;

  const dispatch = useDispatch();

  const guardarType = (type) => dispatch(crearTypeAction(type));
  const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));
  const guardarDrinks = (drinks) => dispatch(crearDrinksAction(drinks));
  const guardarUsuario = (usuario) => dispatch(crearUsuarioAction(usuario));

  const carrito = useSelector((state) => state.carrito.carrito);
  const drinks = useSelector((state) => state.carrito.drinks);
  const payment = useSelector((state) => state.carrito.payment);
  const type = useSelector((state) => state.carrito.type);
  const usuario = useSelector((state) => state.usuario.usuario);
  const token = useSelector((state) => state.token.token);

  const guardarPayment = (payment) => dispatch(crearPaymentAction(payment));

  

  //State del radio button
  const [value, setValue] = React.useState("");

  //state para el precio con descuento
  const [precio, setPrecio] = useState(total);

  //state para mostrar input cupon
  const [showCupon, setShowCupon] = useState(false);

  //state para el cupon
  const [cupon, setCupon] = React.useState("");

  //state para el error
  const [error, setError] = React.useState("");

  //state para el mensaje de aplicado
  const [aplicado, setAplicado] = React.useState(false);	

  //state para enviar el cupon verificado
  const [cuponVerificado, setCuponVerificado] = React.useState(undefined);

  const [isLoading, setIsLoading] = useState(false);


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
  }

  const actualizarPedidos = async () => {
    try {
      const responseUser = await fetch("https://app-menora.herokuapp.com/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data2 = await responseUser.json();
  
      guardarUsuario(data2);
    } catch (error) {
      //console.log(error);
    }
  }

  //Descontar el cupon al total
  const descontarCupon = (monto, tipo) => {
    if(tipo === "fixed"){
      setPrecio(total - monto);
    } else {
      setPrecio(total - (total * (monto / 100)));
    }
  }

  
  //Cuando se preciona abonar
  const abonar = async () => {
    setError("");
    setIsLoading(true);

    if (value !== "") {
      // && cupon === ""

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
        address: direccion,
        comment: text,
        discount: cuponVerificado,
      };

      // Enviar orden al servidor
      const consultarApi = async (orden) => {
        console.log(orden)
        
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
          setIsLoading(false);
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
        setIsLoading(false);
        navigation.navigate("Home");
      } else if (
        value === "cash" &&
        type !== "delivery" &&
        ordenApi === "La orden se ha creado correctamente"
      ) {
        setIsLoading(false);
        navigation.navigate("PagoExitoso");
      } else {
        actualizarPedidos();
        setIsLoading(false);
        Alert.alert("Tu pedido ha sido enviado", "Gracias por tu compra", [
          {
            text: "OK",
            onPress: () => {
              guardarPayment("");
              guardarType("");
              guardarCarrito([]);
              guardarDrinks([]);
              navigation.navigate("Home");
            },
          },
        ]);
        
      }
    } else {
      setError("Seleccione una forma de pago");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  // Al verificar cupon
  const verificarCupon = async () => {
    setAplicado(false);
    setError("");
    if (cupon !== "") {
      // Enviar cupon al servidor
      const consultarApi = async (cupon) => {
        try {
          const url = `https://app-menora.herokuapp.com/discounts?code=${cupon}`;
          const data = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         //console.log(data.data);
          // validar que el pedido minimo se cumpla
          
            if (data.data.minimum > total) {
            setError(
              "El pedido debe ser mayor a $" +
                data.data.minimum +
                " para usar este cupon"
            );
          } else {
            if(data.data.enabled){
              descontarCupon(data.data.amount, data.data.type);
              setAplicado(true);
              setError("");
              setCuponVerificado(data.data._id)
              return data.data;
            }
          }
        
        } catch (error) {
          setError("Cupon no v??lido");
          //console.log("ERROR DE ABONAR(CONSULTA DE API): ", error.message);
        }
      };
      consultarApi(cupon.toUpperCase());
    } else {
      setError("Ingrese un cupon");
    }

    //mandar el codigo de descuento a la api
    
  };

  return (
    <ScrollView
      style={{ backgroundColor: "black" }}
      keyboardShouldPersistTaps="always"
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
              Tarjeta de cr??dito / d??bito
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
          <Text style={{ color: "white", marginLeft: 5 }}>Tengo un cup??n</Text>
        </View>
      </TouchableOpacity>

      {showCupon && !aplicado ? (
        <View>
          <View style={{ marginHorizontal: 10 }}>
            <TextInput
              placeholder="Ingresar cup??n"
              style={{
                borderRadius: 10,
                backgroundColor: "white",
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
              onChangeText={(text) => setCupon(text.toUpperCase())}
            ></TextInput>
          </View>
          <TouchableOpacity onPress={() => verificarCupon()}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 18,
                marginHorizontal: 15,
              }}
            >
              Verificar cup??n
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <Text
        style={{
          color: "red",
          textAlign: "center",
          fontSize: 20,
          marginTop: 15,
          marginBottom: 15,
          marginHorizontal: 10,
        }}
      >
        {error}
      </Text>

      {aplicado ? <Text
        style={{
          color: "green",
          fontSize: 20,
          marginTop: 15,
          marginBottom: 15,
          marginHorizontal: 20,
        }}
      >
        El descuento fue aplicado
      </Text> : null}

      <Text style={{ color: "white", fontSize: 22, marginLeft: 22 }}>
        Precio Total: ${precio}
      </Text>

      {isLoading ? <ActivityIndicator size="large" color="#ED1200" /> : <LinearGradient
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
      </LinearGradient>}
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
