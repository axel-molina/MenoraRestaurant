import React from "react";
import { TouchableOpacity, View, Text, Image, ToastAndroid } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";


const VerticalFoodCard = ({ containerStyle, item, onPress, setProductos }) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={{
        width: 220,
        padding: SIZES.radius,
        alignItems: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
        
    >
      {/* Favoritos */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "row" }}></View>

        <Image
          source={icons.love}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavourite ? COLORS.primary : COLORS.gray,
          }}
        />
      </View>

      {/* Imagen */}
      <View
        style={{
          height: 150,
          width: 150,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item.image}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
          />
      </View>

      {/* Info */}
      <View
        style={{
          alignItems: "center",
          marginTop: -10,
        }}
      >
        <Text style={{ ...FONTS.h3, color: "white" }}>{item.name}</Text>
        <Text
          style={{
            color: COLORS.darkGray2,
            textAlign: "center",
            ...FONTS.body5,
          }}
        >
          {item.description}
        </Text>
        <Text style={{ marginTop: SIZES.radius, ...FONTS.h2, color: "white" }}>
          {item.price}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          width: 100,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.radius,
          marginTop: SIZES.radius,
        }}
        onPress={() => añadirAlCarrito(item, setProductos)}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Agregar</Text>
      </TouchableOpacity>
      
    </TouchableOpacity>
  );
};

const añadirAlCarrito = (item, setProductos) => {
  ToastAndroid.show(`${item.name} agregado`, ToastAndroid.SHORT);
  setProductos(item);
}

export default VerticalFoodCard;
