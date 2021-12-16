import React from "react";
import { View, Text, Image } from "react-native";
import { images, FONTS, SIZES, COLORS } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AuthLayout = ({ title, children }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* App icon  */}
        <View
          style={{
            alignItems: "center",
          }}
        >
        </View>

        {/* Titulo & Subtitulo */}
        <View>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.h1,
              marginTop: 80,
              marginBottom: 20,
            }}
          >
            {title}
          </Text>
        </View>

        {/* Content / Children */}
        {children}

      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthLayout;
