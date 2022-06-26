import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar, Modal, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment"
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from 'react-native-element-dropdown';
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";
import { EmptyView } from "../Components/EmptyView";

import { firestore } from "../Components/FirebaseSetup";
import { BackHandler } from 'react-native';

import { collection, addDoc, doc, runTransaction, setDoc, updateDoc } from "firebase/firestore";
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
// import { TextInput } from 'react-native-paper';
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import SwitchToggle from 'react-native-switch-toggle';
import axios from "axios";
import { audit, subInventoryAudit, inventory as inventoryUrl } from "../api/ontym";
// import { TextInput } from 'react-native-paper';
import momentTZ from "moment-timezone";
import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime } from "../Components/datetimeFormat";
import DropDownPicker from 'react-native-dropdown-picker'
import Loader from "../../src/Components/loader";
import { useSelector, useDispatch } from 'react-redux';
{/* <Permission /> */ }
import { getInvertoryCatList, getInvertoryCatListForRequest, getInventorySubCatList, getInventoryAuditList, getInventorySubCatListForReq, getInventoryAuditListNoti } from "../Components/getFunction";
import { InventoryAudit, RequestInventoryForm } from "../Components/Audit";
import { showMessage, hideMessage } from "react-native-flash-message";
var isBottomSheet = false;

const RequestInventory = (props) => {
    const propertyId = props.route.params.property_id;

    const [inventoryCatList, setInventoryCatList] = useState([])
    const {
        user
    } = useSelector(state => state.loginReducer);
    const tokenId = user.accessToken;
    const userId = user.userData.id;
    const [inventorySubCatList, setInventorySubCatList] = useState([]);
    const [inventoryAuditList, setInventoryAuditList] = useState([]);
    const [status, setStatus] = useState('')
    const [approvedDisStatus, setAprovedDisStatus] = useState('');
    const [text, setText] = React.useState("")
    const [loader, setLoader] = useState(false)
    const [header, setHeader] = useState('');
    const [isUpdate, setUpdate] = useState(false);
    const [openMonthsDropDown, setMonthDropDown] = useState(false);
    const [updateObj, setUpdateObj] = useState({})
    const [catVal, setCatVal] = useState('');
    const [description, setDescription] = useState('')
    const [qty, setQty] = useState(0)
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
    const [subCatVal, setSubCatVal] = useState('');
    const [imgObj, setImgObj] = useState({})
    const [img, setImg] = useState('')

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
                sub_cat_id: subCatVal,
                product_description: description,
                qty: qty,
                status: status,

                inventory_cat_id: catVal,
                approved_disapproved_status: approvedDisStatus,

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

                if (typeof imgObj.uri !== "undefined") {
                    const response = await fetch(imgObj.uri)
                    const blobSol = await response.blob();
                    const uploadRes = await uploadFilesOnFirestorage(setLoader, updateObj.id, blobSol);



                    await axios.patch(`${subInventoryAudit}/${updateObj.id}`, {
                        image: uploadRes
                    },
                        {
                            headers:
                            {
                                "Authorization": `Bearer ${user.accessToken}`
                            }
                        }
                    ).then((res) => {

                        console.log("uploaded img : ", res);
                    }
                    )
                }

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
                getInventoryAuditList(setInventoryAuditList, user.accessToken, user.userData.id, propertyId, filterMonth, true)

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
    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <EmptyView />
        );
    };

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
                sub_cat_audit: [],
                created_by: user.userData.id,
                updated_by: user.userData.id,
                created_date: updatedDate,
                updated_date: updatedDate,
                sub_cat_id: subCatVal,
                image: '',
                product_description: description,
                qty: qty,
                request_audit: true,
                property_id: propertyId,
                inventory_cat_id: catVal,
                user_id: user.userData.id,
                user_details: {
                    user_name: user.userData.firstName,
                    img: user.userData.profilePhoto,
                },
                tenant_id: user.currentTenantId,
                tenant_template_id: user.currentTenantTemplateId,
                status: status,
                head_list: user.head_list,
                approved_disapproved_status: ''
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

                // inventoryAuditList.map(async (object, index) => {


                if (typeof imgObj.uri !== "undefined") {
                    const response = await fetch(imgObj.uri)
                    const blobSol = await response.blob();
                    const uploadRes = await uploadFilesOnFirestorage(setLoader, res.data.id, blobSol);



                    await axios.patch(`${subInventoryAudit}/${res.data.id}`, {
                        image: uploadRes
                    },
                        {
                            headers:
                            {
                                "Authorization": `Bearer ${user.accessToken}`
                            }
                        }
                    ).then((res) => {

                        console.log("uploaded img : ", res);
                    }
                    )
                }

                submitAuditToFirebase(res.data)
                // })

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
                getInventoryAuditList(setInventoryAuditList, user.accessToken, user.userData.id, propertyId, filterMonth, true)

                return true;
            }
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
        if (user.permission_list != null) {
            if (user.permission_list[0].verify_inventory_audit) {
                getInventoryAuditListNoti(setInventoryAuditList, user.accessToken, user.userData.id, user.userData.firstName, true, setLoader).then(function (obj) {
                    console.log("HERE end ", obj);
                    setLoader(false)
                })

            } else {
                getInventoryAuditList(setInventoryAuditList, user.accessToken, user.userData.id, propertyId, filterMonth, true, setLoader).then(function (obj) {
                    console.log("HERE end");
                    setLoader(false)
                })

            }

        }
        getInvertoryCatListForRequest(setInventoryCatList, tokenId);

        setCurrentDate('December');

        console.log("USER DETAILS: ", user);


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

    const submitAuditToFirebase = (data) => {
        setDoc(doc(firestore, "audit_list", data.id), {
            ...data, head_list: user.head_list

        });
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
        setCatVal('')
        setSubCatVal('')
        setDescription('')
        setQty(0)
        setStatus('')
        setImg('')
        setImgObj({})

        // preCheckAuditQue(setQueList, tokenId
        // )
        // getPreCheckAuditList(setAuditList, user.accessToken, propertyId)
    }
    useEffect(() => {
        getInventorySubCatListForReq(setInventorySubCatList, catVal, tokenId)
    }, [catVal])

    // useEffect(() => {
    //     setLoader(true)
    //     let userId = user.userData.id
    //     let tokenId = user.accessToken;
    //     getInventoryAuditList(setInventoryAuditList, tokenId, userId, propertyId, filterMonth)
    //     setLoader(false)
    //     console.log(inventoryAuditList.length);
    //     // setTimeout(() => {
    //     // if (inventoryAuditList.length === 0) {

    //     //   showMessage({
    //     //     message: "Failed!!",
    //     //     description: "Data not Found",
    //     //     type: "danger",
    //     //     duration: 2850
    //     //   });
    //     // }
    //     // }, 1000);

    // }, [filterMonth])


    const renderContent = () => (

        openbottomsheet === "audit" ?
            <RequestInventoryForm
                catList={inventoryCatList}
                inventorySubCatList={inventorySubCatList}
                setInventorySubCatList={setInventorySubCatList}
                onPress={submitAudit}
                isUpdate={isUpdate}
                setUpdateObj={setUpdateObj}
                updateObj={updateObj}
                header={header}
                catVal={catVal}
                subCatVal={subCatVal}
                setSubCatVal={setSubCatVal}
                setCatVal={setCatVal}
                setImgObj={setImgObj}
                setImg={setImg}
                img={img}
                imgObj={imgObj}
                description={description}
                setDescription={setDescription}
                qty={qty}
                setQty={setQty}
                onSubmit={submitAudit}
                status={status}
                setStatus={setStatus}
                approvedDisStatus={approvedDisStatus}
                setAprovedDisStatus={setAprovedDisStatus}
                verityStatus={user.permission_list[0].verify_inventory_audit}
            />
            :

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
        <TouchableOpacity
            onPress={() => {
                console.log(item);
                // updateReq(item);
                // props.navigation.navigate('AddBooking', { item: item.details })

                Setopenbottomsheet('audit')
                setbg(true)
                sheetRef.current.snapTo(1)
                setUpdate(true)
                isBottomSheet = true
                setUpdateObj(item)
                // setHeader(item.)
                // setHeader(item.inventory)
                // setSelectedInventoryCatId(item.inventory_cat_id)


                setCatVal(item.inventory_cat_id)
                setSubCatVal(item.sub_cat_id)
                setDescription(item.product_description)
                setQty(item.qty)
                setStatus(item.status)
                setImg(item.image)
                setAprovedDisStatus(item.approved_disapproved_status)

            }}
        >
            <View
                style={[styles.card, styles.shadowProp, styles.elevation]}
            >
                <View
                    style={styles.bookingStyle}>
                    <Text style={styles.bookingTextstyle}
                    >Date: </Text>
                    <Text style={styles.bookingTextstyle}
                    >
                        {moment(item.created_date).format(dbDate)}

                    </Text>

                </View>
                <View
                    style={styles.bookingStyle}>
                    <Text style={styles.bookingTextstyle}
                    >Category: </Text>
                    <Text style={styles.bookingTextstyle}
                    >
                        {
                            item.inventory?.inventory
                        }

                    </Text>

                </View>


                <View
                    style={styles.bookingStyle}>
                    <Text style={styles.bookingTextstyle}
                    >Sub category: </Text>
                    <Text style={styles.bookingTextstyle}
                    >
                        {
                            item.subInventory?.sub_inventory
                        }

                    </Text>

                </View>


                <View
                    style={styles.bookingStyle}>
                    <Text style={styles.bookingTextstyle}
                    >Created By: </Text>
                    <Text style={styles.bookingTextstyle}
                    >
                        {item.user_details.user_name}

                    </Text>

                </View>
                <View style={styles.bookingStyle} >
                    <Text style={styles.bookingTextstyle}
                    >Description: </Text>
                    <Text style={styles.bookingTextstyle}
                    >

                        {item.product_description}

                    </Text>

                </View>


                <View
                    style={styles.bookingStyle}>
                    <Text style={styles.bookingTextstyle}>Status: </Text>
                    <View style={{
                        justifyContent: "space-between",
                        alignItems: "center", backgroundColor: "red",
                        alignItems: "center", backgroundColor: item.status === "0" ? "red" : item.status === "1" ? "rgb(124, 36, 237)" : item.status === "2" ? "blue" : "grey",
                        borderRadius: 5, alignSelf: "center"
                    }} >
                        <Text style={{
                            color: "white", padding: 3,
                            fontFamily: "Poppins-SemiBold", fontWeight: "500", fontSize: 12

                        }}>
                            {/* Pending */}
                            {
                                item.status === "0" ? "On the way" : item.status === "1" ? "Incomplete" : item.status === "2" ? "Received" : "Pending"
                            }
                        </Text>
                    </View>

                </View>
                <View
                    style={styles.bookingStyle}>

                    <Text style={styles.bookingTextstyle}>
                        {
                            item.approved_disapproved_status !== '' ? item.approved_disapproved_status === "0" ? "Approved" : "Disapproved" : 'N/A'
                        }
                    </Text>
                </View>

            </View>
        </TouchableOpacity>



        // <TouchableOpacity onPress={() => {
        //     Setopenbottomsheet('audit')
        //     setbg(true)
        //     sheetRef.current.snapTo(1)
        //     setUpdate(true)
        //     setUpdateObj(item)
        //     // setHeader(item.)
        //     setHeader(item.inventory)
        //     setSelectedInventoryCatId(item.inventory_cat_id)

        //     getCatDetailsDetails(item.inventory_cat_id)
        // }} style={styles.item}>

        //     <View style={{ flexDirection: "row" }}>
        //         <Icon name='calendar-range' style={{ color: "#2d9cdb", marginTop: 10 }} size={30} />
        //         <View style={{ paddingLeft: 20 }}>
        //             <Text
        //                 style={{ fontSize: 18, fontWeight: "600", lineHeight: 27, fontFamily: "Poppins-SemiBold", color: "#000" }}
        //             >
        //                 {moment(item.created_date).format(dbDate)}

        //             </Text>
        //             <View style={{ flexDirection: "row" }}>
        //                 <Image resizeMode={"contain"} style={{ width: 25, height: 25, borderRadius: 100 / 2, alignSelf: "flex-end" }}
        //                     source={{
        //                         uri: item?.user_details === null
        //                             ? "https://firebasestorage.googleapis.com/v0/b/tenx-10.appspot.com/o/static%2F10x-default.png?alt=media&token=86380fbe-8902-41a8-96ee-f9cc1408b9a0"
        //                             : item?.user_details?.img
        //                     }}

        //                 />
        //                 {/* <Text style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"lightgreen",marginLeft:10}} >{item.Area}</Text> 
        //           <Text  style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"#9b9b9b"}}  > | </Text>
        //           <Text style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"red"}}  >{item.purpose}</Text> */}
        //             </View>
        //         </View>
        //     </View>
        //     <View style={{ marginTop: 5 }} >
        //         <TouchableOpacity onPress={() => console.log("asd")}>
        //             <Icon name='dots-vertical' style={{ color: "#000", alignSelf: "flex-end" }} size={20} />
        //         </TouchableOpacity>
        //         <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 21, fontFamily: "Poppins-Regular", color: "#9b9b9b", alignSelf: "flex-end" }} >
        //             {moment(item.created_date).format(dbTime)}
        //         </Text>

        //     </View>

        //     {/* <Text >{item.Area}</Text> */}
        // </TouchableOpacity>



    );
    const openReqList = () => {

    }

    return (
        <SafeAreaView style={{ height: "92%", backgroundColor: "#fff" }}>
            <Loader show={loader} />

            <View style={bg ? { backgroundColor: "#000000bf", opacity: 0.75 } : { backgroundColor: "#fff" }}>
                <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
                    <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", }}>Request Inventory Audit</Text>
                    {/* <TouchableOpacity onPress={() => console.log("asd")}>
                        <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
                    </TouchableOpacity> */}

                </View>

                <FlatList
                    style={{
                        marginBottom: 100,
                    }}
                    data={inventoryAuditList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}

                    ListEmptyComponent={EmptyListMessage}

                // ItemSeparatorComponent={

                //     // (({ highlighted }) => (
                //     //     <View
                //     //         style={{ height: 1, width: "95%", backgroundColor: "#A6a4a4", alignSelf: "center" }}
                //     //     />
                //     // ))
                // }
                />

            </View>
            { user.permission_list != null ? !user.permission_list[0].verify_inventory_audit ? <TouchableOpacity
                onPress={() => {
                    console.log("asdasS");
                    Setopenbottomsheet('audit')
                    setbg(true)
                    sheetRef.current.snapTo(1)
                    isBottomSheet = true
                }}
                style={{ borderWidth: 0.5, borderRadius: 25, height: 50, width: 50, alignSelf: "center", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 25, right: 20, backgroundColor: "#fff" }}>
                <Icon name='plus' style={{ color: "#000" }} size={50} />
            </TouchableOpacity> : null : null
            }
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


export default RequestInventory;
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
    },
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
        elevation: 10,
        shadowColor: '#52006A',
    },

    bookingStyle: {
        flex: 1,
        flexDirection: "row",
        margin: 5
    }
});