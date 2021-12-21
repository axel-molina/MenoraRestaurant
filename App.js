
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/rootReducer";


import {
  PaginaDeBienvenida,
  SignIn,
  SignUp,
  ForgotPassword,
  Otp,
  FoodDetail,
  Abonar
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
              initialRouteName={"Abonar"}
            >
             
              <Stack.Screen name="PaginaDeBienvenida" component={PaginaDeBienvenida} />
          
              <Stack.Screen name="Home" component={CustomDrawer} />
          
              <Stack.Screen name="FoodDetail" component={FoodDetail} />
          
              <Stack.Screen name="SignIn" component={SignIn} />
          
              <Stack.Screen name="SignUp" component={SignUp} />
          
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          
              <Stack.Screen name="Otp" component={Otp} />

              <Stack.Screen name="Abonar" component={Abonar} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>

   
  );
};

export default App;
