import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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
  const [error, setError] = useState(null);


function isEnableSignIn() {
  return email != "" && password != "" && emailError == "";
}

const iniciarSesion = () => {
  if (isEnableSignIn()) {
    //CookieManager.clearAll().then(() => {
      const consultarAPI = async () => {
        const url = "https://app-menora.herokuapp.com/login";
        const data = await axios.post(url, {
          email : "kevin@gmail.com",
          password : "kevin"
        })
        CookieManager.get('https://app-menora.herokuapp.com')
        .then((cookies) => {
          //console.log('CookieManager.get =>', cookies);
        })
        .catch((error) => {
          console.log(error);
        })
        if(data.data.accessToken){
          
          //console.log('ESTO ES TOKEN', data.data.accessToken);
          navigation.navigate("Home");
        }
      }
      consultarAPI();
  }
    
}

  return (
    <AuthLayout
      title="Iniciar Sesion"
      subtitle="Bienvenido de nuevo, ingrese sus datos"
    >
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
          label="Password"
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


        {/* Sign In */}
        <TextButton
          label="Iniciar Sesión"
          disabled={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.primary
              : COLORS.transparentPrimray,
          }}
          onPress={() => iniciarSesion()}
        />


        {/*Forgot Password */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <TextButton
            label="Olvidaste la Contraseña?"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}
            onPress={() => navigation.navigate("ForgotPassword")}
          />
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
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}
          >
            No tienes una cuenta?
          </Text>

          <TextButton
            label="Sign Up"
            buttonContainerStyle={{
              marginLeft: 3,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>

      {/* Footer */}


    </AuthLayout>
  );
};

export default SignIn;
