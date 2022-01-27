import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthLayout } from "../";
import { FONTS, SIZES, COLORS, icons } from "../../constants";
import { FormInput, TextButton } from "../../components";
import { utils } from "../../utils";
import CookieManager from "@react-native-cookies/cookies";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";

// Actions Redux
import { crearTokenAction } from "../../store/actions/tokenActions";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userError, setUserError] = useState(false);

  function isEnableSignIn() {
    return email != "" && password != "" && emailError == "";
  }

  // utilizar use dispatch y crea una funcion
  const dispatch = useDispatch();

  // Acceder al state loading del store
  const stateError = useSelector((state) => state.token.error);
  const token = useSelector((state) => state.token.token);

  // Manda a llamar el action de tokenActions
  const guardarToken = (token) => dispatch(crearTokenAction(token));

  const refreshLogin = async () => {
    try {
      const cookies = await CookieManager.get(
        "https://app-menora.herokuapp.com"
      );
      if (cookies.jwt && cookies.jwt.value) {
        const url = "https://app-menora.herokuapp.com/refresh";
        const data = await axios.get(url);
        if (data.data.accessToken) {
          guardarToken(data.data.accessToken);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      errorReset()
      setIsLoading(true);
      refreshLogin();
    }
  }, []);

  // Cuando el usuario inicie sesion
  const iniciarSesion = (email, password) => {
    console.log("Iniciando sesion...");
    // Quita los errores
    errorReset();

    setIsLoading(true); 

    if (isEnableSignIn()) {
      //CookieManager.clearAll().then(() => {
      const consultarAPI = async () => {
        try {
          const url = "https://app-menora.herokuapp.com/login";
          const data = await axios.post(url, {
            email: email,
            password: password,
          });

          if (data.data.accessToken) {
            setError(false);
            guardarToken(data.data.accessToken);
          }
        } catch (error) {
          console.log(error);
          setUserError(true);
          setIsLoading(false);
        }
      };

      consultarAPI();
    } else {
      setUserError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token != null && token != "") {
      setIsLoading(false);
      errorReset();
      navigation.navigate("Home");
    }
  }, [token]);

  //Resetea los states de error a false
  const errorReset = () => {
    setError(false);
    setUserError(false);
  };

  return (
    <AuthLayout title="Iniciar Sesion">
      <StatusBar backgroundColor="#000"></StatusBar>
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

        {error ? (
          <Text style={styles.error}>Todos los campos son obligatorios</Text>
        ) : null}
        {stateError ? <Text style={styles.error}>Hubo un error</Text> : null}
        {userError ? (
          <Text style={styles.error}>Usuario o contraseña incorrecta</Text>
        ) : null}

        {/* Sign In */}

        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <LinearGradient
            colors={["#ED1200", "#D9510C", "#EA8100"]}
            style={{ padding: 12, borderRadius: 50, marginTop: 15 }}
          >
            <TouchableOpacity onPress={() => iniciarSesion(email, password)}>
              <Text style={styles.comprar}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
          </LinearGradient>
        )}

        {/*Forgot Password */}
        {/* <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.olvidasteTuContraseña}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View> */}

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
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.olvidasteTuContraseña}>{} Crear</Text>
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
  error: {
    color: COLORS.red,
    ...FONTS.body3,
    marginBottom: 25,
  },
  comprar: {
    color: COLORS.white,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
});

export default SignIn;
