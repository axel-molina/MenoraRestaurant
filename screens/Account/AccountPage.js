import React from 'react';
import {
    View, Text, TouchableOpacity, ActivityIndicator
} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';

// Redux
import { useSelector } from "react-redux";


const AccountPage = () => {
    const navigation = useNavigation();
    const usuario = useSelector((state) => state.usuario.usuario);


    return (
        <View style={{ flex: 1 }}>
            {
            usuario !== null ?  
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ color: 'white', fontSize: 32 }}>{usuario.name} {usuario.surname}</Text>
                <Text style={{ color: 'white', fontSize: 18 }}>{usuario.email}</Text>  
            </View> : <ActivityIndicator size="large" color="#FF571F" />
            }
            <View style={{ marginTop: 30}}>
                <View style={{ borderWidth: 0.5, borderColor: 'white', marginBottom: 10 }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <Icon name="shoppingcart" size={20} color="white" />
                    <Text style={{ color: 'white', fontSize: 22, marginLeft: 10}}>Pedidos</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: 'white', marginBottom: 10, marginTop: 10 }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10}}>
                    <Icon name="enviromento" size={20} color="white" />
                    <Text style={{ color: 'white', fontSize: 22, marginLeft: 10}}>Dirección para delivery</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: 'white', marginBottom: 10, marginTop: 10  }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10}}>
                <Icons name="ticket" size={20} color='grey' />
                    <Text style={{ color: 'grey', fontSize: 22, marginLeft: 10}}>Promos</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: 'white', marginBottom: 10, marginTop: 10  }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10}} onPress = {() => navigation.navigate("CambioDeContraseña")}>
                <Icons name="lock" size={22} color='white' />
                    <Text style={{ color: 'white', fontSize: 22, marginLeft: 10}}>Cambiar contraseña</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: 'white', marginTop: 10  }}></View>
            </View>
        </View>
     
    )
}

export default AccountPage