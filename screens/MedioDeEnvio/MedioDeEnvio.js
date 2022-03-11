import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native'
import icon1 from '../../assets/images/opcion1.png'
import icon2 from '../../assets/images/opcion2.png'
import icon3 from '../../assets/images/Vector.png'
import LinearGradient from 'react-native-linear-gradient';

//redux
import { useDispatch, useSelector } from "react-redux";
import { crearTypeAction } from '../../store/actions/carritoActions'


const MedioDeEnvio = ({ navigation, route}) => {

    const { total, text } = route.params;
    

    const dispatch = useDispatch();

    const guardarType = (type) => dispatch(crearTypeAction(type));
    const usuario = useSelector((state) => state.usuario.usuario); 
    const direccion = usuario.address.lastUsed;


    //Al hacer clic en medio de envio
    const alHacerClic = (opcion) => {
        guardarType(opcion)
        if(opcion === "delivery"){
            navigation.navigate('ListaDeDirecciones', {
                total: total,
                text: text,
                direccion: direccion
            })
        }else{
            navigation.navigate("Abonar", { total: total, text: text })
        }
    }

    return (
        <View style={styles.contain}>
            <StatusBar backgroundColor="#000"></StatusBar>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 22, marginTop: 10}}>DELIVERY</Text>
            <TouchableOpacity onPress={() => alHacerClic("delivery")}>
                <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{ width: 150, borderRadius: 100, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={icon1}></Image>
                </LinearGradient>
            </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 22}}>LOCAL</Text>
            <TouchableOpacity onPress={() => alHacerClic("local")}>
                <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{ width: 150, borderRadius: 100, height:150, justifyContent: 'center', alignItems: 'center'  }}>
                    <Image source={icon2}></Image>
                </LinearGradient>
            </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 22}}>PICK UP</Text>
            <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => alHacerClic("pickup")}>
                <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{ width: 150, borderRadius: 100, height: 150, justifyContent: 'center', alignItems: 'center'  }}>
                    <Image source={icon3}></Image>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default MedioDeEnvio

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})
