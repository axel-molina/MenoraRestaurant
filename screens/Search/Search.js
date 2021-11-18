import React from 'react';
import {
    View,
    Text
} from 'react-native';

const Search = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text
                style={{
                    color: 'white'
                }}
            >Busqueda</Text>
        </View>
    )
}

export default Search