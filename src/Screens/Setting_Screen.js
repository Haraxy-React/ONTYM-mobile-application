import { Alert, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar, Modal, Settings } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { log } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment"
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import { pickImage } from "../Components/getFunction";
import { sendEmail } from "../api/ontym";
import { userCredentilas, ping, updatePsw, updateUser } from "../api/auth";
import { staffUrl } from "../api/ontym";
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";
import { BackHandler } from 'react-native';

import axios from 'axios';
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
// import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker'
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
// import SyncStorage from 'sync-storage';
// import * as Crypto from 'expo-crypto';
// const { scryptSync, randomBytes } = require("crypto");
import Loader from "../../src/Components/loader";

import { logout } from '../api/auth';
import { useSelector, useDispatch } from 'react-redux';
// import BcryptReactNative from 'bcrypt-react-native';
// import bcrypt from 'bcryptjs'
import isaac from "isaac";
import bcrypt from "react-native-bcrypt";

// var bcrypt = require('bcryptjs');
var isBottomSheet = false;

const Setting_Screen = (props) => {
  const [name, setname] = React.useState("")
  const [email, setemail] = React.useState("")
  const [status, setstatus] = React.useState("")
  const [profile, setprofile] = useState('')
  const [imageObj, setImageObj] = useState({});
  const [image, setImage] = useState('');
  const [loader, setLoader] = useState(false)

  const [currentDate, setCurrentDate] = useState('');
  const [bg, setbg] = useState();
  const [successfull, setsuccessfull] = useState(false)
  const dispatch = useDispatch();
  const {
    user
  } = useSelector(state => state.loginReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [openbottomsheet, Setopenbottomsheet] = useState('');


  const Logout = () => {
    // SyncStorage.set('token', 'null');
    // SyncStorage.set('userid', 'null');

    props.navigation.navigate('TabBarNavigation')


    dispatch({
      type: "LOGIN",
      payload: {}
    })
  }

  useEffect(() => {
    console.log("RECENT USER: ", user);
    console.log(user.img);
    setname(user?.userData?.firstName)
    setImage(user?.img)
    setemail(user?.userData?.email)
    // console.log('=======>', SyncStorage.get('userid'));
    // console.log('=======>', SyncStorage.get('token'));
    // let userid = SyncStorage.get('userid')
    // axios.get(`http://192.168.0.108:4000/staff/${SyncStorage.get('userid')}`,
    //   {
    //     headers:
    //       { "Authorization": `Bearer ${SyncStorage.get('token')}` }
    //   }

    // ).then((response) => {
    //   setname(response.data.staff_name)
    //   setemail(response.data.staff_email)
    //   setstatus(response.data.is_active)
    //   setprofile(response.data.staff_image)
    //   console.log("ree", response.data);
    // }).catch((error) => {
    //   console.log(error);
    // })

    // var date = moment()
    //   .utcOffset('+05:30')
    //   .format('MMMM DD/YYYY ');

    // setCurrentDate(date);

  }, []);
  function handleBackButtonClick() {
    // sheetRef.current.close()
    console.log('sheet', isBottomSheet);
    if (isBottomSheet) {
      closesheet()
      return true;
    } else {
      return false;
    }

    // console.log(bg);
    // return true;
    // if (bg) {
    //   setbg(false)
    //   sheetRef.current.snapTo(0)
    // } else {
    //   props.navigation.goBack();
    //   return true;
    // }

  }
  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };

  }, []);
  const closesheet = () => {
    setbg(false)
    sheetRef.current.snapTo(0)
    console.log("herre");
    isBottomSheet = false
  }
  const success = () => {

    setModalVisible(true)
    setsuccessfull(true)
    sheetRef.current.snapTo(2)
  }
  const fail = () => {
    setModalVisible(true)
    setsuccessfull(false)
    sheetRef.current.snapTo(2)
  }
  const opensheet = () => {
    setbg(true)
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

      const newPsw = await bcrypt.hashSync('staff', 10)
      console.log("NEW PSW: ", newPsw);
      const res = await axios.patch(userCredentilas + "/" + '6bae34a8-f4b4-4626-93d1-afceb54c7e0f' + "/user-credentials",
        // {
        //   "to": "laxy@haraxy.in",
        //   "subject": "Password", "6bae34a8-f4b4-4626-93d1-afceb54c7e0f" =
        // psw $2a$12$TZG3V0qdHWHwNqXu.lcRreHe01br1eeyq7ChATeKvK.jeQ0gFlMu. = staff

        //   "html": "<p>You password is : XYZ</p>",
        // }

        {
          "password": newPsw,
          "userId": '6bae34a8-f4b4-4626-93d1-afceb54c7e0f',
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
        // showMessage({
        //   message: "Success",
        //   description: "Your password has been reset successfully!!",
        //   type: "success",

        //   duration: 2850
        // });
        // props.navigation.navigate("TabBarNavigation")

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
      // setLoader(false)
    }
  }

  const updateProfileDetails = async () => {
    let tokenId = user.accessToken;

    let userId = user.userData.id;





    // return;
    setLoader(true)
    try {
      const resUser = await axios.patch(updateUser + "/" + userId,
        // {
        //   "to": "laxy@haraxy.in",
        //   "subject": "Password",
        //   "html": "<p>You password is : XYZ</p>",
        // }

        {
          "firstName": name,

        },

        {
          headers:
            { "Authorization": `Bearer ${tokenId}` }
        });



      if (resUser.status === 200) {
        console.log(resUser.data);
        let userDetails = resUser.data;

        dispatch({
          type: "LOGIN",
          payload: { ...user, userData: { ...user.userData, firstName: name } }
        })


        let res = await axios.patch(staffUrl + "/" + userId,
          // {
          //   "to": "laxy@haraxy.in",
          //   "subject": "Password",
          //   "html": "<p>You password is : XYZ</p>",
          // }

          {
            "staff_name": name,

          },

          {
            headers:
              { "Authorization": `Bearer ${tokenId}` }
          });



        if (typeof imageObj.uri !== "undefined") {

          let blobObj = '';


          const response = await fetch(imageObj.uri)
          blobObj = await response.blob();
          // file = new File([blobSol], filename, { type: "image/jpeg", lastModified: new Date() });

          // console.log("FILE; ", JSON.stringify(file));
          const uploadRes = await uploadFilesOnFirestorage(setLoader, userId, blobObj);
          console.log("UPLO RES FILE::  ", uploadRes);
          // img
          dispatch({
            type: "LOGIN",
            payload: { ...user, img: uploadRes }
          })
          // let imageData = {
          //   comment_image: [{ url: uploadRes }],
          // };
          await axios.patch(`${staffUrl}/${userId}`, {
            staff_image: uploadRes
          },
            {
              headers:
                { "Authorization": `Bearer ${user.accessToken}` }
            }

          );

          await axios.patch(`${updateUser}/${userId}`, {
            profilePhoto: uploadRes
          },
            {
              headers:
                { "Authorization": `Bearer ${user.accessToken}` }
            }

          );
        }
        //   setExportData(exportData);
        success()

        //   tableDispatch(res.data);
      } else {
        //   toast.error(c("no record found"));
      }
    } catch (error) {
      fail()
      console.log("location eerrro: ", error);
      // toast.error(c("error while retrieving the data"));
    } finally {
      // setBackdrop(false);
      setLoader(false)
    }

  }

  const sheetRef = React.useRef(null);
  const renderContent = () => (
    openbottomsheet === "logout" ?
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 20,


        }}
      >

        <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

        <Text style={{ alignSelf: "center", fontWeight: "600", fontSize: 18, marginTop: 40 }}> Logout? </Text>
        <Text style={{ fontWeight: '500', fontSize: 16, alignSelf: "center", color: "#91919f", marginTop: 40 }} > Are You sure do you wanna logout?</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => {

              Setopenbottomsheet('Filter')
            }}
            style={{ backgroundColor: "#EEE5ff", width: "43%", padding: 8, borderRadius: 16, height: 56, justifyContent: "center" }}>
            <Text style={{ color: "#2d9cdb", fontSize: 19, alignSelf: "center", lineHeight: 22 }}> No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Logout()}
            style={{ backgroundColor: "#2d9cdb", width: "43%", padding: 8, borderRadius: 16, height: 56, justifyContent: "center" }}>
            <Text style={{ color: "#fff", fontSize: 19, alignSelf: "center", lineHeight: 22 }}> Yes</Text>
          </TouchableOpacity>
        </View>
      </View>

      :
      openbottomsheet === "Edit_Profile" ?
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingBottom: 30,
            borderRadius: 20,
            height: "100%",
          }}
        >
          <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, marginTop: 15, alignSelf: "center", }} />

          <ScrollView>

            <View style={{ borderColor: "#2d9cdb", borderWidth: 3, width: 90, height: 90, borderRadius: 180 / 2, justifyContent: "center", alignSelf: "center", marginTop: 20 }}>
              <Image resizeMode={"contain"} style={{ width: 82, height: 80, borderRadius: 320, alignSelf: "center" }} source=
                {{ uri: image }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                pickImage(setImageObj,
                  setImage, "",
                  '', '', '')
              }}
              style={{ flexDirection: "row", width: "60%", alignSelf: "center", backgroundColor: "#c4c4c4", opacity: "90%", height: 30, alignItems: "center", justifyContent: "center", marginTop: 20 }}
            >
              <Icon name='camera' style={{ color: "#000", opacity: 0.54 }} size={20} />
              <Text style={{ fontWeight: "400", fontFamily: "Poppins-Regular", fontSize: 16, paddingLeft: 5 }}> Change Photo</Text>
            </TouchableOpacity>
            <TextInput
              mode="outlined"
              label="Name"
              value={name}
              style={{ marginTop: 20 }}
              onChangeText={text => setname(text)}
            />
            <TextInput
              disabled={true}
              mode="outlined"
              label="E-Mail Id."
              value={email}
              style={{ marginTop: 10 }}
              onChangeText={text => setemail(text)}
            />
            <TextInput
              disabled={true}

              mode="outlined"
              label="Status"
              value={'Active'}
              style={{ marginTop: 10 }}
              onChangeText={text => setstatus(text)}
            />
            <TouchableOpacity

              onPress={() => {
                {

                  updateProfileDetails();

                  // name.length === 0 ?

                  //   success()

                  //   : fail()
                }
              }}
              style={{ backgroundColor: "#2d9cdb", width: 135, height: 46, borderRadius: 16, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 15 }}>
              <Text style={{ color: "#fcfcfc", fontSize: 18, fontWeight: "600" }}>
                Submit </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        :

        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,

            height: "100%",
          }}
        >

          <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ borderColor: "#2d9cdb", borderWidth: 3, width: 90, height: 90, borderRadius: 180 / 2, justifyContent: "center" }}>
              <Image resizeMode={"contain"} style={{ width: 82, height: 80, borderRadius: 320, alignSelf: "center" }} source={{ uri: `${image}` }} />
            </View>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 14, color: "#91919f", }}>Username</Text>
              <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 24, color: "#000000", }}>{user?.userData?.firstName}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            Setopenbottomsheet('Edit_Profile')
            sheetRef.current.snapTo(1)
            isBottomSheet = true
          }}

            style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#A6A4A4", paddingBottom: 25 }}>
            <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 10, }}>

              <Image resizeMode={"contain"} style={{ alignSelf: "center", width: 20, height: 20 }} source={require('../Assets/edit_profile_icon.png')} />

              <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 20, color: "#000000", lineHeight: 30, marginLeft: 10 }} >Edit Profile</Text>

            </View>
            <View style={{ justifyContent: "center", marginTop: 20 }}>
              <Icon name='chevron-right' style={{ color: "#000" }} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Setopenbottomsheet('logout')
          }} style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 25 }}>
            <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 13, }}>

              <Image resizeMode={"contain"} style={{ alignSelf: "center", width: 20, height: 20 }} source={require('../Assets/logout.png')} />

              <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 20, color: "#000000", lineHeight: 30, marginLeft: 10 }} >Logout</Text>

            </View>
            <View style={{ justifyContent: "center", marginTop: 20 }}>
              <Icon name='chevron-right' style={{ color: "#000" }} size={20} />
            </View>
          </TouchableOpacity>
        </View>

  );

  const renderItem = ({ item }) => (

    <View style={styles.item}>

      <View style={{ flexDirection: "row" }}>
        <Image resizeMode={"contain"} style={{ width: 60, height: 60, borderRadius: 120 / 2 }} source={item.profile} />
        <View style={{ paddingLeft: 10 }}>
          <Text
            style={{ fontSize: 24, fontWeight: "400", lineHeight: 36, fontFamily: "Poppins-Regular", color: "#000" }}
          >{item.villaname}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b" }} >{item.Area}</Text>
            <Text style={{ fontSize: 16, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b" }}  > . </Text>
            <Text style={{ fontSize: 16, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b" }}  >{item.purpose}</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 5 }} >
        <Text style={{ fontSize: 16, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b", alignSelf: "flex-end" }} >{item.place}</Text>
        <Image resizeMode={"contain"} style={{ width: 30, height: 30, borderRadius: 120 / 2, alignSelf: "flex-end" }} source={item.profile} />
      </View>
      <View style={{ backgroundColor: item.color, height: 21, width: 6, position: "absolute", right: 0, top: 40 }}>

      </View>
      {/* <Text >{item.Area}</Text> */}
    </View>
  );

  const callApi = async () => {
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
      // const res = await axios.post(sendEmail,
      //   {
      //     "to": "laxy@haraxy.in",
      //     "subject": "Password",
      //     "html": "<p>You password is : XYZ</p>",
      //   }
      //   ,
      //   {
      //     headers:
      //       { "Authorization": `Bearer ${tokenId}` }
      //   }

      // users/{id}/      
      // );
      const newPsw = await bcrypt.hashSync('staff@#123', 10)
      console.log("NEW PSW: ", newPsw);
      const res = await axios.patch(userCredentilas + "/" + userId + "/user-credentials",
        // {
        //   "to": "laxy@haraxy.in",
        //   "subject": "Password",
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
  const logoutAlert = () =>
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => Logout()
        }
      ]
    );

  return (
    <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
      <Loader show={loader} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}

      >


        <View style={styles.centeredView}>

          {successfull ?
            <View style={styles.modalView}>
              <Image resizeMode={"contain"} style={{ width: 120, height: 120 }} source={require('../Assets/success.png')} />
              <Text style={{ fontSize: 22, fontWeight: "500", fontFamily: "Poppins-Regular", lineHeight: 32, alignSelf: "center", marginTop: 40 }}>Success!</Text>
              <Text style={{ fontSize: 15, fontWeight: "400", fontFamily: "Poppins-Regular", lineHeight: 20, alignSelf: "center", marginTop: 5 }} >Your Profile is updateed.</Text>

              <TouchableOpacity
                style={{ backgroundColor: "#2d9cdb", width: "100%", padding: 8, borderRadius: 4, height: 40, justifyContent: "center", marginTop: 50 }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  Setopenbottomsheet('Filter')
                  sheetRef.current.snapTo(0)
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, alignSelf: "center", lineHeight: 16 }}> GOT IT</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={styles.modalView}>
              <Image resizeMode={"contain"} style={{ width: 120, height: 120 }} source={require('../Assets/failure.png')} />
              <Text style={{ fontSize: 22, fontWeight: "500", fontFamily: "Poppins-Regular", lineHeight: 32, alignSelf: "center", marginTop: 40 }}>Sorry!</Text>
              <Text style={{ fontSize: 15, fontWeight: "400", fontFamily: "Poppins-Regular", lineHeight: 20, alignSelf: "center", marginTop: 5, textAlign: "center" }} >Ask your admin to change the E-mail Id.</Text>

              <TouchableOpacity
                style={{ backgroundColor: "#2d9cdb", width: "100%", padding: 8, borderRadius: 4, height: 40, justifyContent: "center", marginTop: 40 }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  Setopenbottomsheet('Filter')
                  sheetRef.current.snapTo(0)
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, alignSelf: "center", lineHeight: 16 }}> GOT IT</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </Modal>
      <View style={{ backgroundColor: "#000000bf", }}>
        <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
          <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }} numberOfLines={1}>Hello, {name}! </Text>
          {/* <TouchableOpacity onPress={() => console.log("asd")}>
            <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
          </TouchableOpacity> */}

        </View>

        {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={

            (({ highlighted }) => (
              <View
                style={{ height: 1, width: "90%", backgroundColor: "#A6a4a4", alignSelf: "center" }}
              />
            ))
          }
        /> */}


        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,

            height: "100%",
          }}
        >

          {/* <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} /> */}

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ borderColor: "#2d9cdb", borderWidth: 3, width: 90, height: 90, borderRadius: 180 / 2, justifyContent: "center" }}>
              <Image resizeMode={"contain"} style={{ width: 82, height: 80, borderRadius: 320, alignSelf: "center" }} source={{ uri: image }} />
            </View>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 14, color: "#91919f", }}>Username</Text>
              <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 24, color: "#000000", }} numberOfLines={1}>{
                user?.userData?.firstName

              }</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            Setopenbottomsheet('Edit_Profile')
            sheetRef.current.snapTo(1)
            isBottomSheet = true
          }}

            style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#A6A4A4", paddingBottom: 25 }}>
            <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 10, }}>

              <Image resizeMode={"contain"} style={{ alignSelf: "center", width: 20, height: 20 }} source={require('../Assets/edit_profile_icon.png')} />

              <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 20, color: "#000000", lineHeight: 30, marginLeft: 10 }} >Edit Profile</Text>

            </View>
            <View style={{ justifyContent: "center", marginTop: 20 }}>
              <Icon name='chevron-right' style={{ color: "#000" }} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            logoutAlert()
            // Setopenbottomsheet('logout')
            // sheetRef.current.snapTo(1)
            // isBottomSheet = true

          }} style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 25 }}>
            <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 13, }}>

              <Image resizeMode={"contain"} style={{ alignSelf: "center", width: 20, height: 20 }} source={require('../Assets/logout.png')} />

              <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 20, color: "#000000", lineHeight: 30, marginLeft: 10 }} >Logout</Text>

            </View>

            <View style={{ justifyContent: "center", marginTop: 20 }}>
              <Icon name='chevron-right' style={{ color: "#000" }} size={20} />
            </View>
          </TouchableOpacity>
          {/* <View>
            <Button
              onPress={() => {
                resetPsw();
              }}
            >Send email</Button>
          </View> */}
        </View>

      </View>


      <BottomSheet
        style={{
          backgroundColor: "#000000bf", opacity: 0.75
        }}
        ref={sheetRef}
        snapPoints={[0, "70%", "38%"]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
        onCloseEnd={closesheet}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

export default Setting_Screen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff"
  },
  centeredView: {

    alignItems: "center",
    marginTop: "36%",
    justifyContent: "center"
  },
  modalView: {

    margin: 20,
    height: 370,
    width: 343,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
  ,
  item: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"

  },
  title: {
    fontSize: 32,
  },
});
