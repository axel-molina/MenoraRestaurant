import React from "react";
import { TouchableOpacity, View, Text, Image, ToastAndroid, ScrollView } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/AntDesign";
import LinearGradient from 'react-native-linear-gradient';

//redux
import { useDispatch, useSelector } from "react-redux";
import { crearCarritoAction } from "../store/actions/carritoActions";

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress, }) => {
  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito.carrito);

  const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));

  const añadirAlCarrito =  (item) => {
    ToastAndroid.show(`${item.name} agregado`, ToastAndroid.SHORT);
    //console.log("DESDE HORIZONTAL",item.extras)
    const name = item.name;
    const price = item.price;
    const id = item._id;
    const extras = item.extras;
    
    guardarCarrito([...carrito, { name, price, id, extras }]);
  }

 //console.log(item)

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
            <Text style={{...FONTS.h3, fontSize: 17, color: COLORS.white, marginLeft: 20, marginTop: 10}}>
                {item.name}
            </Text>
            
            {/* Description */}

            <ScrollView>
              <Text style={{color: COLORS.white, ...FONTS.body4, marginLeft: 20, marginRight: 6}}>
              {item.description}
              </Text>
            </ScrollView>

            {/* Price */}
            <Text style={{...FONTS.h3, color: COLORS.white, marginLeft: 20, marginBottom: 18, }}>
                $ {item.price}
            </Text>

        </View>
        
        <TouchableOpacity
        style={{
          //width:100,
          //height:40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.primary,
          borderTopLeftRadius: SIZES.radius,
          position: "absolute",
          bottom: 0,
          right: 0,
        }} onPress={() => añadirAlCarrito(item)}
      >
          <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{padding: 12, borderTopLeftRadius: SIZES.radius,}}>    
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{<Icon name="plus" size={18} color="white" />}Añadir</Text>
          </LinearGradient>
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;

