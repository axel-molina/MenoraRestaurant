import React, { useEffect } from "react";
import { FONTS, COLORS, SIZES, icons } from "../../constants";
import { HorizontalFoodCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import Search from "../Search/Search";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerCategoriasAction } from "../../store/actions/categoriasActions";
import { crearUsuarioAction } from "../../store/actions/usuarioActions";
import { crearBebidasAction } from "../../store/actions/bebidasActions";



const Section = ({ title, children }) => {
  return (
    <View>
      <StatusBar backgroundColor="#000"></StatusBar>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3, color: "white" }}>{title}</Text>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(0);

  const [categoryIndex, setCategoryIndex] = React.useState(0);

  const dispatch = useDispatch();

  
  //accder a los states del store categorias
  const categorias = useSelector((state) => state.categorias.categorias);
  const token = useSelector((state) => state.token.token);

      

      const guardarCategorias = (categorias) => dispatch(obtenerCategoriasAction(categorias));
      const guardarUsuario = (usuario) => dispatch(crearUsuarioAction(usuario));
      const guardarBebidas = (bebidas) => dispatch(crearBebidasAction(bebidas));
     
      

  useEffect( async () => {

    
      try {
        const responseUser = await fetch("https://app-menora.herokuapp.com/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data2 = await responseUser.json();
    
        guardarUsuario(data2);

        const responseDrinks = await fetch("https://app-menora.herokuapp.com/drinks",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const dataDrinks = await responseDrinks.json();     
        guardarBebidas(dataDrinks);

        const response = await fetch("https://app-menora.herokuapp.com/categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const drinksFalsos = { products: dataDrinks }     
        if(dataDrinks.length > 0){
          data.push(drinksFalsos);
        }
        guardarCategorias(data);  

    } catch (error) {
      console.log(error);
    }

  }, []);
  

  //Seleccion de tipo
  function renderFoodCategory() {

    const handleChangeCategory = (index) => {
      setCategoryIndex(index);
    }

    return (
      <FlatList
        data={categorias}
        keyExtractor={(item) => `${item._id}`}
        horizontal
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              height: 95,
              justifyContent: "center",
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight: index == categorias.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 10,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              setSelectedCategoryId(item._id);
              handleChangeCategory(index);
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              { index < categorias.length - 1 ?
                <Image
                source={{ uri: item.image }}
                style={{
                  height: 65,
                  width: 100,
                  borderRadius: SIZES.radius,
                }}
              /> :
              <View style={{ height: 65, width: 100, borderRadius: SIZES.radius, borderColor: 'white', borderWidth: 1, alignItems: 'center' }}>
                <Icon name="bottle-soda-classic" size={60} color="white" />
              </View>
              }
            </View>

            <View>
              <Text
                style={{
                  textAlignVertical: "center",
                  alignSelf: "center",
                  margin: SIZES.base,
                  color:
                    selectedCategoryId == item._id
                      ? COLORS.white
                      : COLORS.darkGray,
                  ...FONTS.h3,
                }}
              >
                { index < categorias.length - 1 ? item.name : "Bebidas" }
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  //Todos los productos
  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={categorias}
        keyExtractor={(item) => `${item._id}`}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => <Text>No hay productos</Text>}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 30,
        }}
        // al precionar busca si coinsiden las categorias de las comidas con las del tipo de menu
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index == categorias.menu.length - 1 ? SIZES.padding : 0,
            }}
            onPress={() => {
              setSelectedMenuType(item._id);
              handleChangeCategory(selectedCategoryId, item._id);
            }}
          >
            <Text
              style={{
                color:
                  selectedMenuType == item.id ? COLORS.primary : COLORS.white,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  const navigation = useNavigation();
  

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={{ marginBottom: 200, width: "100%" }}>

        {/* Buscador */}
        <Search />
        {/* elemntos en Categorias */}

       

        {/* Lista */}

        <FlatList
          data={categorias.length && categorias[categoryIndex].products}
          keyExtractor={(item) => `${item._id}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text>No hay productos</Text>}
          ListHeaderComponent={
            <View>
              {/* Categotorias de comida */}
              {renderFoodCategory()}
              {/* todos los productos */}
              {/*renderMenuTypes(productos, setProductos)*/}
            </View>
          }
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
      </ScrollView>
    </View>
  );
};

export default Home;
