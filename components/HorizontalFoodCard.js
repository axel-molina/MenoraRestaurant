import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, Image, ToastAndroid } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
//redux


const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress, productos, setProductos }) => {

  

  const añadirAlCarrito =  (item) => {
    ToastAndroid.show(`${item.name} agregado`, ToastAndroid.SHORT);
    const name = item.name;
    const price = item.price;
    const id = item.id;
    setProductos([...productos, { name, price, id }]);
  }


  return (
    <TouchableOpacity 
    onPress={onPress}
    
      style={{
        flexDirection: "row",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
    >
        {/* Image */}
        <Image 
            source={item.image}
            style={imageStyle}
        />

        {/* Info */}
        <View
            style={{
                flex: 1,
            }}

        >
            {/* Name */}
            <Text style={{...FONTS.h3, fontSize: 17, color: COLORS.white}}>
                {item.name}
            </Text>

            {/* Description */}

            <Text style={{color: COLORS.darkGray2, ...FONTS.body4}}>
                {item.description}
            </Text>

            {/* Price */}
            <Text style={{ marginTop: SIZES.base, ...FONTS.h3, color: COLORS.white }}>
                {item.price}
            </Text>

        </View>

        <TouchableOpacity
        style={{
          width:100,
          height:30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.radius,
          marginTop: SIZES.radius,
          marginRight: 10       
        }}
      >
        
        <TouchableOpacity
        onPress={() => añadirAlCarrito(item)}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Agregar</Text>
        </TouchableOpacity>
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;

