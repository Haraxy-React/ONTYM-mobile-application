import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar, Modal, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { log } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment"
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";
import { useSelector, useDispatch } from 'react-redux';
import { PreCheckAuditQueBottomSheet } from "../Components/Audit";
import { BackHandler } from 'react-native';

import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import { preCheckAuditQue, getPreCheckAuditList, FileUpload } from "../Components/getFunction";
import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime } from "../Components/datetimeFormat";
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore } from "../Components/FirebaseSetup";

import { collection, addDoc, doc, runTransaction, setDoc, updateDoc } from "firebase/firestore";
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
import Loader from "../../src/Components/loader";
import momentTZ from "moment-timezone";
import axios from "axios";
import { audit } from "../api/ontym";
// import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker'
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import SwitchToggle from 'react-native-switch-toggle';
import { showMessage, hideMessage } from "react-native-flash-message";
import { EmptyView } from "../Components/EmptyView";
var isBottomSheet = false;

const Pre_check = (props) => {
  const propertyId = props.route.params.property_id;
  const [imgUrl, setImgUrl] = useState([]);
  const [filterDate, setFilterDate] = useState(moment(new Date()).format(dbDate));
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [filterAudit, setFilterAudit] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [updateObj, setUpdateObj] = useState({});
  const [updatedImgUrl, setupdatedImgUrl] = useState([]);
  const [loader, setLoader] = useState(false);
  const [displaymode, setMode] = useState('date');
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [imgObj, setImgObj] = useState([]);
  const [text, setText] = React.useState("")
  const [auditList, setAuditList] = useState([])
  const [queList, setQueList] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bg, setbg] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    user
  } = useSelector(state => state.loginReducer);
  const [openbottomsheet, Setopenbottomsheet] = useState('');
  const [comment, setComment] = useState('');
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

  const uploadImage = async (id, auditImg) => {
    const type = auditImg.type;
    const source = { uri: auditImg.fileSize, name: auditImg.fileName, type };

    try {

      // const formData = new FormData();
      // formData.append("file", source);
      // formData.append("id", id);
      // formData.append("table", "audit");
      // formData.append("urlfield", "image");
      // formData.append("filenamefield", "image");
      // formData.append("path", `audit_image/${id}`);
      // formData.append("filename", auditImg.fileName);
      // const res = await FileUpload(formData, user.accessToken);

      const url = await uploadFilesOnFirestorage(setLoader, id, auditImg);

    } catch (error) {
      console.log("UPLOAD : ", error);
    }
  };
  useEffect(() => {
    setLoader(true)
    let tokenId = user.accessToken;
    let userId = user.userData.id
    preCheckAuditQue(setQueList, tokenId
    ).then(function (obj) {
      console.log("HERE end ", obj);
      setLoader(false)
    })
    console.log("ID ", filterDate);
    getPreCheckAuditList(setAuditList, tokenId, userId, propertyId, filterDate)
    setCurrentDate("21-12-2021");
  }, []);

  const resetVal = () => {
    setComment('')
    setImgObj([])
    setImgUrl([])
    let tokenId = user.accessToken;

    // setUpdateObj({})
    setUpdate(false)
    // preCheckAuditQue(setQueList, tokenId
    // )
    // getPreCheckAuditList(setAuditList, user.accessToken, propertyId)
  }
  const submitAuditToFirebase = (data) => {
    setDoc(doc(firestore, "audit_list", data.id), {
      ...data, head_list: user.head_list

    });
    console.log('SUBMIT TO FIREBASE:');
  }

  const convertToBlobObjUri = async (uri) => {
    return new Promise(function (resolve, reject) {

      const response = fetch(uri);
      let obj = response.blob();
      resolve(obj);
    });
  }
  const addData = async () => {
    let file = ''
    let filename = '';
    let blobObj = [];

    let checked = 0;
    let unChecked = 0;

    queList.map((element, i) => {
      if (element.checked) {
        checked = checked + 1;
      } else {
        unChecked = unChecked + 1;
      }
    });

    if (checked < 10) {
      checked = 0 + checked;
    }

    if (unChecked < 10) {
      unChecked = 0 + unChecked;
    }
    setbg(false)
    sheetRef.current.snapTo(0)
    setLoader(true);
    try {
      // let details = props.selectMaintCatDetails;
      // console.log("details:user", props.user);
      // var catID = details.id;
      var updatedDate = new Date();
      updatedDate = momentTZ.tz(updatedDate, "Asia/Taipei");
      let commentArray = [];
      if (comment !== "") {
        commentArray = [{ comment: comment, created_by: user.userData.id, created_date: new Date() }];
      }
      const obj = {
        audit_type: "0",
        questions: queList,
        created_by: user.userData.id,
        updated_by: user.userData.id,
        created_date: updatedDate,
        updated_date: updatedDate,
        comment: commentArray,
        image: [],
        property_id: propertyId,
        area_of_house_id: '',
        user_id: user.userData.user_id,
        user_details: JSON.stringify({
          user_name: user.userData.firstName,
          img: user.img,
        }),
        head_list: user.head_list,
        tenant_id: user.currentTenantId,
        tenant_template_id: user.currentTenantTemplateId,
        check_list: checked + "-Yes\n" + unChecked + "-No",
      };
      console.log(obj);
      const res = await axios.post(audit, {
        ...obj,
      }, {
        headers:
        {
          "Authorization": `Bearer ${user.accessToken}`
        }
      }
      );

      if (res.status === 200) {
        // log({
        //   prev_text: "Maintenance audit",
        //   log_text: "- Audit added",
        //   page: "Audit",
        //   action: logAction.add,
        //   table_id: res.data.id,
        //   created_by: props.user.id,
        //   tenant_id: props.currentTenantId,
        //   tenant_template_id: props.currentTenantTemplateId,
        // });
        let imageData;
        // queList.map(async (object, index) => {
        //   let file = object.imgobj;
        //   console.log(file);
        if (imgObj.length > 0) {
          // const uploadRes = await uploadImage(res.data.id, blobObj, filename);
          // console.log("UPLO RES ::  ", uploadRes);
          setLoader(true)
          uploadAllImgs(res.data, blobObj).then(async (array) => {
            console.log('THEN INNER ', array);

            imageData = {
              image: array,
            };
            await axios.patch(`${audit}/${res.data.id}`, {
              ...imageData,
            },
              {
                headers:
                  { "Authorization": `Bearer ${user.accessToken}` }
              }

            );
            showMessage({
              message: "Audit Created!!",
              type: "success",

              duration: 2850
            });
            submitAuditToFirebase(res.data)
            getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)

          }).catch((e) => {
            console.log(e);
          })


        }
        else {
          showMessage({
            message: "Audit Created!!",
            type: "success",

            duration: 2850
          });
          submitAuditToFirebase(res.data)

          // getData();
          // getCount();
          // setStateData({ type: "RESET_STATE" });
          // dispatch({ type: "close" });
          resetVal()
          getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)

        }
        // })

        // else


        return true;
      }
      // toast.error(c("something went wrong"));

      return true;
    } catch (error) {
      setLoader(false)
      console.log(error);
      showMessage({
        message: "Failed!!",
        description: "something went wrong",
        type: "danger",
        duration: 2850
      });
      // toast.error(c("something went wrong"));
    } finally {
      setLoader(false)
    }
  };
  const submitAudit = () => {
    if (isUpdate) {
      updateData()
    } else {
      addData()
    }

  }
  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <EmptyView />
    );
  };

  const updateData = async () => {

    let blobObj = [];
    console.log(imgObj);
    imgObj.map(async (data) => {
      fetch(data.obj.uri).then((res) => {
        let obj = res.blob();
        console.log('obj: ', obj);
        // console.log('DATA BLOB:  ', data.blob);
      }).catch((e) => {

      })

      // uploadFilesOnFirestorage(setLoader, updateObj.id + "_" + new Date() + "_" + count, obj).then((url) => {
      //   console.log("UPLO RES FILE::  ", url);
      //   count++;
      //   console.log('INNER ALL IMGS: count ', count);
      //   array.push({
      //     created_date: new Date(),
      //     created_by: user.userData.id,
      //     url: url
      //   })
      //   if (count === blobArrayObj.length) {
      //     console.log('ARRAY COMPLETE: ', array);
      //     resolve(array)
      //   } else {

      //   }

      // })
    })
    // return;
    if (imgObj.length > 0) {
      blobObj = await Promise.all(

        imgObj.map(async (data, index) => {
          const response = await fetch(data.obj.uri)
          let obj = await response.blob();
          return ({
            created_date: new Date(),
            blob: obj
          })

        })
      );
    }
    // return;
    setLoader(true)
    let checked = 0;
    let unChecked = 0;
    setbg(false)
    sheetRef.current.snapTo(0)
    updateObj.questions.map((element, i) => {
      if (element.checked) {
        checked += 1;
      } else {
        unChecked += 1;
      }
    });

    if (checked < 10) {
      checked = 0 + checked;
    }

    if (unChecked < 10) {
      unChecked = 0 + unChecked;
    }
    setbg(false)
    sheetRef.current.snapTo(0)
    var updatedDate = new Date();
    updatedDate = momentTZ.tz(updatedDate, "Asia/Taipei");

    if (comment !== "") {
      updateObj.comment = [...updateObj.comment, { comment }];
    }
    // updated_by: props.user.id,
    updateObj.updated_date = updatedDate;
    updateObj.updated_by = user.userData.id;
    updateObj.check_list = `${checked} -Yes\n${unChecked} -No`;
    updateObj.image = updatedImgUrl;
    if (updateObj.user_id === null) {
      updateObj.user_id = user.userData.id
    }

    // setBackdrop(true);
    try {
      // add
      const res = await axios.patch(`${audit}/${updateObj.id}`, {
        ...updateObj,
        head_list: user.head_list,

        tenant_id: user.currentTenantId,
        tenant_template_id: user.currentTenantTemplateId,
      },
        {
          headers:
            { "Authorization": `Bearer ${user.accessToken}` }
        }


      );

      if (res.status === 204) {
        // log({
        //   prev_text: "Pre check audit",
        //   log_text: "- Audit updated",
        //   page: "Audit",
        //   action: logAction.add,
        //   table_id: props.updateData.id,
        //   created_by: props.user.id,
        //   tenant_id: props.currentTenantId,
        //   tenant_template_id: props.currentTenantTemplateId,
        // });
        console.log("UPDATE DATA: ", res.data);
        let imageData;
        if (imgObj.length > 0) {
          console.log('blob LEN: ', blobObj.length);
          let count = 0;

          // const uploadRes = await uploadImage(res.data.id, blobObj, filename);
          // console.log("UPLO RES ::  ", uploadRes);

          console.log('count: ', count);
          console.log('length: ', blobObj.length);
          setLoader(true)
          uploadAllImgs(updateObj, blobObj).then(async (array) => {
            console.log('THEN INNER ', array);



            imageData = {
              image: [...updatedImgUrl, ...array],
            };

            console.log('IMG DATA: ', imageData);

            await axios.patch(`${audit}/${updateObj.id}`, {
              ...imageData,
            },
              {
                headers:
                  { "Authorization": `Bearer ${user.accessToken}` }
              }

            );
            showMessage({
              message: "Audit Updated!!",
              type: "success",

              duration: 2850
            });
            // console.log(updateObj);
            updateObj.updated_date = new Date();
            console.log(updateObj);
            submitAuditToFirebase(updateObj)

          }).catch((e) => {
            console.log(e);
          })

        } else {
          showMessage({
            message: "Audit updated!!",
            type: "success",

            duration: 2850
          });
          updateObj.updated_date = new Date();
          submitAuditToFirebase(updateObj)
          console.log(updateObj);
          resetVal()
          preCheckAuditQue(setQueList, user.accessToken
          )
          getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)
        }
        // if (file instanceof File) {
        //   const uploadRes = await uploadImage(props.updateData.id, file);
        //   imageData = {
        //     image: [...props.updateData.image, { url: uploadRes?.data?.urlfield }],
        //   };
        //   await axios.patch(`${audit}/${props.updateData.id}`, {
        //     ...imageData,
        //   });
        // }

        return true;
      }
      // toast.error(c("something went wrong"));
      return true;
    } catch (error) {
      console.log(error.response.data);
      showMessage({
        message: "Failed!!",
        description: "something went wrong",
        type: "danger",
        duration: 2850
      });
      // toast.error(c("something went wrong"));
    } finally {
      setLoader(false);
    }
  };

  const uploadAllImgs = async (updateObj, blobArrayObj) => {
    let count = 0;
    let array = []
    // await Promise.all(
    console.log('BLOB ARRAY: ', JSON.stringify(blobArrayObj));
    return new Promise(function (resolve, reject) {
      imgObj.map(async (data) => {
        setLoader(true)
        // convertToBlobObjUri(data.obj.uri).then((res) => {



        uploadFilesOnFirestorage(setLoader, updateObj.id + "_" + new Date() + "_" + count, data.blob).then((url) => {
          console.log("UPLO RES FILE::  ", url);
          count++;
          console.log('INNER ALL IMGS: count ', count);
          array.push({
            created_date: new Date(),
            created_by: user.userData.id,
            url: url
          })
          if (count === imgObj.length) {
            console.log('ARRAY COMPLETE: ', array);
            resolve(array)
          } else {

          }

        })
        // })

      })

    })

    // )

  }
  const opensheet = () => {
    setbg(true)
    isBottomSheet = true
  }
  const closesheet = () => {
    isBottomSheet = false
    setbg(false)
    sheetRef.current.snapTo(0)
    resetVal()

  }
  const renderContent = () => (
    openbottomsheet === "auditQue" ?
      // console.log("audit:  ", updateObj)
      // <PreCheckAuditQue/>
      <PreCheckAuditQueBottomSheet queList={queList}
        setQueList={setQueList}
        onPress={submitAudit}
        setComment={setComment}
        comment={comment}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
        imgObj={imgObj}
        setImgObj={setImgObj}
        isUpdate={isUpdate}
        updateObj={updateObj}
        setUpdateObj={setUpdateObj}

        updatedImgUrl={updatedImgUrl}
        setupdatedImgUrl={setupdatedImgUrl}

      />

      :
      openbottomsheet === "Addtask" ?
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,

            height: "100%",
          }}>
          <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

          <ScrollView>







          </ScrollView>
        </View>

        :
        openbottomsheet === "Filter" ?
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,

              height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />


          </View> :
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,

              height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />


          </View>


  );

  const sheetRef = React.useRef(null);
  const displayCheckList = (text) => {
    if (text === null) {
      return "N/A";
    }

    console.log(text.split("\n"));

    // return text.split("\n").reduce(function (arr, line) {

    //   // return <View>  <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-SemiBold", color: "lightgreen", marginLeft: 10 }} >{arr[0]}</Text>
    //   //   <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-SemiBold", color: "#9b9b9b" }}  > | </Text>
    //   //   <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-SemiBold", color: "red" }}  >{arr[1]}</Text> </View>

    //   console.log(arr.concat);
    //   return arr.concat(line);
    // }, []);
  };
  const renderItem = ({ item }) => (

    <TouchableOpacity onPress={() => {
      setUpdate(true)
      setUpdateObj(item)
      Setopenbottomsheet('auditQue')
      setbg(true)
      sheetRef.current.snapTo(2)
      isBottomSheet = true
      console.log("udap ", item);
      setImgUrl([...item.image])
      setupdatedImgUrl([...item.image])
    }} style={styles.item}>

      <View style={{ flexDirection: "row" }}>
        <Icon name='calendar-range' style={{ color: "#2d9cdb", marginTop: 10 }} size={30} />
        <View style={{ paddingLeft: 20 }}>
          <Text
            style={{ fontSize: 18, fontWeight: "600", lineHeight: 27, fontFamily: "Poppins-SemiBold", color: "#000" }}
          >
            {/* {item.created_date} */}
            {moment(item.created_date).format(dbDate)}

          </Text>
          <View style={{ flexDirection: "row" }}>
            <Image resizeMode={"contain"} style={{ width: 25, height: 25, borderRadius: 100 / 2, alignSelf: "flex-end" }} source={

              {
                uri: item?.user_details === null
                  ? "https://firebasestorage.googleapis.com/v0/b/tenx-10.appspot.com/o/static%2F10x-default.png?alt=media&token=86380fbe-8902-41a8-96ee-f9cc1408b9a0"
                  : JSON.parse(item?.user_details)?.img
              }

            } />
            <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-SemiBold", color: "lightgreen", marginLeft: 10 }} >{item.check_list !== null ? item.check_list.split("\n")[0] : "N/A"}</Text>
            <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-SemiBold", color: "#9b9b9b" }}  > | </Text>
            <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-SemiBold", color: "red" }}  >{item.check_list !== null ? item.check_list.split("\n")[1] : "N/A"}</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 5 }} >
        <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-Regular", color: "#9b9b9b", alignSelf: "flex-end", marginTop: 20 }} >
          {/* {item.place} */}
          {moment(item.created_date).format(dbTime)}

        </Text>

      </View>

      {/* <Text >{item.Area}</Text> */}
    </TouchableOpacity>


  );



  const emptyView = () => {
    showMessage({
      message: "Data not found!!",
      type: "danger",
      duration: 2850
    });
  }
  return (
    <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
      <Loader show={loader} />

      <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
          <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Pre Check Audit </Text>
          {/* <TouchableOpacity onPress={() => console.log("asd")}>
            <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
          </TouchableOpacity> */}

        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 25, alignContent: "center", paddingVertical: 15, borderBottomWidth: 1, width: "97%", alignSelf: "center" }}>
          <TouchableOpacity onPress={() => {
            // Setopenbottomsheet('Filter')
            // setbg(true)
            // sheetRef.current.snapTo(1)
          }}>
            <Image resizeMode={"contain"} style={{ width: 20, height: 20 }} source={require('../Assets/Filter.png')} />

          </TouchableOpacity>
          <View style={{
            paddingHorizontal: 5, alignContent: "center", alignSelf: "center"
          }}>

            {showDatePicker ?

              <DateTimePicker
                testID="dateTimePicker"
                value={datePickerDate}
                mode={displaymode}
                is24Hour={true}

                display="default"
                onChange={(event, selectedValue) => {
                  setShowDatePicker(Platform.OS === 'ios')
                  setLoader(true)
                  // setShowCheckInDate(false)
                  setDatePickerDate(selectedValue)
                  setFilterAudit(true);
                  setFilterDate(moment(selectedValue).format(dbDate));
                  getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, moment(selectedValue).format(dbDate)).then(function (obj) {
                    console.log("HERE end ", obj);
                    setLoader(false)
                  })
                  setShowDatePicker(Platform.OS === 'ios')


                }} /> : null
            }
            {/* <DateTimePicker
              testID="dateTimePicker"
              value={datePickerDate}
              mode={displaymode}
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                console.log(date);
                setDatePickerDate(date)
                setFilterAudit(true);
                setFilterDate(moment(date).format(dbDate));
                getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, moment(date).format(dbDate))

              }}
            /> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker(true)

            }}
          >
            <View style={{
              flexDirection: "row"
            }}>
              <Text >Date:
          {moment(datePickerDate).format(dbDate)}

              </Text>
              <Icon onPress={() => {

              }} name='calendar-range' style={{ color: "#000", marginTop: 3 }} size={16} />
            </View></TouchableOpacity>

        </View >

        <FlatList
          style={{
            marginBottom: 150,
          }}
          data={

            auditList
          }
          // data={auditList}

          ListEmptyComponent={EmptyListMessage}

          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={

            (({ highlighted }) => (
              <View
                style={{ height: 1, width: "95%", backgroundColor: "#A6a4a4", alignSelf: "center" }}
              />
            ))
          }


        />

      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("asdasS");
          Setopenbottomsheet('auditQue')
          setbg(true)
          sheetRef.current.snapTo(2)
          isBottomSheet = true
        }}
        style={{ borderWidth: 0.5, borderRadius: 25, height: 50, width: 50, alignSelf: "center", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 20, right: 20, backgroundColor: "#fff" }}>
        <Icon name='plus' style={{ color: "#000" }} size={50} />
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, "81%", "81%"]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
        onCloseEnd={closesheet}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

export default Pre_check;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff"
  },
  centeredView: {

    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
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

