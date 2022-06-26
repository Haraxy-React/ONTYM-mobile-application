import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar, Modal, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { log } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment"
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from 'react-native-element-dropdown';
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";
import { EmptyView } from "../Components/EmptyView";
import { BackHandler } from 'react-native';
import { firestore } from "../Components/FirebaseSetup";

import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
// import { TextInput } from 'react-native-paper';
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import SwitchToggle from 'react-native-switch-toggle';
import axios from "axios";
import { audit, subInventoryAudit, inventory as inventoryUrl, amcPurchase } from "../api/ontym";
// import { TextInput } from 'react-native-paper';
import momentTZ from "moment-timezone";
import { collection, addDoc, doc, runTransaction, setDoc, updateDoc } from "firebase/firestore";

import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime } from "../Components/datetimeFormat";
import DropDownPicker from 'react-native-dropdown-picker'
import Loader from "../../src/Components/loader";
import { useSelector, useDispatch } from 'react-redux';
import { getInvertoryCatList, getInventorySubCatList, getInventoryAuditList, getAmcCatList, getAMCLogData } from "../Components/getFunction";
import { InventoryAudit, AMCLogForm } from "../Components/Audit";
import { showMessage, hideMessage } from "react-native-flash-message";
var isBottomSheet = false;

const AMCLog = (props) => {
    const [amcLogCatId, setAmcLogCatId] = useState('');
    const [amcLogCatName, setAmcLogCatName] = useState('');
    const [img, setImg] = useState('');
    const [imgObj, setImgObj] = useState({})
    const [loader, setLoader] = useState(false)
    const [header, setHeader] = useState('AMC Log');
    const [isUpdate, setUpdate] = useState(false);
    const [amcLogFormDetails, setAmcLogDetails] = useState({
        category: '',
        amount: '',
        comment: ''
    })
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [openMonthsDropDown, setMonthDropDown] = useState(false);
    const [updateObj, setUpdateObj] = useState({})
    const propertyId = props.route.params.property_id;
    const [amcLogCatList, setAmcLogCatList] = useState([]);
    const {
        user
    } = useSelector(state => state.loginReducer);

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
    const [filterMonth, setFilterMonth] = useState(moment(new Date()).format("MMMM"))
    const [amcLogAuditList, setAmcLogAudit] = useState([]);
    const [updateForm, setUpdatedForm] = useState({})
    const [openbottomsheet, Setopenbottomsheet] = useState('');
    const [bg, setbg] = useState();
    const tokenId = user.accessToken;
    const userId = user.userData.id;

    useEffect(() => {
        setLoader(true)
        getAmcCatList(setAmcLogCatList, tokenId)
        getAMCLogData(propertyId, setAmcLogAudit, tokenId, userId, "3", filterMonth).then(function (obj) {
            console.log("HERE end ", obj);
            setLoader(false)
        })
    }, [])

    const sheetRef = React.useRef(null);
    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <EmptyView />
        );
    };
    const submitAuditToFirebase = (data) => {
        setDoc(doc(firestore, "audit_list", data.id), {
            ...data, head_list: user.head_list

        });
    }
    const addData = async () => {
        // console.log("ADD DATA:  ", category + " " + amount + " " + comment);
        // return
        setbg(false)
        sheetRef.current.snapTo(0)
        setLoader(true);
        var updatedDate = new Date();
        updatedDate = momentTZ.tz(updatedDate, "Asia/Taipei");
        const requestData = {
            // ...amcLogData,
            sequence: 0,
            audit_type: "3",
            property_id: propertyId,
            sub_amc_purchase: category,
            amc_purchase: amcLogCatName,
            amc_purchase_id: amcLogCatId,
            amount: parseInt(amount),
            head_list: user.head_list,

            comment: [{ comment: comment }],
            image: [{}],
            user_id: userId,
            user_details: {
                user_name: user.userData.firstName,
                img: user.img,
            },

            updated_by: userId,
            created_date: updatedDate,
            updated_date: updatedDate,
            created_by: userId,
            tenant_id: user.currentTenantId,
            tenant_template_id: user.currentTenantTemplateId,
        };
        console.log("obj req:", requestData);

        try {
            const res = await axios.post(amcPurchase, {
                ...requestData,
            },
                {
                    headers:
                        { "Authorization": `Bearer ${tokenId}` }
                }
            );
            if (res.status === 200) {
                let imageData;
                // if (files[0] instanceof File) {
                //     const uploadRes = await uploadImage(res.data.id, files[0]);
                //     imageData = {
                //         image: [{ url: uploadRes?.data?.urlfield }],
                //     };
                //     await axios.patch(`${amcPurchase}/${res.data.id}`, {
                //         ...imageData,
                //     });
                // }
                if (typeof imgObj.uri !== "undefined") {
                    const response = await fetch(imgObj.uri)
                    const blobSol = await response.blob();

                    const uploadRes = await uploadFilesOnFirestorage(setLoader, res.data.id, blobSol);
                    let newFormValues = [{ url: uploadRes }];


                    await axios.patch(`${amcPurchase}/${res.data.id}`, {
                        image: newFormValues
                    },
                        {
                            headers:
                            {
                                "Authorization": `Bearer ${user.accessToken}`
                            }
                        }
                    ).then((res) => {
                        setImgObj({})
                        console.log("SUcc: ", res);
                    }
                    )
                }
                setAmcLogDetails({
                    sub_amc_purchase: "",
                    amount: "",
                    comment: "",
                });

                showMessage({
                    message: "Audit created!!",
                    type: "success",

                    duration: 2850
                });
                submitAuditToFirebase(res.data)

                getAMCLogData(propertyId, setAmcLogAudit, tokenId, userId, "3", filterMonth);

                // setFiles([]);
                // toast.success(`${t("audit")} ${c("created")}`);
                // props.setshow(false);
                return true;
            }
        } catch (error) {
            console.log(error.response.data);
            // toast.error(c("Something went wrong!"));

            showMessage({
                message: "Failed!!",
                description: "something went wrong",
                type: "danger",
                duration: 2850
            });
        } finally {
            setLoader(false);
        }
    };
    const updateData = async () => {
        // console.log("UPDATE DATA: ", updateForm);
        // return;
        console.log(amount);
        const amountVal = parseInt(amount);

        setbg(false)
        sheetRef.current.snapTo(0)
        setLoader(true);
        var updatedDate = new Date();
        updatedDate = momentTZ.tz(updatedDate, "Asia/Taipei");

        const requestData = {
            // ...amcLogData,


            sub_amc_purchase: category,

            amount: amountVal,
            comment: [{ comment: comment }],


            updated_by: userId,
            updated_date: updatedDate
        };
        console.log("obj req: update", requestData);

        try {
            const res = await axios.patch(`${amcPurchase}/${updateObj.id}`, {
                ...requestData,
            },
                {
                    headers:
                        { "Authorization": `Bearer ${tokenId}` }
                }

            );
            if (res.status === 204) {

                console.log(imgObj.uri);

                if (typeof imgObj.uri !== "undefined") {
                    const response = await fetch(imgObj.uri)
                    const blobSol = await response.blob();

                    const uploadRes = await uploadFilesOnFirestorage(setLoader, updateObj.id, blobSol);
                    let newFormValues = [{ url: uploadRes }];
                    console.log("NEW FORM VAL: ", newFormValues);
                    try {
                        await axios.patch(`${amcPurchase}/${updateObj.id}`, {
                            image: newFormValues
                        },
                            {
                                headers:
                                {
                                    "Authorization": `Bearer ${user.accessToken}`
                                }
                            }
                        ).then((res) => {
                            setImgObj({})
                            console.log("SUcc: ", res);
                        }
                        )
                    } catch (error) {
                        console.log("ERROR: ", error);
                    }

                } else {
                    console.log('ELSE');
                }

                showMessage({
                    message: "Audit updated!!",
                    type: "success",

                    duration: 2850
                });
                setAmcLogDetails({
                    category: "",
                    amount: "",
                    comment: "",
                });
                resetVal()
                getAMCLogData(propertyId, setAmcLogAudit, tokenId, userId, "3", filterMonth);

                return true;
            }
        } catch (error) {
            console.log(error.response.data);
            showMessage({
                message: "Fail update!!",
                type: "danger",
                description: "Something went wrong!",
                duration: 2850
            });
            // toast.error(c("Something went wrong!"));
        } finally {
            setLoader(false);
        }

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

    const submitAudit = () => {

        if (isUpdate) {
            updateData()
        } else {
            addData()
        }

    }
    const opensheet = () => {
        setbg(true)
    }
    const closesheet = () => {
        setbg(false)
        sheetRef.current.snapTo(0)
        isBottomSheet = false
        resetVal()
    }

    const resetVal = () => {
        setCategory('')
        setAmount('')
        setComment('')
        setUpdate(false);
        // setUpdateObj({})
        setHeader("AMC Log")
        setAmcLogCatId('')
        setImg('')
        setImgObj({})
    }
    const onSheeetBack = () => {
        console.log('ggg');
        Setopenbottomsheet('Addtask')
        setbg(true)
        sheetRef.current.snapTo(1)
    }
    const renderContent = () => (

        openbottomsheet === "audit" ?
            <AMCLogForm header={header} onSubmit={submitAudit}
                setAmcLogDetails={setAmcLogDetails}
                amcLogFormDetails={amcLogFormDetails}
                setUpdateObj={setUpdateObj}
                isUpdate={isUpdate} updateObj={updateObj}
                setCategory={setCategory}
                setAmount={setAmount}
                setComment={setComment}
                category={category}
                amount={amount}
                comment={comment}
                img={img}
                setImg={setImg}
                imgObj={imgObj}
                setImgObj={setImgObj}
                onSheetBack={onSheeetBack}

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
                                amcLogCatList.map((data, index) => {

                                    return (
                                        <TouchableOpacity key={index} onPress={() => {
                                            // getInventorySubCatList(setInventorySubCatList, data.id, tokenId)
                                            // setHeader(data.inventory)
                                            // setSelectedInventoryCatId(data.id)

                                            Setopenbottomsheet('audit')

                                            setbg(true)
                                            sheetRef.current.snapTo(2)
                                            isBottomSheet = true
                                            setAmcLogCatId(data.value)
                                            setAmcLogCatName(data.text)
                                        }} style={{ justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#A6A4A4", paddingVertical: 10 }}>
                                            <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular", fontWeight: "500" }}>{data.text}</Text>
                                            <Icon name='chevron-right' style={{ color: "#000" }} size={30} />
                                        </TouchableOpacity>
                                    )

                                })
                            }

                        </View>






                    </ScrollView>
                </View>

                :
                openbottomsheet === "amcLogSubCatList" ?
                    <View><Text>FILTER</Text></View> : null



    );


    useEffect(() => {
        setLoader(true)
        getAMCLogData(propertyId, setAmcLogAudit, tokenId, userId, "3", filterMonth).then(function (obj) {
            console.log("HERE end ", obj);
            setLoader(false)
        })


    }, [filterMonth])





    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            Setopenbottomsheet('audit')
            setbg(true)
            sheetRef.current.snapTo(1)
            isBottomSheet = true
            setUpdate(true)
            setUpdateObj(item)
            console.log(item);
            setHeader(item.amc_purchase)
            setCategory(item.sub_amc_purchase)
            setAmount(item.amount.toString())
            setComment(item.comment[0].comment)
            console.log(item.image[0].url);
            setImg(typeof item.image[0]?.url === 'undefined' ? '' : item?.image[0]?.url)
            // console.log('item img: ', item?.image[0]?.url);

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





    return (
        <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
            <Loader show={loader} />

            <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
                <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
                    <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>AMC Log </Text>
                    {/* <TouchableOpacity onPress={() => console.log("asd")}>
                        <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
                    </TouchableOpacity> */}

                </View>
                <View style={{ zIndex: 10, flexDirection: "row", paddingHorizontal: 25, alignContent: "center", paddingVertical: 15, borderBottomWidth: 1, width: "97%", alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => {
                        Setopenbottomsheet('Filter')
                        setbg(true)
                        sheetRef.current.snapTo(2)
                        isBottomSheet = true
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
                                let userId = user.userData.id
                                let tokenId = user.accessToken;
                                setFilterMonth(item.value)
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
                    data={amcLogAuditList}
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
}
export default AMCLog;

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