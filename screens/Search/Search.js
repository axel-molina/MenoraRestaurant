import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    TextInput,
    Text,
} from 'react-native';
import { HorizontalFoodCard } from "../../components";
import { FONTS, COLORS, SIZES, icons } from "../../constants";
import { useNavigation } from '@react-navigation/native';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../../store/actions/productsActions";

import { FlatList } from 'react-native-gesture-handler';

const Search = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const drinks = useSelector((state) => state.bebidas.bebidas);

  //accder a los states del store
  const products = useSelector((state) => state.products.products);


  const guardarProductos = (products) => dispatch(obtenerProductosAction(products));


  //estado del input
  const [text, onChangeText] = useState("");
  const [productos, setProductos] = useState([]);
  

  //Obtener productos y guardarlos en redux
  useEffect(async () => {
    try {
      const responseProd = await fetch("https://app-menora.herokuapp.com/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const dataProd = await responseProd.json();
      guardarProductos(dataProd);
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Buscar productos
  useEffect(() => {
    if(text.length > 0 && text !== ""){
      //const filtroAux = [...products, ...drinks]
      const filtrados = products.filter((product) => product.name.toLowerCase().includes(text.toLowerCase()));
      
    setProductos(filtrados);
    }
  } , [text]);
    
  useEffect(() => {
    if(text.length === 0 && productos.length === 0){
      setProductos(products);
    }
  
  } , [productos, text]);

  // useEffect(() => {
  //   if(text.length === 0 && bebidas.length === 0){
  //     setBebidas(drinks);
  //   }
  //   //console.log(bebidas)
  
  // } , [bebidas, text]);

    return (
        <View>
          <View
              style={{
                  flexDirection: "row",
                  height: 45,
                  alignItems: "center",
                  marginHorizontal: SIZES.padding,
                  marginVertical: SIZES.base,
                  paddingHorizontal: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.lightGray1,
              }}
          >
              {/* Icono buscar */}
          <Image
            source={icons.search}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
          {/* Text Input */}
          <TextInput
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
              ...FONTS.body3,
            }}
            placeholder="Buscar"
            onChangeText={onChangeText}
            value={text}
          />
          </View>

       {text.length === 0 ? null : 
            <FlatList
            data={productos}
            keyExtractor={(item) => `${item._id}`}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <Text>No hay resultados</Text>}
            renderItem={({ item, index }) => {
              return (
                <HorizontalFoodCard
                  containerStyle={{
                    height: 140,
                    alignItems: "center",
                    marginHorizontal: SIZES.padding,
                    marginBottom: SIZES.radius,
                  }}
                  imageStyle={{
                    marginLeft: 10,
                    height: "80%",
                    width: "40%",
                    resizeMode: "contain",
                    borderRadius: 10,
                  }}
                  item={item}
                  onPress={() => navigation.navigate("FoodDetail", {
                    producto: item,
                  })}
                />
              );
            }}
           /> 
          }

          {/* {text.length === 0 ? null : 
            <FlatList
            data={bebidas}
            keyExtractor={(item) => `${item._id}`}
            ListEmptyComponent={() => <Text>No hay resultados</Text>}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <HorizontalFoodCard
                  containerStyle={{
                    height: 140,
                    alignItems: "center",
                    marginHorizontal: SIZES.padding,
                    marginBottom: SIZES.radius,
                  }}
                  imageStyle={{
                    marginLeft: 10,
                    height: "80%",
                    width: "40%",
                    resizeMode: "contain",
                    borderRadius: 10,
                  }}
                  item={item}
                  onPress={() => navigation.navigate("FoodDetail", {
                    producto: item,
                  })}
                />
              );
            }}
           /> 
          } */}
        </View>
    )
}

export default Search