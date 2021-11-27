import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import Animated from "react-native-reanimated";
import { connect } from "react-redux";
import { setSelectedTab } from "../store/tab/tabActions";

import { MainLayout } from "../screens";
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  dummyData,
} from "../constants";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 40,
        marginBottom: SIZES.base,
        alignItems: "center",
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.white,
        }}
      />

      <Text
        style={{
          marginLeft: 15,
          color: COLORS.white,
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
      <Text></Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingHorizontal: SIZES.radius }}>
        {/* Close icon */}
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{
                height: 35,
                width: 35,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Profile*/}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            AlignItems: "center",
          }}
          Onpress={() => console.log("Profile")}
        >
          {/* img user profile */}
          <Image
            source={dummyData.myProfile?.profile_image}
            style={{
              width: 50,
              height: 50,
              borderRadius: SIZES.radius,
            }}
          />

          {/* Profile Name + View Profile */}
          <View
            style={{
              marginLeft: SIZES.radius,
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {dummyData.myProfile?.name}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
              View your Profile
            </Text>
          </View>
        </TouchableOpacity>

        {/* Drawer Items */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding,
          }}
        >
          {/* icon home */}
          <CustomDrawerItem 
            label={constants.screens.home} 
            icon={icons.home}
            // al seleccionar da un efecto de posicion en esa opcion
            isFocused={selectedTab == constants.screens.home}
            onPress={() =>{
              setSelectedTab(constants.screens.home)
              navigation.navigate('MainLayout')
            }}
          />

          {/* icon billeta */}
          <CustomDrawerItem
            label={constants.screens.my_wallet}
            icon={icons.wallet}
          />

          {/* icon carrito */}
          <CustomDrawerItem
            label={constants.screens.cart}
            icon={icons.cart}
            isFocused={selectedTab == constants.screens.cart}
            onPress={() =>{
              setSelectedTab(constants.screens.cart)
              navigation.navigate('MainLayout')
            }}
          />
          
          {/* icon cuenta */}
          <CustomDrawerItem
            label={constants.screens.account}
            icon={icons.notification}
            // al seleccionar da un efecto de posicion en esa opcion
            isFocused={selectedTab == constants.screens.account}
            onPress={() =>{
              setSelectedTab(constants.screens.account)
              navigation.navigate('MainLayout')
            }}
          />


          {/* Line Divider */}
          <View
            style={{
              height: 1.5,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />

          {/* icon location */}
          <CustomDrawerItem label="Tus Direcciones" icon={icons.location} />

          {/* icon coupon */}
          <CustomDrawerItem label="Promos" icon={icons.coupon} />

          {/* icon setting */}
          <CustomDrawerItem label="Configuracion" icon={icons.setting} />
        </View>

        {/* logout */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          {/* icon logout */}
          <CustomDrawerItem label="Cerrar Sesion" icon={icons.logout} 
          onPress={() =>navigation.navigate('SignIn')}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const animatedStyle = { borderRadius, trasnforms: [{ scale }] };

  return (
    // SlideBar naranja (cambiar color)
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{
          flex: 1,
          width: "65%",
          paddingRight: 20,
          backgroundColor: "transparent",
        }}
        sceneContainerStyle={{
          backgroundColor: "transparent",
        }}
        initialRouteName="MainLayout"
        drawerContent={(props) => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);
          return (
            <CustomDrawerContent
              navigation={props.navigation}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          );
        }}
      >
        <Drawer.Screen name="MainLayout">
          {(props) => (
            <MainLayout {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {return dispatch(setSelectedTab(selectedTab))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
