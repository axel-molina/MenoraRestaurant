import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  icons,
} from "../../constants";
import {
  Header,
  IconButton,
  CartQuantityButton,
} from "../../components";
import { RadioButton } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';

//redux
import { useDispatch, useSelector } from "react-redux";
import { crearCarritoAction } from "../../store/actions/carritoActions"; 



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
  const [qty, setQty] = React.useState(1)
  const [stars, setStars] = React.useState([]);

  //estado para los extras seleccionados
  const [extras, setExtras] = React.useState([]);

  //radio buttons
  const [checked, setChecked] = React.useState([]);

  const { producto } = route.params;
  //console.log(producto)

  const handleChecked= (index, item) =>{
    setExtras([...extras, item._id])

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
            
          }}
        >
          
          {/* Food Imagen */}
          <Image
            source={{ uri: producto.image }}
            resizeMode="cover"
            style={{
              height: '80%',
              width: "100%",
              borderRadius: 15,
            }}
          />
        </View>
        

        {/* Nombre y descripcion */}
        <View
          style={{
            
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

       
      </View>
    );
  }


  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito.carrito);

  const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));

  const añadirAlCarrito = () => {
    ToastAndroid.show(`${producto.name} agregado`, ToastAndroid.SHORT);
    console.log("DESDE HORIZONTAL",producto.name)
    const name = producto.name;
    const price = producto.price;
    const id = producto._id;
    const extras = producto.extras;
    
    guardarCarrito([...carrito, { name, price, id, extras }]);
    navigation.navigate("Home");
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
      {renderDetails()} 
     
        <FlatList
          data={producto.extras}
          keyExtractor={(item) => {item._id}}
          renderItem={({ item, index }) => (
            
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 2, justifyContent: 'space-between', marginLeft: 20}}>
                <Text style={{ color: 'white', marginTop: 6 }}>{item.name}</Text>
                <RadioButton
                uncheckedColor={COLORS.primary}
                color={COLORS.primary}
                value={false}
                status={checked.includes(index) ? 'checked' : 'unchecked'}
                key={index}
                onPress={() => handleChecked(index, item)}
                />
              </View>
          )}
          />
        
        <View>
          {/* Boton agregar al carrito */}
        
          <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{padding: 12, borderRadius: 50, marginTop: 10, marginBottom: 10, marginHorizontal: 10}}>
          <TouchableOpacity onPress={() =>añadirAlCarrito()}>
            <Text style={{ color: 'white', fontSize: 22, textAlign: 'center', fontFamily: "Poppins-Regular", }}>Agregar al carrito</Text>
          </TouchableOpacity>
          </LinearGradient>       
        </View> 

      
      
    </View>
  );
};

export default FoodDetail;
