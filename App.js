

import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { View } from "react-native";
import RootNavigation from "./src/RootNavigation";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import { store, persistor } from './redux/store';
// const Vector = createIconSetFromIcoMoon(
//   require('./selection.json'),
//   'IcoMoon',
//   'icomoon.ttf'
// );
// // screen for stack & tabs
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const setting = () => {
//   return (

//     <View>
//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={["81%", 0, 0]}
//         borderRadius={20}
//         onOpenEnd={opensheet}
//         initialSnap={0}
//         onCloseEnd={closesheet}
//         renderContent={renderContent}
//       />
//     </View>
//   )
// }
// const TabButton = (props) => {
//   const { item, onPress, accessibilityState } = props;
//   const focused = accessibilityState.selected;



//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={1}
//       style={[styles.container, { flex: focused ? 1 : 0.65 }]}

//     >
//       <View>
//         {/* <View
//           style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16, paddingBottom: 10 }]} /> */}
//         <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
//           <Icon type={item.type} name={item.icon} color={focused ? "#2d9cdb" : "#000"} />
//           <View>

//             {/* {focused && <Text style={{
//               color: "#2d9cdb", paddingHorizontal: 8
//             }}>{item.label}</Text>} */}
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )
// }
// const TabArr = [
//   { route: 'TaskScreen', label: 'Tasks', type: Icons.Ionicons, icon: 'checkmark-done-sharp', component: TaskScreen, color: "#E2E2EC", alphaClr: "#fff" },
//   { route: 'Properties_stack', label: 'Properties', type: Icons.MaterialCommunityIcons, icon: 'bank', component: Properties_stack, color: "#E2E2EC", alphaClr: "#fff" },
//   { route: 'Booking_Screen ', label: 'Booking', type: Vector, icon: 'Vectorbank', component: Booking_Screen, color: "#E2E2EC", alphaClr: "#fff" },
//   { route: 'Notification_Screen', label: 'Notification', type: Icons.MaterialIcons, icon: 'notifications-on', component: Notification_Screen, color: "#E2E2EC", alphaClr: "#fff" },
//   { route: 'Setting_Screen"', label: 'Setting', type: Icons.Ionicons, icon: 'settings-sharp', component: Setting_Screen, color: "#E2E2EC", alphaClr: "#fff" },
// ];

// function Properties_stack() {
//   return (
//     <Stack.Navigator screenOptions={{
//       headerShown: false
//     }}>
//       <Stack.Screen name="Properties_screen" component={Properties_screen} options={{ headerShown: false }} />
//       <Stack.Screen name="Properties_screen1" component={Properties_screen1} options={{ headerShown: false }} />
//       <Stack.Screen name="Properties_screen2" component={Properties_screen2} options={{ headerShown: false }} />
//       <Stack.Screen name="Pre_check" component={Pre_check} options={{ headerShown: false }} />
//       <Stack.Screen name="inventory" component={inventory} options={{ headerShown: false }} />
//       <Stack.Screen name="Maintenance" component={Maintenance} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   )
// }
// function TabNavigator() {
//   return (

//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           height: 70,
//           position: 'absolute',
//           bottom: 0,
//           right: 0,
//           left: 0,
//           borderRadius: 10
//         }
//       }}
//     >

//       {TabArr.map((item, index) => {
//         return (
//           <Tab.Screen key={index} name={item.route} component={item.component}
//             options={{
//               tabBarShowLabel: false,
//               tabBarButton: (props) => <TabButton {...props} item={item} />
//             }}
//           />
//         )
//       })}

//     </Tab.Navigator>
//   )
// }
// function App() {
//   // const [loaded] = useFonts({
//   //   "Poppins-Bold": require('./src/Assets/font/Poppins-Bold.ttf'),
//   //   "Poppins-Regular": require('./src/Assets/font/Poppins-Regular.ttf'),
//   //   "Poppins-SemiBold": require('./src/Assets/font/Poppins-SemiBold.ttf'),
//   //   IcoMoon: require('./resource/fonts/icomoon.ttf'),
//   // })

//   // if (!loaded) {
//   //   return null;
//   // }

//   return (
//     <RootNavigation />
//     // <NavigationContainer>
//     //   <Stack.Navigator screenOptions={{
//     //     headerShown: false
//     //   }}>

//     //     <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
//     //     <Stack.Screen name="Login_Screen" component={Login_Screen} option={{ headerShown: false }} />
//     //     <Stack.Screen name="Password_Screen" component={Password_Screen} option={{ headerShown: false }} />
//     //     <Stack.Screen name="Forgot_Password" component={Forgot_Password} option={{ headerShown: false }} />
//     //     <Stack.Screen name="Check_Email_Screen" component={Check_Email_Screen} option={{ headerShown: false }} />
//     //     <Stack.Screen name="Reset_Password_Screen" component={Reset_Password_Screen} option={{ headerShown: false }} />
//     //     <Stack.Screen name="TabBarNavigation" component={TabNavigator} options={{ headerShown: false }} />

//     //   </Stack.Navigator>
//     // </NavigationContainer>
//   );
// };
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}  >
          {/* <FirebaseSetup /> */}
          <RootNavigation />
          <FlashMessage position="bottom" />

        </View>
      </PersistGate>
    </Provider>
  );
}
// export default () => {
//   return (<Provider store={store}> <App /></Provider>);
// };

