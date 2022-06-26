import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StyleSheet, StatusBar, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { log } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import {
  bookingApi,
  amcPurchase,

  billingCategory,
  subInventoryAudit, subInventory, inventory, uploadFile, audit, taskList, staffDetails, locationList as locationListUrl,
  jobDurationUrl, jobStatusUrl, staffUrl, propertyUrl, jobType, jobSource, areaOfHouse, causeOfIssue, question
} from '../api/ontym';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Table, TableWrapper, Col, Cols, Cell, Row } from 'react-native-table-component';

import { BackHandler } from 'react-native';

import { Permission } from "../Components/Permission";
import { dateCalendar, dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime } from "../Components/datetimeFormat";
import axios, { Axios } from 'axios';
import moment from "moment"
import momentTZ from "moment-timezone";
import Loader from "../../src/Components/loader";
import { useSelector, useDispatch } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import { getBookingList, staffListFunction, getpropertyList, getLocationList } from "../Components/getFunction";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';

import { DynamicAddAdvancePayment } from "../Components/DynamicAddAdvancePayment";
import { DynamicBalancePayment } from "../Components/DynamicBalancePayment";
import { DynamicFoodPackage } from "../Components/DynamicFoodPackage";
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
import { TextInput } from 'react-native-paper';
import { DataTable } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker'
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

// const numberOfItemsPerPageList = [2, 3, 4];

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];
var isBottomSheet = false;

const Booking_Screen = (props) => {

  const [markedDate, setMarkedDate] = useState({})
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(moment(new Date()).format(dateCalendar))
  const [page, setPage] = React.useState(0);
  // const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  // const from = page * numberOfItemsPerPage;
  // const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
  // React.useEffect(() => {
  //   setPage(0);
  // }, [numberOfItemsPerPage]);
  const [propertyList, setPropetyList] = useState([])
  const [tableTitle, setTitle] = useState(['Title', 'Title2', 'Title3', 'Title4'])
  const [tableData, setTableData] = useState([
    ['1', 'a', 'b', 'c', 'd'],
    ['2', '1', '2', '3', '4'],
    ['3', 'a', 'b', 'c', 'd']
  ]);

  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 }
  ];
  // const propertyId = props.route.params.item.id;
  // const propertyName = props.route.params.item.property_name;
  console.log(props.route.params);
  const [loader, setLoader] = useState(false);
  const {
    user
  } = useSelector(state => state.loginReducer);
  const tokenId = user.accessToken;
  const userId = user.userData.id;
  const [item, setItem] = useState(undefined)
  const [guestName, setGuestName] = useState('');
  const [filterMonth, setFilterMonth] = useState(
    // moment(new Date()).format("MMMM")
    new Date().getMonth() + 1
  )

  const [propertyVal, setPropertyVal] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [statusVal, setStatusVal] = useState('');
  const [emailId, setEmailId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [numberOfGuest, setNumberOfGuest] = useState(0)
  const [bookingAmount, setBookingAmount] = useState(0);
  const [staffName, setSatffName] = useState('');
  const [updateObj, setUpdateObj] = useState({})
  const [selectedDate, setSelectedDate] = useState('')
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [displaymode, setMode] = useState('datetime');
  const [filterDate, setFilterDate] = useState(new Date());
  const [showFilterDatePicker, setFilterDatePicker] = useState(false);
  const [showCheckInDate, setShowCheckInDate] = useState(false)
  const [text, setText] = React.useState("")
  const [showCheckOutDate, setShowCheckOutDate] = useState(false)
  const [checkOutDateTime, setCheckOutDateTime] = useState(new Date());
  const [bookingList, setBookingList] = useState([])
  const [daysList, setDaysList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [staffVal, setStaffVal] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null)
  const [openBookingStatus, setOpenBookingStatus] = useState(false)
  // const []
  const [openStaffDropDown, setOpenStaffDropDown] = useState(false);
  const [isUpdate, setIsupdate] = useState(false)

  const [currentDate, setCurrentDate] = useState('');
  const [bookingFilterList, setBookingFilter] = useState([]);
  const [locationVal, setLocationVal] = useState(null)
  const [locationName, setLocationName] = useState('');
  const [time, setTime] = useState(new Date());
  const [advancePaymentList, setAdvancePaymentList] = useState({
    name: "add_advance_Payment", value: []
  })
  const [addBalancePaymentList, setBalancePaymentList] = useState({
    name: "add_balance_Payment", value: []

  })

  const [addFoodPackageList, setFoodPackageList] = useState({
    name: "food_package", value: []

  })
  const [propertyId, setPropertyId] = useState('');


  const [bg, setbg] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [openbottomsheet, Setopenbottomsheet] = useState('');
  const [properties, setproperties] = useState()



  function handleBackButtonClick() {
    // sheetRef.current.close()
    console.log('sheet', isBottomSheet);
    if (isBottomSheet) {
      closesheet()
      return true;
    } else {
      return false;
    }



  }
  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };

  }, []);


  useEffect(() => {
    if (user.permission_list != null) {
      if (user.permission_list[0].no_view_booking) {
        // setbg(false)
        // sheetRef.current.snapTo(0)
        console.log("TRUE 11");
        closesheet()
      } else {
        if (!user.permission_list[0].view_access_given_per_individual_property) {

          console.log("FALSE 11");
          // Setopenbottomsheet('Filter')
          // setbg(true)
          // sheetRef.current.snapTo(1)
        }
      }


    }



    setLoader(true)
    DropDownPicker.setListMode("SCROLLVIEW");
    const city = []
    const property = []
    // for (let i = 0; i < staticData.length; i++) {


    //   city.push(staticData[i].value)
    //   for (let j = 0; j < staticData[i].properties.length; j++) {

    //     property.push(staticData[i].properties[j].name)

    //   }
    //   setproperties(property)
    // }
    setCurrentDate('December');

    staffListFunction(setStaffList, tokenId)
    if (user.permission_list != null) {
      getBookingList(setBookingList, tokenId, userId, propertyVal)
      console.log(" :: ", user.permission_list[0].view_access_given_per_individual_property);
      if (user.permission_list[0].view_access_given_per_individual_property) {

        limitedPropertyAccess()

      } else {

      }
    }


    getLocationList(setLocationList, tokenId)

    createDaysListMonthWise();
    setLoader(false)

    console.log("BOOKING LIST : ", bookingList);




  }, []);



  var i = 0;

  useEffect(() => {
    console.log(i++);
    if (user.permission_list != null) {
      console.log(" :: ", user.permission_list[0].view_access_given_per_individual_property);
      if (user.permission_list[0].view_access_given_per_individual_property) {
        setLoader(true)
        console.log("HERE...1111");
        createDaysListMonthWise();
        setTimeout(() => { setLoader(false) }, 3000);
        // setLoader(false)
      }
    }


  }, [propertyList]);

  const limitedPropertyAccess = async () => {
    let proper = []

    console.log('guu');
    setLoader(true)
    axios.get(`${staffUrl}/${user.userData.id}`,
      {
        headers:
          { "Authorization": `Bearer ${user.accessToken}` }
      }

    ).then((response) => {

      console.log("STAFF DETAILS:", response.data);
      // return new Promise(function (resolve, reject) {
      for (let i = 0; i < response.data.property.length; i++) {
        axios.get(
          `${propertyUrl}/${response.data.property[i].id}`,
          {
            headers:
              { "Authorization": `Bearer ${user.accessToken}` }
          }
        ).then((response) => {
          proper.push({
            ...response.data,
            label: response.data.property_name,
            value: response.data.id
          })

          console.log("PROPER: BOOKING  ", response.data);
          // setproperty([response.data])
          // proper.push(response.data)
          setPropetyList([
            ...proper
          ])
          // setproperty([...proper])
        }).catch((error) => {
          console.log(error);
        })

      }

      // })

      // setLoader(false)
    }).catch((error) => {
      console.log(error.response.data);
      setLoader(false)

    }).finally(function () {
      console.log("FINALLY");
    });


  }

  useEffect(() => {
    if (user.permission_list != null) {
      if (!user.permission_list[0].view_access_given_per_individual_property) {
        if (locationVal != null) {
          setLoader(true)
          getpropertyList(setPropetyList, tokenId, locationVal)
          createDaysListMonthWise();
          setLoader(false)

        }
      }
    }


  }, [locationVal])

  useEffect(() => {

    createDaysListMonthWise()

  }, [filterMonth]);

  const createDaysListMonthWise = () => {
    var date = new Date();
    // var month = date.getMonth() + 1;
    console.log(filterMonth);
    var month = filterMonth;
    date.setDate(1);
    var all_days = [];
    // console.log("CURRENT MONTH: ", month);
    var dt = new Date();
    var month = filterMonth;
    // month = month + 1;
    var year = dt.getFullYear();
    let daysInMonth = new Date(year, filterMonth, 0).getDate();

    if (month < 10) {
      month = '0' + month
    }
    // console.log("CURRENT DAYS IN MONTH: ", month);
    for (let index = 0; index < daysInMonth; index++) {
      var d = index + 1;
      if (d < 10) {
        d = '0' + d
      }

      var filterDate = d + '-' + month + '-' + date.getFullYear();
      console.log(filterDate);
      // let details = bookingList.filter((i) => 
      const array = bookingList.filter(
        (datum) =>
          datum.booking_date_list.includes(filterDate)
        // moment(datum.checkin_Date).format(dbDate) === filterDate,
      )
      // )
      console.log("DATE BOOKING: ", array);
      all_days.push({ d: d, booking: array, date: month + '/' + d + '/' + date.getFullYear() });
      date.setDate(date.getDate() + 1);
    }
    // while (0 <= daysInMonth) {

    // }



    setDaysList(all_days)
    console.log("ALL DAYS: ", all_days.length);
  }


  // useEffect(() => {
  //   setLoader(true)
  //   setTimeout(() => {
  //     getMarkedDated();

  //   }, 2000);
  // }, [bookingList])
  function obj() {
    obj = new Object();
    this.add = function (key, value) {
      obj["" + key + ""] = value;
    }
    this.obj = obj
  }
  const getMarkedDated = () => {

    // let my_obj = new obj();
    // console.log("book LIST: ", bookingList);
    // for (let index = 0; index < bookingList.length; index++) {
    //   let date = moment(bookingList[index].checkin_Date).format(dateCalendar)
    //   // new Date();
    //   // date.toISOString().split('T')[0];

    //   for (let index = 0; index < bookingList.length; index++) {
    //     let innderDate = moment(bookingList[index].checkin_Date).format(dateCalendar)
    //     if (date === innderDate) {
    //       my_obj.add([`${date}`], { marked: true })
    //       // setMarkedDate(Object.assign({
    //       //   ...markedDate,
    //       //   [`${date}`]: { marked: true }
    //       // }))

    //       // BookingCalArray[date].push({
    //       //   name: 'Item for ' + date + ' #' + index,
    //       //   height: Math.max(50, Math.floor(Math.random() * 150)),
    //       //   day: date,
    //       //   details: bookingList[index]
    //       // })
    //     }

    //   }

    // }

    // setMarkedDate(my_obj)
    // setLoader(false)
    // console.log("MARKED: ", my_obj);
    // setLoader(false)
  }


  const opensheet = () => {
    setbg(true)
  }
  const closesheet = () => {
    isBottomSheet = false
    setLoader(true)
    setbg(false)
    sheetRef.current.snapTo(0)
    setLoader(false)
    // resetVal()
  }

  const updateData = async () => {

    setbg(false)
    sheetRef.current.snapTo(0)

    const obj = {
      guest_Name: guestName,
      booking_status: bookingStatus,
      email_Id: emailId,
      contact_Number: contactNumber,
      number_of_Guest: parseInt(numberOfGuest),
      checkin_Date: datePickerDate,
      checkout_Date: checkOutDateTime,
      booking_Amount: parseFloat(bookingAmount),
      add_advance_Payment:
        advancePaymentList.value
      ,
      add_balance_Payment:
        addBalancePaymentList.value
      ,
      food_package:

        addFoodPackageList.value
      ,
      sales_person_Name: staffName,
      sales_person_id: staffVal,
      created_by: user.userData.id,
      updated_by: user.userData.id,
      updated_date: new Date(),

    }
    console.log(obj);
    // return;
    setLoader(true);
    try {
      // add
      const res = await axios.patch(`${bookingApi}/${updateObj.id}`, {
        ...obj,
      }, {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

      );

      if (res.status === 204) {
        // log({
        //   prev_text: restData.property_name,
        //   log_text: "- Property added",
        //   page: "Property",
        //   action: logAction.add,
        //   table_id: res.data.id,
        //   created_by: props.user.id,
        //   tenant_id: props.currentTenantId,
        //   tenant_template_id: props.currentTenantTemplateId,
        // });
        // let imageData;
        // if (property_image instanceof File) {
        //     const uploadRes = await uploadImage(res.data.id, property_image);

        //     imageData = {
        //         property_image: uploadRes?.data?.urlfield,
        //         property_image_name: uploadRes?.data?.filename,
        //     };
        // } else if (!property_image || property_image === "" || property_image === "RDBF") {
        //     const patchRes = await axios.patch(`${property}/${res.data.id}`, {
        //         property_image: dpUrl,
        //         property_image_name: "default",
        //     });

        //     imageData = { property_image: dpUrl, property_image_name: "default" };
        // }
        // toast.success(`${t("booking")} ${c("updated")}`);
        // getData();
        // getCount();
        showMessage({
          message: "Booking updated!!",
          type: "success",

          duration: 2850
        });
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
  }

  const addData = async () => {
    setLoader(true)
    // let checkin_Date = moment(stateData.checkin_Date).format(dbDateTime);

    setbg(false)
    sheetRef.current.snapTo(0)
    const obj = {
      guest_Name: guestName,
      booking_status: bookingStatus,
      email_Id: emailId,
      contact_Number: contactNumber,
      number_of_Guest: parseInt(numberOfGuest),
      checkin_Date: datePickerDate,
      checkout_Date: checkOutDateTime,
      booking_Amount: parseFloat(bookingAmount),
      add_advance_Payment:
        advancePaymentList.value
      ,
      add_balance_Payment:
        addBalancePaymentList.value
      ,
      food_package:

        addFoodPackageList.value
      ,
      sales_person_Name: staffName,
      sales_person_id: staffVal,
      created_by: user.userData.id,
      property_name: propertyName,
      updated_by: user.userData.id,
      created_date: new Date(),
      updated_date: new Date(),
      property_id: propertyId
    }
    console.log(obj);

    // setBackdrop(true);
    try {
      // add
      // const { property_image, property_image_name, ...restData } = stateData;
      const res = await axios.post(bookingApi, obj, {
        headers:
        {
          "Authorization": `Bearer ${user.accessToken}`
        }
      });

      if (res.status === 200) {
        // log({
        //   prev_text: restData.property_name,
        //   log_text: "- Booking created",
        //   page: "Booking",
        //   action: logAction.add,
        //   table_id: res.data.id,
        //   created_by: props.user.id,
        //   tenant_id: props.currentTenantId,
        //   tenant_template_id: props.currentTenantTemplateId,
        // });
        let imageData;
        // if (property_image instanceof File) {
        //     const uploadRes = await uploadImage(res.data.id, property_image);

        //     imageData = {
        //         property_image: uploadRes?.data?.urlfield,
        //         property_image_name: uploadRes?.data?.filename,
        //     };
        // } else if (!property_image || property_image === "" || property_image === "RDBF") {
        //     const patchRes = await axios.patch(`${property}/${res.data.id}`, {
        //         property_image: dpUrl,
        //         property_image_name: "default",
        //     });

        //     imageData = { property_image: dpUrl, property_image_name: "default" };
        // }
        // toast.success(`${t("booking")} ${c("created")}`);
        // getData();
        // getCount();
        // setStateData({ type: "RESET_STATE" });
        // dispatch({ type: "close" });

        showMessage({
          message: "Booking created!!",
          type: "success",

          duration: 2850
        });
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
  }


  const submitBooking = () => {
    if (isUpdate) {
      updateData()
    } else {
      addData();
    }
  }
  const resetVal = () => {
    setUpdateObj({})
    setIsupdate(false)
    setGuestName('');
    setEmailId('');
    setContactNumber('')
    setNumberOfGuest('')
    setDatePickerDate(new Date())
    setCheckOutDateTime(new Date())
    setBookingAmount('')
    setAdvancePaymentList({ name: "add_advance_Payment", value: [] })
    setBalancePaymentList({
      name: "add_balance_Payment", value: []

    })
    setFoodPackageList({
      name: "food_package", value: []

    })
    setBookingStatus('')
    setStaffVal('')
  }

  const filterTheBookingList = () => {
    setLoader(true)
    getBookingList(setBookingList, tokenId, userId, propertyVal, locationVal)
    // getMarkedDated()
    setCalendarSelectedDate(moment(new Date()).format(dateCalendar))
    closesheet()
  }

  const renderContent = () => (
    openbottomsheet === "Filter" ?
      <View
        style={{
          zIndex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 20,
        }}>

        <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

        <View style={{

          alignSelf: "flex-end", marginTop: 5, justifyContent: "flex-end", flexDirection: "row"
        }} ><TouchableOpacity onPress={() => {
          closesheet()
        }}><Text style={{
          fontSize: 20,

          textAlign: "right",
          flexDirection: "row",
          justifyContent: "center"
        }}>close</Text></TouchableOpacity></View>

        {/* <ScrollView

        > */}

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image resizeMode={"contain"} style={{ width: 20, height: 20, }} source={require('../Assets/Filter.png')} />
          <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>Filters</Text>

        </View>
        <View style={{
          marginTop: 10, zIndex: 2
        }}>
          <View style={{

            flexDirection: "row",

          }}>
            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Location</Text>
            <TouchableOpacity
              style={styles.dropDownClearText}
              onPress={() => {

                setLocationVal(null)
              }}
            >
              <Text style={{ textAlign: "right" }}  >clear</Text>
            </TouchableOpacity>
          </View>

          <Dropdown
            style={[styles.dropdown, { borderColor: 'black' }]}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={
              locationList
            }
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            // placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={locationVal}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log(item.value);
              setLocationVal(item.value)
              setLocationName(item.label)
              // setValue(item.value);
              // setIsFocus(false);
            }}

          />


        </View>
        <View style={{
          marginTop: 10, zIndex: 2, display: "none"
        }}>
          <View style={{

            flexDirection: "row",

          }}>
            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Properties</Text>
            <TouchableOpacity
              style={styles.dropDownClearText}
              onPress={() => {

                setPropertyVal(null)
              }}
            >
              <Text style={{ textAlign: "right" }}  >clear</Text>
            </TouchableOpacity>
          </View>

          <Dropdown
            style={[styles.dropdown, { borderColor: 'black' }]}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={
              propertyList
            }
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            // placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={propertyVal}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log(item.value);
              setPropertyVal(item.value)
              // setValue(item.value);
              // setIsFocus(false);
            }}

          />


        </View>


        <TouchableOpacity
          onPress={() => {
            filterTheBookingList();
          }
          }
          style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "80%", height: 46, justifyContent: "center", borderRadius: 5, margin: 10, zIndex: 0 }} >
          <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
            Submit
            </Text>
        </TouchableOpacity>
        {/* </ScrollView> */}

      </View>
      : openbottomsheet === "statusList" ?
        <View
          style={{
            zIndex: 19999,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            height: "100%",
          }}>
          <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />
          <View style={{

            alignSelf: "flex-end", marginTop: 5, justifyContent: "flex-end", flexDirection: "row"
          }} ><TouchableOpacity onPress={() => {
            closesheet()
          }}><Text style={{
            fontSize: 20,

            textAlign: "right",
            flexDirection: "row",
            justifyContent: "center"
          }}>close</Text></TouchableOpacity></View>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Image resizeMode={"contain"} style={{ width: 20, height: 20, }} source={require('../Assets/Filter.png')} />
            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>Status</Text>

          </View>
          <Dropdown
            style={[styles.dropdown, { borderColor: 'black' }]}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={
              [
                { key: "0", label: "Confirm", value: "2" }, { key: "1", label: "Hold", value: "3" },
                { key: "2", label: "Maintence", value: "4" }
              ]
            }

            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder={'Select status'}
            searchPlaceholder="Search..."
            value={statusVal}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log(item.value);
              setStatusVal(item.value)
              // setValue(item.value);
              // setIsFocus(false);
            }}

          />
          <TouchableOpacity
            onPress={() => {
              // filterTheBookingList();

              if (user.permission_list !== null) {
                if (user.permission_list[0].only_view) {
                  showMessage({
                    message: "Error!",
                    description: "You don't have a permission.",
                    type: "danger",
                    duration: 2850
                  });
                } else {
                  if (isUpdate) {
                    props.navigation.navigate('AddBooking', { item: updateObj })
                  } else {
                    closesheet()
                    console.log(selectedDate);
                    console.log(statusVal);
                    if (statusVal === "2") {
                      props.navigation.navigate('AddBooking', { statusType: '2', propertyId: propertyId, locationId: locationVal, selectedDate: selectedDate, })
                    } else if (statusVal === "3") {
                      props.navigation.navigate('AddBooking', { propertyId: propertyId, locationId: locationVal, selectedDate: selectedDate, statusType: '3' })

                    } else {
                      props.navigation.navigate('AddBooking', { propertyId: propertyId, locationId: locationVal, selectedDate: selectedDate, statusType: '4' })

                    }
                  }

                }
              }

            }
            }
            style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "80%", height: 46, justifyContent: "center", borderRadius: 5, margin: 10, zIndex: 0, top: 10 }} >
            <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
              Submit
            </Text>
          </TouchableOpacity>

        </View > : openbottomsheet === "fewDetails" ?


          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,

              height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 20, color: "#000000", marginLeft: 20 }}>Details </Text>

            </View>

            <ScrollView>

              <View style={{
                marginTop: 10,
                bottom: 15,
                flex: 1, justifyContent: "center",
                flexDirection: "column"
              }}>
                {/* <View> */}
                <View>
                  {/* {props.data.cat_name} */}
                  <Text
                    style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000", marginLeft: 20, top: 10 }}
                  >{updateObj.guest_Name}</Text>
                  <View
                    style={{ top: 10, marginLeft: 20, }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{'\u2022'}</Text>
                      <Text style={{
                        flex: 1, paddingLeft: 5,
                        fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",

                      }}>{updateObj.email_Id}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{'\u2022'}</Text>
                      <Text style={{
                        flex: 1, paddingLeft: 5,
                        fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                      }}>Check-In Date: {moment(updateObj.checkin_Date).format(dbDate)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{'\u2022'}</Text>
                      <Text style={{
                        flex: 1, paddingLeft: 5,
                        fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                      }}>Check-Out Date: {moment(updateObj.checkout_Date).format(dbDate)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{'\u2022'}</Text>
                      <Text style={{
                        flex: 1, paddingLeft: 5,
                        fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                      }}>Tarrif exc GST: {updateObj.tariff_exc_gst}</Text>
                    </View>
                  </View>
                </View>





              </View>

            </ScrollView>
          </View>

          :
          null
  );

  const sheetRef = React.useRef(null);

  const updateReq = (item) => {
    console.log("updatereq: ", item);
    Setopenbottomsheet('Addbooking')
    setbg(true)
    sheetRef.current.snapTo(2)
    setUpdateObj(item)
    setIsupdate(true)
    setGuestName(item.guest_Name);
    setEmailId(item.email_Id);
    setContactNumber(item.contact_Number)
    setNumberOfGuest(item.number_of_Guest.toString())
    setDatePickerDate(item.checkin_Date)
    setCheckOutDateTime(item.checkOutDateTime)
    setBookingAmount(item.booking_Amount.toString())

    // setAdvancePaymentList(item.add_advance_Payment)
    // setBalancePaymentList(item.add_balance_Payment)
    // setFoodPackageList(item.food_package)
    setAdvancePaymentList({ name: "add_advance_Payment", value: item.add_advance_Payment })
    setBalancePaymentList({
      name: "add_balance_Payment", value: item.add_balance_Payment

    })
    setFoodPackageList({
      name: "food_package", value: item.food_package

    })
    setBookingStatus(item.booking_status)
    setStaffVal(item.sales_person_id)
    setSatffName(item.sales_person_Name)
  }

  const filterData = async (date) => {

    let tokenId = user.accessToken;





    // const res = await axios.get(taskList + "?filter=" + JSON.stringify(filter));
    setLoader(true)
    await axios.get(bookingApi,
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {


      const array = response.data.filter(
        (datum) =>
          moment(datum.created_date).format(dbDate) === moment(date).format(dbDate),
      )
      // const taskList = response.data.filter(data =>
      //   propertyId != null && data.property_id === propertyId || duration !== null && data.job_duration_id === duration || status !== null && data.job_status_id === status
      //   || taskTypeVal !== null && data.job_type_id === taskTypeVal || staffVal !== null && data.staff_id === staffVal || locationVal !== null && data.property.location_id === locationVal

      // ).map((data) => {
      //   return {
      //     ...data,
      //     id: data.id,
      //     profile: data.property.property_image,
      //     smallprofile: profileimagesmall,
      //     Area: data.areaOfHouse.area_name,
      //     villaname: data.property.property_name,
      //     place: data.property.location,
      //     purpose: data.jobType.type,
      //     color: "#fc0f1d"
      //   }
      // })

      setBookingList(array)

      // closesheet()
      setLoader(false)

      console.log(taskList.length);
      if (taskList.length === 0) {
        showMessage({
          message: "Data Not Found",
          type: "danger",
          duration: 2850
        });
      }

    }).catch((error) => {
      setLoader(false)
      showMessage({
        message: "Error!",
        description: error,
        type: "danger",
        duration: 2850
      });
      console.log("ERORR: ", error);
    })

  }

  const renderComponent = (item) => {
    return <TouchableOpacity
      onPress={() => {
        // updateReq(item);

        if (user.permission_list !== null) {
          if (user.permission_list[0].only_view) {
            showMessage({
              message: "Error!",
              description: "You don't have a permission.",
              type: "danger",
              duration: 2850
            });
          } else {
            props.navigation.navigate('AddBooking', { item: item.details })
          }
        }


      }}
    >
      <View
        style={[styles.card, styles.shadowProp, styles.elevation]}
      >
        <View
          style={styles.bookingStyle}>
          <Text style={styles.bookingTextstyle}
          >Villa Name: </Text>
          <Text style={styles.bookingTextstyle}
          >
            {item.details.property_name}

          </Text>

        </View>
        <View
          style={styles.bookingStyle}>
          <Text style={styles.bookingTextstyle}
          >Check-In/Check-Out: </Text>
          <Text style={styles.bookingTextstyle}
          >
            {
              item.details.check_in_check_out === "0" ? "Check-In" : "Check-Out"
            }

          </Text>

        </View>


        <View
          style={styles.bookingStyle}>
          <Text style={styles.bookingTextstyle}
          >Food Intrest: </Text>
          <Text style={styles.bookingTextstyle}
          >
            {
              item.details.food_intrest === "0" ? "Potential" : item.details.food_intrest === "1" ? "Maybe" : "Not interested"
            }

          </Text>

        </View>


        <View
          style={styles.bookingStyle}>
          <Text style={styles.bookingTextstyle}
          >Guest Name: </Text>
          <Text style={styles.bookingTextstyle}
          >
            {item.details.guest_Name}

          </Text>

        </View>
        <View style={styles.bookingStyle} >
          <Text style={styles.bookingTextstyle}
          >Check-in date: </Text>
          <Text style={styles.bookingTextstyle}
          >

            {moment(item.details.checkin_Date).format(dbDate)}

          </Text>

        </View>

        <View
          style={styles.bookingStyle}
        >
          <Text
            style={styles.bookingTextstyle}

          >Check-out date: </Text>
          <Text
            style={styles.bookingTextstyle}


          >{
              moment(item.details.checkout_Date).format(dbDate)


            }</Text>

        </View>
        <View
          style={styles.bookingStyle}
        >
          <Text
            style={styles.bookingTextstyle}

          >Staff: </Text>
          <Text style={styles.bookingTextstyle}
          >
            {item.details.sales_person_Name}

            {/* Vimal */}
          </Text>
        </View>
        <View
          style={styles.bookingStyle}>
          <Text style={styles.bookingTextstyle}>Status: </Text>
          <View style={{
            justifyContent: "space-between",
            alignItems: "center", backgroundColor: "red",
            alignItems: "center", backgroundColor: item.details.booking_status === "0" ? "red" : "rgb(124, 36, 237)",
            borderRadius: 5, alignSelf: "center"
          }} >
            <Text style={{
              color: "white", padding: 3,
              fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 12

            }}>
              {/* Pending */}
              {item.details.booking_status === "0" ?
                "Pending" : "Full Payment"}
            </Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>

  }
  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  const loadItems = (day) => {
    console.log("LOAD ITEM: ", day.dateString);
    const items = item || {};
    let date = day.dateString;
    setTimeout(() => {

      // bookingList

      // for (let i = -15; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = timeToString(time);
      //   console.log("STR TIME:", strTime);
      //   if (!items[strTime]) {
      //     items[strTime] = [];

      //     const numItems = Math.floor(Math.random() * 3 + 1);
      //     for (let j = 0; j < numItems; j++) {
      //       items[strTime].push({
      //         name: 'Item for ' + strTime + ' #' + j,
      //         height: Math.max(50, Math.floor(Math.random() * 150)),
      //         day: strTime
      //       });
      //     }
      //   }
      // }

      // const newItems = {};
      // Object.keys(items).forEach(key => {
      //   newItems[key] = items[key];
      // });
      // setItem(newItems)

      setLoader(true)

      let BookingCalArray = item || {

      }
      for (let index = 0; index < bookingList.length; index++) {
        // let date = dateString
        // ngList[index].checkin_Date).format(dateCalendar)
        // new Date();
        // date.toISOString().split('T')[0];
        console.log(date);
        BookingCalArray[date] = []

        for (let index = 0; index < bookingList.length; index++) {
          let innderDate = moment(bookingList[index].checkin_Date).format(dateCalendar)
          if (date === innderDate) {

            BookingCalArray[date].push({
              name: 'Item for ' + date + ' #' + index,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: date,
              details: bookingList[index]
            })
          }

        }

      }

      const newItems = {};
      Object.keys(BookingCalArray).forEach(key => {
        newItems[key] = BookingCalArray[key];
      });
      console.log(newItems);
      setItem(newItems)
      setLoader(false)
    }, 1000);
  }

  const elementButton = (value) => (
    <TouchableOpacity onPress={() => _alertIndex(value)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBooking = (dataBooking, propertyData) => {

    const filterBooking = dataBooking.filter((data, index) => {

    })


  }

  function _alertIndex(value) {
    Alert.alert(`This is column ${value}`);
  }

  const daysName = (dateString) => {
    // console.log(dateString);
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    // console.log("STRI: ", dateString.toString);
    let date = new Date(dateString);

    let day = date.toLocaleString('en-us', { weekday: 'long' });
    // console.log("DAY:", day);
    return dayName
  }

  return (
    <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
      <Loader show={loader} />
      <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
          <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Booking </Text>

          <TouchableOpacity
            style={{
              marginLeft: 'auto',

              borderColor: "white",

            }}
            onPress={() => {
              props.navigation.navigate('BookingCalScreen')
            }}
          >
            <Icon name='calendar' style={{ height: 30, color: "white" }} size={24} />

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginLeft: 'auto',

              marginRight: 5
            }}
            onPress={() => {
              setLoader(true)
              getBookingList(setBookingList, tokenId, userId, propertyVal)
              createDaysListMonthWise()
              // getMarkedDated()
              // setCalendarSelectedDate(moment(new Date()).format(dateCalendar))
              setLoader(false)
            }}
          >
            <Icon name='refresh' style={{ width: 30, height: 30, color: "white" }} size={24} />


          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Setopenbottomsheet('Filter')
            setbg(true)
            sheetRef.current.snapTo(1)
            isBottomSheet = true
          }
          }
          >
            {/* <Image resizeMode={"contain"} style={{ width: 50, height: 50, backgroundColor: "white" }} source={require('../Assets/Filter.png')} /> */}
            <Icon name='filter' style={{ color: "#fff" }} size={24} />
          </TouchableOpacity>

        </View>
        <View>
          <Dropdown
            style={[styles.dropdownMonths, { borderColor: 'black', width: "50%" }]}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={months}

            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'months'}
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
        </View>
      </View>
      {user.permission_list != null ? user.permission_list[0].no_view_booking ? <Permission /> : null : null}


      {

        <ScrollView style={{
        }} >

          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column", width: 40, }}>
              <View style={{ height: 70, }}>
                <Icon name='bank' style={{ color: "#2d9cdb" }} size={40} />
              </View>
              <View  >
                {
                  // console.log("ARRAY PROPERTY ID : ", bookingList.length)

                  daysList.map((data, index) => {
                    return <View style={{ height: 70, borderBottomWidth: 1, alignSelf: "center", flexDirection: "column" }}>
                      {/* <Icon name='calendar-blank' style={{ color: "#2d9cdb", }} size={40} /> */}
                      <Text style={{ fontSize: 13, }}> {
                        // moment(data.checkin_Date).format(dbDate)
                        data.d
                      }</Text>
                      <Text style={{ fontSize: 13, alignSelf: "center" }}> {daysName(data.date)}</Text>

                    </View>
                  })

                }

              </View>


            </View>
            <ScrollView horizontal>
              <View style={{
                flexDirection: "column"
              }}>

                <View style={{
                  height: 70,
                }}>
                  <View style={{ flexDirection: "row", borderBottomWidth: 1, height: 20, }}>

                    <View style={{ flexDirection: "column", }}  >
                      <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}>
                        {/* <View> */}
                        <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>{locationName}</Text>
                        {/* </View> */}
                        {/* <Text> |</Text> */}

                      </View>

                    </View>
                    {/* {
                    locationList.map((data, index) => {
                      let size = 60;
                      const array = propertyList.filter(
                        (datum) => datum.location_id === data.location_id,
                      )
                      console.log("LENG:  ", array.length);
                      if (array.length === 0) {
                        size = 60
                      } else {
                        if (array.length === 1) {
                          size = 120
                        } else {
                          size = size * array.length
                        }
                      }
                      // array.length > 0 ? 60 * array.length : 60
                      return <View style={{ flexDirection: "column", }}  >
                        <View key={index} style={{ flexDirection: "row", }}>
                          <View>
                            <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", paddingHorizontal: size }}>{data.location_name}</Text>
                          </View>
                          <Text> |</Text>

                        </View>

                      </View>
                    })
                  } */}
                  </View>


                  {/* first */}
                  <View style={{ flexDirection: "row", borderBottomWidth: 1, height: 30, marginHorizontal: 10, marginTop: 10, }}>
                    {
                      propertyList.map((data, index) => {

                        return <View style={{
                          marginTop: 10, flexDirection: "row",
                          width: 200,
                          // backgroundColor: "yellow",
                          borderRightWidth: 1,
                          justifyContent: "center",

                        }}
                        ><Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", textAlign: "center" }}>{data.label}</Text>
                          {/* <Text style={{ fontSize: 20 }}>|</Text> */}

                        </View>
                      })
                    }

                  </View>
                  {/* ROW  */}
                </View>
                {

                  daysList.map((dataBooking, index) => {
                    return <View style={{ flexDirection: "row", height: 70, marginHorizontal: 10, }}>
                      {/* <View style={{ marginTop: 10, height: 70, borderBottomWidth: 1 }}>
                        {/* <Icon name='calendar-blank' style={{ color: "#2d9cdb", }} size={40} /> */}
                      {/* <Text style={{ fontSize: 13, alignSelf: "center" }}> {index + 1}</Text>
                        <Text style={{ fontSize: 13, alignSelf: "center" }}> Mon</Text>

                      </View> */}


                      {
                        propertyList.map((dataProperty, index) => {

                          // const array = bookingList.filter(
                          //   (datum) => moment(datum.checkin_Date).format(dbDate) === dataDate && datum.propety_id === dataProperty.id,
                          // )


                          // array.map((data, index) => {

                          // <TouchableOpacity
                          //   onPress={() => {
                          //     if (dataBooking.property_id === dataProperty.id) {
                          //       console.log("YES");
                          //     } else {
                          //       console.log("NO");
                          //     }
                          //   }}
                          // >
                          return <TouchableOpacity onPress={() => {
                            console.log(dataBooking);
                            if (dataBooking.booking.length > 0) {
                              if (dataBooking.booking[0].property_id === dataProperty.id) {
                                if (user.permission_list != null) {
                                  if (user.permission_list[0].view_access_given_per_individual_property) {
                                    setUpdateObj(dataBooking.booking[0])
                                    Setopenbottomsheet('fewDetails')
                                    setbg(true)
                                    sheetRef.current.snapTo(1)
                                    isBottomSheet = true
                                  } else {
                                    setUpdateObj(dataBooking[0])
                                    setIsupdate(true)
                                    props.navigation.navigate('AddBooking', { item: dataBooking.booking[0] })
                                  }
                                }

                              } else {
                                if (user.permission_list != null) {
                                  if (user.permission_list[0].view_access_given_per_individual_property) {
                                    // setUpdateObj(dataBooking.booking[0])
                                    // Setopenbottomsheet('fewDetails')
                                    // setbg(true)
                                    // sheetRef.current.snapTo(1)

                                    showMessage({
                                      message: "Failed!!",
                                      description: "You dont have a permission",
                                      type: "danger",
                                      duration: 2850
                                    });
                                  } else {
                                    setSelectedDate(dataBooking.date)
                                    setPropertyId(dataProperty.id)
                                    Setopenbottomsheet('statusList')
                                    setbg(true)
                                    sheetRef.current.snapTo(1)
                                    isBottomSheet = true
                                  }
                                }

                              }

                            } else {
                              if (user.permission_list != null) {
                                if (user.permission_list[0].view_access_given_per_individual_property) {

                                  showMessage({
                                    message: "Failed!!",
                                    description: "You dont have a permission",
                                    type: "danger",
                                    duration: 2850
                                  });
                                } else {
                                  setSelectedDate(dataBooking.date)
                                  setPropertyId(dataProperty.id)
                                  Setopenbottomsheet('statusList')
                                  setbg(true)
                                  sheetRef.current.snapTo(1)
                                  isBottomSheet = true
                                }
                              }


                            }
                          }}>
                            <View style={{
                              flexDirection: "row", width: 200, height: 70
                              , justifyContent: "space-between", borderRightWidth: 1, marginVertical: 3,
                              borderBottomWidth: 1
                            }}>

                              <View style={{ paddingHorizontal: 3, marginVertical: 5, paddingHorizontal: 30, }}>
                                {/* <View> */}
                                <View style={{ flexDirection: "column" }}>
                                  <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>
                                    {/* {dataProperty.property_name} */}
                                    {
                                      // let details = bookin
                                      dataBooking.booking.length > 0 ? dataBooking.booking[0].property_id === dataProperty.id ? dataBooking.booking[0].guest_Name : '' : ''

                                      // if (dataBooking.property_id === dataProperty.id) {
                                      //   console.log("YES");
                                      // } else {
                                      //   console.log("NO");
                                      // }


                                    }
                                  </Text>

                                  <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", color: "#2d9cdb" }}>
                                    {/* {dataDate} */}
                                    {

                                      dataBooking.booking.length > 0 ? dataBooking.booking[0].property_id === dataProperty.id ? moment(dataBooking.booking[0].checkin_Date).format(dbDate) : '' : ''

                                    }
                                  </Text>
                                </View>
                                <View>
                                  {dataBooking.booking.length > 0 ? dataBooking.booking[0].property_id === dataProperty.id ? <View
                                  // style={styles.bookingStyle}

                                  >
                                    {/* <Text style={styles.bookingTextstyle}>Status: </Text> */}
                                    <View style={{
                                      justifyContent: "space-between",
                                      alignItems: "center", backgroundColor: "red",
                                      alignItems: "center", backgroundColor: dataBooking.booking[0].booking_status === "0" ? "#2D9cDB" : dataBooking.booking[0].booking_status === "1" ? "brown" : dataBooking.booking[0].booking_status === "2" ? "blue" : dataBooking.booking[0].booking_status === "3" ? "red" : "yellow",
                                      borderRadius: 5, alignSelf: "center"
                                    }} >
                                      <Text style={{
                                        color: dataBooking.booking[0].booking_status === '4' ? 'black' : "white", padding: 3,
                                        fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 12

                                      }}>
                                        {/* Pending */}
                                        {dataBooking.booking[0].booking_status === "0" ?
                                          "Pending" : dataBooking.booking[0].booking_status === "1" ? "Full payment" : dataBooking.booking[0].booking_status === "2" ? "Confirmed" : dataBooking.booking[0].booking_status === "3" ? "On Hold" : "Maintainence"
                                        }
                                      </Text>
                                    </View>
                                  </View> : null : null
                                  }

                                </View>
                                {/* </View> */}
                              </View>
                              <Icon name='chevron-right' style={{ marginTop: 10, color: "#000" }} size={25} />
                              {/* </TouchableOpacity> */}
                            </View>
                          </TouchableOpacity>
                        })

                      }



                    </View>
                  })
                }

                {/* <View style={{ flexDirection: "row", borderBottomWidth: 1, height: 60, marginHorizontal: 10, }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderRightWidth: 1, marginVertical: 3 }}>
                  <View style={{ paddingHorizontal: 31, marginVertical: 5 }}>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>Sushil</Text>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", color: "#2d9cdb" }}>Mayank</Text>
                  </View>
                  <Icon name='chevron-right' style={{ marginTop: 10, color: "#000" }} size={25} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderRightWidth: 1, marginVertical: 3 }}>
                  <View style={{ paddingHorizontal: 38, marginVertical: 5 }}>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>Vineet</Text>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", color: "#2d9cdb" }}>Mehul</Text>
                  </View>
                  <Icon name='chevron-right' style={{ marginTop: 10, color: "#000" }} size={25} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderRightWidth: 1, marginVertical: 3 }}>
                  <View style={{ paddingHorizontal: 31, marginVertical: 5 }}>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>Pratik</Text>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", color: "#2d9cdb" }}>Gaurav</Text>
                  </View>
                  <Icon name='chevron-right' style={{ marginTop: 10, color: "#000" }} size={25} />
                </View>


                <View style={{ flexDirection: "row", justifyContent: "space-between", borderRightWidth: 1, marginVertical: 3 }}>
                  <View style={{ paddingHorizontal: 48, marginVertical: 5 }}>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>Akshay</Text>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", color: "#2d9cdb" }}>Karan</Text>
                  </View>
                  <Icon name='chevron-right' style={{ marginTop: 10, color: "#000" }} size={25} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 3 }}>
                  <View style={{ paddingHorizontal: 48, marginVertical: 5 }}>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", }}>Aunbhav</Text>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular", color: "#2d9cdb" }}>Ronak</Text>
                  </View>
                  <Icon name='chevron-right' style={{ marginTop: 10, color: "#000" }} size={25} />
                </View>
              </View> */}
                {/* second */}

              </View>



            </ScrollView>

          </View>
          {/* </View> */}

        </ScrollView>

      /* <Agenda
        items={
          item
          //   {
          //   '2022-05-22': [{ name: 'item 1 - any js object' }],
          //   '2022-05-23': [{ name: 'item 2 - any js object', height: 80 }],
          //   '2022-05-24': [],
          //   '2022-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
          // }
        }
        // hideKnob={false}
        // minDate={'2022-01-01'}
        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2022-06-01'}

        // pastScrollRange={5}
        // futureScrollRange={5}
        refreshing={true}

        markedDates={markedDate.obj}
        loadItemsForMonth={month => {
          loadItems(month)
          // console.log('trigger items loading');
        }}
        selected={calendarSelectedDate}
        renderItem={(item, firstItemInDay) => {
          return renderComponent(item);

        }}
        renderEmptyDate={() => {
          return <View >
            <Text>Booking is not available!!</Text>
          </View>;
        }}
        rowHasChanged={(r1, r2) => {
          return r1.name !== r2.name;
        }}

        onDayPress={day => {
          console.log('day pressed: ', day);
          setLoader(true)
          setCalendarSelectedDate(day.dateString)
        }}
        showClosingKnob={true}
      // disableMonthChange={true}
      // enableSwipeMonths={true}
      /> */}

      {
        user.permission_list != null ? !user.permission_list[0].only_view ? !user.permission_list[0].view_access_given_per_individual_property ? < TouchableOpacity
          onPress={() => {
            // console.log("asdasS");
            // Setopenbottomsheet('Addbooking')
            // setbg(true)
            // sheetRef.current.snapTo(2)

            props.navigation.navigate('AddBooking')
          }}
          style={{ borderWidth: 0.5, borderRadius: 25, height: 50, width: 50, alignSelf: "center", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 25, right: 20, backgroundColor: "#fff" }}>
          <Icon name='plus' style={{ color: "#000" }} size={50} />
        </TouchableOpacity> : null :
          null : null
      }
      <BottomSheet
        style={{
          backgroundColor: "#000000bf", opacity: 0.75
        }}
        ref={sheetRef}
        snapPoints={[0, , "45%", "40%"]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
        onCloseEnd={closesheet}
        renderContent={renderContent}
      />
    </SafeAreaView >



  );
};

export default Booking_Screen;
const styles = StyleSheet.create({
  bookingTextstyle: {
    fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 12, color: "#000000"
  }
  ,
  card: {

    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: 8,
    marginRight: 8,
    margin: 8,
    width: '95%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  bookingStyle: {
    flex: 1,
    flexDirection: "row",
    margin: 5
  },
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
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownMonths: {

    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    margin: 5
  },
  dropDownClearText: {
    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 12, color: "black",
    marginLeft: 'auto',
    borderRadius: 8,
    justifyContent: "center",
    margin: 2

  },

  containerTable: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 1, backgroundColor: '#c8e1ff' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText: { marginRight: 6, textAlign: 'right' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' }

});
