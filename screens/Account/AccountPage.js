import React from 'react';
import {
    View, Text, StyleSheet 
} from 'react-native';

const AccountPage = () => {
    return (
        <View style={styles.contain}>
            <Text
                style={{
                    color: 'white'
                }}
            >Pagina Cuenta</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default AccountPage