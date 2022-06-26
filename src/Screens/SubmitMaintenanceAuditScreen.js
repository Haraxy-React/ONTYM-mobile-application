import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StyleSheet, StatusBar, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { log } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";
import SwitchToggle from 'react-native-switch-toggle';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { BackHandler } from 'react-native';

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
import { bookmarkList } from "../../redux/actions";

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
import { MaintenanceAudit } from "../Components/Audit";

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
import { areaOfPropertyFunction, getMaintenceAuditQueListFunction, getMaintenceAuditDataList } from "../Components/getFunction";
import Collapsible from 'react-native-collapsible';
var isBottomSheet = false;
const SubmitMaintenanceAudit = (props) => {
    const dispatch = useDispatch();

    const {
        user
    } = useSelector(state => state.loginReducer);
    const {
        cat_and_que_list
    } = useSelector(state => state.loginReducer);
    console.log('CAT QUE LIST:  ', cat_and_que_list);
    const propertyId = props.route.params.property_id;
    const [collapsed, setCollapsed] = useState({});
    const [loader, setLoader] = useState(false)
    const sheetRef = React.useRef(null);
    const [openbottomsheet, Setopenbottomsheet] = useState('');
    const [isUpdate, setUpdate] = useState(false);
    const [bookCatList, setBookCatList] = useState(typeof cat_and_que_list === 'undefined' ? [] : cat_and_que_list?.catList)
    const [header, setHeader] = useState('');
    const [selectedAreaOfPropertyId, setSelectedAreaOfPropertyId] = useState('');
    const [bg, setbg] = useState(false);
    const [queList, setQueList] = useState([]);

    const [AreaOfProertyList, setAreaOfProertyList] = useState([]);
    useEffect(() => {
        setLoader(true)
        let tokenId = user.accessToken;
        let userId = user.userData.id
        setLoader(true)

        areaOfPropertyFunction(setAreaOfProertyList, tokenId,).then(function (obj) {
            console.log("HERE end ", obj);
            setLoader(false)
        })
        // setLoader(false)
    }, []);
    useEffect(() => {
        if (typeof cat_and_que_list !== 'undefined') {

            setBookCatList(cat_and_que_list.catList)

        } else {

        }

    }, [cat_and_que_list]);
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
    const refresh = () => {
        let tokenId = user.accessToken;
        console.log(cat_and_que_list);
        areaOfPropertyFunction(setAreaOfProertyList, tokenId,);

        if (typeof cat_and_que_list !== 'undefined') {

            setBookCatList(cat_and_que_list.catList)
            areaOfPropertyFunction(setAreaOfProertyList, tokenId,);

            console.log('DD: ', cat_and_que_list.catList);
        } else {
            setBookCatList([])

        }
    }
    const opensheet = () => {
        setbg(true)
    }
    const closesheet = () => {
        console.log("CLOSEE");
        setbg(false)
        sheetRef.current.snapTo(0)
        isBottomSheet = false
        // resetVal()
    }
    function setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
            setBookCatList(stateUpdate);
            resolve()
        });
    }
    const addToBookmark = async () => {

        const list = findValue(selectedAreaOfPropertyId)
        console.log(list.length);
        // return;

        if (list.length === 0) {

            await setStateSynchronous([...bookCatList, { id: selectedAreaOfPropertyId, area_name: header }])
            // setBookCatList([...bookCatList, { id: selectedAreaOfPropertyId, area_name: header }])
        }
        // setBookCatList([...selectedAreaOfPropertyId])
        // console.log(queList);
        // console.log(bookCatList);
        // return;\

        let catList = {};
        if (queList.length > 0) {
            catList[selectedAreaOfPropertyId] = queList;
        } else {
            catList[selectedAreaOfPropertyId] = [];
        }

        let catAndQueList = {}
        if (typeof cat_and_que_list === 'undefined') {
            catAndQueList = {}
        } else {
            catAndQueList = { ...cat_and_que_list.queList }
        }
        console.log('CATTT: ', catList);
        // return;
        dispatch({
            type: bookmarkList,
            payload: {
                queList: { ...catAndQueList, ...catList, },
                catList: list.length === 0 ? [...bookCatList, { id: selectedAreaOfPropertyId, area_name: header }] : [...bookCatList]

            }
        })

        closesheet()
    }
    const findValue = (id) => {
        const list = bookCatList.filter((filer, index) => filer.id === id)
        return list;
    }

    const renderContent = () => (

        openbottomsheet === "audit" ?
            // console.log("AS QUE: ", queList)
            <MaintenanceAudit
                header={header}
                queList={queList}
                setQueList={setQueList}
                closesheet={closesheet}
                onPress={addToBookmark}
                // onSheetBack={onSheeetBack}
                isUpdate={isUpdate}
            // updateObj={updateObj}
            // setUpdateObj={setUpdateObj}
            />

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
    return (
        <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
            <Loader show={loader} />
            <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
                <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
                    <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Maintenance Audit </Text>

                    <View style={{
                        flexDirection: "row",
                        flex: 1
                        , justifyContent: 'flex-end',
                        alignContent: "flex-end",

                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('BookmarkListScreen', { property_id: propertyId })

                            }}
                        >
                            <Text style={{ textAlign: "right", color: "#fff", fontSize: 12, lineHeight: 27, fontWeight: "700", width: 200, textDecorationLine: 'underline' }} >Go to bookmark</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{

                                alignContent: "center",
                                height: "100%",
                                left: 15,
                                alignSelf: "flex-end",
                                // backgroundColor: "red",
                                // justifyContent: "center"
                                // backgroundColor: 'red'
                                // marginLeft: 'auto',
                                // justifyContent: "center",
                                // marginRight: 10
                            }}
                            onPress={() => {

                                refresh()
                            }}
                        >
                            <Icon name='refresh' style={{ width: 30, height: 30, color: "white" }} size={24} />


                        </TouchableOpacity>


                    </View>
                </View>

                <ScrollView style={{

                    margin: 5
                }}>
                    <View style={{ marginTop: 2 }}>
                        {
                            AreaOfProertyList.length > 0 ? AreaOfProertyList.map((data, index) => {
                                // console.log(data.sub_inventory);
                                return (<View key={index}><TouchableOpacity onPress={() => {
                                    // setCollapsed(!collapsed);
                                    // console.log(_.partition(bookCatList, { 'id': data.id }));

                                    // const list = findValue(data.id)
                                    // console.log(list.length);
                                    // // return;

                                    // if (list.length === 0) {

                                    //     setBookCatList([...bookCatList, { id: data.id, area_name: data.area_name }])
                                    // }

                                    Setopenbottomsheet('audit')
                                    // setbg(true)
                                    isBottomSheet = true
                                    sheetRef.current.snapTo(1)
                                    getMaintenceAuditQueListFunction(setQueList, data.id, user.accessToken)
                                    setHeader(data.area_name)
                                    setSelectedAreaOfPropertyId(data.id)
                                    // setCollapsed(prevState => !prevState)

                                }} style={{ justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#A6A4A4", paddingVertical: 10 }}>
                                    <View>
                                        <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular", fontWeight: "500" }}>{data.area_name}</Text>
                                        {
                                            // console.log(findValue(data.id))
                                            findValue(data.id).length > 0 ? <Text>Bookmarked</Text> : null
                                        }
                                    </View>
                                    <Icon name='chevron-right' style={{ color: "#000" }} size={30} />


                                </TouchableOpacity>


                                </View>)
                            }) : <View style={{

                                height: '100%',
                                width: "100%",
                                alignSelf: "center",
                                flex: 1,

                                justifyContent: "center"


                            }}>
                                    <Text style={{ textAlign: "center" }}>Data Not Found</Text>
                                </View>
                        }
                    </View>
                </ScrollView>

                {/* <TouchableOpacity
                    onPress={() =>
                        props.onPress()
                    }
                    style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 10, marginBottom: 80 }}>
                    <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                        Submit
                        </Text>
                </TouchableOpacity> */}
            </View>
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
        </SafeAreaView>
    )
}
export default SubmitMaintenanceAudit;

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