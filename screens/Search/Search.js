import React from 'react';
import {
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../../constants";

const Search = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                height: 45,
                alignItems: "center",
                marginHorizontal: SIZES.padding,
                marginVertical: SIZES.base,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray1,
            }}
        >
            {/* Icono buscar */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />
        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="Buscar"
        />
            {/* Boton de filtos */}
        <TouchableOpacity
        //    onPress
        >
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
        </View>
    )
}

export default Search