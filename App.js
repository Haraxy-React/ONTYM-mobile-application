

 import 'react-native-gesture-handler';
 import React, { useEffect, useRef }  from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from "@react-navigation/stack";
 import Icon, { Icons } from './src/Assets/Icon';
 import { TouchableOpacity,View,StyleSheet ,Text} from 'react-native';

 // screens
 import {
     OnBoarding,
 } from "./src/Screens/OnBoarding";
 import {Login_Screen} from "./src/Screens/Login_Screen"
  import {Password_Screen} from "./src/Screens/Password_Screen"
  import {Forgot_Password} from "./src/Screens/Forgot_Password"
  import {Check_Email_Screen} from "./src/Screens/Check_Email_Screen"
  import {Reset_Password_Screen} from "./src/Screens/Reset_Password_Screen"
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import Notification_Screen from './src/Screens/Notification_Screen';
  import TaskScreen from './src/Screens/TaskScreen';
import Setting_Screen from './src/Screens/Setting_Screen';
import Properties_screen from './src/Screens/Properties_screen';


 import { useFonts } from 'expo-font';
 
 // screen for stack & tabs
 const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();
 const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;


  
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[styles.container, {flex: focused ? 1 : 0.65}]}>
        <View>
          <View
     
            style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]} />
          <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
            <Icon type={item.type} name={item.icon} color={focused ? "#2d9cdb" : "#000"} />
            <View>
  
              {focused && <Text style={{
                color: "#2d9cdb", paddingHorizontal: 8
              }}>{item.label}</Text>}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
 const TabArr = [
    { route: 'TaskScreen', label: 'Tasks', type: Icons.Ionicons, icon: 'checkmark-done-sharp', component: TaskScreen, color: "#E2E2EC", alphaClr: "#fff" },
    { route: 'Properties_screen', label: 'Properties', type: Icons.MaterialCommunityIcons, icon: 'bank', component: Properties_screen, color: "#E2E2EC", alphaClr: "#fff" },
    { route: 'Notification_Screen', label: 'Notification', type: Icons.MaterialIcons, icon: 'notifications-on', component: Notification_Screen, color: "#E2E2EC", alphaClr: "#fff" },
    { route: 'Setting_Screen"', label: 'Setting', type: Icons.Ionicons, icon: 'settings-sharp', component: Setting_Screen, color: "#E2E2EC", alphaClr: "#fff"},
  ];
function TabNavigator () {
return(

    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderRadius: 10
      }
    }}
  >
        
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    
  </Tab.Navigator>
)
}
 const App = () => {
     const [loaded] = useFonts({
         "Poppins-Bold" : require('./src/Assets/font/Poppins-Bold.ttf'),
         "Poppins-Regular" : require('./src/Assets/font/Poppins-Regular.ttf'),
         "Poppins-SemiBold" : require('./src/Assets/font/Poppins-SemiBold.ttf'),
     })



  
 
     if(!loaded){
         return null;
     }
 
     return (
         <NavigationContainer>
             <Stack.Navigator  screenOptions={{
    headerShown: false
  }}>  
        <Stack.Screen name="TabBarNavigation" component={TabNavigator} options={{ headerShown: false }}  />
                 <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
                 <Stack.Screen name="Login_Screen" component={Login_Screen} option={{ headerShown: false }} />
                 <Stack.Screen name="Password_Screen" component={Password_Screen} option={{ headerShown: false }} />
                 <Stack.Screen name="Forgot_Password" component={Forgot_Password} option={{ headerShown: false }} />
                 <Stack.Screen name="Check_Email_Screen" component={Check_Email_Screen} option={{ headerShown: false }} />
                 <Stack.Screen name="Reset_Password_Screen" component={Reset_Password_Screen} option={{ headerShown: false }} />
             
            </Stack.Navigator>
         </NavigationContainer>
     );
 };
 
 export default () => {
     return <App />;
 };
 const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 16,
    }
  })