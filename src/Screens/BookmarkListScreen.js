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
const BookmarkListScreen = (props) => {
    const dispatch = useDispatch();

    const {
        user
    } = useSelector(state => state.loginReducer);
    const {
        cat_and_que_list
    } = useSelector(state => state.loginReducer);
    console.log('CAT QUE BOOKMARK LIST:  ', cat_and_que_list);
    const propertyId = props.route.params.property_id;
    const [collapsed, setCollapsed] = useState({});
    const [loader, setLoader] = useState(false)
    const sheetRef = React.useRef(null);
    const [isUpdate, setUpdate] = useState(typeof props.route.params.update === 'undefined' ? false : props.route.params.update);
    const [updateObj, setUpdateObj] = useState({})

    const [openbottomsheet, Setopenbottomsheet] = useState('');
    // const [isUpdate, setUpdate] = useState(false);
    // typeof cat_and_que_list === 'undefined'?[]:cat_and_que_list.
    const [bookCatList, setBookCatList] = useState(typeof cat_and_que_list === 'undefined' ? [] : cat_and_que_list.catList)
    const [header, setHeader] = useState('');
    const [selectedAreaOfPropertyId, setSelectedAreaOfPropertyId] = useState('');
    const [bg, setbg] = useState(false);
    const [queList, setQueList] = useState([]);

    const [AreaOfProertyList, setAreaOfProertyList] = useState(typeof cat_and_que_list === 'undefined' ? [] : cat_and_que_list.catList);


    useEffect(() => {
        if (isUpdate) {
            let catList = props.route.params.item.area_of_house_id_list;
            setAreaOfProertyList(catList)
            setUpdateObj(props.route.params.item)
        }

    }, [isUpdate]);

    // console.log(AreaOfProertyList[0]);
    useEffect(() => {

        setLoader(true)
        let tokenId = user.accessToken;
        let userId = user.userData.id


        // areaOfPropertyFunction(setAreaOfProertyList, tokenId,);
        setLoader(false)
    }, []);
    const opensheet = () => {
        setbg(true)
    }

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
        updateObj.check_list = '';


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


    const addData = async () => {
        let file = ''
        console.log('V CAT LIST: ', bookCatList);
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
                questions: [cat_and_que_list.queList],
                created_by: user.userData.id,
                updated_by: user.userData.id,
                created_date: updatedDate,
                updated_date: updatedDate,
                comment: commentArray,
                head_list: user.head_list,

                image: [],
                property_id: propertyId,
                area_of_house_id: '',
                user_id: user.userData.user_id,
                user_details: JSON.stringify({
                    user_name: user.userData.firstName,
                    img: user.img,
                }),
                area_of_house_id_list: AreaOfProertyList,
                tenant_id: user.currentTenantId,
                tenant_template_id: user.currentTenantTemplateId,
                check_list: checked + "-Yes\n" + unChecked + "-No",
            };
            // return;
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
                // resetVal()
                // getPreCheckAuditList(setAuditList, user.accessToken, user.userData.id, propertyId, filterDate)
                dispatch({
                    type: bookmarkList,
                    payload: undefined
                })
                props.navigation.navigate('Maintenance', { property_id: propertyId, isRefresh: true })

                return true;
            }
            // toast.error(c("something went wrong"));

            return true;
        } catch (error) {
            setLoader(false)
            console.log("ERROR: ", error.response);
            console.log('errr: ', error);
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
    const closesheet = () => {
        console.log("CLOSEE");
        setbg(false)
        sheetRef.current.snapTo(0)
        isBottomSheet = false
        // resetVal()
    }
    const submitAudit = () => {
        if (isUpdate) {
            updateData()
        } else {
            addData()
        }

    }
    const addToBookmark = () => {

        // const list = findValue(selectedAreaOfPropertyId)
        // console.log(list.length);
        // // return;

        // if (list.length === 0) {

        //     setBookCatList([...bookCatList, { id: selectedAreaOfPropertyId, area_name: header }])
        // }
        // setBookCatList([...selectedAreaOfPropertyId])
        // console.log(queList);
        // console.log(bookCatList);
        // return;\
        if (!isUpdate) {

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
                    catList: bookCatList

                }
            })

        }
        closesheet()
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
                updateObj={updateObj}
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
                    <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Bookmark list </Text>

                    <View>
                        {/* <TouchableOpacity>
                            {/* <Text style={{ textAlign: "right", color: "#fff", fontSize: 12, lineHeight: 27, fontWeight: "700", width: 200, paddingRight: 40, textDecorationLine: 'underline' }} >Go to bookmark</Text> */}
                        {/* </TouchableOpacity> */}
                    </View>
                </View>

                {/* { */}
                {/* // AreaOfProertyList.length == 0 ? */}


                {/* // : null */}
                {/* } */}
                <ScrollView style={{
                    margin: 5,
                }}>

                    <View style={{ marginTop: 2, }}>

                        {


                            AreaOfProertyList.length > 0 ? AreaOfProertyList.map((data, index) => {
                                // console.log(data.sub_inventory);
                                return (<View key={index}><TouchableOpacity onPress={() => {
                                    // setCollapsed(!collapsed);
                                    // console.log(bookCatList.includes(data.id));
                                    // if (!bookCatList.includes(data.id)) {

                                    //     setBookCatList([...bookCatList, data.id])
                                    // }

                                    Setopenbottomsheet('audit')
                                    // setbg(true)
                                    isBottomSheet = true
                                    sheetRef.current.snapTo(1)

                                    let obj = [];
                                    if (isUpdate) {
                                        obj = updateObj.questions[0];
                                    } else {
                                        obj = cat_and_que_list.queList;
                                    }
                                    // console.log(data.id);
                                    // console.log(obj);
                                    // console.log('obj data:', obj[data.id]);
                                    // return;
                                    setQueList(obj[data.id])
                                    // getMaintenceAuditQueListFunction(setQueList, data.id, user.accessToken)
                                    setHeader(data.area_name)
                                    setSelectedAreaOfPropertyId(data.id)
                                    // setCollapsed(prevState => !prevState)

                                }} style={{ justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#A6A4A4", paddingVertical: 10 }}>
                                    <View>
                                        <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular", fontWeight: "500" }}>{data.area_name}</Text>
                                        {/* {
                                            bookCatList.includes(data.id) ? <Text>Bookmarked</Text> : null
                                        } */}
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        AreaOfProertyList.splice(index, 1);
                                        if (isUpdate) {
                                            delete updateObj.questions[data.id]
                                        } else {
                                            delete cat_and_que_list.queList[data.id]
                                        }

                                        setAreaOfProertyList(AreaOfProertyList.filter(item => item.id !== data.id))
                                    }}>
                                        <Icon name='delete' style={{ color: "#000" }} size={30} />
                                    </TouchableOpacity>

                                </TouchableOpacity>


                                </View>)

                            })
                                : <View style={{

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

                {AreaOfProertyList.length > 0 ? <TouchableOpacity
                    onPress={() =>
                        submitAudit()
                    }
                    style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 10, marginBottom: 80 }}>
                    <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                        Submit
                        </Text>
                </TouchableOpacity> : null
                }
            </View>
            <BottomSheet
                ref={sheetRef}
                // snapPoints={[450, 300, 0]}
                // isBackDrop={true}
                // isBackDropDismisByPress={true}
                snapPoints={[0, "88%", "40%"]}
                borderRadius={20}
                onOpenEnd={opensheet}
                initialSnap={0}
                onCloseEnd={closesheet}
                renderContent={renderContent}
            />
        </SafeAreaView>
    )
}
export default BookmarkListScreen;

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