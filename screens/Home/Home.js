import React from "react";
import { FONTS, COLORS, SIZES } from "../../constants";
import { HorizontalFoodCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Search from "../Search/Search";

// Redux
import { useDispatch, useSelector } from "react-redux";

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

  const [popular, setPopular] = React.useState([]);

  const [recommends, setRecommends] = React.useState([]);

  const [menuList, setMenuList] = React.useState([]);

  const [categoryList, setCategoryList] = React.useState([]);

  const [loader, setLoader] = React.useState(true);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);

  React.useEffect(async () => {
    try {
      const response = await fetch(
        "https://app-menora.herokuapp.com/categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCategoryList(data);
      setLoader(false);
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
              marginRight: index == categoryList.length - 1 ? SIZES.padding : 0,
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
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 65,
                  width: 100,
                  borderRadius: SIZES.radius,
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
