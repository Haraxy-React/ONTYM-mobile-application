import React, { useEffect, useState, useReducer, useMemo } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StyleSheet, StatusBar, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';

export const DynamicBalancePayment = (props, { objUpdate }) => {
    const [countTime, setCountTime] = useState([{ advance_payment: "", payment_type: "", bank_name: "", collected_by: "", coupon_code: "" }]);
    const [plus, setPlus] = useState(0);

    const addNewProperty = (event, val) => {
        // props.setPropertyCount(1);

        // countTime.push()
        setCountTime([...countTime, { advance_payment: "", payment_type: "", bank_name: "", collected_by: "", coupon_code: "" }])
        console.log(countTime);
        // renderNewComponets(countTime)
        // plus = plus + 1;
        setPlus(plus + 1)
        console.log("plus: ", plus);
    }
    useMemo(() => {
        if (typeof props.objUpdate.add_balance_Payment !== "undefined") {

            setCountTime(props.objUpdate.add_balance_Payment)
            console.log("COUNTERTIME:  ", countTime);
        }

    }, [props.objUpdate.add_balance_Payment]);

    const removeData = (i) => {

        let newFormValues = [...countTime];
        newFormValues.splice(i, 1);
        setCountTime(newFormValues)
        props.setBalancePaymentList({ name: "add_balance_Payment", value: [...newFormValues] })

        // props.setFormData({ type: "INIT_STATE", payload: { ...objUpdate, "add_advance_Payment": [...newFormValues] } });

    }
    const handleChange = (i, val, name) => {

        let newFormValues = [...countTime];
        newFormValues[i][name] = val;
        setCountTime(newFormValues)
        console.log("VLAA NAME", countTime);
        props.setBalancePaymentList({ name: "add_balance_Payment", value: [...countTime] })

        // setStateData({ name: "add_advance_payment", value: [...countTime] })
        // props.state({ name: "add_advance_Payment", value: [...countTime] })
        // console.log("VAL: ", stateData);

        // props.setFormData({
        //     name: val.name,
        //     value: val.value
        // })
    }


    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    addNewProperty()

                }}
                style={{ flexDirection: "row", marginTop: 10 }}>
                <Icon name='plus' style={{ color: "#2D9cDB" }} size={30} />
                <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular", lineHeight: 27, color: "#2D9cDB", marginTop: 3, marginLeft: 10 }}>Add Balance Payment</Text>
            </TouchableOpacity>
            {

                countTime?.map((element, index) => {

                    return (<View key={index}>

                        <View style={{ flex: 1, justifyContent: "flex-start" }} >
                            <TouchableOpacity onPress={() => {
                                removeData(index)

                            }}>
                                <Text style={{ fontSize: 18, textAlign: "right" }}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            placeholder="Ex. 10,000/-"
                            label="Balance Amount"
                            mode="outlined"
                            value={element.advance_payment}
                            onChangeText={text => {
                                handleChange(index, text, "advance_payment")
                            }

                            }
                            style={{ marginTop: 20 }} />

                        <View
                            style={{ paddingTop: 20 }}

                        >
                            <Dropdown
                                placeholder="Payment type"
                                style={[styles.dropdown, { borderColor: 'black' }]}
                                // placeholderStyle={styles.placeholderStyle}
                                // selectedTextStyle={styles.selectedTextStyle}
                                // inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                data={
                                    [
                                        {
                                            label: "Cash",
                                            value: "0"
                                        },
                                        {
                                            label: "Bank Transfer",
                                            value: "1"
                                        },
                                        {
                                            label: "Razarpay",
                                            value: "2"
                                        },

                                        {
                                            label: "GPay",
                                            value: "3"
                                        },

                                        {
                                            label: "Credit Note",
                                            value: "4"
                                        }
                                    ]
                                }

                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                // placeholder={!isFocus ? 'Select item' : '...'}
                                value={element.payment_type}
                                // onFocus={() => setIsFocus(true)}
                                // onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    console.log(item.value);
                                    handleChange(index, item.value, "payment_type")

                                    // setPropertyVal(item.value)
                                    // setPropertyName(item.label)
                                    // setValue(item.value);
                                    // setIsFocus(false);
                                }}

                            />
                        </View>



                        {

                            element.payment_type === "0" ?

                                <TextInput
                                    placeholder="Ex. Suraj"
                                    label="Collected by"
                                    mode="outlined"
                                    value={element.collected_by}
                                    onChangeText={text => {
                                        handleChange(index, text, "collected_by")

                                    }
                                    }
                                    style={{ marginTop: 20 }} /> :
                                element.payment_type === "4" ?

                                    <TextInput
                                        placeholder="Ex. XXXXX"
                                        label="Coupon code"
                                        mode="outlined"
                                        value={element.coupon_code}
                                        onChangeText={text => {
                                            handleChange(index, text, "coupon_code")

                                        }
                                        }
                                        style={{ marginTop: 20 }} /> :
                                    <View
                                        style={{
                                            paddingTop: 20
                                        }}
                                    >


                                        <Dropdown
                                            placeholder="Bank name"
                                            style={[styles.dropdown, { borderColor: 'black' }]}
                                            // placeholderStyle={styles.placeholderStyle}
                                            // selectedTextStyle={styles.selectedTextStyle}
                                            // inputSearchStyle={styles.inputSearchStyle}
                                            // iconStyle={styles.iconStyle}
                                            data={
                                                props.bankList

                                                // [
                                                //     {
                                                //         label: "Kotak",
                                                //         value: "0"
                                                //     },
                                                //     {
                                                //         label: "SBI",
                                                //         value: "1"
                                                //     },
                                                //     {
                                                //         label: "Punjab Bank",
                                                //         value: "2"
                                                //     }
                                                // ]
                                            }

                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            // placeholder={!isFocus ? 'Select item' : '...'}
                                            value={element.bank_name}
                                            // onFocus={() => setIsFocus(true)}
                                            // onBlur={() => setIsFocus(false)}
                                            onChange={item => {
                                                console.log(item.value);
                                                handleChange(index, item.value, "bank_name")

                                                // setPropertyVal(item.value)
                                                // setPropertyName(item.label)
                                                // setValue(item.value);
                                                // setIsFocus(false);
                                            }}

                                        />
                                    </View>


                        }



                        <View style={{
                            marginTop: 25,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}></View>
                    </View>)
                })
            }
        </View>
    )

}


const styles = StyleSheet.create({

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