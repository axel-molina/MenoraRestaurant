import React, { useState } from 'react'
import { StyleSheet, View, StatusBar, Text, TextInput, Image, ScrollView } from 'react-native'
import { FONTS, SIZES, COLORS, icons, images } from "../../constants";
import {  TextButton } from "../../components";
import { RadioButton } from 'react-native-paper'


const Abonar = () => {

    //State del radio button
    const [value, setValue] = React.useState('efectivo');

    //Cuando se preciona abonar
    const abonar = () => {
        console.log(value);
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#000'></StatusBar>
            <Text style={styles.title}>Abonar</Text>
            <View style={styles.logoContain}>
                <Image
                    source={images.favourite_food}
                    style={styles.logo}
                ></Image>
            </View>
            <View styles={styles.radios}>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <Text style={styles.text}>Efectivo</Text>
                    <RadioButton
                        value="efectivo"
                        color={COLORS.primary}
                        uncheckedColor={COLORS.primary}
                        status={ value === 'efectivo' ? 'checked' : 'unchecked' }
                        onValueChange={(value) => setChecked(value)}
                    />
                    <Text style={styles.text}>Mercado pago</Text>
                    <RadioButton
                        value="mp"
                        color={COLORS.primary}
                        uncheckedColor={COLORS.primary}
                        status={ value === 'mp' ? 'checked' : 'unchecked' }
                        onValueChange={(value) => setChecked(value)}
                    />
                    <Text style={styles.text}>Tarjeta de crédito</Text>
                    <RadioButton
                        value="credito"
                        color={COLORS.primary}
                        uncheckedColor={COLORS.primary}
                        status={ value === 'credito' ? 'checked' : 'unchecked' }
                        onValueChange={(value) => setChecked(value)}
                    />
            </RadioButton.Group>
            </View>

           <Text style={styles.text}>Cupón:</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                style={styles.cupon}
                ></TextInput>
            </View>

            <Text style={styles.text}>Precio Total:</Text>
           
            <TextButton
            label="ABONAR"
            buttonContainerStyle={{
              height: 55,
              alignItems: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => abonar()}
          />
        </ScrollView>
    )
}

export default Abonar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    title: {
        color: 'white',
        ...FONTS.h1,
        marginTop: 80,
        textAlign: 'center',
    },
    logoContain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        width: '100%',
    },
    logo:{
        width: 80,
        height: 100,
    },
    text: {
        color: 'white',
        marginTop: 10,
    },
    radios: {
        
    },
    cupon: {
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '90%',
        marginBottom: 20,
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
    },
})

