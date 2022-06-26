import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StyleSheet, StatusBar, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { log } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";

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


import { dateCalendar, dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime } from "../Components/datetimeFormat";
import axios from 'axios';
import moment from "moment"
import momentTZ from "moment-timezone";
import Loader from "../../src/Components/loader";
import { useSelector, useDispatch } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import { getBookingList, staffListFunction, getpropertyList, pickImage, getLocationList, getBankList } from "../Components/getFunction";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';

import { DynamicAddAdvancePayment } from "../Components/DynamicAddAdvancePayment";
import { DynamicBalancePayment } from "../Components/DynamicBalancePayment";
import { DynamicFoodPackage } from "../Components/DynamicFoodPackage";
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
import { Checkbox, TextInput, RadioButton } from 'react-native-paper';
import { DataTable } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker'
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

const AddBoking = (props) => {
    const [checked, setChecked] = React.useState('first');

    const [markedDate, setMarkedDate] = useState({})
    const [calendarSelectedDate, setCalendarSelectedDate] = useState(moment(new Date()).format(dateCalendar))
    const [page, setPage] = React.useState(0);
    // const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    // const from = page * numberOfItemsPerPage;
    // const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
    // React.useEffect(() => {
    //     setPage(0);
    // }, [numberOfItemsPerPage]);
    const [propertyList, setPropetyList] = useState([])
    const [paymentStatus, setpaymentStatus] = useState('');
    // const propertyId = props.route.params.item.id;
    // const propertyName = props.route.params.item.property_name;
    // console.log(props.route.params);
    const [loader, setLoader] = useState(false);
    const {
        user
    } = useSelector(state => state.loginReducer);
    const tokenId = user.accessToken;
    const userId = user.userData.id;
    const [item, setItem] = useState(undefined)
    const [guestName, setGuestName] = useState('');
    const [propertyVal, setPropertyVal] = useState(null);
    const [checkInCheckout, setCheckInCheckOut] = useState('');
    const [propertyName, setPropertyName] = useState('');

    const [securityDeposit, setSecurityDeposit] = useState('')
    const [paymentForDamage, setPaymentForDamage] = useState('')
    const [tarricExcGst, setTarricExcGst] = useState('')
    const [emailId, setEmailId] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [numberOfGuest, setNumberOfGuest] = useState(0)
    const [bookingAmount, setBookingAmount] = useState(0);
    const [staffName, setSatffName] = useState('');
    const [updateObj, setUpdateObj] = useState({})
    const [datePickerDate, setDatePickerDate] = useState(new Date());
    const [displaymode, setMode] = useState('datetime');
    const [filterDate, setFilterDate] = useState(new Date());
    const [showFilterDatePicker, setFilterDatePicker] = useState(false);
    const [showCheckInDate, setShowCheckInDate] = useState(false)
    const [text, setText] = React.useState("")
    const [showCheckOutDate, setShowCheckOutDate] = useState(false)
    const [checkOutDateTime, setCheckOutDateTime] = useState(new Date());
    const [bookingList, setBookingList] = useState([])
    const [staffList, setStaffList] = useState([]);
    const [staffVal, setStaffVal] = useState(null);
    const [locationList, setLocationList] = useState([]);
    const [bankList, setbankList] = useState([]);
    const [locationVal, setLocationVal] = useState('')
    const [locationName, setLocationName] = useState('');
    const [foodIntrestVal, setFoodIntrestVal] = useState('');
    const [bookingStatus, setBookingStatus] = useState(null)
    const [openBookingStatus, setOpenBookingStatus] = useState(false)
    // const []
    const [openStaffDropDown, setOpenStaffDropDown] = useState(false);
    const [isUpdate, setIsupdate] = useState(false)
    const [currentDate, setCurrentDate] = useState('');
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


    const [bg, setbg] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [openbottomsheet, Setopenbottomsheet] = useState('');
    const [properties, setproperties] = useState()
    const [image, setImage] = useState('');
    const [imageObj, setImageObj] = useState({});

    useEffect(() => {
        // setLoader(false)
        setCurrentDate('December');
        getpropertyList(setPropetyList, tokenId)

        staffListFunction(setStaffList, tokenId)

        getLocationList(setLocationList, tokenId)
        console.log("USER PERMISSION : 123", user.permission_list);

        getBankList(setbankList, tokenId)
        // console.log(bookingList);
    }, []);

    useEffect(() => {
        if (typeof props.route.params !== "undefined") {
            console.log("PROPS ITEM: ", props.route.params.item);
            if (typeof props.route.params.item !== "undefined") {
                // console.log("PROPS ITEM INNER: ", typeof props.route.params.item);
                updateReq(props.route.params.item)
            } else {
                console.log(props.route.params.selectedDate);
                console.log(typeof props.route.params.selectedDate);
                let checkInDate = new Date(props.route.params.selectedDate);

                let statusType = props.route.params.statusType;
                console.log("TYPE:", statusType);
                setBookingStatus(statusType)
                setDatePickerDate(checkInDate)
                var dateString = "10/23/2015"; // Oct 23
                setLocationVal(props.route.params.locationId)
                setPropertyVal(props.route.params.propertyId)
                var dateObject = new Date(dateString);
                console.log(checkInDate.toString());
                if (statusType === "2") {
                    // CONFIRM BOOKING
                }
                else if (statusType === "3") {

                }
                else if (statusType === "4") {
                    setGuestName("N/A")
                    setEmailId("N/A")
                }


            }
        }
    }, [props.route.params])

    const updateReq = (item) => {
        console.log("updatereq: ", item);
        setpaymentStatus(item.payment_status)
        setUpdateObj(item)
        setIsupdate(true)
        setGuestName(item.guest_Name);
        setEmailId(item.email_Id);
        setContactNumber(item.contact_Number)
        setNumberOfGuest(item.number_of_Guest.toString())
        setDatePickerDate(item.checkin_Date)
        setCheckOutDateTime(item.checkOutDateTime)
        setBookingAmount(item.booking_Amount.toString())
        setPropertyVal(item.property_id)
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
        setFoodIntrestVal(item.food_intrest)
        setCheckInCheckOut(item.check_in_check_out)
        setImage(item.image)
        setLocationName(item.setLocationName)
        setLocationVal(item.location_id)
        setSecurityDeposit(item.security_deposit)
        setPaymentForDamage(item.payment_for_damage)
        setTarricExcGst(item.tariff_exc_gst)
    }



    const updateData = async () => {



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
            food_intrest: foodIntrestVal,
            check_in_check_out: checkInCheckout,
            location_id: locationVal,
            location_name: locationName,
            tariff_exc_gst: tarricExcGst,
            payment_for_damage: paymentForDamage,
            security_deposit: securityDeposit,
            payment_status: paymentStatus,

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
                if (typeof imageObj.uri !== "undefined") {
                    setLoader(true)
                    const response = await fetch(imageObj.uri)
                    const blobSol = await response.blob();

                    const uploadRes = await uploadFilesOnFirestorage(setLoader, updateObj.id, blobSol);
                    let newFormValues = uploadRes;


                    await axios.patch(`${bookingApi}/${updateObj.id}`, {
                        image: newFormValues
                    },
                        {
                            headers:
                            {
                                "Authorization": `Bearer ${user.accessToken}`
                            }
                        }
                    ).then((res) => {
                        setImageObj({})
                        console.log("SUcc: ", res);
                    }
                    )
                }
                showMessage({
                    message: "Booking updated!!",
                    type: "success",

                    duration: 2850
                });
                props.navigation.pop();
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
            sales_person_Name: user.userData.firstName,
            sales_person_id: user.userData.id,
            created_by: user.userData.id,
            property_name: propertyName,
            created_date: new Date(),
            property_id: propertyVal,
            food_intrest: foodIntrestVal,
            check_in_check_out: checkInCheckout,
            image: '',
            payment_status: paymentStatus,
            location_id: locationVal,
            location_name: locationName,
            tariff_exc_gst: tarricExcGst,
            payment_for_damage: paymentForDamage,
            security_deposit: securityDeposit
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

                if (typeof imageObj.uri !== "undefined") {
                    setLoader(true)
                    const response = await fetch(imageObj.uri)
                    const blobSol = await response.blob();

                    const uploadRes = await uploadFilesOnFirestorage(setLoader, res.data.id, blobSol);
                    let newFormValues = uploadRes;


                    await axios.patch(`${bookingApi}/${res.data.id}`, {
                        image: newFormValues
                    },
                        {
                            headers:
                            {
                                "Authorization": `Bearer ${user.accessToken}`
                            }
                        }
                    ).then((res) => {
                        setImageObj({})
                        console.log("SUcc: ", res);
                    }
                    )
                }

                showMessage({
                    message: "Booking created!!",
                    type: "success",

                    duration: 2850
                });
                props.navigation.pop()
                resetVal()
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
        setLocationVal(null)
        setLocationName(null)
    }



    const submitBooking = () => {
        if (isUpdate) {
            updateData()
        } else {
            addData();
        }
    }

    // 2D9cDB

    return (
        <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
            <Loader show={loader} />
            <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
                <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
                    <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Add Booking </Text>


                </View>
            </View>

            <View
                style={{
                    zIndex: 19999,
                    backgroundColor: '#fff',
                    paddingHorizontal: 20,
                    height: "100%",
                    paddingBottom: 100
                }}>



                <ScrollView>


                    <TextInput
                        label="Guest Name"
                        mode="outlined"
                        value={guestName}
                        onChangeText={text => setGuestName(text)}
                        style={{ marginTop: 20 }}
                        editable={

                            user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields ? false : true : false
                        }
                    />
                    <TextInput
                        label="E-mail Id"
                        mode="outlined"
                        value={emailId}
                        keyboardType="email-address"
                        onChangeText={text => setEmailId(text)}
                        style={{ marginTop: 20 }}
                        editable={

                            user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields ? false : true : false
                        }
                    />
                    <TextInput
                        label="Contact Number"
                        mode="outlined"
                        keyboardType="name-phone-pad"
                        value={contactNumber}
                        onChangeText={text => setContactNumber(text)}
                        style={{ marginTop: 20 }}
                        editable={

                            user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields ? false : true : false
                        }

                    />
                    <TextInput
                        keyboardType="numeric"
                        label="Number of guest"
                        mode="outlined"
                        value={numberOfGuest}
                        onChangeText={text => setNumberOfGuest(text)}
                        style={{ marginTop: 20 }}
                        editable={

                            user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields ? false : true : false
                        }
                    />
                    <TextInput
                        label="Check-In Date"
                        mode="outlined"

                        editable={false}
                        value={moment(datePickerDate).format(dbDateTime)}
                        onChangeText={text => setText(text)}
                        style={{ marginTop: 20 }}
                        right={<TextInput.Icon name="calendar-multiselect" onPress={() => {



                            if (user.permission_list != null) {
                                if (user.permission_list[0].view_only_edt_few_fields) {
                                    showMessage({
                                        message: "Failed!!",
                                        description: "YOU DON'T HAVE A PERMISSION.",
                                        type: "danger",
                                        duration: 2850
                                    });
                                } else {
                                    setLoader(true)

                                    setShowCheckInDate(true)
                                }
                            } else {

                            }

                            // DateTimePickerAndroid.open({ params: AndroidNativeProps })
                            // DateTimePickerAndroid.open({
                            //   value: datePickerDate,
                            //   onChange,
                            //   mode: 'date',
                            //   is24Hour: true
                            // })
                        }} />} />
                    {showCheckInDate ?
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={datePickerDate}
                            mode={displaymode}
                            is24Hour={true}

                            display="default"
                            onChange={(event, selectedValue) => {
                                // setShowCheckInDate(false)
                                setShowCheckInDate(Platform.OS === 'ios');
                                if (displaymode == 'date') {
                                    const currentDate = selectedValue || new Date();
                                    setDatePickerDate(currentDate);
                                    setMode('time');
                                    setShowCheckInDate(Platform.OS !== 'ios'); // to show the picker again in time mode
                                    setLoader(false)
                                } else {
                                    const selectedTime = selectedValue || new Date();
                                    setDatePickerDate(selectedTime);
                                    console.log("TIME: ", selectedTime);
                                    setShowCheckInDate(Platform.OS === 'ios');
                                    setMode('date');
                                    setLoader(false)
                                }

                            }} /> : null}
                    <TextInput
                        label="Check-Out Date"
                        mode="outlined"
                        value={
                            moment(checkOutDateTime).format(dbDateTime)
                        }
                        editable={false}

                        onChangeText={text => setText(text)}
                        style={{ marginTop: 20 }}
                        right={<TextInput.Icon name="calendar-multiselect"
                            onPress={() => {
                                if (user.permission_list != null) {
                                    if (user.permission_list[0].view_only_edt_few_fields) {
                                        showMessage({
                                            message: "Failed!!",
                                            description: "YOU DON'T HAVE A PERMISSION.",
                                            type: "danger",
                                            duration: 2850
                                        });
                                    } else {
                                        setLoader(true)

                                        setShowCheckOutDate(true)
                                    }
                                }


                            }}
                        />} />

                    <TextInput
                        label="Booking Amount"
                        mode="outlined"
                        disabled={bookingStatus === "3" ? true : false}
                        value={bookingAmount}
                        onChangeText={text => setBookingAmount(text)}
                        style={{ marginTop: 20 }} />

                    {showCheckOutDate ?
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={checkOutDateTime}
                            mode={displaymode}
                            is24Hour={true}

                            display="default"
                            onChange={(event, selectedValue) => {
                                // setShowCheckInDate(false)
                                setShowCheckOutDate(Platform.OS === 'ios');
                                if (displaymode == 'date') {
                                    const currentDate = selectedValue || new Date();
                                    setCheckOutDateTime(currentDate);
                                    setMode('time');
                                    setShowCheckOutDate(Platform.OS !== 'ios'); // to show the picker again in time mode
                                    setLoader(false)
                                } else {
                                    const selectedTime = selectedValue || new Date();
                                    setCheckOutDateTime(selectedTime);

                                    setShowCheckOutDate(Platform.OS === 'ios');
                                    setMode('date');
                                    setLoader(false)
                                }

                            }} /> : null}
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
                                    setLocationName(null)
                                    getpropertyList(setPropetyList, tokenId)

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
                                getpropertyList(setPropetyList, tokenId, item.value)
                                // setValue(item.value);
                                // setIsFocus(false);
                            }}
                            disable={

                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? true : false : false

                            }

                        />


                    </View>

                    <View style={{
                        marginTop: 10, zIndex: 2
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
                                setPropertyName(item.label)
                                // setValue(item.value);
                                // setIsFocus(false);
                            }}
                            disable={

                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? true : false : false

                            }
                        />


                    </View>


                    {bookingStatus !== "3" ? <DynamicAddAdvancePayment
                        advancePaymentList={advancePaymentList}
                        setAdvancePaymentList={setAdvancePaymentList}
                        objUpdate={updateObj}
                        bankList={bankList}
                    /> : <View></View>}

                    {bookingStatus !== "3" ? <DynamicBalancePayment
                        addBalancePaymentList={addBalancePaymentList}
                        setBalancePaymentList={setBalancePaymentList}
                        objUpdate={updateObj}
                        bankList={bankList}

                    />

                        : <View></View>
                    }
                    <View style={{ paddingTop: 15, }}>
                        <Dropdown
                            style={[styles.dropdown, { borderColor: 'black' }]}
                            // placeholderStyle={styles.placeholderStyle}
                            // selectedTextStyle={styles.selectedTextStyle}
                            // inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={[
                                { key: "2", label: "Confirm", value: "2" }, { key: "3", label: "Hold", value: "3" }, { key: "4", label: "Maintenance", value: "4" }

                            ]}


                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Booking status"
                            searchPlaceholder="Search..."
                            value={bookingStatus}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                console.log(item.value);
                                setBookingStatus(item.value)
                                // setPropertyName(item.label)
                                // setValue(item.value);
                                // setIsFocus(false);
                            }}
                            disable={

                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields ? true : false : false

                            }
                        />
                        {/* <DropDownPicker

                            placeholder="Booking status"
                            items={[
                                { key: "0", label: "Advance", value: "0" }, { key: "1", label: "Full Payment", value: "1" },

                            ]}
                            value={bookingStatus}
                            setValue={setBookingStatus}
                            open={openBookingStatus}
                            setOpen={setOpenBookingStatus}
                            containerStyle={{ height: 40 }}
                            onChangeItem={item => console.log(item.label)}
                            disable={

                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields ? true : false : false

                            }
                        /> */}
                    </View>
                    {/* <View style={{ paddingTop: 15, }}>
                        <Dropdown
                            style={[styles.dropdown, { borderColor: 'black' }]}
                            // placeholderStyle={styles.placeholderStyle}
                            // selectedTextStyle={styles.selectedTextStyle}
                            // inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={[
                                { key: "0", label: "Advance", value: "0" }, { key: "1", label: "Full Payment", value: "1" },


                            ]}


                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder="Payment status"
                            searchPlaceholder="Search..."
                            value={paymentStatus}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                console.log(item.value);
                                setpaymentStatus(item.value)
                                // setPropertyName(item.label)
                                // setValue(item.value);
                                // setIsFocus(false);
                            }}
                            disable={

                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields ? true : false : false

                            }
                        />
                    </View> */}

                    {bookingStatus !== "3" ? <DynamicFoodPackage
                        objUpdate={updateObj}
                        bankList={bankList}

                        addFoodPackageList={addFoodPackageList}
                        setFoodPackageList={setFoodPackageList}
                    /> : <View></View>
                    }

                    <View style={{
                        paddingTop: 15,
                    }}>

                        {/* <Dropdown
                            style={[styles.dropdown, { borderColor: 'black' }]}
                            // placeholderStyle={styles.placeholderStyle}
                            // selectedTextStyle={styles.selectedTextStyle}
                            // inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={
                                staffList
                            }
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Sales person'}
                            searchPlaceholder="Search..."
                            value={staffVal}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                console.log(item.value);
                                setStaffVal(item.value)
                                setSatffName(item.label)

                                // setValue(item.value);
                                // setIsFocus(false);
                            }}
                            disable={

                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? true : false : false

                            }
                        /> */}
                        <View
                            style={{
                                paddingTop: 20
                            }}
                        >


                            <Dropdown

                                style={[styles.dropdown, { borderColor: 'black' }]}

                                data={
                                    [
                                        {
                                            label: "Potential",
                                            value: "0"
                                        }, {

                                            label: "Maybe",
                                            value: "1"
                                        },
                                        {

                                            label: "Not interested",
                                            value: "2"
                                        }
                                    ]
                                }

                                maxHeight={170}
                                labelField="label"
                                valueField="value"
                                placeholder="Select food interest"
                                // placeholder={!isFocus ? 'Select item' : '...'}
                                value={foodIntrestVal}
                                // onFocus={() => setIsFocus(true)}
                                // onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    console.log(item.value);
                                    setFoodIntrestVal(item.value);
                                    // setStaffVal(item.value)
                                    // setSatffName(item.label)

                                    // setValue(item.value);
                                    // setIsFocus(false);
                                }}
                                disable={

                                    user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? true : false : false

                                }
                            />


                        </View>
                        {/* <View style={{
                            flexDirection: "row"
                        }}>


                            <RadioButton.Group

                                style={{
                                    color: "blue"
                                }}
                                onValueChange={value =>
                                    // console.log(value)
                                    setCheckInCheckOut(value)
                                }
                                value={checkInCheckout}>
                                <RadioButton.Item disabled={
                                    user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? true : false : false

                                } label="Check-in" value="0" />
                                <RadioButton.Item disabled={
                                    user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? true : false : false

                                } label="Check-out" value="1" />
                            </RadioButton.Group>
                        </View> */}

                        <TextInput
                            editable={

                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? false : true : false
                            }
                            label="Security deposit"
                            mode="outlined"
                            value={securityDeposit}
                            onChangeText={text => setSecurityDeposit(text)}
                            style={{ marginTop: 20 }} />
                        <TextInput
                            editable={

                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? false : true : false
                            }
                            label="Payment for damage"
                            mode="outlined"
                            value={paymentForDamage}
                            onChangeText={text => setPaymentForDamage(text)}
                            style={{ marginTop: 20 }} />


                        <TextInput
                            editable={
                                // false
                                user.permission_list != null ? user.permission_list[0].view_only_edt_few_fields || bookingStatus === "3" ? false : true : false

                            }
                            label="Tariff exc GST"
                            mode="outlined"
                            value={tarricExcGst}
                            onChangeText={text => setTarricExcGst(text)}
                            style={{ marginTop: 20 }} />

                        <TouchableOpacity onPress={() => {
                            pickImage(setImageObj, setImage, '');
                        }}>
                            <View style={{ flexDirection: "row", alignSelf: "center", alignItems: "center", width: 120, marginTop: 15, backgroundColor: "#c4c4c44d", paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Icon name='camera' style={{ color: "#000", opacity: 0.54 }} size={24} />
                                <View style={{ justifyContent: "center" }}>
                                    <Text>   Add Photo</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {image !== '' ? <Image source={{ uri: image }} style={{ width: 100, height: 100, margin: 10, alignSelf: "center" }} /> : null}



                    </View>


                    <TouchableOpacity
                        onPress={() => {

                            submitBooking();
                        }}>
                        <View style={{ alignSelf: "center", width: 135, height: 46, marginVertical: 20, backgroundColor: "#2d9cdb", borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "#fcfcfc" }}>  Submit  </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </View >



        </SafeAreaView>
    )

}
export default AddBoking;


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
        width: '100%',
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
});
