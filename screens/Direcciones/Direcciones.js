import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { useSelector } from "react-redux";

const Direcciones = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const token = useSelector((state) => state.token.token);
  const usuario = useSelector((state) => state.usuario.usuario);  


  // Stado del objeto a enviar (nueva direccion)
  const [direccion, setDireccion] = useState({
      street: "",
      number: null,
      apt: "",
      postalCode: "",

  });

  function isEnableAddress(){
      return(
            direccion.street != "" &&
            direccion.number != null &&
            direccion.postalCode != "" 
      )
  }


  const [array, setArray] = useState([usuario.address.list]);

  //console.log((array[0]).concat(direccion)); 

 

  const enviarDireccion = async (direccion) => {
    setIsLoading(true);
    setError("");


    const newDir = ((array[0]).concat(direccion));
    
    const obj = {
      "newAddressList" : newDir
    }
    

    if(isEnableAddress()){
    try {
      const url = "https://app-menora.herokuapp.com/users/address";
      const data = await axios.put(url, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.status);
      if (data.status === 200) {
        Alert.alert("Éxito", "Tu dirección fue agregada correctamente", [{ text: "OK", onPress: () => navigation.navigate("Home") }]);

      } else { 
          console.log("Error")
       }
       setIsLoading(false);
      
    } catch (error) {
      console.log("ERROR DE Direccion (CONSULTA DE API): ", error);
      Alert.alert("Error", "No se pudo enviar la dirección", [{ text: "OK" }]);
        setIsLoading(false);
    }
} else {
    setError("Por favor, llena los campos de dirección");
}
    
    setIsLoading(false); 
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "black" }}
      keyboardShouldPersistTaps="always"
    >
      <StatusBar backgroundColor="#000"> </StatusBar>
      <Text
        style={{
          color: "white",
          fontSize: 45,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Agregar dirección
      </Text>

      {/* Formulario */}
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ color: "white", fontSize: 18 }}>Calle</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            marginBottom: 20,
            borderRadius: 10,
            color: "white",
          }}
          onChangeText={(value) => {
            setDireccion({ ...direccion, street: value });
          }}
          value={direccion.street}
          placeholder="Calle"
        />
        <Text style={{ color: "white", fontSize: 18 }}>Número</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            marginBottom: 20,
            borderRadius: 10,
            color: "white",
          }}
          onChangeText={(value) => {
            if (Number(value) > 0) {
              const numero = Number(value) ;
              setDireccion({ ...direccion, number:numero  });
            } else {
              setError("Por favor, ingresa un número válido");
            }
          }}
          value={direccion.number}
          placeholder="Número"
        />
        <Text style={{ color: "white", fontSize: 18 }}>Departamento</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            marginBottom: 20,
            borderRadius: 10,
            color: "white",
          }}
          onChangeText={(value) => {
            setDireccion({ ...direccion, apt: value });
          }}
          value={direccion.apt}
          placeholder="Dpto."
        />
        <Text style={{ color: "white", fontSize: 18 }}>Código postal</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            marginBottom: 20,
            borderRadius: 10,
            color: "white",
          }}
          onChangeText={(value) => {
            setDireccion({ ...direccion, postalCode: value });
          }}
          value={direccion.postalCode}
          placeholder="Código postal"
        />
 
          <Text style={{ color:'red', textAlign: 'center' }}>{error}</Text> 

        {!isLoading ? (
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
            <TouchableOpacity onPress={() => enviarDireccion(direccion)}>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  textAlign: "center",
                  fontFamily: "Poppins-Regular",
                }}
              >
                Agregar dirección
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <ActivityIndicator size="large" color="#EA8100" />
        )}
      </View>
    </ScrollView>
  );
};

export default Direcciones;
