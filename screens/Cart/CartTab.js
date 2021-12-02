import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  Header,
  IconButton,
  CartQuantityButton,
  StepperInput,
} from "../../components";

const CartTab = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        Carrito
      </Text>
    </View>
  );
};

export default CartTab;
