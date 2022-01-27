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
        backgroundColor: COLORS.black,
      }}
    >
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        extraHeight={100}
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
              marginTop: 10,
              marginBottom: 20,
              color: COLORS.white,
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
