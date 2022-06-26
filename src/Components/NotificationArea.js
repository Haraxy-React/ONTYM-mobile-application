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
const limit = 5;

export const getPreCheckAuditNoti = async (setState, tokenId, userId, filterDate) => {
    try {
        let filter = {
            where: {
                // property_id: id,
                audit_type: "0",
                // created_by: userId
            },
            include: [

                {
                    "relation": "property",
                }
            ],
            order: ["created_date DESC"],
            // skip: offset * limit,
            limit: limit,
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
                    i.head_list.some(item => item.id === userId)
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

export const getMaintenanceNoti = async (setState, tokenId, userId, selectedMonth) => {
    try {
        let filter = {
            where: {
                // property_id: id,
                audit_type: "1",
                // created_by: userId
            },
            order: ["created_date DESC"],
            include: [
                {
                    "relation": "areaofhouse",

                },
                {
                    "relation": "property",
                }
            ],
            // skip: offset * limit,
            limit: limit,
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

                    typeof i.head_list !== 'undefined' ? i.head_list.some(item => item.id === userId) : false,
            );
            setState(filterData);
            console.log("FILTER DATA main: ", filterData);
            // tableDispatch(res.data);
        } else {
            console.log("No recorde found");
        }
    } catch (error) {
        console.log("AUDIT ERROR: ", error.response);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }

}


export const getInventoryNoti = async (setState, tokenId, userId, selectedMonth) => {


    var value = ''

    value = {
        where: {
            // property_id: id,
            audit_type: "2",
            // created_by: userId,
        },
        order: ["created_date DESC"],
        include: [
            {
                "relation": "subInventory",

            },
            {
                "relation": "inventory",

            },



        ]
        // include: [
        //     {
        //         "relation": "areaofhouse",

        //     }
        // ]
        // skip: offset * limit,
        ,
        limit: limit,
    };


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
                const array = filterData.filter(
                    (i) =>

                        typeof i.head_list !== 'undefined' ? i.head_list.some(item => item.id === userId) : i,
                );
                setState(array);
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

export const getAmcLogNoti = async (setState, tokenId, userId, type, selectedMonth) => {

    let filter = {
        where: {
            // property_id: id,
            audit_type: type,
            // created_by: userId
        },
        // include: [

        //     {
        //         "relation": "property",
        //     }


        // ],
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
                let array = filterData.filter(
                    (i) =>
                        // console.log("I HEAD LIST: ", i.head_list)
                        i?.head_list?.some(item => item.id === userId)
                );
                console.log('AMC:', array);
                setState(array);
            })
            .catch((error) => {
                console.log("Error :: ", error);
            });
    } catch (error) {
        console.log(error);
        // toast.error(c("error while retrieving the data"));
    } finally {
        // setBackdrop(false);
    }
};


