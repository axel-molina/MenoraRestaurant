import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { setSelectedTab } from "../store/tab/tabActions";
import { Home, Search, CartTab, AccountPage } from "../screens";
import { Header} from "../components";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
} from "../constants";

const TabButton = ({
  label,
  icon,
  isFocused,
  outerContainerStyle,
  innerContainerStyle,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          outerContainerStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              flexDirection: "row",
              width: "130%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            },
            innerContainerStyle,
          ]}
        >
          <Image
            source={icon}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
            }}
          />

          {isFocused && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({
  drawerAnimationStyle,
  navigation,
  selectedTab,
  setSelectedTab,
  containerStyle,
  iconStyle,
  quantity,
  onPress,
}) => {
  const flatListRef = React.useRef();

  // Reanimated Share Value
  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.black);
  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.black);
  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(COLORS.black);
  const accountTabFlex = useSharedValue(1);
  const accountTabColor = useSharedValue(COLORS.black);

  //Reanimated Animated Styles
  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });
  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const searchFlexStyle = useAnimatedStyle(() => {
    return {
      flex: searchTabFlex.value,
    };
  });
  const searchColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: searchTabColor.value,
    };
  });

  const cartFlexStyle = useAnimatedStyle(() => {
    return {
      flex: cartTabFlex.value,
    };
  });
  const cartColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: cartTabColor.value,
    };
  });

  const accountFlexStyle = useAnimatedStyle(() => {
    return {
      flex: accountTabFlex.value,
    };
  });
  const accountColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: accountTabColor.value,
    };
  });

  React.useEffect(() => {
    setSelectedTab(constants.screens.home);
  }, []);

  React.useEffect(() => {
    if (selectedTab == constants.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });

      homeTabFlex.value = withTiming(4, { duration: 450 });
      homeTabColor.value = withTiming(COLORS.primary, { duration: 450 });
    } else {
      homeTabFlex.value = withTiming(4, { duration: 450 });
      homeTabColor.value = withTiming(COLORS.transparent, { duration: 450 });
    }

    if (selectedTab == constants.screens.search) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      searchTabFlex.value = withTiming(4, { duration: 450 });
      searchTabColor.value = withTiming(COLORS.primary, { duration: 450 });
    } else {
      searchTabFlex.value = withTiming(4, { duration: 450 });
      searchTabColor.value = withTiming(COLORS.transparent, { duration: 450 });
    }

    if (selectedTab == constants.screens.cart) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false,
      });
      cartTabFlex.value = withTiming(4, { duration: 450 });
      cartTabColor.value = withTiming(COLORS.primary, { duration: 450 });
    } else {
      cartTabFlex.value = withTiming(4, { duration: 450 });
      cartTabColor.value = withTiming(COLORS.transparent, { duration: 450 });
    }

    if (selectedTab == constants.screens.account) {
      flatListRef?.current?.scrollToIndex({
        index: 4,
        animated: false,
      });
      accountTabFlex.value = withTiming(4, { duration: 450 });
      accountTabColor.value = withTiming(COLORS.primary, { duration: 450 });
    } else {
      accountTabFlex.value = withTiming(4, { duration: 450 });
      accountTabColor.value = withTiming(COLORS.transparent, {
        duration: 450,
      });
    }
  }, [selectedTab]);

  const [productos, setProductos] = React.useState([])

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        ...drawerAnimationStyle,
      }}
    >
      {/* Header */}
      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
          alignItems: "center",
        }}
        title={selectedTab.toUpperCase()}
        // Icon para abrir nav en la izquierda
        leftComponent={
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.openDrawer()}
          >
            <Image source={icons.menu} />
          </TouchableOpacity>
        }

        
        // icono del carrito 
        rightComponent={
          <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightOrange2,
            ...containerStyle
          }}
          //se direcciona a la pestaña del carrito
          onPress={() => setSelectedTab(constants.screens.cart)}
        >
          <Image
            source={icons.cart}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.black,
              ...iconStyle
            }}
          />
    
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              height: 15,
              width: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body5,
                lineHeight: 0,
                fontSize: 10,
              }}
            >
            </Text>
          </View>
          
        </TouchableOpacity>
        }
      />

      {/* Content */}
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}
              >
                {item.label == constants.screens.home && <Home setProductos={setProductos} productos={productos}/>}
                {item.label == constants.screens.search && <Search />}
                {item.label == constants.screens.cart && <CartTab setProductos={setProductos} productos={productos}/>}
                {item.label == constants.screens.account && <AccountPage />}
              </View>
            );
          }}
        />
      </View>

      {/* Footer */}
      <View
        style={{
          height: 100,
          justifyContent: "flex-end",
        }}
      >
        {/* Shadows */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 2 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: "absolute",
            top: -20,
            left: 0,
            right: 0,
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />

        {/* Tabs */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            paddingBottom: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.black,
          }}
        >
          <TabButton
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab == constants.screens.home}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
            onPress={() => setSelectedTab(constants.screens.home)}
          />

          <TabButton
            label={constants.screens.search}
            icon={icons.search}
            isFocused={selectedTab == constants.screens.search}
            outerContainerStyle={searchFlexStyle}
            innerContainerStyle={searchColorStyle}
            onPress={() => setSelectedTab(constants.screens.search)}
          />

          <TabButton
            label={constants.screens.cart}
            icon={icons.cart}
            isFocused={selectedTab == constants.screens.cart}
            outerContainerStyle={cartFlexStyle}
            innerContainerStyle={cartColorStyle}
            onPress={() => setSelectedTab(constants.screens.cart)}
          />

          <TabButton
            label={constants.screens.account}
            icon={icons.profile}
            isFocused={selectedTab == constants.screens.account}
            outerContainerStyle={accountFlexStyle}
            innerContainerStyle={accountColorStyle}
            onPress={() => setSelectedTab(constants.screens.account)}
          />
        </View>
      </View>
    </Animated.View>
  );
};

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
