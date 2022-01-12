import React from "react";
import { View, Text, TextInput } from "react-native";
import { FONTS, COLORS, SIZES } from "../constants";


const FormInput = ({
  containerStyle,
  label,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = "default",
  autoCompleteType = "off",
  autoCapitalize = "none",
  errorMsg = "",
}) => {
  return (
    <View style={{ ...containerStyle }}>

      {/*Linea separadora*/}
      

      {/* Label & Error Messages */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: COLORS.white, ...FONTS.body4 }}> {label}</Text>
        <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{errorMsg}</Text>
      </View>

      {/* Text input */}
      
      <View
        style={{
          flexDirection: "row",
          height: 55,
          margiTop: SIZES.base,
        }}
      >
        {prependComponent}

        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
            color: COLORS.white,
            fontSize: 20,
            borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 12,
          }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={(text) => onChange(text)}
          
        />   

        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;
