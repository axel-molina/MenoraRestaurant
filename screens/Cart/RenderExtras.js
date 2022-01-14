import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";

const RenderExtras = ({item, indexProd}) => {
    if(item){
        return (
            <View style={styles.contain}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={{ flexDirection: 'row'}}>
                <Text style={styles.price}> ${item.price}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    //console.log("INDEXPROD:", indexProd)
                    //eliminarExtras(index, indexProd)
                    }}>
                  <Icon name="delete" size={25} color="orange" />
                </TouchableOpacity>
              </View>
            </View>
          );
        } else{
          return null;
        }
}

export default RenderExtras

const styles = StyleSheet.create({
    text:{
        color: '#828282',
        fontSize: 18,
      },
      contain: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 40,
      },
      button: {
        marginLeft: 10,
      },
      price: {
        color: '#828282',
        fontSize: 18,
      },
})
