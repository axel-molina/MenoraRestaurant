import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert
} from "react-native";
import { AuthLayout } from "../";
import { COLORS, FONTS, SIZES, icons } from "../../constants";
import { FormInput, TextButton } from "../../components";
import { utils } from "../../utils";
import Icon from "react-native-vector-icons/AntDesign";
import Logo from "react-native-vector-icons/Entypo";
import axios from "axios";

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
      postalCode: "",
      latitude: null,
      longitude: null,
    },
    password: "",
  });

  const { name, surname, phone, email, address, password } = usuario;

  const [showPass, setShowPass] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");

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
    console.log(usuario)
    try {
      if (isEnableSignUp()) {
        setError("");

        const consultarAPI = async () => {
          const url = "https://app-menora.herokuapp.com/register";
          const data = await axios.post(url, usuario);
          return data;
        };
        const response = await consultarAPI();
        //console.log("RESPUESTA: ", response.data);
        Alert.alert(
          "Registro exitoso",
          "Ya puede iniciar sesión",
          [
            { text: "OK", onPress: () => navigation.navigate("SignIn") }
          ]
        );
      } else {
        setError("Todos los campos son obligatorios");
      }
    } catch (error) {
      //console.log(error.message);
      if(error.message === "Request failed with status code 400"){
        setError("Este usuario ya está registrado")
      } else {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView>
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
            prependComponent={
              <Logo name="address" size={30} color="white" />
            }
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
              if(Number(value) > 0){
                const address = { ...usuario.address, number: Number(value) };
                setUsuario({ ...usuario, address });
              } else {console.log("No es un número")}
            }}
          />

          {/* Input PostalCode */}
          <FormInput
            label="Código postal"
            value={address.postalCode}
            prependComponent={
              <Icon name="inbox" size={30} color="white" />
            }
            onChange={(value) => {
              const address = { ...usuario.address, postalCode: value };
              setUsuario({ ...usuario, address });
            }}
          />

          {/*Input Password */}
          <FormInput
            label="Contraseña"
            secureTextEntry={!showPass}
            value={password}
            prependComponent={<Icon name="lock1" size={30} color="white" />}
            autoCompletType="password"
            containerStyle={{ marginTop: SIZES.radius }}
            onChange={(value) => {
              utils.validatePassword(value, setPasswordError);
              setUsuario({ ...usuario, password: value });
            }}
            errorMsg={passwordError}
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

          { error ? <Text style={styles.error}>{error}</Text> : null }

          {/* Sign Up & Sign In Button */}
          <TextButton
            label="REGISTRARME"
            buttonContainerStyle={{
              height: 55,
              alignItems: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => registrarUsuario()}
          />

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
