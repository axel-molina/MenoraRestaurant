import React from "react";
import { TouchableOpacity, View, Text, Image, ToastAndroid, ScrollView, ActivityIndicator } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/AntDesign";
import LinearGradient from 'react-native-linear-gradient';

//redux
import { useDispatch, useSelector } from "react-redux";
import { crearCarritoAction, crearDrinksAction } from "../store/actions/carritoActions";


const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress, }) => {
  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito.carrito);
  const drinks = useSelector((state) => state.carrito.drinks);

  const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));
  const guardarDrinks = (drinks) => dispatch(crearDrinksAction(drinks));

  //Cuando se toca añadir en el producto desde el home
  const añadirAlCarrito =  (item) => {
    if(item.hasOwnProperty('alcohol')){
      ToastAndroid.show(`${item.name} agregado`, ToastAndroid.SHORT);
    const name = item.name;
    const price = item.price;
    const id = item._id;
    const alcohol = item.alcohol;

    guardarDrinks([...drinks, {name, price, id, alcohol}])
    } else {

      ToastAndroid.show(`${item.name} agregado`, ToastAndroid.SHORT);
      const name = item.name;
      const price = item.price;
      const id = item._id;
      const extras = [];
      
      guardarCarrito([...carrito, { name, price, id, extras }]);
    }
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
            loadingIndicatorSource={ <ActivityIndicator size="large" color={COLORS.primary} />}
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

            {item.description !== null ? <ScrollView>
              <Text style={{color: COLORS.white, ...FONTS.body4, marginLeft: 20, marginRight: 6}}>
              {item.description}
              </Text>
            </ScrollView> : null }

            {item.hasOwnProperty('alcohol') && item.alcohol ? <ScrollView>
              <Text style={{color: 'orange', ...FONTS.body4, marginLeft: 20, marginRight: 6}}>
              Bebida con alcohol
              </Text>
            </ScrollView> : null }


            {/* Price */}
            <Text style={{...FONTS.h3, color: COLORS.white, marginLeft: 20, marginBottom: 18, }}>
                $ {item.price}
            </Text>

        </View>
        
        <TouchableOpacity
        style={{
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

