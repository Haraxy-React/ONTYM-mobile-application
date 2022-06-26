import { View, Text, SafeAreaView, TouchableOpacity, Platform, Image, FlatList, StyleSheet, StatusBar, Modal, KeyboardAvoidingView } from 'react-native';


export const Permission = () => {

    return (
        <View style={{
            marginBottom: 50,

            // bottom: 100

        }}>
            <Text
                style={{

                    height: "92%",
                    textAlign: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // top: "50%"
                    marginTop: "50%",
                    // justifyContent: "center",
                    fontFamily: "Poppins-Regular",
                    fontWeight: "500", fontSize: 20, color: "#000000"
                }}
            >
                YOU DON'T HAVE PERMISSION.
            </Text>
        </View>
    )
}