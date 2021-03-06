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
import { obtenerOrdenesAction } from "../../store/actions/ordenesActions";



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

  const [ordenesPendientes, setOrdenesPendientes] = React.useState([]);

  const dispatch = useDispatch();

  
  //accder a los states del store categorias
  const categorias = useSelector((state) => state.categorias.categorias);
  const token = useSelector((state) => state.token.token);
  const ordenes = useSelector((state) => state.ordenes.ordenes);

      

      const guardarCategorias = (categorias) => dispatch(obtenerCategoriasAction(categorias));
      const guardarUsuario = (usuario) => dispatch(crearUsuarioAction(usuario));
      const guardarBebidas = (bebidas) => dispatch(crearBebidasAction(bebidas));
      const guardarOrdenes = (ordenes) => dispatch(obtenerOrdenesAction(ordenes));

      // Recorrer ordenes
      const recorrerOrdenes = () => {
        setOrdenesPendientes([]);
        ordenes.length > 0 && ordenes.map((orden) => {
         
          if(orden.status === "pending" || orden.status === "in progress"){
           
            setOrdenesPendientes(ordenesPendientes => [...ordenesPendientes]);
          }
        });  
      }

     

      const actualizar = async () => {
        const responseOrders = await fetch("https://app-menora.herokuapp.com/orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const dataOrder = await responseOrders.json();     
        guardarOrdenes(dataOrder);

        recorrerOrdenes()
      };
      
     
     
      

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

        const responseOrders = await fetch("https://app-menora.herokuapp.com/orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const dataOrder = await responseOrders.json();     
        guardarOrdenes(dataOrder);

    } catch (error) {
      console.log(error);
    }

    actualizar()

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
    
      <ScrollView style={{flex: 1, marginBottom: 200, width: "100%" }}>

        {/* Buscador */}
        <Search />


        {/* Ordenes pendientes */}

        <FlatList
        data={ordenes}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({ item }) => (
          <View>
            {item.status === "pending" ? 
            <View style={{height: 150, marginHorizontal: 10, marginBottom: 20, backgroundColor: '#282828', borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>Pedido pendiente</Text>
              <Text style={{ color: 'gray', fontSize: 18, textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}>#{item.orderNumber}</Text>
              <Text style={{ color: 'gray', fontSize: 18, textAlign: 'center', marginTop: 5 }} onPress={() => navigation.navigate('Pedidos')}>Ver pedidos</Text>
              <Text style={{ color: 'orange', fontSize: 18, textAlign: 'center', marginTop: 10, fontWeight: 'bold' }} onPress={() => actualizar()}>Actualizar</Text>
            </View> : null}
            {item.status === 'in progress' ? 
            <View style={{height: 130, marginHorizontal: 10, marginBottom: 20, backgroundColor: '#282828', borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 22, textAlign: 'center', marginTop: 20, fontWeight: 'bold' }}>Pedido en proceso...</Text>
              <Text style={{ color: 'gray', fontSize: 18, textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}>#{item.orderNumber}</Text>
              <Text style={{ color: 'gray', fontSize: 18, textAlign: 'center', marginTop: 5 }}>Ver pedidos</Text>
              <Text style={{ color: 'gray', fontSize: 18, textAlign: 'center', marginTop: 5 }} onPress={() => navigation.navigate('Pedidos')}>Ver pedidos</Text>
              <Text style={{ color: 'gray', fontSize: 18, textAlign: 'center', marginTop: 20, fontWeight: 'bold' }} onPress={() => actualizar()}>Actualizar</Text>
            </View> : null}
          </View>
        )}
        />




       

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
    
  );
};

export default Home;
