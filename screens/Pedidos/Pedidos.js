import React from "react";
import { View, Text, StatusBar, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
// Redux
import { useSelector } from "react-redux";

const Pedidos = ({ navigation }) => {
  const ordenes = useSelector((state) => state.ordenes.ordenes);

  //console.log("DESDE PEDIDOS", ordenes);

  const ordenItem = ({ item }) => {

    
    const fecha = new Date(item.createdAt);
   
    const hora = fecha.getHours() + 12; 
    const minutos = fecha.getMinutes();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    
    return(
      <View
            style={{
              height: 200,
              
              marginHorizontal: 10,
              marginBottom: 20,
              backgroundColor: '#282828',
              borderRadius: 10,
            }}
          >
            <View style={{ marginTop: 20, alignItems: "center", justifyContent: 'center' }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 5,
                  marginBottom: 10,
                }}
              >
                Pedido número: {item.orderNumber}
              </Text>
              <Text
                style={{
                  color: "grey",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  
                }}
              >
                {dia}/{mes}/{anio} {hora}:{minutos} 
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 50,
                }}
              >
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("Valorar", {
                  orden: item._id,
                })}>
                  <Icon name="staro" size={30} color="white" />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: 80
                    }}
                  >
                    Valorar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Icon name="profile" size={30} color="white" />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 5,
                      marginBottom: 10,
                      marginLeft: 10,
                    }}
                  >
                    Repetir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#000"> </StatusBar>
      <Text
        style={{
          color: "white",
          fontSize: 45,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Pedidos
      </Text>
      <FlatList
        data={ordenes}
        keyExtractor={(item) => `${item._id}`}
        renderItem={ordenItem}
      />
    </View>
  );
};

export default Pedidos;
