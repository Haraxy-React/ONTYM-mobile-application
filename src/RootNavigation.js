

import 'react-native-gesture-handler';
import React, { useEffect, useRef, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Icon, { Icons } from '../src/Assets/Icon';

import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

// screens
import {
    OnBoarding,
} from "../src/Screens/OnBoarding";
import { Login_Screen } from "../src/Screens/Login_Screen"
import { Password_Screen } from "../src/Screens/Password_Screen"
import { Forgot_Password } from "../src/Screens/Forgot_Password"
import { Check_Email_Screen } from "../src/Screens/Check_Email_Screen"
import { Reset_Password_Screen } from "../src/Screens/Reset_Password_Screen"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification_Screen from '../src/Screens/Notification_Screen';
import TaskScreen from '../src/Screens/TaskScreen';
import Setting_Screen from '../src/Screens/Setting_Screen';
import Properties_screen from '../src/Screens/Properties_screen';
import Properties_screen1 from '../src/Screens/Properties_screen1';
import Properties_screen2 from '../src/Screens/Properties_screen2';
import Pre_check from '../src/Screens/Pre_check';
import inventory from '../src/Screens/inventory';
import Maintenance from '../src/Screens/Maintenance';
import { useSelector, useDispatch } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import AMCLog from "../src/Screens/AMCLog";
import PurchaseAndBilling from "../src/Screens/PurchaseAndBilling";
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import PropertiesListForBooking from "../src/Screens/PropertiesListForBooking";
import Booking_Screen from '../src/Screens/Booking_Screen';
import RequestInventory from "../src/Screens/RequestInventory";
import SendInventoryAudit from "../src/Screens/SendInventory";
import BookingCalendar from "../src/Screens/BookingCalendar";
import SubmitMaintenanceAudit from "../src/Screens/SubmitMaintenanceAuditScreen";
import BookmarkListScreen from "../src/Screens/BookmarkListScreen";
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import AddBoking from './Screens/AddBooking';


const Vector = createIconSetFromIcoMoon(
    require('../selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);
// screen for stack & tabs
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const setting = () => {
    return (

        <View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={["81%", 0, 0]}
                borderRadius={20}
                onOpenEnd={opensheet}
                initialSnap={0}
                onCloseEnd={closesheet}
                renderContent={renderContent}
            />
        </View>
    )
}
const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;



    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, { flex: focused ? 1 : 0.65 }]}

        >
            <View>
                <View
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16, paddingBottom: 10 }]} />
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
    { route: 'Properties_stack', label: 'Properties', type: Icons.MaterialCommunityIcons, icon: 'bank', component: Properties_stack, color: "#E2E2EC", alphaClr: "#fff" },
    { route: 'BookingStack', label: 'Booking', type: Vector, icon: 'Vectorbank', component: BookingStack, color: "#E2E2EC", alphaClr: "#fff" },
    { route: 'Notification_Screen', label: 'Notification', type: Icons.MaterialIcons, icon: 'notifications-on', component: Notification_Screen, color: "#E2E2EC", alphaClr: "#fff" },
    { route: 'Setting_Screen"', label: 'Setting', type: Icons.Ionicons, icon: 'settings-sharp', component: Setting_Screen, color: "#E2E2EC", alphaClr: "#fff" },
];

function BookingStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {/* <Stack.Screen name="Properties_list_for_booking" component={PropertiesListForBooking} options={{ headerShown: false }} /> */}

            <Stack.Screen name="BookingScreen" component={Booking_Screen} options={{ headerShown: false }} />
            <Stack.Screen name="BookingCalScreen" component={BookingCalendar} options={{ headerShown: false }} />

            <Stack.Screen name="AddBooking" component={AddBoking} options={{
                headerShown: false, tabBarVisible: false,
            }} />



        </Stack.Navigator>
    )
}

function Properties_stack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {/* <Stack.Screen name="Properties_screen" component={Properties_screen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Properties_screen1" component={Properties_screen1} options={{ headerShown: false }} />
            <Stack.Screen name="Properties_screen2" component={Properties_screen2} options={{ headerShown: false }} />
            <Stack.Screen name="Pre_check" component={Pre_check} options={{ headerShown: false }} />
            <Stack.Screen name="Request_inventory" component={RequestInventory} options={{ headerShown: false }} />
            <Stack.Screen name="Send_inventory" component={SendInventoryAudit} options={{ headerShown: false }} />
            <Stack.Screen name="SubmitMaintenanceAudit" component={SubmitMaintenanceAudit} options={{ headerShown: false }} />
            <Stack.Screen name="BookmarkListScreen" component={BookmarkListScreen} options={{ headerShown: false }} />
            {/* BookmarkListScreen */}
            {/* SubmitMaintenanceAudit */}
            <Stack.Screen name="inventory" component={inventory} options={{ headerShown: false }} />
            <Stack.Screen name="Maintenance" component={Maintenance} options={{ headerShown: false }} />
            <Stack.Screen name="amc_log" component={AMCLog} options={{ headerShown: false }} />
            <Stack.Screen name="purchase_and_billing" component={PurchaseAndBilling} options={{ headerShown: false }} />


        </Stack.Navigator>
    )
}
function TabNavigator() {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
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



export default function RootNavigation() {
    const dispatch = useDispatch();

    const dataReducer = useSelector(state => state.loginReducer);

    const [loaded] = useFonts({
        "Poppins-Bold": require('../src/Assets/font/Poppins-Bold.ttf'),
        "Poppins-Regular": require('../src/Assets/font/Poppins-Regular.ttf'),
        "Poppins-SemiBold": require('../src/Assets/font/Poppins-SemiBold.ttf'),
        IcoMoon: require('../resource/fonts/icomoon.ttf'),
    })

    if (!loaded) {
        return null;
    }
    const accessToken = dataReducer.user.accessToken;

    // useEffect(() => {

    //     // dispatch({
    //     //     type: "FIRSTLAUNCH",
    //     //     payload: counter
    //     // })


    // }, []);

    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {
                    typeof accessToken !== 'undefined' ?
                        <>
                            <Stack.Screen name="TabBarNavigation" component={TabNavigator} options={{ headerShown: false }} />

                            <Stack.Screen name="Password_Screen" component={Password_Screen} option={{ headerShown: false }} />

                        </>

                        :
                        (
                            <>
                                <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
                                <Stack.Screen name="Login_Screen" component={Login_Screen} option={{ headerShown: false }} />
                                <Stack.Screen name="Password_Screen" component={Password_Screen} option={{ headerShown: false }} />
                                <Stack.Screen name="Forgot_Password" component={Forgot_Password} option={{ headerShown: false }} />
                                <Stack.Screen name="Check_Email_Screen" component={Check_Email_Screen} option={{ headerShown: false }} />
                                <Stack.Screen name="Reset_Password_Screen" component={Reset_Password_Screen} option={{ headerShown: false }} />
                            </>
                        )

                }
            </Stack.Navigator>
        </NavigationContainer>
    );

}

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