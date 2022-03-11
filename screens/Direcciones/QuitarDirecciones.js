import React, { useEffect, useState } from "react"; 
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { crearUsuarioAction } from "../../store/actions/usuarioActions";
import axios from "axios";



const ListaDeDirecciones = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  
  const guardarUsuario = (usuario) => dispatch(crearUsuarioAction(usuario));
  const [refresh, setRefresh] = useState(false);

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
}, [refresh]);

  

    const usuario = useSelector((state) => state.usuario.usuario);
    
    const [checked, setChecked] = React.useState(usuario.address.lastUsed.number);

    const [direccion, setDireccion] = React.useState(usuario.address.lastUsed);

    const [isLoading, setIsLoading] = useState(false);


    
  
    const quitar = async (direccion) => {
        setIsLoading(true);
        //QUITAR DIRECCION DEL ARRAY
        const nuevasDirecciones = usuario.address.list.filter((direccion) => direccion.number !== checked);
        //console.log(nuevasDirecciones)
        //GUARDAR EL NUEVO ARRAY
        const obj = {
            "newAddressList" : nuevasDirecciones
          }
          try {
            const url = "https://app-menora.herokuapp.com/users/address";
            const data = await axios.put(url, obj, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            //console.log(data.status);
            if (data.status === 200) {
                setRefresh(!refresh);
              setIsLoading(false);
              return
      
            } else { 
                console.log("Error")
             }
             setIsLoading(false);
            
          } catch (error) {
            console.log("ERROR DE quitar (CONSULTA DE API): ", error);
            Alert.alert("Error", "No se puede quitar la única dirección", [{ text: "OK" }]);
              setIsLoading(false);
          }
          setRefresh(!refresh);
          setIsLoading(false); 

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
        Quitar dirección
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
      {isLoading ? <ActivityIndicator size="small" color="orange" /> : <LinearGradient
        colors={["#ED1200", "#D9510C", "#EA8100"]}
        style={{
          padding: 12,
          borderRadius: 50,
          marginTop: 10,
          marginBottom: 30,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => quitar(direccion)}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              textAlign: "center",
              fontFamily: "Poppins-Regular",
            }}
          >
            QUITAR DIRECCIÓN
          </Text>
        </TouchableOpacity>
      </LinearGradient>}
    </View>
  );
};

export default ListaDeDirecciones;
