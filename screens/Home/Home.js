import React from "react";
import { FONTS, COLORS, SIZES, icons, dummyData } from "../../constants";
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
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);

  const [selectedMenuType, setSelectedMenuType] = React.useState(1);

  const [popular, setPopular] = React.useState([]);

  const [recommends, setRecommends] = React.useState([]);

  const [menuList, setMenuList] = React.useState([]);

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  // Handler
  function handleChangeCategory(categoryId, menuTypeId) {
    //Recuperar el tipo de menú popular
    let selectedPopular = dummyData.menu.find((a) => a.name == "Populares");

    //Recuperar el menú recomendado
    let selectedRecommend = dummyData.menu.find(
      (a) => a.name == "Recomendados"
      
    );

    // encuentra el menú basado en menuTypeId
    let selectedMenu = dummyData.menu.find((a) => a.id == menuTypeId);

    //Establecer la base del menú popular en el categoryId
    setPopular(
      selectedPopular?.list.filter((a) => a.categories.includes(categoryId))
    );

    // Establecer el menú recomendado según el categoryId
    setRecommends(
      selectedRecommend?.list.filter((a) => a.categories.includes(categoryId))
      
    );

    //configurar el menú según el categoryId
    setMenuList(
      selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
    );
  }


  //Seleccion de tipo
  function renderFoodCategory() {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
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
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 10,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectedCategoryId == item.id ? COLORS.primary : COLORS.black,
            }}
            onPress={() => {
              setSelectedCategoryId(item.id);
              handleChangeCategory(item.id, selectedMenuType);
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item.icon}
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
                    selectedCategoryId == item.id
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

  //Recomendaciones
  function renderRecommendedSection(productos, setProductos) {

    const navigation = useNavigation();

    return (

        <Section
          title="Recomendaciones"
        >
          
          <FlatList
            data={recommends}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsVerticalScrollIndicator={false}
            renderItem={({ item, idx }) => (
              
              <HorizontalFoodCard
                containerStyle={{
                  height: 160,
                  width: SIZES.width * 0.85,
                  marginLeft: idx == 0 ? SIZES.padding : 18,
                  marginRight: idx == recommends.length - 1 ? SIZES.padding : 0,
                  paddingRight: SIZES.radius,
                  alignItems: "center",
                }}
                imageStyle={{
                  flex: 1,
                  width: 110,
                  height: 110,
                  resizeMode: "contain",
                }}
                item={item}
                productos={productos}
                setProductos={setProductos}
                onPress={() => navigation.navigate("FoodDetail")}
              />
               
        
            )}
          />
        </Section>
    );
  }

  //Top 3 platos
  function renderPopularSection(productos, setProductos) {

    const navigation = useNavigation();

    return (
      <Section
        title="Top 3 platos"
        >
        <FlatList
          data={popular}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <VerticalFoodCard
            containerStyle={{
              marginLeft: index == 0 ? SIZES.padding : 18,
              marginRight: index == popular.length - 1 ? SIZES.padding : 0,
            }}
            
            item={item}
            productos={productos}
            setProductos={setProductos}
            onPress={() => navigation.navigate("FoodDetail")}
            />            
            )}
        />
        
      </Section>
    );
  }

  //Todos los productos
  function renderMenuTypes() {
    
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
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
                index == dummyData.menu.length - 1 ? SIZES.padding : 0,
            }}

            
            
            onPress={() => {
              setSelectedMenuType(item.id);
              handleChangeCategory(selectedCategoryId, item.id);
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
          data={menuList}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {/* Categotorias de comida */}
              {renderFoodCategory(productos, setProductos)}
              {/* Recomendados */}
              {renderRecommendedSection(productos, setProductos)}
              {/* top 3 */}
              {renderPopularSection(productos, setProductos)}
              {/* todos los productos */}
              {renderMenuTypes(productos, setProductos)}
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
