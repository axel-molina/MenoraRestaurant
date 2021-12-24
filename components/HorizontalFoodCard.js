import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, Image, ToastAndroid, ActivityIndicator } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/AntDesign";

//redux


const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress, productos, setProductos }) => {

  

  const añadirAlCarrito =  (item) => {
    ToastAndroid.show(`${item.name} agregado`, ToastAndroid.SHORT);
    const name = item.name;
    const price = item.price;
    const id = item._id;
    setProductos([...productos, { name, price, id }]);
  }

 console.log(item)

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
            loadingIndicatorSource={<Icon name="phone" size={30} color="white" />}
            source={{ uri: item.image }}
            style={{...imageStyle}}
        />

        {/* Info */}
        <View
            style={{
                flex: 1,
            }}

        >
            {/* Name */}
            <Text style={{...FONTS.h3, fontSize: 17, color: COLORS.white, marginLeft: 20}}>
                {item.name}
            </Text>

            {/* Description */}

            <Text style={{color: COLORS.white, ...FONTS.body4, marginLeft: 20}}>
            {item.description}
            </Text>

            {/* Price */}
            <Text style={{...FONTS.h3, color: COLORS.white, marginLeft: 20, marginTop: 20, }}>
                $ {item.price}
            </Text>

        </View>
        
        <TouchableOpacity
        style={{
          width:100,
          height:40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.primary,
          borderTopLeftRadius: SIZES.radius,
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        
        <TouchableOpacity
        onPress={() => añadirAlCarrito(item)}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{<Icon name="plus" size={18} color="white" />}Añadir</Text>
        </TouchableOpacity>
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;

