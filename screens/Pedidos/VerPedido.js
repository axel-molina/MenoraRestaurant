import { View, Text, StatusBar, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import React from 'react'

const VerPedido = ({ navigation, route }) => {

    const { item } = route.params;


  return (
    <View style={{
      backgroundColor: "black",
      flex: 1,
    }}>
      <StatusBar backgroundColor="#000"> </StatusBar> 
      <Text style={{ color: 'white', fontSize: 30, marginLeft: 20, marginTop: 30, marginBottom: 16 }}>Productos</Text>
      <FlatList
      data={item.products}
      keyExtractor={(item) => item.product._id} 
      renderItem={({ item }) => (
          <View>
            <Text style={{ color: 'white', fontSize: 20, marginLeft: 20, marginBottom: 20 }}>• {item.product.name} ${item.product.price}</Text>
            {item.extras.length > 0 ?<View>
               <FlatList
        data={item.extras} 
        keyExtractor={(item) => item._id }  
        renderItem={({ item }) => (
            <Text style={{ color: 'grey', fontSize: 18, marginLeft: 30, marginBottom: 10 }}> {item.name} {item.price === 0 ? null : <Text> ${item.price}</Text>}</Text>  
        )}
        /> 
            </View> : null}
          </View>
      )}
      />
      { item.drinks && item.drinks.length > 0 ? 
      <View>
        <Text style={{ color: 'white', fontSize: 30, marginLeft: 20, marginTop: -400, marginBottom: 16 }}>Bebidas</Text> 
        <FlatList
        data={item.drinks}
        keyExtractor={(item) => item._id }  
        renderItem={({ item }) => (
            <Text style={{ color: 'white', fontSize: 20, marginLeft: 20, marginTop: 0, marginBottom: 20 }}>• {item.name} $ {item.price}</Text>  
        )}
        /> 
      </View>: 
      null }
       
      
    </View>
  )
}

export default VerPedido