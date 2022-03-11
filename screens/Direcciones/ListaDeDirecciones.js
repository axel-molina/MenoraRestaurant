import React, { useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { crearUsuarioAction } from "../../store/actions/usuarioActions";


const ListaDeDirecciones = ({ navigation, route}) => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  const guardarUsuario = (usuario) => dispatch(crearUsuarioAction(usuario));

  useEffect( async () => {
    try {
      const responseUser = await fetch("https://app-menora.herokuapp.com/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data2 = await responseUser.json();
  
      guardarUsuario(data2);
      
  }catch(error){
    console.log(error);
  } 
}, []);

  const { total, text } = route.params;

    const usuario = useSelector((state) => state.usuario.usuario);
    
    const [checked, setChecked] = React.useState(usuario.address.lastUsed.number);

    const [direccion, setDireccion] = React.useState(usuario.address.lastUsed);

    

    
  
    const elegir = (direccion) => {
        navigation.navigate("Abonar", { total: total, text: text, direccion: direccion })
    }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor="#000"> </StatusBar>
      <Text
        style={{
          color: "white",
          fontSize: 45,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
          marginBottom: 20
        }}
      >
        Lista de direcciones
      </Text>
      <FlatList
        data={usuario.address.list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 2,
            marginBottom: 10,
            marginLeft: 20,
          }}>
              <RadioButton
              color="orange" 
              uncheckedColor="orange"
                value="first"
                status={checked === item.number ? "checked" : "unchecked"}
                onPress={() =>{ 
                    setChecked(item.number)
                    setDireccion(item)
                }}
              />
              <Text style={{ color: "white", marginTop: 6 }}>{item.street} {item.number}</Text>
          </View>
        )}
      />
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
        <TouchableOpacity onPress={() => elegir(direccion)}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              textAlign: "center",
              fontFamily: "Poppins-Regular",
            }}
          >
            ELEGIR DIRECCIÓN
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default ListaDeDirecciones;
