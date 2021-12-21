import React from "react";
import { FONTS, COLORS, SIZES, icons } from "../../constants";
import { HorizontalFoodCard, VerticalFoodCard } from "../../components";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import Search from "../Search/Search";




const Section = ({ title, children }) => {
  return (
    <View>
      <StatusBar backgroundColor='#000'></StatusBar>
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

const Home = ({productos, setProductos}) => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(0);

  const [categoryIndex, setCategoryIndex] = React.useState(0);

  const [popular, setPopular] = React.useState([]);

  const [recommends, setRecommends] = React.useState([]);

  const [menuList, setMenuList] = React.useState([]);

  const [categoryList, setCategoryList] = React.useState([]);

  const [loader, setLoader] = React.useState(true);

  React.useEffect( async () => {
    try {
    const response = await fetch('https://app-menora.herokuapp.com/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaWFuQGdtYWlsLmNvbSIsImlkIjoiNjFjMGIxYTI5MTA1NTJiMmU1YzY1MTc3IiwiYWRtaW4iOmZhbHNlLCJhY3RpdmUiOnRydWUsImlhdCI6MTY0MDA0MjI0MCwiZXhwIjoxNjQwMDYzODQwfQ.A7lszvJIchmpTxRIBKVYZyuDMH0Dh5h7yknj5WT5mx0`
      }
    })
    const data = await response.json()
    setCategoryList(data)
    setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }, []);



  //Seleccion de tipo
  function renderFoodCategory() {
    return (
      <FlatList
        data={categoryList}
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
              marginRight:
                index == categoryList.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 10,
              borderRadius: SIZES.radius,
              
            }}
            onPress={() => {
              setSelectedCategoryId(item._id);
              handleChangeCategory(item._id, selectedCategory);
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
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
                {item.name}
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
        data={categoryList}
        keyExtractor={(item) => `${item._id}`}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (<Text>No hay productos</Text>)}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 30,
        }}
        // al precionar busca si coinsiden las categorias de las comidas con las del tipo de menu
        renderItem={({ item, index}) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index == categoryList.menu.length - 1 ? SIZES.padding : 0,
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
      <Search></Search>
        {/* Lista */}
      
        
        <FlatList
          data={categoryList.length && categoryList[categoryIndex].products}
          keyExtractor={(item) => `${item._id}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (<Text>No hay productos</Text>)}
          ListHeaderComponent={
            <View>
              {/* Categotorias de comida */}
              {renderFoodCategory(productos, setProductos)}
              {/* todos los productos */}
              {/*renderMenuTypes(productos, setProductos)*/}
            </View>
          }

          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  height: 130,
                  alignItems: "center",
                  marginHorizontal: SIZES.padding,
                  marginBottom: SIZES.radius,
                }}

                imageStyle={{
                  marginTop: 20,
                  marginLeft: 20,
                  height: 100,
                  width: 100,
                  resizeMode: "contain",
                }}
                item={item}
                productos={productos}
                setProductos={setProductos}
                onPress={() => navigation.navigate("FoodDetail")}
                
              />              
            );
          }}
        />
      

      </ScrollView>
    </View>
  );
};

export default Home;
