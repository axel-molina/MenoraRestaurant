import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FONTS, COLORS } from "../constants";
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={styles.linearGradient}>
      <TouchableOpacity
        style={{
          
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: "center",
          justifyContent: "center",
          borderRadius: 120,
          height: 60,
  },
});

export default TextButton;
