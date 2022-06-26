
import React, { useEffect } from 'react';
import {
    Animated,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
// import SyncStorage from 'sync-storage';
import { useSelector, useDispatch } from 'react-redux';


// constants
import { images, theme } from "../../constants";
import Login_Screen from '../../Login_Screen/Login_Screen/Login_Screen';
// import {  } from "../";
const { onboarding1, onboarding2, onboarding3, onboardingbackground } = images;

// theme
const { COLORS, FONTS, SIZES } = theme;

const onBoardings = [
    {
        title: "Welcome to OnTym",
        description: "Whats going to happen?",
        img: onboarding1
    },
    {
        title: "Complete Daily Tasks",
        description: "Complete your routine Task for Customers",
        img: onboarding2
    },
    {
        title: "Manage Operation Team",
        description: "Manage your Staff-Member and Work History",
        img: onboarding3
    }
];

const OnBoarding = ({ navigation }) => {
    const [completed, setCompleted] = React.useState(false);
    const dataReducer = useSelector(state => state.loginReducer);
    console.log("LOGIN DATA FROM STORE : ", dataReducer.user);

    const scrollX = new Animated.Value(0);

    React.useEffect(() => {
        // const result = SyncStorage.get('userid');
        // console.log("USER DETAILS: ", result);
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
                setCompleted(true);
            }
        });

        return () => scrollX.removeListener();
    }, []);


    useEffect(() => {
        console.log("EFFECT: ", dataReducer.user.accessToken);
        if (typeof dataReducer.user.accessToken !== 'undefined') {
            navigation.navigate("TabBarNavigation")

        }

    }, [dataReducer.user])

    // Render

    function renderContent() {
        return (
            <>
                <ImageBackground style={{


                    flex: 1,
                    height: "100%"



                }}
                    source={require("../../../Assets/background.png")}
                >
                    <Animated.ScrollView
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        snapToAlignment="center"
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event([
                            { nativeEvent: { contentOffset: { x: scrollX } } },
                        ], { useNativeDriver: false })}
                    >
                        {onBoardings.map((item, index) => (
                            <View
                                //center
                                //bottom
                                key={`img-${index}`}
                                style={styles.imageAndTextContainer}
                            >
                                <View
                                    style={{

                                        alignSelf: "center",
                                        marginTop: 70
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: "Poppins-Bold",
                                        fontSize: 24,
                                        fontWeight: "700",
                                        color: "#313131",
                                        textAlign: 'center',
                                        lineHeight: 36
                                    }}
                                    >
                                        {item.title}
                                    </Text>

                                    <Text style={{
                                        fontFamily: "Poppins-Regular",
                                        fontStyle: "normal",
                                        fontSize: 18,
                                        fontWeight: "300",
                                        color: "#313131",
                                        textAlign: 'center',
                                        lineHeight: 27,
                                        marginTop: SIZES.base,

                                    }}
                                    >
                                        {item.description}
                                    </Text>
                                </View>
                                <View style={{ flex: 2, alignItems: 'center', marginTop: 0 }}>
                                    <Image
                                        source={item.img}
                                        resizeMode="contain"
                                        style={{
                                            width: "75%",
                                            height: "75%",
                                        }}
                                    />
                                </View>

                                {/* Button */}

                            </View>
                        ))}
                    </Animated.ScrollView>
                    <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate("TabBarNavigation")

                            navigation.navigate("Login_Screen")
                        }}
                        style={{ alignSelf: "center", backgroundColor: "#fff", width: "70%", height: "6%", justifyContent: "center", borderRadius: 5, marginBottom: 60 }}>
                        <Text style={{ alignSelf: "center" }}>
                            Get Started
                        </Text>
                    </TouchableOpacity>


                </ImageBackground>


            </>
        );
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <View style={styles.dotsContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    });

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 8, SIZES.base],
                        extrapolate: "clamp"
                    });

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: dotSize, height: dotSize, }]}
                        />
                    );
                })}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotsRootContainer}>
                {renderDots()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    imageAndTextContainer: {
        width: SIZES.width
    },
    dotsRootContainer: {
        position: 'absolute',
        bottom: '16%',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.padding / 3,
        marginBottom: SIZES.padding * 3,
        height: SIZES.padding,
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.black,
        marginHorizontal: SIZES.radius / 2
    }
});

export default OnBoarding;