// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from "react-native";

// import CustomDrawer from "./navigation/CustomDrawer";
// import { COLORS } from "./constants";

// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import rootReducer from "./store/rootReducer";

// const Stack = createStackNavigator();

// const store = createStore(rootReducer, applyMiddleware(thunk));

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
//         <Stack.Navigator
//           screenOptions={{
//             headerShown: false,
//           }}
//           initialRouteName={"Home"}
//         >
//           <Stack.Screen name="Home" component={CustomDrawer} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/rootReducer";


import {
  OnBoarding,
  SignIn,
  SignUp,
  ForgotPassword,
  Otp,
  FoodDetail,
} from "./screens";
import CustomDrawer from "./navigation/CustomDrawer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"SignIn"}
        >
          <Stack.Screen name="OnBoarding" component={OnBoarding} />

          <Stack.Screen name="Home" component={CustomDrawer} />

          <Stack.Screen name="FoodDetail" component={FoodDetail} />

          <Stack.Screen name="SignIn" component={SignIn} />

          <Stack.Screen name="SignUp" component={SignUp} />

          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

          <Stack.Screen name="Otp" component={Otp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
