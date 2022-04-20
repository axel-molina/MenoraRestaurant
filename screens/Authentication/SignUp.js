import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { AuthLayout } from "../";
import { COLORS, FONTS, SIZES, icons } from "../../constants";
import { FormInput } from "../../components";
import { utils } from "../../utils";
import Icon from "react-native-vector-icons/AntDesign";
import Logo from "react-native-vector-icons/Entypo";
import Icono from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";

import { useDispatch } from "react-redux";
import { crearTokenAction } from "../../store/actions/tokenActions";
import { red100 } from "react-native-paper/lib/typescript/styles/colors";

const SignUp = ({ navigation }) => {
  //State del formulario
  const [usuario, setUsuario] = React.useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: {
      street: "",
      number: null,
      apt: "",
      postalCode: "",
    },
    password: "",
    passwordConfirmation: "",
  });

  const {
    name,
    surname,
    phone,
    email,
    address,
    password,
    passwordConfirmation,
  } = usuario;

  const [showPass, setShowPass] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    React.useState("");

  const dispatch = useDispatch();

  // Manda a llamar el action de tokenActions
  const guardarToken = (token) => dispatch(crearTokenAction(token));

  function isEnableSignUp() {
    return (
      name != "" &&
      surname != "" &&
      phone != "" &&
      email != "" &&
      address.street != "" &&
      address.number != null &&
      address.postalCode != "" &&
      password != "" &&
      emailError == "" &&
      passwordError == ""
    );
  }

  const registrarUsuario = async () => {
    try {
      if (isEnableSignUp()) {
        if (password !== passwordConfirmation) {
          setError("La contraseña no coincide");
        }
        setError("");

        const consultarAPI = async () => {
          const url = "https://app-menora.herokuapp.com/register";
          const { passwordConfirmation, ...userAux } = usuario;
          const data = await axios.post(url, userAux);
          return data;
        };
        const response = await consultarAPI();
        guardarToken(response.data.accessToken);
        navigation.navigate("SignIn");
      } else {
        setError("Todos los campos son obligatorios");
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 400") {
        setError("Este usuario ya está registrado");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView keyboardShouldPersistTaps="always">
        <StatusBar backgroundColor="#000"></StatusBar>
        <AuthLayout
          title="Registro"
          titleContainerStyle={{
            marginTop: SIZES.radius,
          }}
        >
          {/* Form Input And Sign Up */}

          <View
            style={{
              flex: 1,
              marginTop: SIZES.padding,
            }}
          >
            {/* Input Nombre */}
            <FormInput
              label="Nombre"
              value={name}
              prependComponent={<Icon name="user" size={30} color="white" />}
              onChange={(value) => {
                setUsuario({ ...usuario, name: value });
              }}
            />

            {/* Input Apellido */}
            <FormInput
              label="Apellido"
              value={surname}
              prependComponent={<Icon name="user" size={30} color="white" />}
              onChange={(value) => {
                setUsuario({ ...usuario, surname: value });
              }}
            />

            {/* Input Telefono */}
            <FormInput
              label="Número de teléfono"
              value={phone}
              prependComponent={<Icon name="phone" size={30} color="white" />}
              onChange={(value) => {
                setUsuario({ ...usuario, phone: value });
              }}
            />

            {/* Input email */}
            <FormInput
              label="Email"
              value={email}
              prependComponent={<Icon name="mail" size={30} color="white" />}
              keyboardType="email-address"
              autoCompleteType="email"
              onChange={(value) => {
                // validate email
                utils.validateEmail(value, setEmailError);
                setUsuario({ ...usuario, email: value });
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

            {/* Input Street */}
            <FormInput
              label="Calle"
              value={address.street}
              prependComponent={<Logo name="address" size={30} color="white" />}
              onChange={(value) => {
                const address = { ...usuario.address, street: value.trim() };
                setUsuario({ ...usuario, address });
              }}
            />

            {/* Input number */}
            <FormInput
              label="Número"
              value={address.number}
              keyboardType="numeric"
              prependComponent={
                <Icon name="enviroment" size={30} color="white" />
              }
              onChange={(value) => {
                if (Number(value) > 0) {
                  const address = { ...usuario.address, number: Number(value) };
                  setUsuario({ ...usuario, address });
                } else {
                  console.log("No es un número");
                }
              }}
            />

            {/* Input Depto */}
            <FormInput
              label="Dpto."
              value={address.apt}
              prependComponent={
                <Icono name="building-o" size={30} color="white" />
              }
              onChange={(value) => {
                if (address.apt.length < 16) {
                  const address = { ...usuario.address, apt: value.trim() };
                  setUsuario({ ...usuario, address });
                }
              }}
            />

            {/* Input PostalCode */}
            <FormInput
              label="Código postal"
              value={address.postalCode}
              prependComponent={<Icon name="inbox" size={30} color="white" />}
              onChange={(value) => {
                const address = { ...usuario.address, postalCode: value };
                setUsuario({ ...usuario, address });
              }}
            />

            {/*Input Password */}
            <FormInput
              label="Contraseña "
              secureTextEntry={!showPass}
              value={password}
              prependComponent={<Icon name="lock1" size={30} color="white" />}
              autoCompletType="password"
              containerStyle={{ marginTop: SIZES.radius }}
              onChange={(value) => {
                utils.validatePassword(value, setPasswordError);
                setUsuario({ ...usuario, password: value });
              }}
              /* errorMsg={passwordError} */
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
            <Text style={{ color: "red" }}>{passwordError}</Text>

            {/*Confirmation Password */}
            <FormInput
              label="Confirmar contraseña"
              secureTextEntry={!showPass}
              value={passwordConfirmation}
              prependComponent={<Icon name="lock1" size={30} color="white" />}
              autoCompletType="password"
              containerStyle={{ marginTop: SIZES.radius }}
              onChange={(value) => {
                //utils.validatePassword(value, setPasswordConfirmationError);
                if (passwordConfirmation === password) {
                  setPasswordConfirmationError("");
                }
                setUsuario({ ...usuario, passwordConfirmation: value });
              }}
              errorMsg={passwordConfirmationError}
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

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Sign Up & Sign In Button */}
            <LinearGradient
              colors={["#ED1200", "#D9510C", "#EA8100"]}
              style={{
                padding: 12,
                borderRadius: 50,
                marginTop: 10,
                marginBottom: 10,
                marginHorizontal: 10,
              }}
            >
              <TouchableOpacity onPress={() => registrarUsuario()}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    textAlign: "center",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  REGRISTRARME
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                Ya tienes una cuenta?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={styles.iniciarSesion}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
        </AuthLayout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  iniciarSesion: {
    color: COLORS.primary,
    ...FONTS.body3,
  },
  error: {
    color: COLORS.red,
    ...FONTS.body3,
    marginBottom: 25,
  },
});
export default SignUp;
