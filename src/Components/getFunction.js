import {
    locationList,
    bookingApi,
    amcPurchase,
    billingCategory,
    bankApi,
    subInventoryAudit, subInventory, inventory, uploadFile, audit, taskList, staffDetails, locationList as locationListUrl,
    jobDurationUrl, jobStatusUrl, staffUrl, propertyUrl, jobType, jobSource, areaOfHouse, causeOfIssue, question
} from '../api/ontym';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import moment from "moment"
import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat, dbTime, dateCalendar } from "../Components/datetimeFormat";
import qs from 'qs'
import { Alert } from 'react-native';

import paramount from "../Assets/paramount_vector.png";
import { log } from 'react-native-reanimated';


export const getpropertyList = async (setState, tokenId, locationid) => {
    let filter = '';
    let filterJson = '';
    if (typeof locationid !== 'undefined') {
        if (locationid !== null) {


            filter = {
                where: {
                    location_id: locationid,
                },
                // skip: offset * limit,
                // limit: limit,
            };
            filterJson = "?filter=" + JSON.stringify(filter)
        }
    }

    console.log("FILTER JSON:", filterJson);
    await axios.get(propertyUrl + filterJson,
        {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        }

    ).then((response) => {


        const propertyList = response.data.map((data) => {
            return {
                ...data,
                label: data.property_name,
                value: data.id
            }
        }
        )
        console.log("LENG:", propertyList.length);

        setState(propertyList)

    }).catch((error) => {
        console.log("ERORR: ", error.response.data);
    })
}

export const staffListFunction = async (setState, tokenId) => {

    // id: "690a9643-a154-44e9-8278-ab50b865404e"
    // permission: {job: {…}, audit: {…}, staff: {…}, vendor: {…}, property: {…}, …}
    // role_name: "Owner"
    // tenant_id: "b9674c6f-cf84-4e73-bf35-6b18d7a19a42"
    // tenant_template_id: "0da82859-beb7-4b33-99c4-19b1087a3b01"
    // [[Prototype]]: Object

    await axios.get(staffUrl,
        {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        }

    ).then((response) => {

        const staffList = response.data.map((data) => {
            return {
                ...data,
                label: data.staff_name,
                value: data.id
            }
        }
        )
        setState(staffList)

    }).catch((error) => {
        console.log("ERORR: ", error);
    })

}

export const taskSourceFunction = async (setState, tokenId) => {
    try {
        const res = await axios.get(
            `${jobSource}?filter={"where":{"is_active":true},"order":["sequence ASC"]}`,
            {
                headers:
                    { "Authorization": `Bearer ${tokenId}` }
            }

        );
        if (res.status === 200) {
            const newData = res.data.map((value, index) => ({
                ...value,
                label: value.source,
                value: value.id,
            }));
            setState(newData);
        }
    } catch (error) {
        console.log("error while retrieving the data source", error);
    }
}

export const areaOfPropertyFunction = async (setState, tokenId) => {
    try {
        const res = await axios.get(
            `${areaOfHouse}?filter={"where":{"is_active":true},"order":["sequence ASC"]}`,
            {
                headers:
                    { "Authorization": `Bearer ${tokenId}` }
            }

        );
        if (res.status === 200) {
            const newData = res.data?.map((value, index) => ({
                ...value,
                label: value.area_name,
                value: value.id,
            }));
            setState(newData);
        }
    } catch (error) {
        console.log("error while retrieving the data");
    }
}


export const causeOfIssueFunction = async (setState, tokenId) => {
    try {
        const res = await axios.get(
            `${causeOfIssue}?filter={"where":{"is_active":true},"order":["sequence ASC"]}`,
            {
                headers:
                    { "Authorization": `Bearer ${tokenId}` }
            }

        );
        if (res.status === 200) {
            const newData = res.data?.map((value, index) => ({
                ...value,
                label: value.cause_of_issue,
                value: value.id,
            }));
            setState(newData);
        }
    } catch (error) {
        console.log("error while retrieving the data");

    }
}

export const pickImage = async (setState, setImage, type, setQuestionList, questionList, index, isAudit) => {
    // No permissions request is necessary for launching the image library
    Alert.alert('Choose a file', '', [
        {
            text: 'Cancel ',
            onPress: () => console.log('Ask me later pressed'),
        },
        {
            text: 'Camera ',
            onPress: () => {

                selectedImgSelectionType(setState, setImage, type, setQuestionList, questionList, index, true, isAudit)
            },
            style: 'cancel',
        },
        {
            text: 'Gallery ', onPress: () => {

                selectedImgSelectionType(setState, setImage, type, setQuestionList, questionList, index, false, isAudit)

            }
        },
    ]);
    // const openCamera = async () => {
    // Ask the user for the permission to access the camera

};
export const selectMultipleImg = async (setState, setImage, imgUrl, imgObj) => {
    // No permissions request is necessary for launching the image library
    Alert.alert('Choose a file', '', [
        {
            text: 'Cancel ',
            onPress: () => console.log('Ask me later pressed'),
        },
        {
            text: 'Camera ',
            onPress: () => {

                selectImg(setState, setImage, imgUrl, imgObj, true)
            },
            style: 'cancel',
        },
        {
            text: 'Gallery ', onPress: () => {

                selectImg(setState, setImage, imgUrl, imgObj, false)

            }
        },
    ]);
    // const openCamera = async () => {
    // Ask the user for the permission to access the camera

};

const selectImg = async (setState, setImage, imgUrl, imgObj, isCamera) => {
    let result = ''
    // const openCamera = async () => {
    // Ask the user for the permission to access the camera

    if (isCamera) {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            // setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    } else {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,

        });
    }

    //   }

    // return;
    // let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,

    //     });
    // console.log();
    if (result.cancelled) {
        return;
    }

    console.log(setState);
    // console.log(type);
    const url = result.uri;
    fetch(url)
        .then((res) => res.blob())
        .then((myBlob) => {

            setState([...imgObj, { obj: result, created_date: new Date(), url: url, blob: myBlob }])
        });

    setImage([...imgUrl, { url: url, created_date: new Date() }])

    console.log("RESS else: ", url);

}



const selectedImgSelectionType = async (setState, setImage, type, setQuestionList, questionList, index, isCamera, isAudit) => {
    let result = ''
    // const openCamera = async () => {
    // Ask the user for the permission to access the camera

    if (isCamera) {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            // setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    } else {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,

        });
    }

    //   }

    // return;
    // let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,

    //     });
    // console.log();
    if (result.cancelled) {
        return;
    }
    if (type === "0") {
        console.log("IMG RESULE:  ", result);
        setState(result)
        if (!result.cancelled) {
            setImage(result.uri);

        }
    } else if (type === "1") {
        if (!result.cancelled) {


            const url = result.uri;

            let newFormValues = [...questionList];
            newFormValues[index]["image"] = url
            newFormValues[index]["imgobj"] = result
            console.log(newFormValues);
            setQuestionList(newFormValues)
        }
    } else if (type === "2") {

        if (!result.cancelled) {


            const url = result.uri;

            let newFormValues = [...questionList];
            newFormValues[index]["image"] = url
            newFormValues[index]["imgobj"] = result
            console.log(newFormValues);
            setQuestionList(newFormValues)
        }

    }
    else if (type === '3') {

        const url = result.uri;
        setState(result)
        setImage(url)
        console.log("RESS: ", url);
    }
    else {
        console.log(setState);
        console.log(type);
        const url = result.uri;
        if (typeof isAudit === 'undefined') {

            setState(result)
            setImage(url)
        } else {

            setState(result)
            setImage(url)
        }
        console.log("RESS else: ", url);
    }
}


export const preCheckAuditQue = async (setState, tokenId) => {

    try {
        const res = await axios.get(
            `${question}?filter={"where":{"audit_type":"0","is_active":${true}}}`, {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        }
        );
        if (res.status === 200) {
            if (!res.data.length) {
            }


            let obj = res.data.map((element, index) => {
                return { ...element, checked: false };
            });

            setState(obj);


            // tableDispatch(res.data);
        } else {

        }
    } catch (error) {
        console.log(error);
    } finally {
    }

}

export const getPreCheckAuditList = async (setState, tokenId, userId, id, filterDate, headList) => {

    try {
        let filter = {
            where: {
                property_id: id,
                audit_type: "0",
                // created_by: userId
            },
            order: ["created_date DESC"],
            // skip: offset * limit,
            // limit: limit,
        };
        // ?filter={"where":{"property_id":${id}}}
        const res = await axios.get(audit + "?filter=" + JSON.stringify(filter), {
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



            const array = res.data.filter(
                (datum) => moment(datum.created_date).format(dbDate) === filterDate,
            )
            const filterData = array.filter(
                (i) =>
                    // console.log("I HEAD LIST: ", i.head_list)
                    i.head_list.some(item => item.id === userId) || i.created_by === userId
            );
            setState(filterData);
            // tableDispatch(res.data);
        } else {
            console.log("No recorde found");
        }
    } catch (error) {
        console.log("AUDIT ERROR: ", error);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
}

export const FileUpload = (formData, tokenId) => {
    return axios.post(uploadFile, formData, {
        headers:
        {
            "Authorization": `Bearer ${tokenId}`,
            'Content-Type': 'multipart/form-data'

        }
    });
};

export const getMaintenceAuditQueListFunction = async (setState, catID, tokenId,) => {
    try {
        let filter = {
            where: {
                category_id: catID,
                audit_type: "1",
                is_active: true
            },
            // skip: offset * limit,
            // limit: limit,
        };
        const res = await axios.get(
            question + "?filter=" + JSON.stringify(filter),
            {
                headers:
                    { "Authorization": `Bearer ${tokenId}` }
            }
        );
        if (res.status === 200) {
            if (!res.data.length) {
                console.log("NO RECORDE FOUND");
                // toast.error(c("no record found"));
            }
            // if (!props.isUpdate) {
            let obj = res.data.map((element, index) => {
                return { ...element, checked: false, comment: '', image: '', imgobj: {} };
            });

            setState(obj);
            // }

            // tableDispatch(res.data);
        } else {
            //   toast.error(c("no record found"));
        }
    } catch (error) {
        console.log(error);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
}

export const getMaintenceAuditDataList = async (setState, tokenId, userId, id, selectedMonth) => {
    try {
        let filter = {
            where: {
                property_id: id,
                audit_type: "1",
                // created_by: userId
            },
            order: ["created_date DESC"],
            include: [
                {
                    "relation": "areaofhouse",

                }
            ]
            // skip: offset * limit,
            // limit: limit,
        };
        // ?filter={"where":{"property_id":${id}}}
        const res = await axios.get(audit + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });
        // console.log("AUDIT DATA: ", res.data);

        if (res.status === 200) {
            if (!res.data.length) {
                toast.error(c("no record found"));
            }
            // const auditData = res.data.filter(element =>
            //   element.property_id === id && element.audit_type === "0"
            // )
            // console.log(auditData);
            const array = res.data.filter(
                (i) =>
                    moment(i.created_date).format("MMMM") === selectedMonth
                ,
            )

            const filterData = array.filter(
                (i) =>

                    typeof i.head_list !== 'undefined' && i.head_list !== null && i.head_list.length > 0 ? i.head_list.some(item => item.id === userId) || i.created_by === userId : i.created_by === userId ,
            );
            setState(filterData);
            console.log("FILTER DATA main: ", filterData);
            // tableDispatch(res.data);
        } else {
            console.log("No recorde found");
        }
    } catch (error) {
        console.log("AUDIT ERROR: ", error);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
}



export const getInvertoryCatList = async (setState, tokenId) => {
    // setBackdrop(true);

    try {
        let filter = {
            where: {
                is_active: true,
            },

            // skip: offset * limit,
            // limit: limit,
        };
        // ?filter={"where":{"property_id":${id}}}
        const res = await axios.get(inventory + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });

        if (res.status === 200) {
            if (!res.data.length) {
                toast.error(c("no record found"));
            }
            // const auditData = res.data.filter(element =>
            //   element.property_id === id && element.audit_type === "0"
            // )
            // console.log(auditData);
            setState(res.data);
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
};

export const getInvertoryCatListForRequest = async (setState, tokenId) => {
    // setBackdrop(true);

    try {
        let filter = {
            where: {
                is_active: true,
            },

            // skip: offset * limit,
            // limit: limit,
        };
        // ?filter={"where":{"property_id":${id}}}
        const res = await axios.get(inventory + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });

        if (res.status === 200) {
            if (!res.data.length) {
                toast.error(c("no record found"));
            }
            // const auditData = res.data.filter(element =>
            //   element.property_id === id && element.audit_type === "0"
            // )
            // console.log(auditData);
            const newData = res.data?.map((value, index) => ({
                key: index.toString(),
                label: value.inventory,
                value: value.id,
            }));
            setState(newData);
            // setState(res.data);
            console.log("req inv list: ", newData);
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
};


export const getInventorySubCatList = async (setState, catId, tokenId) => {

    try {
        let filter = {
            where: {
                inventory_id: catId,
                is_active: true,
            },

            // skip: offset * limit,
            // limit: limit,
        };
        // ?filter={"where":{"property_id":${id}}}
        const res = await axios.get(subInventory + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        }
        );

        if (res.status === 200) {
            if (!res.data.length) {
                toast.error(c("no record found"));
            }
            let obj = res.data.map((element, index) => {
                return {
                    sub_inventory_id: element.id,
                    sub_inventory: element.sub_inventory,
                    comment: "",
                    image: "",
                    imgobj: {},
                    actual: "",
                    required: "",
                    total: "",
                };
            });
            // console.log(auditData);
            setState(obj);
            // tableDispatch(res.data);
        } else {
            // toast.error(c("no record found"));
        }
    } catch (error) {
        console.log(error);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
};


export const getInventorySubCatListForReq = async (setState, catId, tokenId) => {

    try {
        let filter = {
            where: {
                inventory_id: catId,
                is_active: true,
            },

            // skip: offset * limit,
            // limit: limit,
        };
        // ?filter={"where":{"property_id":${id}}}
        const res = await axios.get(subInventory + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        }
        );

        if (res.status === 200) {
            if (!res.data.length) {
                toast.error(c("no record found"));
            }
            let obj = res.data.map((element, index) => {
                return {
                    sub_inventory_id: element.id,
                    sub_inventory: element.sub_inventory,
                    comment: "",
                    image: "",
                    imgobj: {},
                    actual: "",
                    required: "",
                    total: "",
                    label: element.sub_inventory,
                    value: element.id
                };
            });
            // console.log(auditData);
            setState(obj);
            // tableDispatch(res.data);
        } else {
            // toast.error(c("no record found"));
        }
    } catch (error) {
        console.log(error);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
};





export const getInventoryAuditList = async (setState, tokenId, userId, id, selectedMonth, isReqAudit, isSendReq, isSendReqPermission) => {


    var value = ''
    if (typeof isSendReq !== 'undefined') {
        if (isSendReqPermission) {

            value = {
                where: {
                    property_id: id,
                    audit_type: "2",
                    send_audit: true
                },
                order: ["created_date DESC"],
                include: [
                    {
                        "relation": "subInventory",

                    },
                    {
                        "relation": "inventory",

                    }


                ]
                // include: [
                //     {
                //         "relation": "areaofhouse",

                //     }
                // ]
                // skip: offset * limit,
                // limit: limit,
            };
        } else {

            value = {
                where: {
                    property_id: id,
                    audit_type: "2",
                    // created_by: userId,
                    send_audit: true
                },
                order: ["created_date DESC"],
                include: [
                    {
                        "relation": "subInventory",

                    },
                    {
                        "relation": "inventory",

                    }


                ]
                // include: [
                //     {
                //         "relation": "areaofhouse",

                //     }
                // ]
                // skip: offset * limit,
                // limit: limit,
            };
        }
    } else {
        value = {
            where: {
                property_id: id,
                audit_type: "2",
                // created_by: userId,
                request_audit: isReqAudit
            },
            order: ["created_date DESC"],
            include: [
                {
                    "relation": "subInventory",

                },
                {
                    "relation": "inventory",

                }


            ]
            // include: [
            //     {
            //         "relation": "areaofhouse",

            //     }
            // ]
            // skip: offset * limit,
            // limit: limit,
        };

    }
    console.log("1234", value);
    try {
        let filter = value

        const res = await axios.get(subInventoryAudit + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });
        console.log("AUDIT DATA: ", res.data);

        if (res.status === 200) {
            if (!res.data.length) {
                // toast.error(c("no record found"));
            }
            // const auditData = res.data.filter(element =>
            //   element.property_id === id && element.audit_type === "0"
            // )
            // console.log(auditData);
            if (typeof isSendReq !== 'undefined') {
                if (isSendReqPermission) {
                    const filterData = res.data.filter(
                        (i) =>
                            // console.log("I HEAD LIST: ", i.head_list)
                            i.head_list.some(item => item.id === userId)
                    );
                    setState(filterData);
                } else {
                    const filterData = res.data.filter(
                        (i) =>

                            moment(i.created_date).format("MMMM") === selectedMonth,
                    );
                    setState(filterData);
                }

            } else {
                const filterData = res.data.filter(
                    (i) =>

                        moment(i.created_date).format("MMMM") === selectedMonth,
                );
                setState(filterData);
            }

            // tableDispatch(res.data);
        } else {

            console.log("No recorde found");
        }
    } catch (error) {

        console.log("AUDIT ERROR: ", error);
        console.log(error.response);
        // toast.error(c("error while retrieving the data"));
    } finally {
        return "Complete"
        // setBackdrop(false);
    }
}



export const getInventoryAuditListNoti = async (setState, tokenId, userId, name, isReqAudit) => {
    console.log(name);
    try {
        let filter = {
            where: {

                audit_type: "2",
                request_audit: true,
                // head_list: [{ id: userId, staff_name: name }]
            },
            // params: {

            //     audit_type: "2",
            //     request_audit: true,
            //     head_list: [{ id: userId, staff_name: name }]
            // },
            // paramsSerializer: function (params) {
            //     return qs.stringify(params, { arrayFormat: "repeat" })
            // },
            order: ["created_date DESC"],
            include: [
                {
                    "relation": "subInventory",

                },
                {
                    "relation": "inventory",

                }


            ]

            // skip: offset * limit,
            // limit: limit,
        };
        // ?filter={"where":{"property_id":${id}}}
        //  "?filter=" + JSON.stringify(filter)
        // var params = {
        //     // params: {

        //     // audit_type: "2",
        //     // request_audit: true,
        //     head_list: [{ id: userId, staff_name: name }],
        //     // },
        //     paramsSerializer: function (params) {
        //         return qs.stringify(params, { arrayFormat: "brackets" })
        //     },
        // }
        const res = await axios.get(subInventoryAudit + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });
        console.log("AUDIT DATA Noti: ", res.data.length);

        if (res.status === 200) {
            if (!res.data.length) {
                // toast.error(c("no record found"));
            }
            // const auditData = res.data.filter(element =>
            //   element.property_id === id && element.audit_type === "0"
            // )
            // console.log(auditData);
            const filterData = res.data.filter(
                (i) =>
                    i.head_list !== null ? i.head_list.filter((item) =>
                        item.id === userId
                    ) : null
                // moment(i.created_date).format("MMMM") === selectedMonth,
            );
            setState(filterData);
            // tableDispatch(res.data);
        } else {
            console.log("No recorde found");
        }
    } catch (error) {
        console.log("AUDIT ERROR: ", error);
        console.log(error.response.data);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
}


export const getSendInventoryAuditListNoti = async (setState, tokenId, userId, name, isReqAudit) => {
    console.log(name);
    try {
        let filter = {
            where: {

                audit_type: "2",
                send_audit: true,
                // head_list: [{ id: userId, staff_name: name }]
            },
            // params: {

            //     audit_type: "2",
            //     request_audit: true,
            //     head_list: [{ id: userId, staff_name: name }]
            // },
            // paramsSerializer: function (params) {
            //     return qs.stringify(params, { arrayFormat: "repeat" })
            // },
            order: ["created_date DESC"],
            include: [
                {
                    "relation": "subInventory",

                },
                {
                    "relation": "inventory",

                }


            ]

            // skip: offset * limit,
            // limit: limit,
        };
        // ?filter={"where":{"property_id":${id}}}
        //  "?filter=" + JSON.stringify(filter)
        // var params = {
        //     // params: {

        //     // audit_type: "2",
        //     // request_audit: true,
        //     head_list: [{ id: userId, staff_name: name }],
        //     // },
        //     paramsSerializer: function (params) {
        //         return qs.stringify(params, { arrayFormat: "brackets" })
        //     },
        // }
        const res = await axios.get(subInventoryAudit + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });
        console.log("send AUDIT DATA Noti: ", res.data.length);

        if (res.status === 200) {
            if (!res.data.length) {
                // toast.error(c("no record found"));
            }
            // const auditData = res.data.filter(element =>
            //   element.property_id === id && element.audit_type === "0"
            // )
            // console.log(auditData);
            // const filterData = res.data.filter(
            //     (i) =>
            //         i.head_list !== null ? i.head_list.filter((item) =>
            //             item.id === userId
            //         ) : null
            //     // moment(i.created_date).format("MMMM") === selectedMonth,
            // );
            setState(res.data);
            // tableDispatch(res.data);
        } else {
            console.log("No recorde found");
        }
    } catch (error) {
        console.log("AUDIT ERROR: ", error);
        console.log(error.response.data);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
}


export const getAmcCatList = async (setState, tokenId, c) => {
    try {
        const res = await axios.get(billingCategory, {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });
        if (res.status === 200) {
            // const newData = res.data
            // setState(newData);
            const newData = res.data?.map((value, index) => ({
                key: index.toString(),
                text: value.amc_cat,
                value: value.id,
            }));
            setState(newData);
        }
    } catch (error) {
        // toast.error(c("error while retrieving the data"));
    }
};

export const getAMCLogData = async (id, setState, tokenId, userId, type, selectedMonth) => {

    let filter = {
        where: {
            property_id: id,
            audit_type: type,
            // created_by: userId
        },
        order: ["created_date DESC"],
        // skip: offset * limit,
        // limit: limit,
    };
    try {
        await axios
            .get(amcPurchase + "?filter=" + JSON.stringify(filter),
                {
                    headers:
                        { "Authorization": `Bearer ${tokenId}` }
                }

            )
            .then((response) => {
                let filterData = response.data.filter(
                    (i) =>

                        moment(i.created_date).format("MMMM") === selectedMonth,
                );
                filterData = filterData.filter(
                    (i) =>
                        // console.log("I HEAD LIST: ", i.head_list)
                        i?.head_list?.some(item => item.id === userId) || i.created_by === userId
                );
                setState(filterData);
            })
            .catch((error) => {
                console.log("Error :: ", error);
            });
    } catch (error) {
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
};

export const getBookingList = async (setState, tokenId, userId, propertyVal, locationId) => {


    let filter = ''
    // if (typeof locationId !== "undefined" && locationId !== null) {
    //     filter = {
    //         where: {
    //             location_id: locationId,
    //         },
    //         order: ["created_date DESC"],
    //         // skip: offset * limit,
    //         // limit: limit,
    //     }
    // }
    // else if (typeof propertyVal !== 'undefined' && propertyVal !== null) {
    //     filter = {
    //         where: {
    //             property_id: propertyVal,
    //         },
    //         order: ["created_date DESC"],
    //         // skip: offset * limit,
    //         // limit: limit,
    //     }

    // } else {
    filter = {
        order: ["created_date DESC"],
    }
    // }
    console.log("filter1234: ", filter);
    try {
        const res = await axios.get(bookingApi + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });
        if (res.status === 200) {
            if (!res.data.length) {
                // toast.error(c("no record found"));
            }
            console.log("count123: " + res.data.length);

            const exportData = res.data.map((booking) => {
                return {
                    ...booking,
                    // guest_Name: booking.guest_Name,
                    // checkin_Date: booking.checkin_Date,
                    // checkout_Date: booking.checkout_Date,
                    // sales_person_Name: booking.sales_person_Name,
                    booking_date_list: getDaysArray(moment(booking.checkin_Date).format(dateCalendar), moment(booking.checkout_Date).format(dateCalendar)),
                    // booking_status:
                    //     booking.booking_status === "0"
                    //         ? "Pending"
                    //         : booking.booking_status === "1"
                    //             ? "Advance"
                    //             : booking.booking_status === "2"
                    //                 ? "Completed"
                    //                 : null,
                };
            });


            setState(exportData)
            //   setExportData(exportData);

            //   tableDispatch(res.data);
        } else {
            //   toast.error(c("no record found"));
        }
    } catch (error) {
        console.log(error);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }

}
var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(
            moment(dt).format(dbDate)
            // new Date(dt)
        );
    }

    return arr;
};


export const getLocationList = async (setState, tokenId) => {
    let filter = {
        // where: {
        //     is_active: true,
        // },
        order: ["created_date DESC"],
        // skip: offset * limit,
        // limit: limit,
    }
    try {
        const res = await axios.get(locationList + "?filter=" + JSON.stringify(filter), {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        });
        if (res.status === 200) {
            if (!res.data.length) {
                // toast.error(c("no record found"));
            }
            const locationList = res.data.map((data, index) => {

                return {
                    ...data,
                    label: data.location_name,
                    value: data.location_id
                }
            })

            setState(locationList)
            //   setExportData(exportData);
            console.log("RES DATAA: ", res.data);
            //   tableDispatch(res.data);
        } else {
            //   toast.error(c("no record found"));
        }
    } catch (error) {
        console.log("location eerrro: ", error);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
}


export const getBankList = async (setState, tokenId) => {
    try {
        const res = await axios.get(
            `${bankApi}`, {
            headers:
                { "Authorization": `Bearer ${tokenId}` }
        }
        );
        if (res.status === 200) {
            if (!res.data.length) {
                toast.error(c("no record found"));
            }

            const data = res.data.map((value, index) => ({
                key: index.toString(),
                label: value.ac_name,
                value: value.id,
            }));
            setState(data);
        } else {
            toast.error(c("no record found"));
        }
    } catch (error) {
        toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
}

export const getBankName = () => {

    const bankNameList = [
        {
            label: "Kotak",
            value: "0"
        }, {
            label: "Kotak",
            value: "0"
        }, {

        }, {}
    ]
}


