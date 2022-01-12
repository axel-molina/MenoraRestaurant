import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "../components";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import LinearGradient from "react-native-linear-gradient";

const StepperInput = ({ containerStyle, value = 1, onAdd, onMinus }) => {
  return (
    <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{ borderRadius: 100 }}>
      <View
        style={{
          flexDirection: "row",
          height: 60,
          width: 130,
          //backgroundColor: COLORS.primary,
          borderRadius: 100,
          ...containerStyle,
        }}
      >
        <IconButton
          containerStyle={{
            width: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={icons.minus}
          iconStyle={{
            height: 20,
            width: 20,
            tintColor: 'white',
          }}
          onPress={onMinus}
        />
      
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ ...FONTS.h2, color: "white" }}>{value}</Text>
        </View>
      
        <IconButton
          containerStyle={{
            width: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={icons.plus}
          iconStyle={{
            height: 20,
            width: 20,
            tintColor: 'white',
          }}
          onPress={onAdd}
        />
      </View>
    </LinearGradient>
  );
};

export default StepperInput;
