import React from "react";
import {
  View,
  Text,
  Image,
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
import Icon from "react-native-vector-icons/AntDesign";


//redux
import { useDispatch, useSelector } from "react-redux";
import { crearCarritoAction, crearDrinksAction } from "../../store/actions/carritoActions"; 



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
  const [extrasEstado, setExtrasEstado] = React.useState([]);

  //radio buttons
  const [checked, setChecked] = React.useState([]);

  const { producto } = route.params;
  //console.log("esto es producto detalles",producto)

  const handleChecked= (index, item) =>{
    if(extrasEstado.includes(item)){
      let extrasAux = extrasEstado.filter(i => i._id !== item._id)
      console.log("extrasAux: ",extrasAux)
      setExtrasEstado(extrasAux)
    } else{
      setExtrasEstado([...extrasEstado, item])
    }
    if(checked.includes(index)){
      setChecked(checked.filter(item => item !== index))
    } else {
      setChecked([...checked, index])
    }
    //console.log("Extraaasss: ",extras)
  }

  function renderHeader() {

       // Info de REDUX
   const carrito = useSelector((state) => state.carrito.carrito);

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
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => {navigation.navigate("Home")}}
          />
        }
        rightComponent={
          <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          //se direcciona a la pestaña del carrito
          onPress={() => setSelectedTab(constants.screens.cart)}
        >
          <Icon name="shoppingcart" size={30} color="white" />
    
          {carrito.length > 0 ? <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              height: 20,
              width: 20,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}>
            <Text style={{ color: 'white' }}>{carrito.length}</Text>
          </View> : null}
          
        </TouchableOpacity>
        }
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
          <Text style={{ ...FONTS.h3, color: "white" }}>Descripción:</Text>
        </View>
        

        {producto.description !== null ? <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
          }}>
          <Text style={{ ...FONTS.body3, color: "white" }}>
            {producto.description}
          </Text>
        </View> : null}
       
      </View>
    );
  }


  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito.carrito);
  const drinks = useSelector((state) => state.carrito.drinks);

  const guardarCarrito = (carrito) => dispatch(crearCarritoAction(carrito));
  const guardarDrinks = (drinks) => dispatch(crearDrinksAction(drinks));

  const añadirAlCarrito = () => {

    if(producto.hasOwnProperty('alcohol')){
      ToastAndroid.show(`${producto.name} agregado`, ToastAndroid.SHORT);
    console.log("DESDE HORIZONTAL",producto.name)
    const name = producto.name;
    const price = producto.price;
    const id = producto._id;
    const alcohol = producto.alcohol;

    guardarDrinks([...drinks, {name, price, id, alcohol}])
    } else {

      ToastAndroid.show(`${producto.name} agregado`, ToastAndroid.SHORT);
      console.log("DESDE HORIZONTAL",producto.name)
      const name = producto.name;
      const price = producto.price;
      const id = producto._id;
      const extras = extrasEstado;
      
      guardarCarrito([...carrito, { name, price, id, extras }]);
    }

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

      { producto.extras && producto.extras.length > 0 && producto.extras !== null ? <Text style={{ color: 'white', marginTop: 20, borderBottomColor: 'white', fontFamily: "Poppins-Regular", marginLeft: 20}}>¿Quiere agregar algún extra?</Text> : null}
     
        <FlatList
          data={producto.extras}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 2, justifyContent: 'space-between', marginLeft: 20}}>
                <Text style={{ color: 'white', marginTop: 6 }}>{item.name}</Text>
                <RadioButton
                uncheckedColor={COLORS.primary}
                color={COLORS.primary}
                value={false}
                status={checked.includes(index) ? 'checked' : 'unchecked'}
                //key={index}
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
