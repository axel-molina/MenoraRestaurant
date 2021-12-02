import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import { AsyncStorage } from "react-native";

const VerticalFoodCard = ({ containerStyle, item, onPress, navigation }) => {
  return (
    <TouchableOpacity
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
          ${item.price}
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
        onPress={() => this.onClickAddCart(item)}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Add Cart</Text>
      </TouchableOpacity>
      
    </TouchableOpacity>
  );
};

onClickAddCart = async (data) => {
  const itemcart = {
    food: data,
    quantity: 1,
    price: data.price,
  };

  AsyncStorage.getItem("cart")
    .then((datacart) => {
      if (datacart !== null) {
        // We have data!!
        const cart = JSON.parse(datacart);
        cart.push(itemcart);
        AsyncStorage.setItem("cart", JSON.stringify(cart));
      } else {
        const cart = [];
        cart.push(itemcart);
        AsyncStorage.setItem("cart", JSON.stringify(cart));
      }
      alert("Add Cart");
    })
    .catch((err) => {
      alert(err);
    });
};

export default VerticalFoodCard;
