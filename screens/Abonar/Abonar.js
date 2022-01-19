import React, { useState } from 'react'
import { StyleSheet, View, StatusBar, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, COLORS, icons, images } from "../../constants";
import {  TextButton } from "../../components";
import { RadioButton } from 'react-native-paper'
import Icon from "react-native-vector-icons/Entypo";
import LinearGradient from 'react-native-linear-gradient'; 


const Abonar = () => {

    //State del radio button
    const [value, setValue] = React.useState('efectivo');

    //state para mostrar input cupon
    const [showCupon, setShowCupon] = useState(false);

    //state para el cupon
    const [cupon, setCupon] = React.useState('');

    //Cuando se precione cupon
    const handleCupon = () => {
        setShowCupon(!showCupon);
    }

    //Cuando se preciona abonar
    const abonar = () => {
        console.log(value);
    }

    return (
        <ScrollView style={{ backgroundColor: 'black'}}>
            <StatusBar backgroundColor='#000'></StatusBar>
            <Text style={{ color: 'white', fontSize: 45, textAlign: 'center', marginTop: 10, marginBottom: 30, fontWeight: 'bold' }}>Abonar</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
                <Image
                    source={images.favourite_food}
                    style={{ width: 100, height: 130 }}
                ></Image>
            </View>
            <View>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 2, marginBottom: 10 }}>
                        <RadioButton
                            value="efectivo"
                            color={COLORS.primary}
                            uncheckedColor={COLORS.primary}
                            status={ value === 'efectivo' ? 'checked' : 'unchecked' }
                            onValueChange={(value) => setChecked(value)}
                        />
                        <Text style={{ color: 'white', marginTop: 6 }}>Efectivo</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 2, marginBottom: 10 }}>
                        <RadioButton
                            value="mp"
                            color={COLORS.primary}
                            uncheckedColor={COLORS.primary}
                            status={ value === 'mp' ? 'checked' : 'unchecked' }
                            onValueChange={(value) => setChecked(value)}
                        />
                        <Text style={{ color: 'white', marginTop: 6 }}>Mercado pago</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 2, marginBottom: 10 }}>
                        <RadioButton
                            value="credito"
                            color={COLORS.primary}
                            uncheckedColor={COLORS.primary}
                            status={ value === 'credito' ? 'checked' : 'unchecked' }
                            onValueChange={(value) => setChecked(value)}
                        />
                        <Text style={{ color: 'white', marginTop: 6 }}>Tarjeta de crédito</Text>
                    </View>
            </RadioButton.Group>
            </View>

             <TouchableOpacity onPress={() => handleCupon()}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginLeft: 5 }}>
                        <Icon name="ticket" size={25} color={COLORS.primary} />
                        <Text style={{ color: 'white', marginLeft: 5 }}>Tengo un cupón</Text>
                    </View>
                </TouchableOpacity> 
            {  showCupon ? <View style={{ marginHorizontal: 10 }}>
                <TextInput
                placeholder='Ingresar cupón' 
                style={{ borderRadius: 10, backgroundColor: 'white', padding: 10, marginTop: 10, marginBottom: 10 }}
                ></TextInput>
            </View> : null
            }
            <Text style={styles.text}>Precio Total:</Text>
           
            <LinearGradient colors={['#ED1200', '#D9510C', '#EA8100']} style={{padding: 12, borderRadius: 50, marginTop: 10, marginBottom: 30, marginHorizontal: 10 }}>
                <TouchableOpacity onPress={() => abonar()}>
                    <Text style={{ color: 'white', fontSize: 22, textAlign: 'center', fontFamily: "Poppins-Regular", }}>ABONAR</Text>
                </TouchableOpacity>
            </LinearGradient>

        </ScrollView>
    )
}

export default Abonar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
})

