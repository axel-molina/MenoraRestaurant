import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { constants, images, FONTS, SIZES, COLORS } from "../../constants";
import { TextButton } from "../../components";
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const PaginaDeBienvenida = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#000'></StatusBar>
            <View style={styles.containLogo}>
                <Image
                    source={images.logo_02}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>
            <Text style={styles.frase}>
                "SOUL FOOD IS THE BEST FOOD"
            </Text>
            <View
              style={{
                paddingHorizontal: SIZES.padding,
                marginVertical: SIZES.padding,
              }}
            >
              <TextButton 
                  label={<Text>REALIZAR PEDIDO
                     <Icon name="arrowright" size={25} color="white" />
                  </Text>}
                  buttonContainerStyle={{
                    height: 60,
                    borderRadius: 120
                  }}
                  onPress={() => navigation.replace("SignIn")}
              />
            </View>          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-evenly",
    },
    containLogo: {
        alignItems: "center",
    },
    logo: {
        width: SIZES.width * 0.8,
        height: 100,
    },
    frase: {
        color: COLORS.white,
        textAlign: "center",
        marginTop: -80,
        marginBottom: 60,
    },
})

export default PaginaDeBienvenida;