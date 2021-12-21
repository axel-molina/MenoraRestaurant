import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from "react-native";
import { AuthLayout } from "../";
import { FONTS, SIZES, COLORS, icons } from "../../constants";
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from "../../components";
import { utils } from "../../utils";
import CookieManager from '@react-native-cookies/cookies';
import axios from 'axios';


const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userError, setUserError] = useState(false);


function isEnableSignIn() {
  return email != "" && password != "" && emailError == "";
}

const iniciarSesion = (email, password) => {
  if (isEnableSignIn()) {
    //CookieManager.clearAll().then(() => {
      const consultarAPI = async () => {
        const url = "https://app-menora.herokuapp.com/login";
        const data = await axios.post(url, {
          email : email,
          password : password
        })
        CookieManager.get('https://app-menora.herokuapp.com')
        .then((cookies) => {
          //console.log('CookieManager.get =>', cookies);
        })
        .catch((error) => {
          setUserError(true);
          
        })
        if(data.data.accessToken){
          setError(false);
          console.log('ESTO ES TOKEN', data.data.accessToken);
          navigation.navigate("Home", {
            token: data.data.accessToken
          });
        }
      }
      consultarAPI();
      } else {
        setError(true);
      }
 
    }

  return (
    <AuthLayout
      title="Iniciar Sesion"
    >
    <StatusBar backgroundColor='#000'></StatusBar>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
        {/* Form Inputs */}
        <FormInput
          label="Email"
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

        <FormInput
          label="Contraseña"
          secureTextEntry={!showPass}
          autoCompletType="password"
          containerStyle={{ marginTop: SIZES.radius }}
          onChange={(value) => setPassword(value)}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
              onPress={() => setShowPass(!showPass)}
            >
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />

        {error ? <Text style={styles.error}>Todos los campos son obligatorios</Text> : null}

        {/* Sign In */}
        <TextButton
          label="Iniciar Sesión"
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => iniciarSesion(email, password)}
        />


        {/*Forgot Password */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity  onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.olvidasteTuContraseña}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body3,
            }}
          >
            No tienes una cuenta? 
          </Text>
          <TouchableOpacity  onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.olvidasteTuContraseña}>
              {} Crear
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}


    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  olvidasteTuContraseña: {
    color: COLORS.primary,
    ...FONTS.body3,
  },
  error:{
    color: COLORS.red,
    ...FONTS.body3,
    marginBottom: 25,
  }
});

export default SignIn;
