import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar, Modal, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Animated from 'react-native-reanimated';
// import BottomSheet from 'react-native-bottomsheet-reanimated';

import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment"
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";
import { BackHandler } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';

import { audit } from "../api/ontym";
// import { TextInput } from 'react-native-paper';
import momentTZ from "moment-timezone";
import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime } from "../Components/datetimeFormat";

import DropDownPicker from 'react-native-dropdown-picker'
import Multiselect from 'multiselect-react-dropdown';
import Loader from "../../src/Components/loader";

import { useSelector, useDispatch } from 'react-redux';
import { MaintenanceAudit } from "../Components/Audit";
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import { EmptyView } from "../Components/EmptyView";

import SwitchToggle from 'react-native-switch-toggle';
import { areaOfPropertyFunction, getMaintenceAuditQueListFunction, getMaintenceAuditDataList } from "../Components/getFunction";
var isBottomSheet = false;

const Maintenance = (props) => {
  const {
    user
  } = useSelector(state => state.loginReducer);
  const propertyId = props.route.params.property_id;

  const [text, setText] = React.useState("")
  const [loader, setLoader] = useState(false)
  const [header, setHeader] = useState('');
  const [selectedAreaOfPropertyId, setSelectedAreaOfPropertyId] = useState('');
  const [maintenanceAuditList, setMaintenceAuditList] = useState([])
  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" }
  ];
  const [currentDate, setCurrentDate] = useState('');
  const [queList, setQueList] = useState([]);
  const [filterMonth, setFilterMonth] = useState(moment(new Date()).format("MMMM"))
  const [areaOfpropertyList, setAreaOfPropertyList] = useState([])
  const [openMonthsDropDown, setMonthDropDown] = useState(false);
  const bottomSheet = useRef('BottomSheet');

  const [bg, setbg] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openbottomsheet, Setopenbottomsheet] = useState('');
  const [isUpdate, setUpdate] = useState(false);
  const [updateObj, setUpdateObj] = useState({})

  const updateData = async () => {
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

    // if (comment !== "") {
    //   updateObj.comment = [...updateObj.comment, { comment }];
    // }
    // updated_by: props.user.id,
    delete updateObj.areaofhouse
    updateObj.updated_date = updatedDate;
    updateObj.updated_by = user.userData.id;
    updateObj.check_list = `${checked} -Yes\n${unChecked} -No`;

    if (updateObj.user_id === null) {
      updateObj.user_id = user.userData.id
    }

    // setBackdrop(true);
    try {
      // add
      const res = await axios.patch(`${audit}/${updateObj.id}`, {
        ...updateObj,
        tenant_id: user.currentTenantId,
        tenant_template_id: user.currentTenantTemplateId,
      },
        {
          headers:
            { "Authorization": `Bearer ${user.accessToken}` }
        }


      );

      if (res.status === 204) {

        updateObj.questions.map(async (object, index) => {

          let imgObj = object.imgobj;
          if (typeof imgObj.uri !== "undefined") {
            const response = await fetch(imgObj.uri)
            const blobSol = await response.blob();
            let newFormValues = [...updateObj.questions];
            const uploadRes = await uploadFilesOnFirestorage(setLoader, updateObj.id + "-" + index, blobSol);

            newFormValues[index]["image"] = uploadRes;
            newFormValues[index]["imgobj"] = {};

            await axios.patch(`${audit}/${res.data.id}`, {
              questions: newFormValues
            },
              {
                headers:
                {
                  "Authorization": `Bearer ${user.accessToken}`
                }
              }
            ).then((res) => {

              // console.log("SUcc: ", res);
            }
            )
          }



        })

        showMessage({
          message: "Audit updated!!",
          type: "success",

          duration: 2850
        });
        resetVal()
        // preCheckAuditQue(setQueList, user.accessToken
        // )
        // getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)
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

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <EmptyView />
    );
  };
  const addData = async () => {
    let file = ''

    // if (typeof imgObj.uri !== "undefined") {


    //   let filename = imgObj.uri.split('/').pop();

    //   const response = await fetch(imgObj.uri)
    //   const blobSol = await response.blob();
    //   file = new File([blobSol], filename, { type: "image/jpeg", lastModified: new Date() });

    //   console.log("FILE; ", JSON.stringify(file));
    // }
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

      const obj = {
        audit_type: "1",
        questions: queList,
        created_by: user.userData.id,
        updated_by: user.userData.id,
        created_date: updatedDate,
        updated_date: updatedDate,
        comment: commentArray,
        image: [],
        head_list: user.head_list,

        property_id: propertyId,
        area_of_house_id: selectedAreaOfPropertyId,
        user_id: user.userData.user_id,
        user_details: JSON.stringify({
          user_name: user.userData.firstName,
          img: user.img,
        }),
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
        queList.map(async (object, index) => {

          let imgObj = object.imgobj;
          if (typeof imgObj.uri !== "undefined") {
            const response = await fetch(imgObj.uri)
            const blobSol = await response.blob();
            let newFormValues = [...queList];
            const uploadRes = await uploadFilesOnFirestorage(setLoader, res.data.id + "-" + index, blobSol);

            newFormValues[index]["image"] = uploadRes;
            newFormValues[index]["imgobj"] = {};

            await axios.patch(`${audit}/${res.data.id}`, {
              questions: newFormValues
            },
              {
                headers:
                {
                  "Authorization": `Bearer ${user.accessToken}`
                }
              }
            ).then((res) => {

              // console.log("SUcc: ", res);
            }
            )
          }



        })

        // else

        showMessage({
          message: "Audit Created!!",
          type: "success",

          duration: 2850
        });
        // getData();
        // getCount();
        // setStateData({ type: "RESET_STATE" });
        // dispatch({ type: "close" });
        resetVal()
        // getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)

        return true;
      }
      // toast.error(c("something went wrong"));

      return true;
    } catch (error) {
      setLoader(false)
      console.log("ERROR: ", error);
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

  const resetVal = () => {
    let tokenId = user.accessToken;
    let userId = user.userData.id
    // setUpdateObj({})
    getMaintenceAuditDataList(setMaintenceAuditList, tokenId, userId, propertyId, filterMonth);
    if (isUpdate) {
      getMaintenceAuditQueListFunction(setQueList, selectedAreaOfPropertyId, user.accessToken)
    }

    setUpdate(false)


    // preCheckAuditQue(setQueList, tokenId
    // )
    // getPreCheckAuditList(setAuditList, user.accessToken, propertyId)
  }
  const submitAudit = () => {
    if (isUpdate) {
      updateData()
    } else {
      addData()
    }

  }
  setUpdateObj
  useEffect(() => {
    setLoader(true)
    let tokenId = user.accessToken;
    let userId = user.userData.id

    getMaintenceAuditDataList(setMaintenceAuditList, tokenId, userId, propertyId, filterMonth).then(function (obj) {
      console.log("HERE end ", obj);
      setLoader(false)
    })
    setCurrentDate('December');
    areaOfPropertyFunction(setAreaOfPropertyList, tokenId,);

  }, []);

  useEffect(() => {
    if (typeof props.route.params.isRefresh !== 'undefined') {
      if (props.route.params.isRefresh) {
        setLoader(true)

        let tokenId = user.accessToken;
        let userId = user.userData.id

        getMaintenceAuditDataList(setMaintenceAuditList, tokenId, userId, propertyId, filterMonth).then(function (obj) {
          console.log("HERE end ", obj);
          setLoader(false)
        })
        setCurrentDate('December');
        areaOfPropertyFunction(setAreaOfPropertyList, tokenId,);
      }
    }

  }, [props.route.params.isRefresh]);
  function handleBackButtonClick() {
    var { navigate } = props.navigation;
    // sheetRef.current.close()
    console.log('sheet', isBottomSheet);
    if (isBottomSheet) {
      closesheet()
      return true;
    } else {
      return;
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
    setLoader(true)
    let userId = user.userData.id
    let tokenId = user.accessToken;
    getMaintenceAuditDataList(setMaintenceAuditList, tokenId, userId, propertyId, filterMonth).then(function (obj) {
      console.log("HERE end ", obj);
      setLoader(false)
    })
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
    // setLoader(false)

  }, [filterMonth])
  const opensheet = () => {
    setbg(true)
  }
  const closesheet = () => {
    console.log("CLOSEE");
    setbg(false)
    sheetRef.current.snapTo(0)
    isBottomSheet = false
    resetVal()
  }

  const onSheeetBack = () => {
    console.log('ggg');
    Setopenbottomsheet('areOfProperty')
    setbg(true)
    sheetRef.current.snapTo(1)
  }
  const renderContent = () => (

    openbottomsheet === "audit" ?
      // console.log("AS QUE: ", queList)
      <MaintenanceAudit
        header={header}
        queList={queList}
        setQueList={setQueList}
        onPress={submitAudit}
        onSheetBack={onSheeetBack}
        isUpdate={isUpdate}
        updateObj={updateObj}
        setUpdateObj={setUpdateObj}
      />

      :
      openbottomsheet === "areOfProperty" ?
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,

            height: "100%",
          }}>
          {/* <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} /> */}
          <View style={{
            width: "100%",
            alignSelf: "center", marginTop: 5, justifyContent: "flex-end", flexDirection: "row"
          }} ><TouchableOpacity onPress={() => {
            closesheet()
          }}><Text style={{
            fontSize: 20,

            textAlign: "right",
            flexDirection: "row",
            justifyContent: "center"
          }}>close</Text></TouchableOpacity></View>
          <ScrollView>

            <View style={{ marginTop: 20 }}>

              {
                areaOfpropertyList.map((item, index) => {

                  return <TouchableOpacity onPress={() => {
                    Setopenbottomsheet('audit')
                    setbg(true)
                    sheetRef.current.snapTo(2)
                    getMaintenceAuditQueListFunction(setQueList, item.id, user.accessToken)
                    setHeader(item.area_name)
                    setSelectedAreaOfPropertyId(item.id)
                  }} style={{ justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#A6A4A4", paddingVertical: 10 }}>
                    <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular", fontWeight: "500" }}>{item.area_name}</Text>
                    <Icon name='chevron-right' style={{ color: "#000" }} size={30} />
                  </TouchableOpacity>
                })

              }


            </View>






          </ScrollView>
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
  const renderItem = ({ item }) => (

    <TouchableOpacity onPress={() => {
      props.navigation.navigate('BookmarkListScreen', { update: true, item: item, property_id: propertyId })
      // Setopenbottomsheet('audit')
      // setbg(true)
      // sheetRef.current.snapTo(1)
      // setUpdate(true)
      // setUpdateObj(item)

      // setHeader(item.areaofhouse.area_name)
    }} style={styles.item}>

      <View style={{ flexDirection: "row" }}>
        <Icon name='calendar-range' style={{ color: "#2d9cdb", marginTop: 10 }} size={30} />
        <View style={{ paddingLeft: 20 }}>
          <Text
            style={{ fontSize: 18, fontWeight: "600", lineHeight: 27, fontFamily: "Poppins-SemiBold", color: "#000" }}
          >
            {moment(item.created_date).format(dbDate)}

          </Text>
          <View style={{ flexDirection: "row" }}>
            <Image resizeMode={"contain"} style={{ width: 25, height: 25, borderRadius: 100 / 2, alignSelf: "flex-end" }}
              source={{
                uri: item?.user_details === null
                  ? "https://firebasestorage.googleapis.com/v0/b/tenx-10.appspot.com/o/static%2F10x-default.png?alt=media&token=86380fbe-8902-41a8-96ee-f9cc1408b9a0"
                  : JSON.parse(item?.user_details)?.img
              }} />
            {/* <Text style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"lightgreen",marginLeft:10}} >{item.Area}</Text> 
                <Text  style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"#9b9b9b"}}  > | </Text>
                <Text style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"red"}}  >{item.purpose}</Text> */}
          </View>
        </View>
      </View>
      <View style={{ marginTop: 5 }} >
        {/* <TouchableOpacity onPress={() => console.log("asd")}>
          <Icon name='dots-vertical' style={{ color: "#000", alignSelf: "flex-end" }} size={20} />
        </TouchableOpacity> */}
        <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-Regular", color: "#9b9b9b", alignSelf: "flex-end" }} >          {moment(item.created_date).format(dbTime)}
        </Text>

      </View>

      {/* <Text >{item.Area}</Text> */}
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
      <Loader show={loader} />

      <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
          <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Maintenance Audit </Text>
          {/* <TouchableOpacity onPress={() => console.log("asd")}>
            <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
          </TouchableOpacity> */}

        </View>
        <View style={{ zIndex: 10, flexDirection: "row", paddingHorizontal: 25, alignContent: "center", paddingVertical: 15, borderBottomWidth: 1, width: "97%", alignSelf: "center" }}>
          <TouchableOpacity onPress={() => {
            Setopenbottomsheet('Filter')
            setbg(true)
            sheetRef.current.snapTo(2)
          }}>
            <Image resizeMode={"contain"} style={{ width: 20, height: 20 }} source={require('../Assets/Filter.png')} />
          </TouchableOpacity>
          <View style={{ width: "50%", paddingLeft: 10 }}>
            <Dropdown
              style={[styles.dropdown, { borderColor: 'black' }]}
              // placeholderStyle={styles.placeholderStyle}
              // selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={months}

              maxHeight={300}
              labelField="label"
              valueField="value"
              // placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={filterMonth}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={item => {
                console.log(item.value);
                setFilterMonth(item.value)
                getMaintenceAuditDataList(setMaintenceAuditList, user.accessToken, user.userData.id, propertyId, item.value)
                // setValue(item.value);
                // setIsFocus(false);
              }}

            />
            {/* <DropDownPicker
              placeholder={filterMonth}
              items={months}
              defaultIndex={0}
              open={openMonthsDropDown}
              setOpen={setMonthDropDown
              }
              containerStyle={{ height: 40 }}
              onChangeItem={item => {
                console.log(item.value);
                let userId = user.userData.id
                let tokenId = user.accessToken;
                setFilterMonth(item.value)
                getMaintenceAuditDataList(setMaintenceAuditList, tokenId, userId, propertyId, item.value)
              }
              }
              value={filterMonth}
              setValue={setFilterMonth}
              dropDownStyle={{
                backgroundColor: "red"
              }}

              containerStyle={{
                height: 40
              }}
            /> */}
          </View>
          {/* <Text style={{ paddingLeft: 20, fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 14, color: "#000000" }}>Month:  {filterMonth}</Text>
          <Icon name='calendar-range' style={{ color: "#000", marginTop: 3 }} size={16} /> */}
        </View >
        <FlatList
          style={{
            marginBottom: 150,
          }}
          data={maintenanceAuditList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={EmptyListMessage}

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
          props.navigation.navigate('SubmitMaintenanceAudit', { property_id: propertyId })

          // Setopenbottomsheet('areOfProperty')
          // setbg(true)
          // console.log(bg);
          // sheetRef.current.snapTo(1)
          // isBottomSheet = true;

        }}
        style={{ borderWidth: 0.5, borderRadius: 25, height: 50, width: 50, alignSelf: "center", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 25, right: 20, backgroundColor: "#fff" }}>
        <Icon name='plus' style={{ color: "#000" }} size={50} />
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        // isBackDrop={true}
        // isBackDropDismisByPress={true}
        snapPoints={[0, , "81%", "81%"]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
        onCloseEnd={closesheet}
        renderContent={renderContent}
      />

      {/* <BottomSheet
        keyboardAware
        bottomSheerColor="#FFFFFF"
        ref={bottomSheet}
        initialPosition={'50%'} //200, 300
        snapPoints={['50%', '100%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        // backDropColor="red"
        // isModal
        // containerStyle={{backgroundColor:"red"}}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        header={
          <View>
            <Text style={styles.text}>Header</Text>
          </View>
        }
        body={
          <View style={styles.body}>
            <Text style={styles.text}>Body</Text>
          </View>
        }
      /> */}
    </SafeAreaView>
  );
};

export default Maintenance;
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
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  }
});
