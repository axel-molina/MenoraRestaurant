import React, { useState } from 'react'
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { SIZES, COLORS, icons } from "../../constants";
import { FormInput } from "../../components";
import { utils } from "../../utils";
import Icon from "react-native-vector-icons/AntDesign"; 
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


// Redux
import { useSelector } from "react-redux";

const CambioDeContraseña = () => {
    const navigation = useNavigation();


    const token = useSelector((state) => state.token.token);

    const [showPass, setShowPass] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [error, setError] = React.useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [newPass, setNewPass] = useState({
        password: "",
        newPassword: "",
      });

      const {
        password,
        newPassword,
      } = newPass;

      // Validacion de campos de contraseña
      function isEnablePass() {
        return (
          password != "" && 
          newPassword != "" && 
          passwordError == "" && (password != newPassword) 
        );
      }

      const cambiarContraseña = async () => {

          
          setIsLoading(true);
          setError("");
          try {
              if (isEnablePass()) {
                  
                  const enviarPass = await fetch("https://app-menora.herokuapp.com/password/update",
                  {
                      method: "PUT",
                      headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(newPass)
                    });
                    const data = await enviarPass.json();
                    
                    console.log("ESTO ES DATA",data);
                    setIsLoading(false);
                } else if(password === newPassword && passwordError == ""){
                    setError("Las contraseñas deben ser diferentes");
                    setIsLoading(false);
                } else {
                    if(passwordError == ""){
                        setError("Todos los campos son obligatorios");
                    }
                    setIsLoading(false);
                }
                
            } catch (error) {
                console.log(error);
                if (error.message === "Request failed with status code 400") {
                    setError("Este email no está verificado");
                    setIsLoading(false);
                } else {
                    setError("Tu contraseña actual no es correcta");
                    console.log(error);
                    setIsLoading(false);
                }
            }
            
            //navigation.navigate('CambioDeContraseñaExitoso');
        }
        
        
  return (
    <View style={{ backgroundColor: 'black', flex: 1}}>
      <StatusBar backgroundColor="#000"></StatusBar>
      <Text
        style={{
          color: "white",
          fontSize: 32,
          textAlign: "center",
          marginTop: 25,
          marginBottom: 30,
          fontWeight: "bold",
        }}
      >
        Cambio de contraseña
      </Text>
        {/*Input Password */}
        <ScrollView
        keyboardShouldPersistTaps='always'
        style={{ marginHorizontal: 20 }} 
        >
            <FormInput
                label="Contraseña actual"
                secureTextEntry={!showPass}
                value={password}
                prependComponent={<Icon name="lock1" size={30} color="white" />}
                autoCompletType="password"
                containerStyle={{ marginTop: SIZES.radius }}
                onChange={(value) => {
                  setNewPass({ ...newPass, password: value });
                }}
                
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
            
            
              {/*Confirmation Password */}
              <FormInput
                label="Nueva contraseña"
                secureTextEntry={!showPass}
                value={newPassword}
                prependComponent={<Icon name="lock1" size={30} color="white" />}
                autoCompletType="password"
                containerStyle={{ marginTop: SIZES.radius }}
                onChange={(value) => { 
                    utils.validatePassword(value, setPasswordError);
                  setNewPass({ ...newPass, newPassword: value });
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
              {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
              {/* Sign Up & Sign In Button */}
          {!isLoading ? <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{padding: 12, borderRadius: 50, marginTop: 10, marginBottom: 10, marginHorizontal: 10}}>
          <TouchableOpacity onPress={() => cambiarContraseña()}>
            <Text style={{ color: 'white', fontSize: 22, textAlign: 'center', fontFamily: "Poppins-Regular", }}>CAMBIAR CONTRASEÑA</Text>
          </TouchableOpacity>
          </LinearGradient>  : null}

            {isLoading ? <ActivityIndicator size="large" color="#ED1200" /> : null}

        </ScrollView>
    </View>
  )
}

export default CambioDeContraseña