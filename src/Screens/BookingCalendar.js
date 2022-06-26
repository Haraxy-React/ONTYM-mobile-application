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
const BookingCalendar = (props) => {
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
    const sheetRef = React.useRef(null);

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


    useEffect(() => {
        if (user.permission_list != null) {
            if (!user.permission_list[0].view_access_given_per_individual_property) {
                if (locationVal != null) {
                    setLoader(true)
                    getpropertyList(setPropetyList, tokenId, locationVal)
                    // createDaysListMonthWise();
                    setLoader(false)

                }
            }
        }


    }, [locationVal])


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

        // createDaysListMonthWise();
        setLoader(false)

        console.log("BOOKING LIST : ", bookingList);




    }, []);


    function obj() {
        obj = new Object();
        this.add = function (key, value) {
            obj["" + key + ""] = value;
        }
        this.obj = obj
    }

    const getMarkedDated = () => {

        let my_obj = new obj();
        console.log("book LIST: ", bookingList.length);
        for (let index = 0; index < bookingList.length; index++) {
            let date = moment(bookingList[index].checkin_Date).format(dateCalendar)
            let obj = bookingList[index];
            let dateList = bookingList[index].booking_date_list;
            for (let index = 0; index < dateList.length; index++) {
                let element = dateList[index];
                element = String(element).split('-');
                // console.log(element);

                // // moment(element).format(dateCalendar)
                element = element[2] + "-" + element[1] + "-" + element[0]
                // console.log(element);

                my_obj.add([`${element}`], { marked: true }, { obj })
                // setMarkedDate(Object.assign({
                //     ...markedDate,
                //     [`${element}`]: { marked: true }
                // }))

                // console.log("MY OBJ: ", my_obj);
            }

            // new Date();
            // date.toISOString().split('T')[0];

            // for (let index = 0; index < bookingList.length; index++) {
            // let innderDate = moment(bookingList[index].checkin_Date).format(dateCalendar)
            // if (date === innderDate) {
            // my_obj.add([`${date}`], { marked: true })
            // setMarkedDate(Object.assign({
            //     ...markedDate,
            //     [`${date}`]: { marked: true }
            // }))

            // BookingCalArray[date].push({
            //   name: 'Item for ' + date + ' #' + index,
            //   height: Math.max(50, Math.floor(Math.random() * 150)),
            //   day: date,
            //   details: bookingList[index]
            // })
            // }

            // }

        }

        setMarkedDate(my_obj)
        setLoader(false)
        console.log("MARKED: ", my_obj);
        setLoader(false)
    }


    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            getMarkedDated();

        }, 2000);
    }, [bookingList])


    const opensheet = () => {
        setbg(true)
    }
    const closesheet = () => {
        setLoader(true)
        setbg(false)
        sheetRef.current.snapTo(0)
        setLoader(false)
        // resetVal()
    }



    const renderContent = () => (
        openbottomsheet === "Filter" ?
            <View
                style={{
                    zIndex: 1,
                    backgroundColor: '#fff',
                    paddingHorizontal: 20,
                    height: "100%",
                }}>

                <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />


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



    const loadItems = (day) => {
        console.log("LOAD ITEM: ", day.dateString);
        const items = item || {};
        let date = day.dateString;
        setTimeout(() => {
            let element = String(date).split('-');
            element = element[2] + "-" + element[1] + "-" + element[0]

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
            // for (let index = 0; index < bookingList.length; index++) {
            // let date = dateString
            // ngList[index].checkin_Date).format(dateCalendar)
            // new Date();
            // date.toISOString().split('T')[0];
            // console.log(date);
            BookingCalArray[date] = []


            const filterData = bookingList.filter(
                (i) =>

                    i.booking_date_list.includes(element)
            );
            console.log("FILTER DATA: ", filterData);
            BookingCalArray[date].push(
                {
                    name: 'Item for ' + date + ' #' + 0,
                    height: Math.max(50, Math.floor(Math.random() * 150)),
                    day: date,
                    details: filterData[0]
                }

            )
            // for (let index = 0; index < bookingList.length; index++) {
            //     let innderDate = moment(bookingList[index].checkin_Date).format(dateCalendar)
            //     let dateList = bookingList[index].booking_date_list;
            //     console.log(date);
            //     console.log("QWWE: ", dateList);
            //     console.log("DATE123:", dateList.includes(date));


            // if (dateList.includes(date)) {
            //     console.log("DATE123:", date);
            //     BookingCalArray[date].push({
            //         name: 'Item for ' + date + ' #' + index,
            //         height: Math.max(50, Math.floor(Math.random() * 150)),
            //         day: date,
            //         details: bookingList[index]
            //     })
            // }

            // }

            // }

            const newItems = {};
            Object.keys(BookingCalArray).forEach(key => {
                newItems[key] = BookingCalArray[key];
            });
            console.log("BookingCalArray:", newItems);
            setItem(newItems)
            setLoader(false)
        }, 1000);
    }

    const renderComponent = (item) => {

        console.log("ITEMcycy: ", item
        );
        // item.details = item.details[0]
        // if (typeof item.details === 'undefined') {
        //     return <View >
        //         <Text>Booking is not available!!</Text>
        //     </View>;
        // } else {

        return <TouchableOpacity
            onPress={() => {
                // updateReq(item);

                // if (user.permission_list !== null) {
                //     if (user.permission_list[0].only_view) {
                //         showMessage({
                //             message: "Error!",
                //             description: "You don't have a permission.",
                //             type: "danger",
                //             duration: 2850
                //         });
                //     } else {
                //         props.navigation.navigate('AddBooking', { item: item.details })
                //     }
                // }


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
                        {item.details?.property_name}

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
                        alignItems: "center", backgroundColor: item.details.booking_status === "0" ? "#2D9cDB" : item.details.booking_status === "1" ? "brown" : item.details.booking_status === "2" ? "blue" : item.details.booking_status === "3" ? "red" : "yellow",
                        borderRadius: 5, alignSelf: "center"
                    }} >
                        <Text style={{
                            color: item.details.booking_status === '4' ? 'black' : "white", padding: 3,
                            fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 12

                        }}>
                            {/* Pending */}
                            {
                                item.details.booking_status === "0" ?
                                    "Pending" : item.details.booking_status === "1" ? "Full payment" : item.details.booking_status === "2" ? "Confirmed" : item.details.booking_status === "3" ? "On Hold" : "Maintainence"
                            }
                        </Text>
                    </View>
                </View>

            </View>


        </TouchableOpacity>

        // }

    }


    return (
        <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
            <Loader show={loader} />
            <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
                <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
                    <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Booking </Text>

                    {/* <TouchableOpacity
                        style={{
                            marginLeft: 'auto',

                            borderColor: "white",

                        }}
                        onPress={() => {

                        }}
                    >
                        <Icon name='calendar' style={{ width: 30, height: 30, color: "white" }} size={24} />

                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={{
                            marginLeft: 'auto',

                            marginRight: 5
                        }}
                        onPress={() => {
                            setLoader(true)
                            getBookingList(setBookingList, tokenId, userId, propertyVal)
                            // createDaysListMonthWise()
                            // getMarkedDated()
                            // setCalendarSelectedDate(moment(new Date()).format(dateCalendar))
                            setLoader(false)
                        }}
                    >
                        <Icon name='refresh' style={{ width: 30, height: 30, color: "white" }} size={24} />


                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => {
                        Setopenbottomsheet('Filter')
                        setbg(true)
                        sheetRef.current.snapTo(1)
                    }
                    }
                    >
                        
                        <Icon name='filter' style={{ color: "#fff" }} size={24} />
                        
                    </TouchableOpacity> */}

                </View>
            </View>
            {user.permission_list != null ? user.permission_list[0].no_view_booking ? <Permission /> : null : null}



            {/* <Calendar

                markedDates={markedDate.obj}

            /> */}

            <Agenda
                items={
                    item
                    // {
                    //     '2022-05-22': [{ name: 'item 1 - any js object' }],
                    //     '2022-05-23': [{ name: 'item 2 - any js object', height: 80 }],
                    //     '2022-05-24': [],
                    //     '2022-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
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
                    if (typeof item.details === 'undefined') {
                        return <View >
                            <Text>Booking is not available!!</Text>
                        </View>;
                    } else {

                        console.log("ITEM 123X", item);

                        return renderComponent(item);
                    }


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
            />


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
                ref={sheetRef}
                snapPoints={[0, , "88%", "40%"]}
                borderRadius={20}
                onOpenEnd={opensheet}
                initialSnap={0}
                onCloseEnd={closesheet}
                renderContent={renderContent}
            />
        </SafeAreaView >



    );

}

export default BookingCalendar;

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
