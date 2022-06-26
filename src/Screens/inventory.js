import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar, Modal, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { color } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment"
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from 'react-native-element-dropdown';
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";
import { firestore } from "../Components/FirebaseSetup";

import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
// import { TextInput } from 'react-native-paper';
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import SwitchToggle from 'react-native-switch-toggle';
import axios from "axios";
import { EmptyView } from "../Components/EmptyView";
import { BackHandler } from 'react-native';
import { collection, addDoc, doc, runTransaction, setDoc, updateDoc } from "firebase/firestore";

import { audit, subInventoryAudit, inventory as inventoryUrl } from "../api/ontym";
// import { TextInput } from 'react-native-paper';
import momentTZ from "moment-timezone";
import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime } from "../Components/datetimeFormat";
import DropDownPicker from 'react-native-dropdown-picker'
import Loader from "../../src/Components/loader";
import { useSelector, useDispatch } from 'react-redux';
import { getInvertoryCatList, getInventorySubCatList, getInventoryAuditList } from "../Components/getFunction";
import { InventoryAudit } from "../Components/Audit";
import { showMessage, hideMessage } from "react-native-flash-message";
import PopupMenu from "../Components/MenuItem";
var isBottomSheet = false;

const inventory = (props) => {
  const propertyId = props.route.params.property_id;

  const [inventoryCatList, setInventoryCatList] = useState([])
  const {
    user
  } = useSelector(state => state.loginReducer);
  const tokenId = user.accessToken;
  const userId = user.userData.id;
  const [inventorySubCatList, setInventorySubCatList] = useState([]);
  const [inventoryAuditList, setInventoryAuditList] = useState([]);
  const [text, setText] = React.useState("")
  const [loader, setLoader] = useState(false)
  const [header, setHeader] = useState('');
  const [isUpdate, setUpdate] = useState(false);
  const [openMonthsDropDown, setMonthDropDown] = useState(false);
  const [updateObj, setUpdateObj] = useState({})
  const [menuItem, setmenuItem] = useState('');
  const [selectedInventoryCatId, setSelectedInventoryCatId] = useState('');
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
  const [filterMonth, setFilterMonth] = useState(moment(new Date()).format("MMMM"))
  const [bg, setbg] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [openbottomsheet, Setopenbottomsheet] = useState('');



  const updateData = async () => {
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
        audit_type: "2",
        sub_cat_audit: updateObj.sub_cat_audit,
        updated_by: user.userData.id,
        updated_date: updatedDate,


        user_id: user.userData.id,
        user_details: {
          user_name: user.userData.firstName,
          img: user.img,
        },
        tenant_id: user.currentTenantId,
        tenant_template_id: user.currentTenantTemplateId,
      };
      console.log(obj);
      const res = await axios.patch(subInventoryAudit + "/" + updateObj.id, {
        ...obj,
      }, {
        headers:
        {
          "Authorization": `Bearer ${user.accessToken}`
        }
      }
      );

      if (res.status === 204) {
        updateObj.sub_cat_audit.map(async (object, index) => {

          let imgObj = object.imgobj;
          if (typeof imgObj.uri !== "undefined") {
            const response = await fetch(imgObj.uri)
            const blobSol = await response.blob();
            let newFormValues = [...updateObj.sub_cat_audit];
            const uploadRes = await uploadFilesOnFirestorage(setLoader, updateObj.id + "-" + index, blobSol);

            newFormValues[index]["image"] = uploadRes;
            newFormValues[index]["imgobj"] = {};

            await axios.patch(`${subInventoryAudit}/${updateObj.id}`, {
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
        // getData();
        // getCount();
        // setStateData({ type: "RESET_STATE" });
        // dispatch({ type: "close" });
        resetVal()
        // getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)
        getInventoryAuditList(setInventoryAuditList, user.accessToken, user.userData.id, propertyId, filterMonth, false)

        return true;
      }
      // toast.error(c("something went wrong"));

      return true;
    } catch (error) {
      setLoader(false)

      console.log("ERROR: ", error.response);
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

  const submitAuditToFirebase = (data) => {
    setDoc(doc(firestore, "audit_list", data.id), {
      ...data, head_list: user.head_list

    });
  }
  const addData = async () => {



    // if (typeof imgObj.uri !== "undefined") {


    //   let filename = imgObj.uri.split('/').pop();

    //   const response = await fetch(imgObj.uri)
    //   const blobSol = await response.blob();
    //   file = new File([blobSol], filename, { type: "image/jpeg", lastModified: new Date() });

    //   console.log("FILE; ", JSON.stringify(file));
    // }


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
        audit_type: "2",
        sub_cat_audit: inventorySubCatList,
        created_by: user.userData.id,
        updated_by: user.userData.id,
        created_date: updatedDate,
        updated_date: updatedDate,
        head_list: user.head_list,

        property_id: propertyId,
        inventory_cat_id: selectedInventoryCatId,
        user_id: user.userData.id,
        user_details: {
          user_name: user.userData.firstName,
          img: user.img,
        },
        tenant_id: user.currentTenantId,
        tenant_template_id: user.currentTenantTemplateId,
      };
      console.log(obj);
      const res = await axios.post(subInventoryAudit, {
        ...obj,
      }, {
        headers:
        {
          "Authorization": `Bearer ${user.accessToken}`
        }
      }
      );

      if (res.status === 200) {

        inventoryAuditList.map(async (object, index) => {

          let imgObj = object.imgobj;
          if (typeof imgObj.uri !== "undefined") {
            const response = await fetch(imgObj.uri)
            const blobSol = await response.blob();
            let newFormValues = [...inventoryAuditList];
            const uploadRes = await uploadFilesOnFirestorage(setLoader, res.data.id + "-" + index, blobSol);

            newFormValues[index]["image"] = uploadRes;
            newFormValues[index]["imgobj"] = {};

            await axios.patch(`${subInventoryAudit}/${res.data.id}`, {
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
        // getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)
        getInventoryAuditList(setInventoryAuditList, user.accessToken, user.userData.id, propertyId, filterMonth, false)

        return true;
      }
      console.log(res.status);
      // toast.error(c("something went wrong"));

      return true;
    } catch (error) {
      setLoader(false)
      console.log(error);
      console.log("ERROR: ", error.response);
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

  useEffect(() => {
    setLoader(true)
    getInventoryAuditList(setInventoryAuditList, user.accessToken, user.userData.id, propertyId, filterMonth, false).then(function (obj) {
      console.log("HERE end ", obj);
      setLoader(false)
    })
    getInvertoryCatList(setInventoryCatList, tokenId);

    setCurrentDate('December');

    // setTimeout(() => {
    //   setLoader(false)
    // }, 3000);
  }, []);
  const opensheet = () => {
    setbg(true)
  }
  const closesheet = () => {
    setbg(false)
    sheetRef.current.snapTo(0)
    isBottomSheet = false
    resetVal()
  }
  const submitAudit = () => {
    if (isUpdate) {
      updateData()
    } else {
      addData()
    }

  }


  const resetVal = () => {
    let tokenId = user.accessToken;
    let userId = user.userData.id
    // setUpdateObj({})
    // getMaintenceAuditDataList(setMaintenceAuditList, tokenId, userId, propertyId, filterMonth);
    // if (isUpdate) {
    //   getMaintenceAuditQueListFunction(setQueList, selectedAreaOfPropertyId, user.accessToken)
    // }
    setHeader('')
    setSelectedInventoryCatId('')

    setUpdate(false)


    // preCheckAuditQue(setQueList, tokenId
    // )
    // getPreCheckAuditList(setAuditList, user.accessToken, propertyId)
  }

  const onSheeetBack = () => {
    console.log('ggg');
    Setopenbottomsheet('Addtask')
    setbg(true)
    sheetRef.current.snapTo(1)
    // isBottomSheet = true
  }

  useEffect(() => {
    setLoader(true)
    let userId = user.userData.id
    let tokenId = user.accessToken;
    getInventoryAuditList(setInventoryAuditList, tokenId, userId, propertyId, filterMonth, false).then(function (obj) {
      console.log("HERE end ", obj);
      setLoader(false)
    })
    // setLoader(false)
    console.log(inventoryAuditList.length);
    // setTimeout(() => {
    // if (inventoryAuditList.length === 0) {

    //   showMessage({
    //     message: "Failed!!",
    //     description: "Data not Found",
    //     type: "danger",
    //     duration: 2850
    //   });
    // }
    // }, 1000);

  }, [filterMonth])

  const renderContent = () => (

    openbottomsheet === "audit" ?
      <InventoryAudit
        inventorySubCatList={inventorySubCatList}
        setInventorySubCatList={setInventorySubCatList}
        onPress={submitAudit}
        isUpdate={isUpdate}
        onSheetBack={onSheeetBack}

        setUpdateObj={setUpdateObj}
        updateObj={updateObj}
        header={header}
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

            <View style={{ marginTop: 20 }}>

              {
                inventoryCatList.map((data, index) => {

                  return (
                    <TouchableOpacity onPress={() => {
                      getInventorySubCatList(setInventorySubCatList, data.id, tokenId)
                      setHeader(data.inventory)
                      setSelectedInventoryCatId(data.id)
                      Setopenbottomsheet('audit')

                      setbg(true)
                      sheetRef.current.snapTo(2)
                      isBottomSheet = true
                    }} style={{ justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#A6A4A4", paddingVertical: 10 }}>
                      <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular", fontWeight: "500" }}>{data.inventory}</Text>
                      <Icon name='chevron-right' style={{ color: "#000" }} size={30} />
                    </TouchableOpacity>
                  )

                })
              }

            </View>






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


          </View>
          :
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,

              height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />


          </View>



  );

  const getCatDetailsDetails = async (id) => {
    try {

      // ?filter={"where":{"property_id":${id}}}
      const res = await axios.get(inventoryUrl + "/" + id, {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      });

      if (res.status === 200) {
        if (!res.data.length) {
          // toast.error(c("no record found"));
        }
        // const auditData = res.data.filter(element =>
        //   element.property_id === id && element.audit_type === "0"
        // )
        // console.log(auditData);
        setHeader(res.data.inventory)
        // tableDispatch(res.data);
      } else {
        // toast.error(c("no record found"));
      }
    } catch (error) {
      console.log(error);
      //   toast.error(c("error while retrieving the data"));
    } finally {
      // setBackdrop(false);
    }
  }

  const sheetRef = React.useRef(null);
  const renderItem = ({ item }) => (



    <TouchableOpacity onPress={() => {
      console.log(item);
      // return;
      Setopenbottomsheet('audit')
      setbg(true)
      sheetRef.current.snapTo(1)
      isBottomSheet = true
      setUpdate(true)
      setUpdateObj(item)
      // setHeader(item.)
      setHeader(item.inventory.inventory)
      setSelectedInventoryCatId(item.inventory_cat_id)

      getCatDetailsDetails(item.inventory_cat_id)
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
                  : item?.user_details?.img
              }}

            />
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
        <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-Regular", color: "#9b9b9b", alignSelf: "flex-end" }} >
          {moment(item.created_date).format(dbTime)}
        </Text>

      </View>

      {/* <Text >{item.Area}</Text> */}
    </TouchableOpacity>
  );
  const openReqList = () => {
    props.navigation.navigate('Request_inventory', { property_id: propertyId })
  }
  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <EmptyView />
    );
  };
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

  return (
    <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
      <Loader show={loader} />

      <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
          <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Inventory Audit </Text>
          {/* <TouchableOpacity onPress={() => console.log("asd")}>
            <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
          </TouchableOpacity> */}

          <Dropdown
            style={[styles.dropdown, {
              borderColor: 'white', width: "40%", whiteSpace: 'nowrap',
              overflow: 'hidden',
            }]}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={[{ key: 0, label: 'Request', value: '0' }, { key: 0, label: 'Send', value: '1' }]}

            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder={"Inventory"}
            // searchPlaceholder="Search..."
            value={menuItem}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => {
              if (item.value === '0') {
                openReqList()

              } else {
                props.navigation.navigate('Send_inventory', { property_id: propertyId })

              }
              // openReqList()

              setmenuItem(item.value)


            }}

          />


          <View>

          </View>
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
            <View style={{
              width: "100%",
              flexDirection: "row"
            }}>
              <Dropdown
                style={[styles.dropdown, { borderColor: 'black', width: "100%" }]}
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
                  let userId = user.userData.id
                  let tokenId = user.accessToken;
                  setFilterMonth(item.value)
                }}

              />
              {/* <View style={{

                marginLeft: 12,
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignSelf: "center",
              }} >
                <TouchableOpacity onPress={() => {
                  openReqList()
                }}>
                  <View style={{
                    backgroundColor: "#2D9cDB",
                    color: "white",
                    width: 90,
                    height: 25,
                    borderRadius: 4,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>


                    <Text style={{ color: "white" }}>Request</Text>

                  </View>
                </TouchableOpacity>

              </View> */}


            </View>

            {/* <View style={{
              marginLeft: 10,
            }}>
              <TouchableOpacity onPress={() => {
                openReqList()
              }}>

                <Text>Request </Text>

              </TouchableOpacity>
            </View> */}

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
                // getMaintenceAuditDataList(setMaintenceAuditList, tokenId, userId, propertyId, item.value)
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
        </View >
        <FlatList
          style={{
            marginBottom: 150,
          }}
          data={inventoryAuditList}
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
          Setopenbottomsheet('Addtask')
          setbg(true)
          sheetRef.current.snapTo(1)
          isBottomSheet = true
        }}
        style={{ borderWidth: 0.5, borderRadius: 25, height: 50, width: 50, alignSelf: "center", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 25, right: 20, backgroundColor: "#fff" }}>
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

export default inventory;
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
