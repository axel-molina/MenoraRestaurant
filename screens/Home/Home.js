import React from "react";
import { FONTS, COLORS, SIZES, icons, dummyData } from "../../constants";
import { HorizontalFoodCard, VerticalFoodCard } from "../../components";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
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

  //Render Buscador

  function renderSearch() {
    return (
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
          placeholder="Search food..."
        />

        {/* Boton de filtos */}
        <TouchableOpacity
        //    onPress
        >
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
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
  function renderRecommendedSection() {
    return (
      <Section
        title="Recomendaciones"
        onPress={() => console.log("Show all recommended")}
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
              onPress={() => console.log("HorizontalFoodCard")}
            />
          )}
        />
      </Section>
    );
  }

  //Top 3 platos
  function renderPopularSection() {
    return (
      <Section
        title="Top 3 platos"
        onPress={() => console.log("Show all popular items")}
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
              onPress={() => console.log("Vertical Food Card")}
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
        renderItem={({ item, index }) => (
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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={{ marginBottom: 200, width: "100%" }}>
      {/* Buscador */}
      {renderSearch()}
        {/* Lista */}
        <FlatList
          data={menuList}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {/* Categotorias de comida */}
              {renderFoodCategory()}
              {/* Recomendados */}
              {renderRecommendedSection()}
              {/* top 3 */}
              {renderPopularSection()}
              {/* todos los productos */}
              {renderMenuTypes()}
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
                onPress={() => console.log("HorizontalFoodCard")}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
