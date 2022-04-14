import React from "react";
import { View, Text, ScrollView } from "react-native";
import { FONTS, SIZES, COLORS } from "../../constants";

const AuthLayout = ({ title, children }) => {
  return (
    <ScrollView
    keyboardShouldPersistTaps='handled'
      style={{
        flex: 1,
        paddingVertical: SIZES.padding *4,
        backgroundColor: COLORS.white,
        backgroundColor: COLORS.black,
        paddingHorizontal: SIZES.padding,
      }}
    >
      <View
        //extraScrollHeight={100}
        //extraHeight={100}
       
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

      </View>
    </ScrollView>
  );
};

export default AuthLayout;
