
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";

import { Provider } from "react-redux";
import store from "./store/store";
import { requestTrackingPermission } from "react-native-tracking-transparency";

import {
  PaginaDeBienvenida,
  SignIn,
  SignUp,
  ForgotPassword,
  Otp,
  FoodDetail,
  Abonar, 
  Search,
  MedioDeEnvio,
  CartTab,
  PagoExitoso,
  CambioDeContrase├▒a,
  AccountPage,
  CambioDeContrase├▒aExitoso,
  Pedidos,
  Valorar,
  VerPedido,
  Direcciones,
  ListaDeDirecciones,
  QuitarDirecciones
} from "./screens";

import CustomDrawer from "./navigation/CustomDrawer";

//const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();



const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  React.useEffect(() => {
    ( async () => {
      const { status } = await requestTrackingPermission();
      if (status === "authorized" || status === "unavailable") {
        console.log("Permission granted");
        //startNotifications(notificationListener, responseListener) aca deberia ir una funcion sobre notificaciones
      }
    })
  
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
             
              <Stack.Screen name="PaginaDeBienvenida" component={PaginaDeBienvenida} />
          
              <Stack.Screen name="Home" component={CustomDrawer} /> 

              <Stack.Screen name="Search" component={Search} />
          
              <Stack.Screen name="FoodDetail" component={FoodDetail} />
          
              <Stack.Screen name="SignIn" component={SignIn} />
          
              <Stack.Screen name="SignUp" component={SignUp} />
          
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          
              <Stack.Screen name="Otp" component={Otp} />

              <Stack.Screen name="Abonar" component={Abonar} />

              <Stack.Screen name="MedioDeEnvio" component={MedioDeEnvio} />

              <Stack.Screen name="CartTab" component={CartTab} />

              <Stack.Screen name="PagoExitoso" component={PagoExitoso} />

              <Stack.Screen name="AccountPage" component={AccountPage} />

              <Stack.Screen name="CambioDeContrase├▒a" component={CambioDeContrase├▒a} />
              
              <Stack.Screen name="CambioDeContrase├▒aExitoso" component={CambioDeContrase├▒aExitoso} />

              <Stack.Screen name="Pedidos" component={Pedidos} />

              <Stack.Screen name="Valorar" component={Valorar} />

              <Stack.Screen name="VerPedido" component={VerPedido} />

              <Stack.Screen name="Direcciones" component={Direcciones} />

              <Stack.Screen name="ListaDeDirecciones" component={ListaDeDirecciones} />

              <Stack.Screen name="QuitarDirecciones" component={QuitarDirecciones} />
              
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>

   
  );
};

export default App;
