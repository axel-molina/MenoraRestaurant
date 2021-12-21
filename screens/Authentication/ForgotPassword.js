import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AuthLayout } from "../";
import { FONTS, SIZES, COLORS, icons } from "../../constants";
import { FormInput, TextButton } from "../../components";
import { utils } from "../../utils";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  function isEnableSendEmail() {
    return email != "" && emailError == "";
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
      </View>

      {/* Button */}
      <TextButton
        label="Enviar correo"
        disabled={isEnableSendEmail() ? false : true}
        buttonContainerStyle={{
          height: 55,
          alignItems: "center",
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor:isEnableSendEmail() ? COLORS.primary : COLORS.transparentPrimray
        }}
        onPress={() =>{ navigation.navigate("SignIn")}}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
