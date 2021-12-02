import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FONTS, COLORS } from "../constants";

const TextButton = ({
  buttonContainerStyle,
  disabled,
  label,
  label2 = "",
  label2Style,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
        }}
      >
        {label}
      </Text>

      {label2 != "" && (
        <Text
          style={{
            flex: 1,
            textAlign: "right",
            color: COLORS.white,
            ...FONTS.h3,
            ...labelStyle,
          }}
        >
          {label2}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
