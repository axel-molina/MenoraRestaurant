import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput ,
  styles
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
import { RadioButton } from 'react-native-paper'



const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

const FoodDetail = ({ navigation, route }) => {
  const [value, onChangeText] = React.useState('');
  const [qty, setQty] = React.useState(1)
  const [stars, setStars] = React.useState([]);

  //radio buttons
  const [checked, setChecked] = React.useState([]);

  const { producto } = route.params;
  //console.log(producto.extras)

  const handleChecked= (index) =>{
    if(checked.includes(index)){
      setChecked(checked.filter(item => item !== index))
    } else {
      setChecked([...checked, index])
    }
  }

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

  function renderDetails( ) {
 
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
          
          {/* Food Imagen */}
          <Image
            source={{ uri: producto.image }}
            resizeMode="cover"
            style={{
              height: '100%',
              width: "100%",
              borderRadius: 15,
            }}
          />
        </View>

        {/* Agregar mas de 1 */}
        
          <View style={{ display: 'flex', alignItems: 'center', marginTop: 30,}}>
          <StepperInput
            value={qty}
            onAdd={()=> setQty(qty + 1)}
            onMinus={()=>{
              if (qty > 1){
                setQty(qty - 1);
              }
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
            {producto.name}
          </Text>
        </View>

        <View>
          {stars}
        </View>

        {/* Ingredientes */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h3, color: "white" }}>Ingredientes:</Text>
        </View>
        

        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.body3, color: "white" }}>
            {producto.description}
          </Text>
        </View>

        {/* Extras */}
        <Text style={{ color: 'white', marginTop: 20, borderBottomColor: 'white', fontFamily: "Poppins-Regular"}}>¿Quiere agregar algún extra?</Text>

        <FlatList
        data={producto.extras}
        keyExtractor={(item) => {item._id}}
        renderItem={({ item, index }) => (
          
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 2, justifyContent: 'space-between'}}>
              <Text style={{ color: 'white', marginTop: 6 }}>{item.name}</Text>
              <RadioButton
              uncheckedColor={COLORS.primary}
              color={COLORS.primary}
              value={false}
              status={checked.includes(index) ? 'checked' : 'unchecked'}
              key={index}
              onPress={() => handleChecked(index)}
              />
            </View>
          
          
        )}
        />

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
          height:100,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}
      >
        

        {/* Boton agregar al carrito */}

        <TextButton
          label="Agregar al carrito"
          buttonContainerStyle={{
            width: 102,
            height: 55,
            alignItems: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
            onPress={() =>{navigation.navigate('Home')}}
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
