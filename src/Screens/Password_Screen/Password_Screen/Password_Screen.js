import { View, Text, TouchableOpacity, Keyboard, ScrollView, SafeAreaView, Image, StyleSheet, StatusBar, KeyboardAvoidingView, As } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Hoshi } from 'react-native-textinput-effects';
import { login, refresh, userCredentilas } from "../../../api/auth"
import Constants from "expo-constants"
// import SyncStorage from 'sync-storage';

import bcrypt from "react-native-bcrypt";

import Loader from "../../../Components/loader";
import { showMessage, hideMessage } from "react-native-flash-message";

import { useSelector, useDispatch } from 'react-redux';
// import { } from "../../../../redux/actions";


const Password_Screen = (props) => {
  const { manifest } = Constants;
  const [Password, setPassword] = useState('')
  const [loader, setLoader] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // const [Email, setEmail] = useState(props.route.params.Email)
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch();
  const {
    user
  } = useSelector(state => state.loginReducer);
  const dataReducer = useSelector(state => state.loginReducer);

  const submit = () => {
    setLoader(true)
    // console.log("LOG URL: ", Email, Password);
    // console.log("URL: ", login);


    axios.post(`${refresh}`, {
      email: Email,
      password: Password,
    },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      },
    ).then(function (response) {
      console.log('response --->', response);

      // AsyncStorage.setItem('any_key_here', response.data);

      // SyncStorage.set('token', response.data.accessToken);
      // SyncStorage.set('userid', response.data);
      dispatch({
        type: "LOGIN",
        payload: response.data
      })
      // const result = SyncStorage.get('token');
      // console.log("RESULT: ", result);
      props.navigation.navigate("TabBarNavigation")
      setLoader(false)
      showMessage({
        message: "Login",
        description: "Login Successful!!",
        type: "success",

        duration: 2850
      });
      // AsyncStorage.getItem('any_key_here').then(
      //   (value) => {

      //     console.log("VALUE ASYNC: ", value);
      //   }
      //   //AsyncStorage returns a promise so adding a callback to get the value
      //   // setGetValue(value)
      //   //Setting the value in Text
      // );

    })
      .catch(function (error) {
        console.log(error);
        showMessage({
          message: "Login Failed!!",
          description: error.response.data.error.message,
          type: "danger",

          duration: 2850
        });
        setLoader(false)
      });



    // axios
    // .post(
    //   login,
    //   { ...data },
    //   {
    //     withCredentials: true,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Credentials": true,
    //     },
    //   },
    // )

    // .then(async (res) => {
    //   if (res.status === 200) {
    //     await dispatch(authSuccess(res));
    //   }
    // })
    // .catch((error) => {
    //   if (error?.response?.data?.error?.message) {
    //     dispatch(authFail(error.response.data.error.message));
    //   } else if (error?.message === "Network Error") {
    //     dispatch(authFail(error?.message));
    //   } else {
    //     dispatch(authFail("Something went wrong!"));
    //   }
    // });
  }

  const resetPsw = async () => {
    setLoader(true)
    let tokenId = user.accessToken;
    let userId = user.userData.id;

    // var buf = Crypto.randomBytes(16);
    // console.log(buf);


    // bcrypt.hash('staff', 12).then(hash => {
    //   console.log(hash)
    // });

    // Store hash in your password DB.
    // console.log('HASH; ', salt);
    // later

    // return;
    try {

      const newPsw = await bcrypt.hashSync(Password, 10)
      console.log("NEW PSW: ", newPsw);
      const res = await axios.patch(userCredentilas + "/" + userId + "/user-credentials",
        // {
        //   "to": "laxy@haraxy.in",
        //   "subject": "Password", "6bae34a8-f4b4-4626-93d1-afceb54c7e0f" =
        // psw $2a$12$TZG3V0qdHWHwNqXu.lcRreHe01br1eeyq7ChATeKvK.jeQ0gFlMu. = staff

        //   "html": "<p>You password is : XYZ</p>",
        // }

        {
          "password": newPsw,
          "userId": userId,
        },

        {
          headers:
            { "Authorization": `Bearer ${tokenId}` }
        });


      // );
      // const res = await axios.post(updatePsw,
      //   // {
      //   //   "to": "laxy@haraxy.in",
      //   //   "subject": "Password",
      //   //   "html": "<p>You password is : XYZ</p>",
      //   // }

      //   {
      //     "password": newPsw,
      //     "userId": userId,
      //   },

      //   {
      //     headers:
      //       { "Authorization": `Bearer ${tokenId}` }
      //   }


      // );


      if (res.status === 200) {
        if (!res.data.length) {
          // toast.error(c("no record found"));
        }
        showMessage({
          message: "Success",
          description: "Your password has been reset successfully!!",
          type: "success",

          duration: 2850
        });
        props.navigation.navigate("TabBarNavigation")

        //   setExportData(exportData);
        console.log("RES DATAA: ", res.data);
        //   tableDispatch(res.data);
      } else {
        //   toast.error(c("no record found"));
      }
    } catch (error) {
      console.log("location eerrro: ", error);
      // toast.error(c("error while retrieving the data"));
    } finally {
      // setBackdrop(false);
      setLoader(false)
    }
  }

  useEffect(() => {
    // const count = dataReducer.count;
    // console.log(count);
    // dispatch({
    //   type: "FIRSTLAUNCH",
    //   payload: 1
    // })

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);



  return (

    <SafeAreaView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} >
      <Loader show={loader} />
      <ScrollView contentContainerStyle={isKeyboardVisible ? { backgroundColor: "#fff", height: "150%" } : { backgroundColor: "#fff", flex: 1 }} >
        <View style={{ alignItems: "center" }}>
          <Image resizeMode={"contain"} style={{ width: "80%", height: "30%", marginTop: 50 }} source={require('../../../Assets/logo.png')} />
          <View style={{ alignItems: "center", flexWrap: "wrap" }}>
            <Text style={{ color: "#2D9CDB", fontWeight: "700", fontSize: 24, marginTop: 40 }}>Reset Password! </Text>
            <Text style={{ color: "#000000", fontWeight: "400", fontSize: 14, textAlign: "center" }}>Please enter your new password and confirm
            the password.</Text>

          </View>
          {/* <Image resizeMode={"contain"} style={{ width: "40%", height: 50, }} source={require('../../../Assets/Ekostay-logo.png')} /> */}

          <Hoshi
            style={{ width: "80%", alignSelf: "center", marginTop: 10 }}
            label={'New Password'}
            labelStyle={{ marginLeft: -5, marginTop: 5 }}
            borderColor={'#ABB4BD'}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={Password}
          />
          <Hoshi
            style={{ width: "80%", alignSelf: "center", }}
            label={'Confirm New Password'}
            labelStyle={{ marginLeft: -5, marginTop: 5 }}
            borderColor={'#ABB4BD'}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            value={ConfirmPassword}
          />



          <TouchableOpacity
            onPress={() => resetPsw()}
            disabled={Password.length !== 0 && Password === ConfirmPassword ? false : true}

            style={Password.length !== 0 && Password === ConfirmPassword ? { alignSelf: "center", backgroundColor: "#2D9CDB", width: "80%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 50 } : { alignSelf: "center", backgroundColor: "#D9DDE2", width: "80%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 50 }}>
            <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
              Reset Password
                </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("TabBarNavigation")

            }
          >
            <Text style={{ color: "#2D9CDB", fontSize: 14, fontWeight: "400", marginTop: 30 }}> Skip? </Text>
          </TouchableOpacity>



        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Password_Screen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff"
  },
  scrollView: {
    alignContent: "center",
    backgroundColor: "pink"
  },
  text: {
    fontSize: 42,
  },
});
