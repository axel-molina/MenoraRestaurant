import React from "react";
import { View, Text } from "react-native";
import { FONTS } from "../constants";

const Header = ({ containerStyle, title, leftComponent, rightComponent, titleStyle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        ...containerStyle,
      }}
    >
      {/* izquierda */}
      {leftComponent}

      {/* titulo */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...FONTS.h3, color: "white" }}>{title}</Text>
      </View>

      {/* derecha */}
      {rightComponent}
    </View>
  );
};

export default Header;
