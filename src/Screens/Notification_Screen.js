import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
// import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect, useRef } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import { InventoryReqAuditUpdate, MaintenanceAudit, SendInventoryAuditDetails } from "../Components/Audit";
import { useSelector, useDispatch } from 'react-redux';
import { getInventoryAuditList, getInventoryAuditListNoti, getSendInventoryAuditListNoti } from "../Components/getFunction";
import moment from "moment"
// import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dashboardDateTime } from "../Components/datetimeFormat";
import axios from 'axios';
import momentTZ from "moment-timezone";
import { BackHandler } from 'react-native';
import { getPreCheckAuditNoti, getMaintenanceNoti, getInventoryNoti, getAmcLogNoti } from "../Components/NotificationArea";
import { login, refresh, getUser, session } from "../api/auth"
import { audit, subInventoryAudit, inventory as inventoryUrl } from "../api/ontym";
import Loader from "../../src/Components/loader";
import { showMessage, hideMessage } from "react-native-flash-message";
import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime } from "../Components/datetimeFormat";

import {
  taskList, staffDetails, locationList as locationListUrl,
  jobDurationUrl, jobStatusUrl, staffUrl, propertyUrl, jobType, causeOfIssue
} from '../api/ontym';
import AMCLog from './AMCLog';
var isBottomSheet = false;

const Notification_Screen = (props) => {
  const [openbottomsheet, Setopenbottomsheet] = useState('');
  const [bg, setbg] = useState();
  const [status, setStatus] = useState('');
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false)
  const [task, setTaskList] = useState([]);
  const [filterDate, setFilterDate] = useState(moment(new Date()).format(dbDate));
  const [filterMonth, setFilterMonth] = useState(moment(new Date()).format("MMMM"))

  const [todaysList, setTodaysList] = useState([])
  const [yesterdayList, setYesterdayList] = useState([]);
  const [approvedDisStatus, setAprovedDisStatus] = useState('');
  const [comment, setcomment] = useState('');
  const [inventoryReqList, setInventoryReqList] = useState([]);
  const [sendInventoryList, setsendInventoryList] = useState([]);
  const [PreCheckAudit, setPreCheckAudit] = useState([]);
  const [Maintenance, setMaintenance] = useState([]);
  const [Inventory, setInventory] = useState([]);
  const [Amc, setAmc] = useState([]);
  const [purchaseBilling, setpurchaseBilling] = useState([]);

  const [todaysDate, setTodaysDate] = useState(new Date());
  var d = new Date();
  d.setDate(d.getDate() - 1);
  const [yesterDateFormat, setYesterdate] = useState(d);

  console.log("YESTER DATE: ", d);
  console.log("today: ", todaysDate);
  const dispatch = useDispatch();

  const {
    user
  } = useSelector(state => state.loginReducer);
  const sheetRef = React.useRef(null);
  function handleBackButtonClick() {
    // var { navigate } = props.navigation;
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
  useEffect(() => {
    getTaskList();
    if (user.permission_list != null) {
      if (user.permission_list[0].verify_inventory_audit) {
        getInventoryAuditListNoti(setInventoryReqList, user.accessToken, user.userData.id, user.userData.firstName, true)
      }

      if (user.permission_list[0].send_inventory_audit) {
        getSendInventoryAuditListNoti(setsendInventoryList, user.accessToken, user.userData.id, user.userData.firstName, true)
        console.log("HERER: ", user.permission_list[0].send_inventory_audit);
      }

    }
    else {

    }


  }, [])


  useEffect(() => {
    let userId = user.userData.id;
    let tokenId = user.accessToken;
    getPreCheckAuditNoti(setPreCheckAudit, tokenId, userId, filterDate)
    getMaintenanceNoti(setMaintenance, tokenId, userId, filterMonth)
    getInventoryNoti(setInventory, tokenId, userId, filterMonth)
    getAmcLogNoti(setAmc, tokenId, userId, '3', filterMonth)
    getAmcLogNoti(setpurchaseBilling, tokenId, userId, '4', filterMonth)

  }, []);




  const getTaskList = async () => {
    setLoader(true)
    let userId = user.userData.id;
    let tokenId = user.accessToken;
    console.log("user if:  ", userId);

    let filter = {
      where: {
        staff_id: userId,

      },
      order: ["sequence DESC"],
      include: [
        {
          "relation": "areaOfHouse",

        },
        {
          "relation": "causeOfIssue",

        },
        {
          "relation": "jobType",

        },
        {
          "relation": "property",

        },


      ]
      // skip: offset * limit,
      // limit: limit,
    };

    // const res = await axios.get(taskList + "?filter=" + JSON.stringify(filter));

    await axios.get(taskList + "?filter=" + JSON.stringify(filter),
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {
      // setname(response.data.staff_name)
      // SyncStorage.set('user', response.data);
      // id: '1',
      // profile: profilelarge,
      // smallprofile: profileimagesmall,
      // Area: "Garden",
      // villaname: "Mongalia Vila",
      // place: "Goa",
      // purpose: "Cleaning",
      // color: "#fff"

      // console.log("TASK CAUSE OF:", response.data);
      const taskList = response.data.map((data) => {
        return {
          ...data,
          id: data.id,
          profile: data.property.property_image,
          Area: data.areaOfHouse.area_name,
          villaname: data.property.property_name,
          place: data.property.location,
          purpose: data.jobType.type,
          color: "#fc0f1d"
        }
      }
      )

      const startDate = `${moment(todaysDate).format(dbDate)}`;
      const endDate = `${moment(todaysDate).format(dbDate)}`;
      let yesterDate = `${moment(yesterDateFormat).format(dbDate)}`;
      console.log("YEST: ", yesterDate);
      const filteredDataToday = taskList
        .filter((a) => {
          const date = moment(a.start_date_time).format(dbDate);
          return date === startDate
        }).map((data, i) => {
          let details = data
          getTaskGeneratorDetails(data.created_by).then((result) => {
            console.log("RES:  ", details);
            setTodaysList([
              {
                ...details,
                result
              }
            ]);


          })


        });

      console.log("to data:  ", filteredDataToday);

      const filteredDataYesterday = taskList
        .filter((a) => {
          const date = moment(a.start_date_time).format(dbDate);
          return date === yesterDate
        }).map((data, i) => {
          let details = data;
          getTaskGeneratorDetails(data.created_by).then((result) => {
            console.log("RES:  ", details);
            setYesterdayList([
              {
                ...details,
                result
              }
            ]);


          })
        });

      console.log("yest data:  ", filteredDataYesterday);
      // setYesterdayList(filteredDataYesterday);




      setLoader(false)
      setTaskList(taskList)

    }).catch((error) => {
      setLoader(false)
      console.log("ERORR: ", error);
    })
  }

  const getTaskGeneratorDetails = (id) => {

    let tokenId = user.accessToken;
    return new Promise(function (resolve, reject) {
      axios.get(getUser + "/" + id,
        {
          headers:
            { "Authorization": `Bearer ${tokenId}` }
        }

      ).then((response) => {
        // setname(response.data.staff_name)
        // SyncStorage.set('user', response.data);
        // id: '1',
        // profile: profilelarge,
        // smallprofile: profileimagesmall,
        // Area: "Garden",
        // villaname: "Mongalia Vila",
        // place: "Goa",
        // purpose: "Cleaning",
        // color: "#fff"

        // return (<Text> {response.data.firstName}</Text>);

        resolve(response.data)

        // resolve(response.data.firstName)
        // setTeaskGeneratorDetails(response.data)

        // console.log("generator details LIST: ", taskGeneratoeDetails);


      }).catch((error) => {
        console.log("ERORR: ", error);
        reject("NOT FOUND")
      })
    })
  }



  function getTimeInterval(date) {
    let seconds = Math.floor((Date.now() - date) / 1000);
    let unit = "second";
    let direction = "ago";
    if (seconds < 0) {
      seconds = -seconds;
      direction = "from now";
    }
    let value = seconds;
    if (seconds >= 31536000) {
      value = Math.floor(seconds / 31536000);
      unit = "year";
    } else if (seconds >= 86400) {
      value = Math.floor(seconds / 86400);
      unit = "day";
    } else if (seconds >= 3600) {
      value = Math.floor(seconds / 3600);
      unit = "hour";
    } else if (seconds >= 60) {
      value = Math.floor(seconds / 60);
      unit = "minute";
    }
    if (value != 1)
      unit = unit + "s";
    return value + " " + unit + " " + direction;
  }

  const updateAudit = (data) => {
    console.log(data.comment);
    setStatus(data.status)
    setAprovedDisStatus(data.approved_disapproved_status)
    setData(data)
    setcomment(data.comment)
    Setopenbottomsheet('audit')
    setbg(true)
    sheetRef.current.snapTo(1)
    isBottomSheet = true
  }

  const updateSendAudit = (data) => {
    setStatus(data.status)
    // setAprovedDisStatus(data.approved_disapproved_status)
    setData(data)
    setcomment(data.comment)
    Setopenbottomsheet('send_audit')
    setbg(true)
    sheetRef.current.snapTo(1)
    isBottomSheet = true
  }
  const opensheet = () => {
    setbg(true)
  }
  const closesheet = () => {
    setbg(false)
    sheetRef.current.snapTo(0)

    resetVal()
    isBottomSheet = false
  }
  const resetVal = () => {
    // setData({})
    // setStatus('')
  }

  const onSubmit = async () => {
    setbg(false)
    sheetRef.current.snapTo(0)
    setLoader(true);
    try {
      // let details = props.selectMaintCatDetails;
      // console.log("details:user", props.user);
      // var catID = details.id;
      var updatedDate = new Date();
      updatedDate = momentTZ.tz(updatedDate, "Asia/Taipei");

      const obj = {
        comment: comment,
        status: status,
        updated_by: user.userData.id,
        updated_date: updatedDate,
        approved_disapproved_status: approvedDisStatus,

      };
      console.log(obj);
      const res = await axios.patch(subInventoryAudit + "/" + data.id, {
        ...obj,
      }, {
        headers:
        {
          "Authorization": `Bearer ${user.accessToken}`
        }
      }
      );

      if (res.status === 204) {



        showMessage({
          message: "Audit updated!!",
          type: "success",

          duration: 2850
        });
        // getData();
        // getCount();
        // setStateData({ type: "RESET_STATE" });
        // dispatch({ type: "close" });
        // resetVal()
        // getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)
        getInventoryAuditListNoti(setInventoryReqList, user.accessToken, user.userData.id, user.userData.firstName, true)

        return true;
      }
      // toast.error(c("something went wrong"));

      return true;
    } catch (error) {
      setLoader(false)
      console.log("ERROR: ", error);
      console.log("DOD: ", error.response);
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
  }


  const renderContent = () => (

    openbottomsheet === "audit" ?
      <InventoryReqAuditUpdate
        data={data}
        status={status}
        setStatus={setStatus}
        onPress={onSubmit}
        comment={comment}
        setComment={setcomment}
        approvedDisStatus={approvedDisStatus}
        setAprovedDisStatus={setAprovedDisStatus}
      />
      :
      openbottomsheet === "send_audit" ?
        <SendInventoryAuditDetails
          data={data}
          status={status}
          setStatus={setStatus}
          onPress={onSubmit}
        // approvedDisStatus={approvedDisStatus}
        // setAprovedDisStatus={setAprovedDisStatus}
        /> :
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,

            height: "100%",
          }}>
          <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

          <Text>FAKE....</Text>
        </View>



  );


  return (
    <SafeAreaView style={{
      height: "100%", backgroundColor: "#fff",
    }}>
      <Loader show={loader} />

      <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
          <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Notification </Text>
          {/* <TouchableOpacity onPress={() => { console.log('asdasd') }}>
            <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
          </TouchableOpacity> */}

        </View>
        <ScrollView style={{
          marginBottom: 150,
        }}>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15, }}>
            Today
        </Text>

          <View>
            {
              todaysList.length > 0 ? todaysList.map((data, index) => {

                return (<View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                  <Image resizeMode={"contain"} style={{ width: 30, height: 30 }} source={require('../Assets/done1.png')} />
                  <View style={{ marginHorizontal: 25 }}>

                    <View>

                      {/* {
                      getTaskGeneratorDetails(data.created_by)
                    } */}
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>

                        {data.result.firstName} Assign you task for {data.property.property_name}
                      </Text>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                        About
                      {
                          // console.log(data.start_date_time, new Date())
                          " " + getTimeInterval(new Date(data.start_date_time))
                          // timeAgo(data.start_date_time)
                        }
                        {/* 1 minute ago */}
                      </Text>
                    </View>
                  </View>
                </View>)

              })
                : null
            }


          </View>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15 }}>
            Yesterday
        </Text>
          <View>
            {
              yesterdayList.length > 0 ? yesterdayList.map((data, index) => {

                return <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                  <Image resizeMode={"contain"} style={{ width: 30, height: 30 }} source={require('../Assets/done1.png')} />
                  <View style={{ marginHorizontal: 25 }}>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>
                      {data.result.firstName} Assign you task for {data.property.property_name}
                    </Text>
                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                      About
                    {
                        // console.log(data.start_date_time, new Date())
                        " " + getTimeInterval(new Date(data.start_date_time))
                        // timeAgo(data.start_date_time)
                      }
                      {/* 1 minute ago */}
                    </Text>
                  </View>
                </View>

              }) : null
            }
          </View>
          {/* { user.permission_list != null  */}
          {user.permission_list != null ? user.permission_list[0].verify_inventory_audit ? <View>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15 }}>
              Inventory Request
            </Text>
            <View>
              {
                // console.log("INV LENGTH: ", inventoryReqList.length)
                inventoryReqList.map((data, index) => {

                  return <TouchableOpacity onPress={() => {
                    updateAudit(data)
                  }} >
                    <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                      <Image resizeMode={"contain"} style={{ width: 30, height: "100%", flexDirection: "column", alignItems: "center", }} source={require('../Assets/done1.png')} />
                      <View style={{ marginHorizontal: 25 }}>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>
                          {/* {data.result.firstName} Assign you task for {"data"} */}
                          {data.user_details.user_name} has requested a new inventory.
                </Text>
                        <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }} >
                          {data.product_description}
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                          About
                {
                            // console.log(data.start_date_time, new Date())
                            " " + getTimeInterval(new Date(data.created_date))
                            // timeAgo(data.start_date_time)
                          }
                          {/* 1 minute ago */}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                })
              }
            </View>
          </View> : null : null
          }

          {user.permission_list != null ? user.permission_list[0].send_inventory_audit ? <View>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15 }}>
              Send Inventory Request
            </Text>
            <View>
              {
                // console.log("SEND  LENGTH: ", sendInventoryList.length)
                sendInventoryList.map((data, index) => {

                  return <TouchableOpacity onPress={() => {
                    updateSendAudit(data)
                  }} >
                    <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                      <Image resizeMode={"contain"} style={{ width: 30, height: "100%", flexDirection: "column", alignItems: "center", }} source={require('../Assets/done1.png')} />
                      <View style={{ marginHorizontal: 25 }}>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>
                          {/* {data.result.firstName} Assign you task for {"data"} */}
                          {data.user_details.user_name} has created a send inventory.
                </Text>
                        <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }} >
                          Amount:{data.amount}
                          Paid by:{data.paid_by}
                          Payment method:{data.payment_method}
                          Balance amount:{data.bal_amount}
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                          About
                {
                            // console.log(data.start_date_time, new Date())
                            " " + getTimeInterval(new Date(data.created_date))
                            // timeAgo(data.start_date_time)
                          }
                          {/* 1 minute ago */}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                })
              }
            </View>
          </View> : null : null
          }
          <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15 }}>
            Pre-CheckIn Audit
        </Text>
          <View>
            {

              PreCheckAudit.map((data, index) => {



                return <TouchableOpacity onPress={() => {
                  console.log(data.user_details);
                  console.log(typeof JSON.parse(data.user_details));
                  props.navigation.navigate("Properties_stack", {
                    screen: "Pre_check", "params": { property_id: data.property_id }
                  })
                  // props.navigation.navigate("Pre_check", { property_id: data.property_id })
                  // setUpdate(true)
                  // setUpdateObj(item)
                  // Setopenbottomsheet('auditQue')
                  // setbg(true)
                  // sheetRef.current.snapTo(2)
                  // isBottomSheet = true
                  // console.log("udap ", item);
                }} style={styles.item}>

                  <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                    <Image resizeMode={"contain"} style={{ width: 30, height: "100%", flexDirection: "column", alignItems: "center", }} source={require('../Assets/done1.png')} />
                    <View style={{ marginHorizontal: 25 }}>
                      {/* <Text>{}</Text> */}
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>
                        {/* {data.result.firstName} Assign you task for {"data"} */}
                        {JSON.parse(data.user_details).user_name} has created a pre-check audit.
                </Text>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }} >
                        Villa:{data.property.property_name}

                      </Text>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                        About
                {
                          // console.log(data.start_date_time, new Date())
                          " " + getTimeInterval(new Date(data.created_date))
                          // timeAgo(data.start_date_time)
                        }
                        {/* 1 minute ago */}
                      </Text>
                    </View>
                  </View>



                  {/* <Text >{item.Area}</Text> */}
                </TouchableOpacity>

              })
            }
          </View>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15 }}>
            Maintenance Audit
        </Text>
          <View>
            {
              Maintenance.map((data, index) => {


                return <TouchableOpacity onPress={() => {
                  // Setopenbottomsheet('audit')
                  // setbg(true)
                  // sheetRef.current.snapTo(1)
                  // setUpdate(true)
                  // setUpdateObj(item)
                  props.navigation.navigate("Properties_stack", {
                    screen: "Maintenance", "params": { property_id: data.property_id }
                  })
                  // setHeader(item.areaofhouse.area_name)
                }}>
                  <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                    <Image resizeMode={"contain"} style={{ width: 30, height: "100%", flexDirection: "column", alignItems: "center", }} source={require('../Assets/done1.png')} />
                    <View style={{ marginHorizontal: 25 }}>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>
                        {/* {data.result.firstName} Assign you task for {"data"} */}
                        {JSON.parse(data.user_details).user_name} has created a Maintenance audit.
                </Text>
                      {/* <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }} >
                        Villa:{data.property.property_name}

                      </Text> */}
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                        About
                {
                          // console.log(data.start_date_time, new Date())
                          " " + getTimeInterval(new Date(data.created_date))
                          // timeAgo(data.start_date_time)
                        }
                        {/* 1 minute ago */}
                      </Text>
                    </View>
                  </View>

                  {/* <Text >{item.Area}</Text> */}
                </TouchableOpacity>
              })

            }
          </View>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15 }}>
            Inventory Audit
        </Text>
          {
            Inventory.map((data, index) => {

              return <TouchableOpacity onPress={() => {
                // console.log(item);
                props.navigation.navigate("Properties_stack", {
                  screen: "inventory", "params": { property_id: data.property_id }
                })

              }} style={styles.item}>
                <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                  <Image resizeMode={"contain"} style={{ width: 30, height: "100%", flexDirection: "column", alignItems: "center", }} source={require('../Assets/done1.png')} />
                  <View style={{ marginHorizontal: 25 }}>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>
                      {/* {data.result.firstName} Assign you task for {"data"} */}
                      {data?.user_details?.user_name} has created a Inventory audit.
                </Text>

                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                      About
                {
                        // console.log(data.start_date_time, new Date())
                        " " + getTimeInterval(new Date(data.created_date))
                        // timeAgo(data.start_date_time)
                      }
                      {/* 1 minute ago */}
                    </Text>
                  </View>
                </View>

                {/* <Text >{item.Area}</Text> */}
              </TouchableOpacity>
            })
          }

          <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15 }}>
            Amc Log
        </Text>
          <View>
            {
              Amc.map((data, index) => {
                return <TouchableOpacity onPress={() => {

                  props.navigation.navigate("Properties_stack", {
                    screen: "amc_log", "params": { property_id: data.property_id }
                  })
                }} style={styles.item}>
                  <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                    <Image resizeMode={"contain"} style={{ width: 30, height: "100%", flexDirection: "column", alignItems: "center", }} source={require('../Assets/done1.png')} />
                    <View style={{ marginHorizontal: 25 }}>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>
                        {/* {data.result.firstName} Assign you task for {"data"} */}
                        {data.user_details.user_name} has created a Amc-log audit.
                </Text>
                      {/* <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }} >
                        Villa:{data.property.property_name}

                      </Text> */}
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                        About
                {
                          // console.log(data.start_date_time, new Date())
                          " " + getTimeInterval(new Date(data.created_date))
                          // timeAgo(data.start_date_time)
                        }
                        {/* 1 minute ago */}
                      </Text>
                    </View>
                  </View>

                  {/* <Text >{item.Area}</Text> */}
                </TouchableOpacity>

              })
            }
          </View>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 18, lineHeight: 20, marginHorizontal: 20, marginTop: 15 }}>
            Purchase & Billing
        </Text>
          <View>
            {
              purchaseBilling.map((data, index) => {
                return <TouchableOpacity onPress={() => {
                  props.navigation.navigate("Properties_stack", {
                    screen: "purchase_and_billing", "params": { property_id: data.property_id }
                  })

                }} style={styles.item}>

                  <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 15, borderBottomColor: "#dddada", borderBottomWidth: 1 }}>
                    <Image resizeMode={"contain"} style={{ width: 30, height: "100%", flexDirection: "column", alignItems: "center", }} source={require('../Assets/done1.png')} />
                    <View style={{ marginHorizontal: 25 }}>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 14, lineHeight: 18, }}>
                        {/* {data.result.firstName} Assign you task for {"data"} */}
                        {data.user_details.user_name} has created a Purchase&Billing audit.
                </Text>
                      {/* <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }} >
                        Villa:{data.property.property_name}

                      </Text> */}
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#7b6f72" }}>
                        About
                {
                          // console.log(data.start_date_time, new Date())
                          " " + getTimeInterval(new Date(data.created_date))
                          // timeAgo(data.start_date_time)
                        }
                        {/* 1 minute ago */}
                      </Text>
                    </View>
                  </View>

                  {/* <Text >{item.Area}</Text> */}
                </TouchableOpacity>

              })
            }
          </View>
        </ScrollView>
      </View>


      <BottomSheet
        style={{
          backgroundColor: "#000000bf", opacity: 0.75
        }}
        ref={sheetRef}
        snapPoints={[0, "88%", "40%"]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
        onCloseEnd={closesheet}
        renderContent={renderContent}
      />

    </SafeAreaView>
  );
};

export default Notification_Screen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"

  },
})