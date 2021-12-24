import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput 
} from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  icons,
  images,
} from "../../constants";
import {
  Header,
  IconButton,
  CartQuantityButton,
  StepperInput,
  TextButton
} from "../../components";


const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

const FoodDetail = ({ navigation }) => {
  const [foodItem, setFoodItem] = React.useState("");
  const [value, onChangeText] = React.useState('');
  const [qty, setQty] = React.useState(1)


  function renderHeader() {
    return (
      <Header
      
        title="DETALLES"
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
          alignItems: "center",
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.navigate("Home")}
          />
        }
        rightComponent={<CartQuantityButton quantity={3} />}
      />
    );
  }

  function renderDetails() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Food Cart */}
        <View
          style={{
            height: 190,
            borderRadius: 15,
            backgroundColor: COLORS.lightGray1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: SIZES.base,
              paddingHorizontal: SIZES.radius,
            }}
          >
            {/* Icono Favorito */}
            <Image
              source={icons.love}
              style={{
                width: 20,
                height: 20,
                tintColor: foodItem?.isFavourite ? COLORS.primary : COLORS.gray,
              }}
            />
          </View>
          {/* Food Imagen */}
          <Image
            source={foodItem?.image}
            resizeMode="contain"
            style={{
              height: 170,
              width: "100%",
            }}
          />
        </View>

        {/* Nombre y descripcion */}
        <View
          style={{
            marginTop: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>
            {foodItem?.name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.padding,
              color: COLORS.white,
              textAlign: "center",
              ...FONTS.body3,
            }}
          >
            {foodItem?.description}
          </Text>
        </View>

        {/* Ingredientes */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h3, color: "white" }}>Ingredientes</Text>
        </View>
        <View>
          <FlatList
            //data={}
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
                  paddingHorizontal: 10,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.lightGray2,
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
                      ...FONTS.h3,
                      color: COLORS.white,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.body3, color: "white" }}>
            Hamburgesa con lechuga, doble carne, salsa Jack, cebolla Morda,
            pickles
          </Text>
        </View>

        <View
          style={{
            backgroundColor: COLORS.white,
            borderBottomColor: "#000000",
            borderBottomWidth: 1,
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
          }}
        >
          <UselessTextInput
            multiline
            placeholder="¿Querés aclarar algo?"
            numberOfLines={4}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            style={{ padding: SIZES.base }}
          />
        </View>
      </View>
    );
  }

  function renderFooter(){
    return(
      <View
        style={{
          flexDirection: 'row',
          height:120,
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius
        }}
      >
        {/* Agregar mas de 1 */}
        <StepperInput
          value={qty}
          onAdd={()=> setQty(qty + 1)}
          onMinus={()=>{
            if (qty > 1){
              setQty(qty - 1);
            }
          }}
        />

        {/* Boton agregar al carrito */}
          <TextButton
            buttonContainerStyle={{
              flex:1,
              flexDirection: 'row',
              height:60,
              marginLeft: SIZES.radius,
              paddingHorizontal: 40,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary
            }}
            label="Agregar"
            label2= {foodItem?.price}
            onPress={() =>{
              
              navigation.navigate('Home')
            }}
          />

      </View>
    )
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >     
      {/* Header */}
      {renderHeader()}

      {/* Body */}
      <ScrollView>{renderDetails()}</ScrollView>

      {/* Footer */}
      {renderFooter()}
      
    </View>
  );
};

export default FoodDetail;
