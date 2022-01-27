import React from 'react'
import { StyleSheet, Text, View, StatusBar,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PagoExitoso = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar backgroundColor="#000"></StatusBar>
            <TouchableOpacity onPress={() => alHacerClic("DELIVERY")}>
                <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{ width: 150, borderRadius: 100, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Icon name="food" size={80} color="white"/>
                </View>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 36, marginTop: 20, fontWeight: 'bold' }}>Pedido confirmado</Text>
        </View>
    )
}

export default PagoExitoso

const styles = StyleSheet.create({})
