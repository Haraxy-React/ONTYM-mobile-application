

 import 'react-native-gesture-handler';
 import * as React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from "@react-navigation/stack";
 
 // screens
 import {
     OnBoarding,
 } from "./src/Screens/OnBoarding";
 import {Login_Screen} from "./src/Screens/Login_Screen"
  import {Password_Screen} from "./src/Screens/Password_Screen"

 import { useFonts } from 'expo-font';
 
 // screen for stack & tabs
 const Stack = createStackNavigator();
 const App = () => {
     const [loaded] = useFonts({
         "Roboto-Black" : require('./src/Screens/assets/fonts/Roboto-Black.ttf'),
         "Roboto-Bold" : require('./src/Screens/assets/fonts/Roboto-Bold.ttf'),
         "Roboto-Regular" : require('./src/Screens/assets/fonts/Roboto-Regular.ttf'),
     })
 
     if(!loaded){
         return null;
     }
 
     return (
         <NavigationContainer>
             <Stack.Navigator  screenOptions={{
    headerShown: false
  }}>  
   <Stack.Screen name="Password_Screen" component={Password_Screen} option={{ headerShown: false }} />
                 <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
                 <Stack.Screen name="Login_Screen" component={Login_Screen} option={{ headerShown: false }} />
              
             </Stack.Navigator>
         </NavigationContainer>
     );
 };
 
 export default () => {
     return <App />;
 };