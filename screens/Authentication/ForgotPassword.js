import React, {useState} from "react";
import { View, Image, TouchableOpacity,Text, ActivityIndicator } from "react-native";
import { AuthLayout } from "../";
import { SIZES, COLORS, icons } from "../../constants";
import { FormInput } from "../../components";
import { utils } from "../../utils";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";

const ForgotPassword = ({ navigation }) => {
  // estado para el input email
  const [email, setEmail] = React.useState("");
  // estado que activa el botón
  const [emailError, setEmailError] = React.useState("");
  // estado que activa el mensaje rojo
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // funcion que valida el mail
  function isEnableSendEmail() {
    return email != "" && emailError == "";
  }

  // al hacer click en el botón
  const onSendEmail = async () => {

    if(!isLoading){
      setIsLoading(true);
    }

    // Hacer la consulta al servidor y enviar el email
    try {
      const url = "https://app-menora.herokuapp.com/password/request";
      const data = await axios.post(url, {
        email: email,
      });
      //console.log("RESPUESTA DEL ENVIO DE MAIL EN RECUPERAR PASS: ",data.data, "Con email: ", email);
      setError(false);
      navigation.navigate("Otp");
      setIsLoading(false);
    } catch (error) {
        console.log("ERROR DE RECUPERAR PASS: ", error)
        setIsLoading(false);
        setError(true);
        return
    }
  
   
    setError(false)
    setIsLoading(false)
  }

  return (
    <AuthLayout
      title="Recuperar contraseña"
      subtitle="Porfavor ingrese su dirección de correo electrónico para recuperar su contraseña"
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
      }}
    >
      {/* Form Input */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
        <FormInput
          label="Ingrese su correo electrónico"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(value) => {
            // validate email
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  email == "" || (email != "" && emailError == "")
                    ? icons.correct
                    : icons.cross
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email == ""
                      ? COLORS.gray
                      : email != "" && emailError == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
      </View>

      {/* Mensaje de error */}
      { error ? <View style={{ flex: 1 }}>
        <Text style={{ color: 'red', fontSize: 20, textAlign: 'center'}}>Error, email no válido</Text>
      </View> : null }

      {isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> : null}
      

      {/* Button */}
      { isEnableSendEmail() && !isLoading ? 
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
      <TouchableOpacity onPress={() => onSendEmail()}>
        <Text
          style={{
            color: "white",
            fontSize: 22,
            textAlign: "center",
            fontFamily: "Poppins-Regular",
          }}
        >
          Enviar correo
        </Text>
      </TouchableOpacity>
    </LinearGradient>
        : null}
    </AuthLayout>
  );
};

export default ForgotPassword;
