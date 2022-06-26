import React, { useEffect, useState, useReducer, useMemo } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StyleSheet, StatusBar, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';

export const DynamicFoodPackage = (props, { objUpdate }) => {
    const [countTime, setCountTime] = useState([{ food_amount: "", meal_type: "", advance_type: "", advance_amount: "", bank_name: "", balance_amount: "", balance_type: "" }]);
    const [plus, setPlus] = useState(0);


    const addNewFoodPackage = (event, val) => {
        // props.setPropertyCount(1);

        // countTime.push()
        setCountTime([...countTime, { food_amount: "", meal_type: "", advance_type: "", advance_amount: "", bank_name: "", balance_amount: "", balance_type: "" }])
        console.log(countTime);
        // renderNewComponets(countTime)
        // plus = plus + 1;
        setPlus(plus + 1)
        console.log("plus: ", plus);
        props.setFoodPackageList({ name: "food_package", value: [...countTime] })

    }
    useMemo(() => {
        if (typeof props.objUpdate.food_package !== "undefined") {

            setCountTime(props.objUpdate.food_package)
            console.log("COUNTERTIME:  ", countTime);
        }

    }, [props.objUpdate.food_package]);

    const handleChange = (i, val, name) => {

        let newFormValues = [...countTime];
        newFormValues[i][name] = val;
        setCountTime(newFormValues)
        // setStateData({ name: "add_advance_payment", value: [...countTime] })
        props.setFoodPackageList({ name: "food_package", value: [...countTime] })


        // props.setFormData({
        //     name: val.name,
        //     value: val.value
        // })
    }

    const removeData = (i) => {
        let newFormValues = [...countTime];
        newFormValues.splice(i, 1);
        setCountTime(newFormValues)
        props.setFoodPackageList({ name: "food_package", value: [...countTime] })


        //props.setFormData({ type: "INIT_STATE", payload: { ...objUpdate, "food_package": [...newFormValues] } });

    }




    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    addNewFoodPackage()

                }}
                style={{ flexDirection: "row", marginTop: 10 }}>
                <Icon name='plus' style={{ color: "#2D9cDB" }} size={30} />
                <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular", lineHeight: 27, color: "#2D9cDB", marginTop: 3, marginLeft: 10 }}>Add Food Package</Text>
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
                            label="Food Amount"
                            mode="outlined"
                            value={element.food_amount}
                            onChangeText={text => {
                                handleChange(index, text, "food_amount")
                            }

                            }
                            style={{ marginTop: 20 }} />
                        <TextInput
                            placeholder="Ex. Type"
                            label="Meal Type"
                            mode="outlined"
                            value={element.meal_type}
                            onChangeText={text => {
                                handleChange(index, text, "meal_type")

                            }
                            }
                            style={{ marginTop: 20 }} />
                        <TextInput
                            placeholder="Ex. 10,000/-"
                            label="Advance amount"
                            mode="outlined"
                            value={element.advance_amount}
                            onChangeText={text => {
                                handleChange(index, text, "advance_amount")

                            }
                            }
                            style={{ marginTop: 20 }} />

                        <TextInput
                            placeholder="Ex. cash"
                            label="Advance type"
                            mode="outlined"
                            value={element.advance_type}
                            onChangeText={text => {
                                handleChange(index, text, "advance_type")

                            }
                            }
                            style={{ marginTop: 20 }} />

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

                        <TextInput
                            placeholder="Ex. 1000"
                            label="Balance amount"
                            mode="outlined"
                            value={element.balance_amount}
                            onChangeText={text => {
                                handleChange(index, text, "balance_amount")

                            }
                            }
                            style={{ marginTop: 20 }} />

                        <TextInput
                            placeholder="Ex. type"
                            label="Balance type"
                            mode="outlined"
                            value={element.balance_type}
                            onChangeText={text => {
                                handleChange(index, text, "balance_type")

                            }
                            }
                            style={{ marginTop: 20 }} />

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