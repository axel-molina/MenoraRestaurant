import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";


const CambioDeContraseñaExitoso = ({ navigation }) => {
  

  return (
    <View style={{ flex:1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar backgroundColor="#000"></StatusBar>
      <Icon name="checkcircle" size={160} color="green" />
      <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginTop: 40, fontWeight: 'bold', marginHorizontal: 20}}>
        Tu contraseña ah sido actualizada, revisa tu correo y sigue los pasos para continuar
      </Text>
      <LinearGradient
        colors={["#ED1200", "#D9510C", "#EA8100"]}
        style={{
          padding: 12,
          borderRadius: 50,
          marginTop: 90,
          marginBottom: 30,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Poppins-Regular",
            }}
          >
            VOLVER A CUENTA
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default CambioDeContraseñaExitoso;