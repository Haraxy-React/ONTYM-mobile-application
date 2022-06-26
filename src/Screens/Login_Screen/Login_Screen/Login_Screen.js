import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Loader from "../../../Components/loader";
// import SyncStorage from 'sync-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import { login, refresh } from "../../../api/auth"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Hoshi } from 'react-native-textinput-effects';
const Login_Screen = (props) => {
  const [Password, setPassword] = useState('')
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const dataReducer = useSelector(state => state.loginReducer);

  const [Email, setEmail] = useState('')
  const [displayLoader, setDisplayLoader] = useState(false);
  const reg = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
  );
  const login = async (email) => {
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");

    }
    else if (Password === '') {
      showMessage({
        message: "Login Failed!!",
        description: "Password is required!",
        type: "danger",

        duration: 2850
      });
    }
    else {

      setLoader(true)
      console.log("LOG URL: ", Email, Password);
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
      ).then(async function (response) {
        console.log('response --->', response);

        // AsyncStorage.setItem('any_key_here', response.data);

        // SyncStorage.set('token', response.data.accessToken);
        // SyncStorage.set('userid', response.data);
        dispatch({
          type: "LOGIN",
          payload: response.data
        })
        const counter = dataReducer.count;


        console.log(counter);

        // const result = SyncStorage.get('token');
        // console.log("RESULT: ", result);
        // props.navigation.navigate("TabBarNavigation")

        const firstLaunch = await AsyncStorage.getItem('count');
        console.log("CPPP: ", firstLaunch);

        if (firstLaunch !== null) {
          props.navigation.navigate("TabBarNavigation")
        } else {

          await AsyncStorage.setItem('count', '1')
          props.navigation.navigate("Password_Screen")
        }


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
            description: typeof error.response.data.error.message === 'undefined' ? error : error.response.data.error.message,
            type: "danger",

            duration: 2850
          });
          setLoader(false)
        });



    }
  }
  useEffect(async () => {
    console.log('ASYNC COUNT', await AsyncStorage.getItem('count')
    );
    // setDisplayLoader(true)
    // console.log('=======>', SyncStorage.get('userid') + SyncStorage.get('token'));
    // console.log("TOKEN: ", SyncStorage);

    // SyncStorage.set('foo', 'bar');

    // const result = SyncStorage.get('userid');
    // console.log(result);
  }, []);

  return (

    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}>
      <Loader show={loader} />

      <Image resizeMode={"contain"} style={{ width: "80%", height: "30%", marginTop: 50 }} source={require('../../../Assets/logo.png')} />

      <Text style={{ color: "#2D9CDB", fontWeight: "700", fontSize: 24, marginTop: 40 }}>Login! </Text>



      <Hoshi
        style={{ width: "80%", alignSelf: "center", marginTop: 20 }}
        label={'Email ID'}
        labelStyle={{ marginLeft: -5, marginTop: 5 }}
        borderColor={'#ABB4BD'}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={Email}
      />
      <Hoshi
        style={{ width: "80%", alignSelf: "center", marginTop: 10 }}
        label={'Password'}
        labelStyle={{ marginLeft: -5, marginTop: 5 }}
        borderColor={'#ABB4BD'}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={Password}
      />
      <TouchableOpacity
        onPress={() => login(Email)}
        style={Email.length !== 0 ? { alignSelf: "center", backgroundColor: "#2D9CDB", width: "80%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 50 } : { alignSelf: "center", backgroundColor: "#D9DDE2", width: "80%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 50 }}>
        <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login_Screen;
