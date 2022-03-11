import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { useSelector } from "react-redux";

const Valorar = ({ navigation, route }) => {
  const [experienciaRating, setExperienciaating] = useState(1);
  const [menuRating, setMenuRating] = useState(1);
  const [presentacionRating, setPresentacionRtaing] = useState(1);
  const [atencionRating, setAtencionRating] = useState(1);

  const [text, onChangeText] = React.useState("");

  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.token.token);

  const { orden } = route.params;

  const experiencia = (valor) => {
    setExperienciaating(valor);
  };

  const menu = (valor) => {
    setMenuRating(valor);
  };

  const presentacion = (valor) => {
    setPresentacionRtaing(valor);
  };

  const atencion = (valor) => {
    setAtencionRating(valor);
  };

  const enviarValoracion = () => {
    setIsLoading(true);

    //Crear un objeto de valoracion
    const valoracion = {
      menuScore: menuRating,
      presentationScore: presentacionRating,
      serviceScore: atencionRating,
      experienceScore: experienciaRating,
      comment: text,
      order: orden,
    };

    // Enviar valoración al servidor
    const enviar = async (valoracion) => {
      
      try {
        const url = "https://app-menora.herokuapp.com/reviews";
        const data = await axios.post(url, valoracion, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data.data);
        if (data.data === "Review creada correctamente") {
          Alert.alert("Gracias!", "Tu valoración fue enviada", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Home");
              },
            },
          ]);
        }
        return data.data;
      } catch (error) {
        console.log("ERROR DE Valoración (CONSULTA DE API): ", error);
        Alert.alert("Error", "No se pudo enviar la valoración", [
          { text: "OK" },
        ]);
        return;
      }
    };

    enviar(valoracion);
    setIsLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
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
        Valorar
      </Text>

      <View style={{ flex: 1, justifyContent: "space-around" }}>
        {/* Experiencia */}

        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
            Experiencia
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {experienciaRating == 1 ||
            experienciaRating == 2 ||
            experienciaRating == 3 ||
            experienciaRating == 4 ||
            experienciaRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => experiencia(1)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => experiencia(1)}
              />
            )}
            {experienciaRating == 2 ||
            experienciaRating == 3 ||
            experienciaRating == 4 ||
            experienciaRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => experiencia(2)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => experiencia(2)}
              />
            )}
            {experienciaRating == 3 ||
            experienciaRating == 4 ||
            experienciaRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => experiencia(3)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => experiencia(3)}
              />
            )}
            {experienciaRating == 4 || experienciaRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => experiencia(4)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => experiencia(4)}
              />
            )}
            {experienciaRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => experiencia(5)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => experiencia(5)}
              />
            )}
          </View>
        </View>

        {/* menú */}

        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
            Menú
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {menuRating == 1 ||
            menuRating == 2 ||
            menuRating == 3 ||
            menuRating == 4 ||
            menuRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => menu(1)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => menu(1)}
              />
            )}
            {menuRating == 2 ||
            menuRating == 3 ||
            menuRating == 4 ||
            menuRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => menu(2)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => menu(2)}
              />
            )}
            {menuRating == 3 || menuRating == 4 || menuRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => menu(3)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => menu(3)}
              />
            )}
            {menuRating == 4 || menuRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => menu(4)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => menu(4)}
              />
            )}
            {menuRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => menu(5)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => menu(5)}
              />
            )}
          </View>
        </View>

        {/* Presentacion del plato */}

        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
            Presentación de los platos
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {presentacionRating == 1 ||
            presentacionRating == 2 ||
            presentacionRating == 3 ||
            presentacionRating == 4 ||
            presentacionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => presentacion(1)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => presentacion(1)}
              />
            )}
            {presentacionRating == 2 ||
            presentacionRating == 3 ||
            presentacionRating == 4 ||
            presentacionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => presentacion(2)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => presentacion(2)}
              />
            )}
            {presentacionRating == 3 ||
            presentacionRating == 4 ||
            presentacionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => presentacion(3)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => presentacion(3)}
              />
            )}
            {presentacionRating == 4 || presentacionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => presentacion(4)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => presentacion(4)}
              />
            )}
            {presentacionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => presentacion(5)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => presentacion(5)}
              />
            )}
          </View>
        </View>

        {/* Atencion al cliente */}

        <View style={{ marginBottom: 30 }}>
          <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
            Atención al cliente
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {atencionRating == 1 ||
            atencionRating == 2 ||
            atencionRating == 3 ||
            atencionRating == 4 ||
            atencionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => atencion(1)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => atencion(1)}
              />
            )}
            {atencionRating == 2 ||
            atencionRating == 3 ||
            atencionRating == 4 ||
            atencionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => atencion(2)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => atencion(2)}
              />
            )}
            {atencionRating == 3 ||
            atencionRating == 4 ||
            atencionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => atencion(3)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => atencion(3)}
              />
            )}
            {atencionRating == 4 || atencionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => atencion(4)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => atencion(4)}
              />
            )}
            {atencionRating == 5 ? (
              <Icon
                name="star"
                size={50}
                color="orange"
                onPress={() => atencion(5)}
              />
            ) : (
              <Icon
                name="staro"
                size={50}
                color="orange"
                onPress={() => atencion(5)}
              />
            )}
          </View>
        </View>
      </View>
      <TextInput
        style={{
          backgroundColor: "#282828",
          marginHorizontal: 10,
          borderRadius: 10,
          marginBottom: 25,
          paddingVertical: 20,
          color: "white",
        }}
        placeholder="Escribe un comentario"
        placeholderTextColor="white"
        value={text}
        onChangeText={onChangeText}
      ></TextInput>
      {!isLoading ? (
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
          <TouchableOpacity onPress={() => enviarValoracion()}>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                textAlign: "center",
                fontFamily: "Poppins-Regular",
              }}
            >
              Enviar Valoración
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : null}
    </ScrollView>
  );
};

export default Valorar;
