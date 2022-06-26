import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar, Modal, KeyboardAvoidingView, Platform,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

import SwitchToggle from 'react-native-switch-toggle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Collapsible from 'react-native-collapsible';
import dragToUpload from "../Assets/dragToUpload.png";
import * as ImagePicker from 'expo-image-picker';
import { pickImage, getInventorySubCatList,selectMultipleImg } from "../Components/getFunction";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { showMessage, hideMessage } from "react-native-flash-message";
import { log } from 'react-native-reanimated';
import { Dropdown } from 'react-native-element-dropdown';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';

export const PreCheckAuditQueBottomSheet = (props) => {

    // console.log("PROPS:  ", props.updateObj);
    const queList = props.isUpdate ? props.updateObj.questions : props.queList;
    console.log(queList);

    // const url = props.isUpdate ? props.updateObj.comment[0].comment : props.queList;
    // const comment = props.isUpdate ? props.updateObj.question : props.queList;
    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,

                height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />
            <ScrollView>




                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>Check-list</Text>

                </View>
                <View >
                    {
                        // console.log("PROPS QUE LIST: ", props.queList)

                        queList.map((data, index) => {
                            return (
                                <View style={{ flexDirection: "row", width: "90%", paddingTop: 20 }}>
                                    <SwitchToggle
                                        containerStyle={{

                                            width: 45,
                                            height: 25,
                                            borderRadius: 25,
                                            padding: 5,
                                        }}
                                        backgroundColorOn='#2d9cdb'
                                        backgroundColorOff='#Dadada'
                                        circleStyle={{
                                            width: 13,
                                            height: 15,
                                            borderRadius: 27.5,

                                        }}
                                        switchOn={data.checked}
                                        onPress={() => {
                                            if (props.isUpdate) {

                                                const newFormValues = [...props.updateObj.questions];
                                                newFormValues[index]["checked"] = !data.checked;
                                                props.setUpdateObj({ ...props.updateObj }, { questions: newFormValues });
                                            } else {

                                                const newFormValues = [...props.queList];
                                                newFormValues[index]["checked"] = !data.checked;
                                                props.setQueList(newFormValues);
                                            }
                                        }}
                                        circleColorOff='#FFF'
                                        circleColorOn='#fff'
                                        duration={100}
                                    />
                                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 18, color: "#000000", paddingLeft: 40, textAlign: "left" }} > {index}. {data.question} </Text>



                                </View>
                            )
                        })
                    }



                    <View style={{ width: "95%", height: 80, marginHorizontal: 30, flexDirection: "row", marginTop: 20 }}>

                        <View style={{ height: 50, justifyContent: "center", width: "80%" }}>
                            {/* <Text style={{ backgroundColor: "#fff", width: 96, position: "absolute", top: -12, left: 20, fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: "400" }}>  Comments</Text> */}
                            {/* <Text style={{ marginHorizontal: 20, fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: "400", color: "#000000", opacity: 0.5 }}>Any Comment</Text> */}
                            <TextInput
                                label="Any Comment"
                                mode="outlined"
                                value={props.comment}
                                onChangeText={text => props.setComment(text)}

                            />
            
                            
                        </View>
                        <TouchableOpacity onPress={() => {

                        selectMultipleImg(props.setImgObj, props.setImgUrl,props.imgUrl,props.imgObj)
                        }}>
                            <Icon name='camera' style={{ color: "#2d9cdb", margin: 10 }} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginHorizontal: 30,
                    }}>
                       
                      
                        { props.isUpdate?  props.updateObj.comment !== "undefined" &&
                                        props.updateObj.comment !== null &&  props.updateObj.comment.length > 0
                                        ? props.updateObj.comment.map((element) => {
                                            return <View style={{ flexDirection: 'row' }}>
                                                 <Text>{'\u2022'}</Text>
                                                <Text style={{ flex: 1, paddingLeft: 5 }}>{element.comment}</Text>
                                            </View>;
                                        })
                            : null:null
                        }
                         
                    </View> 
                    

                    {props.imgUrl.length  > 0 ?
                    <ScrollView
                        horizontal={true}
                        style={
                            {
                                marginHorizontal: 30
                            }
                        }
                    >
                            <View style={{ width: "95%", height: 100, flexDirection: "row", marginTop: 20, }}>
                                {
                                    props.imgUrl.map((data,index) => { 
                                        
                                        return <View >
                                            <TouchableOpacity
                                                style={{
                                                    zIndex:1,position:"absolute" ,margin:5
                                                    }}
                                                onPress={() => { 
                                              // props.imgUrl.filter(item => item.url !== data.url)
                                              props.imgUrl.splice(index, 1);
                                              
                                              try {
                                                //   props.imgObj.splice(index, 1);    
                                                  
                                                  props.setImgObj(props.imgObj.filter(item => item.url !== data.url))
                                                  console.log('img obj ', props.imgObj);

                                              } catch (error) {
                                                  console.log(error);
                                                    }     
                                                    
                                                    
                                            if (props.updatedImgUrl.length > 0) {
                                                  try {
                                                      props.updatedImgUrl.splice(index, 1);   
                                                      
                                                  } catch (error) {
                                                      
                                                  }
                                                
                                              }      
                                              props.setImgUrl([...props.imgUrl])
                                              
                                            }}>
                                                 <Icon  name='delete' style={{ color: "black"}} size={25}/>
                                            
                                            </TouchableOpacity>
                                                <Image style={{ width: 100, height: 100, margin: 5, zIndex: 0 }} source={{ uri: data.url }} />
                                               
                                        </View>
                                    })
                                }
                           
                        </View>
                    
                    </ScrollView>:null
                    }

                    {
                        // props.isUpdate ? (
                        // <View>
                        //     <View
                        //         style={{
                        //             flex: 1,
                        //             flexDirection: "row",
                        //             display: "flex",

                        //         }}
                        //     >
                        //         <Icon name="comment" style={{ color: "#2185d0", }} size={28} />

                        //         {/* <ul style={{ margin: "auto", listStyle: "disc", paddingLeft: "15px" }}>
                        //             {typeof props.updateObj.comment !== "undefined" &&
                        //                 props.updateObj.comment !== null
                        //                 ? props.updateObj.comment.map((element) => {
                        //                     return <li style={{ marginLeft: "10px" }}>{element.comment}</li>;
                        //                 })
                        //                 : null}
                        //         </ul> */

                        //         }


                        //         {/* <View style={{flexDirection:"column",backgroundColor:"red"}}>
                        //             {typeof props.updateObj.comment !== "undefined" &&
                        //                 props.updateObj.comment !== null
                        //                 ? props.updateObj.comment.map((element) => {
                        //                     return <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 18, color: "#000000", paddingLeft: 10, textAlign: "left" }}>{element.comment}</Text>;
                        //                 })
                        //                 : null}
                                     
                        //         </View> */}
                        //         <View
                        //             style={{
                        //                 flex: 1,
                        //                 flexDirection: "row",
                        //                 display: "flex",
                        //             }}
                        //         >
                        //             {/* <Icon
                        //                 name="pencil"
                        //                 style={{ color: "#2D9CDB", position: "absolute" }}
                        //             // onClick={() => setEditable(true)}
                        //             /> */}
                        //         </View>
                        //     </View>
                        //     <View style={{ flex: 1, flexDirection: "row", display: "flex" }}>
                        //         <View
                        //             style={{
                        //                 flex: 1,
                        //                 flexDirection: "row",
                        //                 display: "flex",
                        //                 marginTop: 15,
                        //             }}
                        //         >
                        //             <Icon name='camera' style={{ color: "#2d9cdb", margin: 10 }} size={25} />
                        //             {/* <View>
                                  

                        //                 {
                        //                     // console.log("update img list: ", props.updateObj.image)
                        //                     typeof props.updateObj.image !== "undefined" && props.updateObj.image
                        //                         ? props.updateObj.image.map((element) => {
                        //                             // downloadImageUrl = element?.url;
                        //                             return <Image
                        //                                 className="preview-img"
                        //                                 style={{ width: 100, height: 100 }}
                        //                                 source={
                        //                                     {
                        //                                         uri: element.url
                        //                                     }
                        //                                 }
                        //                             />


                        //                             // <a href={element.url} download>
                        //                             //   <img
                        //                             //     style={{
                        //                             //       marginLeft: "25px",
                        //                             //     }}
                        //                             //     src={element.url}
                        //                             //   />
                        //                             // </a>


                        //                         })
                        //                         : null
                        //                 }

                        //             </View> */}
                        //         </View>
                        //     </View>
                        // </View>
                        // ): null
                    }

                    <TouchableOpacity
                        onPress={() =>
                            props.onPress()
                        }
                        style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 50, bottom: 30 }}>
                        <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>

        </View>



    )
}



export const MaintenanceAudit = (props) => {
    const queList =
        // props.isUpdate ? props.updateObj.questions :
        props.queList;

    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                // top: 25,
                height: "100%",
            }}>
            <View style={{
                width: "100%",
                alignSelf: "center", marginTop: 5, justifyContent: "flex-end", flexDirection: "row"
            }} ><TouchableOpacity onPress={() => {
                props.closesheet()
            }}><Text style={{
                fontSize: 20,

                textAlign: "right",
                flexDirection: "row",
                justifyContent: "center"
            }}>close</Text></TouchableOpacity></View>
            {/* <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} /> */}

            {/* <KeyboardAvoidingView
                keyboardVerticalOffset={-550}
                behavior="position"
                showsVerticalScrollIndicator={true} /> */}
            <ScrollView>




                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>{props.header} </Text>

                </View>
                {


                    queList.map((data, index) => {
                        return (
                            <View key={index}>

                                <View style={{ flexDirection: "row", width: "90%", paddingTop: 20 }}>
                                    <SwitchToggle
                                        containerStyle={{

                                            width: 45,
                                            height: 25,
                                            borderRadius: 25,
                                            padding: 5,
                                        }}
                                        backgroundColorOn='#2d9cdb'
                                        backgroundColorOff='#Dadada'
                                        circleStyle={{
                                            width: 13,
                                            height: 15,
                                            borderRadius: 27.5,

                                        }}
                                        switchOn={data.checked}
                                        onPress={() => {
                                            // if (props.isUpdate) {

                                            //     const newFormValues = [...props.updateObj.questions];
                                            //     newFormValues[index]["checked"] = !data.checked;
                                            //     props.setUpdateObj({ ...props.updateObj }, { questions: newFormValues });
                                            // } else {

                                            const newFormValues = [...props.queList];
                                            newFormValues[index]["checked"] = !data.checked;
                                            props.setQueList(newFormValues);
                                            // }
                                        }}
                                        circleColorOff='#FFF'
                                        circleColorOn='#fff'
                                        duration={100}
                                    />
                                    <Text style={{ width: "88%", fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 18, color: "#000000", paddingHorizontal: 20, textAlign: "left" }} >{index}.  {data.question} </Text>

                                    <MaterialIcons name='comment' style={{ color: "#2d9cdb" }} size={25} />

                                </View>
                                <View style={{ width: "100%", height: 60, marginHorizontal: 30, flexDirection: "row", marginTop: 20 }}>

                                    <View style={{ height: 50, justifyContent: "center", width: "80%" }}>
                                        {/* <Text style={{ backgroundColor: "#fff", width: 96, position: "absolute", top: -12, left: 20, fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: "400" }}>  Comments</Text> */}
                                        {/* <Text style={{ marginHorizontal: 20, fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: "400", color: "#000000", opacity: 0.5 }}>Any Comment</Text> */}
                                        <TextInput
                                            label="Any Comment"
                                            mode="outlined"
                                            value={data.comment}
                                            onChangeText={text => {
                                                // props.setComment(text)
                                                let newFormValues = [...queList];
                                                newFormValues[index]["comment"] = text;
                                                props.setQueList(newFormValues)
                                            }
                                            }

                                        />
                                    </View>
                                    {/* <Icon name='camera' style={{ color: "#2d9cdb", margin: 10 }} size={25} /> */}
                                    <TouchableOpacity onPress={() => {

                                        pickImage(props.setImgObj, props.setImgUrl, "1", props.setQueList, queList, index)
                                    }}>
                                        <Icon name='camera' style={{ color: "#2d9cdb", margin: 10 }} size={25} />
                                    </TouchableOpacity>

                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        display: "flex",
                                        paddingLeft: 25,
                                    }}
                                >

                                    {

                                        // console.log("SOS: ", data.image)

                                        !props.isUpdate ? data.image !== '' ? <Image
                                            className="preview-img"

                                            style={{ width: 80, height: 80 }} source={{
                                                uri: data.image
                                            }} /> : null
                                            : null
                                    }



                                </View>

                                {props.isUpdate ? (
                                    <View>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: "row",
                                                display: "flex",

                                            }}
                                        >
                                            <Icon name="comment" style={{ color: "#2185d0", }} size={28} />


                                            <View>
                                                {
                                                    data.comment !== ''
                                                        ? <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 18, color: "#000000", paddingLeft: 10, textAlign: "left" }}>{data.comment}</Text>
                                                        : null

                                                }
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: "row",
                                                    display: "flex",
                                                }}
                                            >

                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: "row", display: "flex" }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: "row",
                                                    display: "flex",
                                                    marginTop: 15,
                                                }}
                                            >
                                                <Icon name='camera' style={{ color: "#2d9cdb", margin: 10 }} size={25} />
                                                <View

                                                >


                                                    {
                                                        // console.log(props.updateObj.image)
                                                        data.image !== '' ? <Image
                                                            style={{ width: 100, height: 100 }}
                                                            source={
                                                                {
                                                                    uri: data.image
                                                                }
                                                            }
                                                        /> : null

                                                    }

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ) : null}
                            </View>
                        )
                    })



                }


                <TouchableOpacity
                    onPress={() =>
                        props.onPress()
                    }
                    style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "50%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 50, bottom: 25 }}>
                    <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                        Add to bookmark
                        </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}



export const InventoryAudit = (props) => {

    const [collapsed, setCollapsed] = useState({});
    const subCatList = props.isUpdate ? props.updateObj.sub_cat_audit : props.inventorySubCatList
    const toggleExpanded = () => {
        // Toggling the state of single Collapsible
        setCollapsed(!collapsed);
    };

    const setTextFieldValues = (e, obj, index, text) => {
        let newFormValues = [...subCatList];
        newFormValues[index][e] = text;
        props.setInventorySubCatList(newFormValues);
        console.log(newFormValues);
    };
    // const queList =
    //     props.isUpdate ? props.updateObj.questions :
    //         props.queList;
    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                top: 10,
                flexGrow: 1,
                width: '100%',
                height:"100%"
            }}>


            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />
            <View style={{
                width: "100%",
                alignSelf: "center", marginTop: 5, justifyContent: "flex-start", flexDirection: "row"
            }} ><TouchableOpacity onPress={() => {
                // closesheet()
                props.onSheetBack()
            }}>

                    <Icon name='arrow-left' style={{ color: "#2d9cdb" }} size={25} />

                    {/* <Text style={{
                fontSize: 18,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#000",
                textAlign: "right",
                flexDirection: "row",
                justifyContent: "center"
                    }}><</Text> */}

                </TouchableOpacity></View>
            <ScrollView style={{

                top: 5
            }}>

                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>{props.header} </Text>

                </View>
                <View style={{ marginTop: 2 }}>
                    {
                        subCatList.map((data, index) => {
                            // console.log(data.sub_inventory);
                            return (<View key={index}><TouchableOpacity onPress={() => {
                                // setCollapsed(!collapsed);
                                setCollapsed((prevState => ({ ...prevState, [index]: !prevState[index] })))

                                // setCollapsed(prevState => !prevState)

                            }} style={{ justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#A6A4A4", paddingVertical: 10 }}>
                                <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular", fontWeight: "500" }}>{data.sub_inventory}</Text>
                                <Icon name='chevron-right' style={{ color: "#000" }} size={30} />
                            </TouchableOpacity>

                                <Collapsible
                                    collapsed={collapsed[index]}
                                    align="left"
                                >
                                    {/* 
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",

                                    }}> */}
                                    <View>
                                        <View style={{
                                            flexDirection: "row",
                                        }} >
                                            <TextInput
                                                style={{
                                                    flex: 1,
                                                    margin: 5
                                                }}
                                                mode="outlined"
                                                name="actual"

                                                label="Actual"
                                                value={data.actual}
                                                onChangeText={text => {
                                                    // props.setComment(text)
                                                    setTextFieldValues("actual", data, index, text);

                                                }
                                                }

                                            />
                                            <TextInput
                                                style={{
                                                    flex: 1,
                                                    margin: 5
                                                }}
                                                value={data.required}
                                                label="Required"
                                                mode="outlined"
                                                name="required"

                                                defaultValue="16"
                                                // style={{ width: "30%", marginRight: 10 }}
                                                onChangeText={(text) => {
                                                    setTextFieldValues("required", data, index, text);
                                                }}
                                            />
                                            <TextInput
                                                style={{
                                                    flex: 1,
                                                    margin: 5
                                                }}
                                                mode="outlined"

                                                value={data.total}
                                                name="total"
                                                label="Total"
                                                defaultValue="16"
                                                // style={{ width: "30%", marginRight: 10 }}
                                                onChangeText={(text) => {
                                                    setTextFieldValues("total", data, index, text);
                                                }}
                                            />
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                        }} >

                                            {/* <View style={{
                                            flexDirection: "column"
                                        }}> */}


                                            <TextInput
                                                value={data.comment}
                                                name="comment"
                                                style={{
                                                    flex: 1,
                                                    margin: 5
                                                }}
                                                label="Comments"

                                                mode="outlined"

                                                placeholder="Any Comments"
                                                onChangeText={(text) => {
                                                    setTextFieldValues("comment", data, index, text);
                                                }}
                                            />
                                            <TouchableOpacity onPress={() => {

                                                pickImage(props.setImgObj, props.setImgUrl, "2", props.setInventorySubCatList, subCatList, index)
                                            }}>
                                                <Icon name='camera' style={{ color: "#2d9cdb", margin: 10 }} size={25} />
                                            </TouchableOpacity>
                                            {/* </View> */}
                                        </View>
                                    </View>


                                    <View
                                        style={{
                                            margin: 5,
                                            flexDirection: "row",
                                            paddingLeft: 25,
                                        }}
                                    >

                                        {


                                            !props.isUpdate ? data.image !== '' ? <Image
                                                style={{ width: 80, height: 80 }} source={{
                                                    uri: data.image
                                                }} /> : null
                                                : null
                                        }



                                    </View>

                                    {props.isUpdate ? (
                                        <View>
                                            <View
                                                style={{
                                                    flexDirection: "row",

                                                }}
                                            >
                                                <Icon name="comment" style={{ color: "#2185d0", }} size={28} />


                                                <View>
                                                    {
                                                        data.comment !== ''
                                                            ? <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 18, color: "#000000", paddingLeft: 10, textAlign: "left" }}>{data.comment}</Text>
                                                            : null

                                                    }
                                                </View>
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: "row",
                                                        display: "flex",
                                                    }}
                                                >

                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <View
                                                    style={{

                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <Icon name='camera' style={{ color: "#2d9cdb", margin: 10 }} size={25} />
                                                    <View

                                                    >


                                                        {
                                                            // console.log("UPLOADED IMG:  ", data.image)
                                                            data.image !== '' ? <Image
                                                                style={{ width: 100, height: 100 }}
                                                                source={
                                                                    {
                                                                        uri: data.image
                                                                    }
                                                                }
                                                            /> : null

                                                        }

                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ) : null}
                                </Collapsible>
                            </View>)
                        })
                    }
                </View>

                <TouchableOpacity
                    onPress={() =>
                        props.onPress()
                    }
                    style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 10, marginBottom: 80 }}>
                    <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                        Submit
                        </Text>
                </TouchableOpacity>


            </ScrollView>
        </View>

    )
}


export const AMCLogForm = (props) => {
    const [ImgLoader, setImgLoader] = useState(false);

    console.log('props img:  ',props.img);
    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,

                height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

            <View style={{
                width: "100%",
                alignSelf: "center", marginTop: 5, justifyContent: "flex-start", flexDirection: "row"
            }} ><TouchableOpacity onPress={() => {
                // closesheet()
                props.onSheetBack()
            }}>

                    <Icon name='arrow-left' style={{ color: "#2d9cdb" }} size={25} />

                    {/* <Text style={{
                fontSize: 18,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#000",
                textAlign: "right",
                flexDirection: "row",
                justifyContent: "center"
                    }}><</Text> */}

                </TouchableOpacity></View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>{props.header} </Text>

            </View>

            <ScrollView>

                <View style={{
                    bottom: 15,
                    flex: 1, justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <TouchableOpacity
                        // setImgObj
                        // setImg
                        onPress={() => {
                            pickImage(props.setImgObj,
                                props.setImg, "3",
                                '', '', '')

                        }}
                    >
                        {/* {
                            console.log('URL: ', props.img)
                            // props.img === '' ? dragToUpload : props.img
                        } */}
                        {/* <Image style={{ width: 150, height: 150, }} source={dragToUpload} /> */}

                        <View style={{ alignSelf: "center", flexDirection: "column", margin: 5, top: 25 }}>
                            {props.img !== '' ? <Image style={{ width: 150, height: 150, }} source={{
                                uri: props.img
                            }}
                            
                                onLoadStart={() => {
                                    console.log('start if');
                                    setImgLoader(true)
                                }}

                                onLoadEnd={
                                    () => { 
                                        console.log('end if');
                                        setImgLoader(false)
                                    }
                                }
                            
                            /> :
                                <Image
                            
                                    onLoadStart={() => {
                                        console.log('startvelse');
                                    setImgLoader(true)
                                }}

                                onLoadEnd={
                                    () => { 
                                        console.log('end else');
                                        setImgLoader(false)
                                    }
                                }
                            
                                    style={{ width: 150, height: 150, }} source={dragToUpload} /> 
                            }

                            { ImgLoader ? <ActivityIndicator
                                // style={{
                                //     position: 'absolute',
                                //     left: 0,
                                //     right: 0,
                                //     top: 0,
                                //     bottom: 0,
                                // }}
                                size="large" color="#2D9CDB"
                                animating={
                                    
                                    ImgLoader
                                }
                            />:null

                            }
                            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", paddingTop: 10, fontSize: 18, color: "#000000", marginLeft: 20, marginTop: -5 }}>Select image</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View> */}
                    <TextInput
                        style={{
                            margin: 10
                        }}
                        value={props.category}

                        label="Category"

                        mode="outlined"

                        placeholder="Ex.Fan"
                        onChangeText={(text) => {
                            props.setCategory(text)
                            // setTextFieldValues("comment", data, index, text);
                        }}
                    />
                    {/* </View> */}
                    {/* <View> */}
                    <TextInput
                        value={props.amount}
                        name="amount"
                        style={{
                            margin: 10
                        }}
                        label="Amount"
                        keyboardType="numeric"

                        mode="outlined"

                        placeholder="Ex.1000"
                        onChangeText={(text) => {
                            console.log(text);
                            props.setAmount(
                                text
                                // setAmount(text)
                                // setTextFieldValues("comment", data, index, text);
                            )
                        }}
                    />
                    {/* </View> */}
                    {/* <View> */}
                    <TextInput
                        value={props.comment}
                        name="comment"
                        style={{
                            margin: 10
                        }}
                        label="Comments"
                        mode="outlined"

                        placeholder="Any Comments"
                        onChangeText={(text) => {
                            // setComment(text)
                            props.setComment(
                                text
                            )

                            // setTextFieldValues("comment", data, index, text);
                        }}
                    />
                    {/* </View> */}
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                            // props.onPress()
                            {
                                if (
                                    props.
                                        category === '') {
                                    showMessage({
                                        message: "Category is required!!",
                                        type: "danger",
                                        duration: 2850
                                    });

                                }
                                else if (props.amount === '') {
                                    showMessage({
                                        message: "Amount is required!!",
                                        type: "danger",
                                        duration: 2850
                                    });

                                }
                                else {
                                    // var formDetails = {
                                    //     category: category,
                                    //     amount: amount,
                                    //     comment: comment
                                    // }

                                    // props.setAmcLogDetails(formDetails)
                                    // console.log(formDetails);

                                    console.log("details: ", props.amcLogFormDetails);
                                    props.onSubmit()
                                }
                            }
                            }
                            style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 10, bottom: 10 }}>
                            <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                                
                                    Submit
                                
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}


export const RequestInventoryForm = (props) => {
    console.log("HERE...", props.catList);
    const subCatList = () => {

    }
    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,

                height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 20, color: "#000000", marginLeft: 20 }}>Request Inventory </Text>

            </View>

            <ScrollView>

                <View style={{
                    marginTop: 10,
                    bottom: 15,
                    flex: 1, justifyContent: "center",
                    flexDirection: "column"
                }}>
                    {/* <View> */}
                    <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={props.catList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select category'}
                        searchPlaceholder="Search..."
                        value={props.catVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setCatVal(item.value)

                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    />

                    <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={props.inventorySubCatList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select sub-category'}
                        searchPlaceholder="Search..."
                        value={props.subCatVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setSubCatVal(item.value)
                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    />
                    <TextInput
                        style={{
                            margin: 10
                        }}
                        value={props.description}

                        label="Product Description"

                        mode="outlined"

                        placeholder="Ex.description"
                        onChangeText={(text) => {
                            props.setDescription(text)
                            // setTextFieldValues("comment", data, index, text);
                        }}
                    />
                    {/* </View> */}
                    {/* <View> */}
                    <TextInput
                        value={props.qty}
                        name="qty"
                        style={{
                            margin: 10
                        }}
                        label="Quantity"
                        keyboardType="numeric"

                        mode="outlined"

                        placeholder="Ex.1"
                        onChangeText={(text) => {
                            console.log(text);
                            props.setQty(
                                text
                                // setAmount(text)
                                // setTextFieldValues("comment", data, index, text);
                            )
                        }}
                    />
                    {/* </View> */}
                    {/* <View> */}
                    {props.verityStatus ? <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={[
                            { label: "On the way", value: "0" },
                            { label: "Incomplete", value: "1" },
                            { label: "Received", value: "2" }
                        ]}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select status'}
                        searchPlaceholder="Search..."
                        value={props.status}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setStatus(item.value)
                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    /> : null
                    }

                    {props.verityStatus ? <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={[
                            { label: "Approved", value: "0" },
                            { label: "Disapproved", value: "1" },
                        ]}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select status'}
                        searchPlaceholder="Search..."
                        value={props.approvedDisStatus}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setAprovedDisStatus(item.value)
                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    /> : null
                    }

                    <TouchableOpacity onPress={() => {
                        console.log(props.setImgObj);
                        pickImage(props.setImgObj,
                            props.setImg, "5",
                            '', '', '')
                    }}   >
                        <View style={{ flexDirection: "row", alignSelf: "center", alignItems: "center", width: 120, marginTop: 15, backgroundColor: "#c4c4c44d", paddingHorizontal: 10, paddingVertical: 5 }}>
                            <Icon name='camera' style={{ color: "#000", opacity: 0.54 }} size={24} />
                            <View style={{ justifyContent: "center" }}>
                                <Text>Add Photo</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View
                        style={{
                            margin: 5,
                            flexDirection: "row",
                            paddingLeft: 25,
                        }}
                    >

                        {


                            props.img !== '' ? <Image
                                style={{ width: 80, height: 80 }} source={{
                                    uri: props.img
                                }} /> : null

                        }



                    </View>
                    {/* </View> */}
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                            // props.onPress()
                            {
                                if (
                                    props.
                                        category === '') {
                                    showMessage({
                                        message: "Category is required!!",
                                        type: "danger",
                                        duration: 2850
                                    });

                                }
                                else if (props.amount === '') {
                                    showMessage({
                                        message: "Amount is required!!",
                                        type: "danger",
                                        duration: 2850
                                    });

                                }
                                else {
                                    // var formDetails = {
                                    //     category: category,
                                    //     amount: amount,
                                    //     comment: comment
                                    // }

                                    // props.setAmcLogDetails(formDetails)
                                    // console.log(formDetails);

                                    console.log("details: ", props.amcLogFormDetails);
                                    props.onSubmit()
                                }
                            }
                            }
                            style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 20, bottom: 10 }}>
                            <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                                Submit
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}


export const InventoryReqAuditUpdate = (props) => {
    console.log(props.data.image);
    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                paddingBottom: 50,
                height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 20, color: "#000000", marginLeft: 20 }}>Request Inventory </Text>

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
                        >{props.data.inventory.inventory}</Text>
                        <View
                            style={{ top: 10, marginLeft: 20, }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{'\u2022'}</Text>
                                <Text style={{
                                    flex: 1, paddingLeft: 5,
                                    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",

                                }}>{props.data.subInventory.sub_inventory}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{'\u2022'}</Text>
                                <Text style={{
                                    flex: 1, paddingLeft: 5,
                                    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                                }}>Product description: {props.data.product_description}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{'\u2022'}</Text>
                                <Text style={{
                                    flex: 1, paddingLeft: 5,
                                    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                                }}>Quantity: {props.data.qty}</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginLeft: 20,
                        }}
                    >
                        {/* props.img !== '' ? {
                                uri: props.img
                            } : */}
                        {/* props.data.image !== '' ? props.data.image : dragToUpload */}
                        <Image
                            style={{ width: 100, height: 100, margin: 20 }}
                            source={props.data.image !== '' ? { uri: props.data.image } : dragToUpload}
                        />

                    </View>

                    <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={[
                            { label: "Approved", value: "0" },
                            { label: "Disapproved", value: "1" },
                        ]}

                        maxHeight={150}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select status'}
                        searchPlaceholder="Search..."
                        value={props.approvedDisStatus}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setAprovedDisStatus(item.value)
                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    />
                    {

                        props.approvedDisStatus === '1' ?
                            <TextInput
                                value={props.comment}
                                name="comment"
                                style={{
                                    margin: 10
                                }}
                                label="Comments"
                                mode="outlined"

                                placeholder="Any Comments"
                                onChangeText={(text) => {
                                    // setComment(text)
                                    props.setComment(
                                        text
                                    )

                                    // setTextFieldValues("comment", data, index, text);
                                }}
                            /> :
                            <Dropdown
                                style={[styles.dropdown, { borderColor: 'black' }]}
                                // placeholderStyle={styles.placeholderStyle}
                                // selectedTextStyle={styles.selectedTextStyle}
                                // inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                data={[
                                    { label: "On the way", value: "0" },
                                    { label: "Incomplete", value: "1" },
                                    { label: "Received", value: "2" }
                                ]}

                                maxHeight={150}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select status'}
                                searchPlaceholder="Search..."
                                value={props.status}
                                // onFocus={() => setIsFocus(true)}
                                // onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    console.log(item.value);
                                    props.setStatus(item.value)
                                    // setValue(item.value);
                                    // setIsFocus(false);
                                }}

                            />

                    }





                    {/* </View> */}
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                                props.onPress()

                            }
                            style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 20, bottom: 10 }}>
                            <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export const SendInventoryAuditDetails = (props) => {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                paddingBottom: 50,

                height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 20, color: "#000000", marginLeft: 20 }}>Request Inventory </Text>

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
                        >{props.data.inventory.inventory}</Text>
                        <View
                            style={{ top: 10, marginLeft: 20, }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{'\u2022'}</Text>
                                <Text style={{
                                    flex: 1, paddingLeft: 5,
                                    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",

                                }}>{props.data.subInventory.sub_inventory}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{'\u2022'}</Text>
                                <Text style={{
                                    flex: 1, paddingLeft: 5,
                                    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                                }}>Amount: {props.data.amount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{'\u2022'}</Text>
                                <Text style={{
                                    flex: 1, paddingLeft: 5,
                                    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                                }}>Paid by: {props.data.paid_by}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{'\u2022'}</Text>
                                <Text style={{
                                    flex: 1, paddingLeft: 5,
                                    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                                }}>Paid method: {props.data.payment_method}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{'\u2022'}</Text>
                                <Text style={{
                                    flex: 1, paddingLeft: 5,
                                    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000",
                                }}>Balance amount: {props.data.bal_amount}</Text>
                            </View>

                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginLeft: 20,
                        }}
                    >
                        {/* props.img !== '' ? {
                                uri: props.img
                            } : */}
                        {/* props.data.image !== '' ? props.data.image : dragToUpload */}
                        <Image
                            style={{ width: 100, height: 100, margin: 20 }}
                            source={props.data.image !== '' ? { uri: props.data.image } : dragToUpload}
                        />

                    </View>


                    <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={[
                            { label: "On the way", value: "0" },
                            { label: "Delivered", value: "1" },
                            { label: "Delivered with difference", value: "2" }
                        ]}

                        maxHeight={150}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select status'}
                        searchPlaceholder="Search..."
                        value={props.status}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setStatus(item.value)
                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    />
                    {/* 
                    <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={[
                            { label: "Approved", value: "0" },
                            { label: "Disapproved", value: "1" },
                        ]}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select status'}
                        searchPlaceholder="Search..."
                        value={props.approvedDisStatus}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setAprovedDisStatus(item.value)
                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    /> */}




                    {/* </View> */}
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                                props.onPress()

                            }
                            style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 20, bottom: 10 }}>
                            <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}


export const SendInventory = (props) => {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,

                height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 20, color: "#000000", marginLeft: 20 }}>Send Inventory </Text>

            </View>

            <ScrollView>

                <View style={{
                    marginTop: 10,
                    bottom: 15,
                    flex: 1, justifyContent: "center",
                    flexDirection: "column"
                }}>
                    {/* <View> */}
                    <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={props.catList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select category'}
                        searchPlaceholder="Search..."
                        value={props.catVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setCatVal(item.value)

                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    />

                    <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={props.inventorySubCatList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select sub-category'}
                        searchPlaceholder="Search..."
                        value={props.subCatVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setSubCatVal(item.value)
                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    />
                    <TextInput
                        style={{
                            margin: 10
                        }}
                        value={props.amount}

                        label="Amount"
                        keyboardType="numeric"

                        mode="outlined"

                        placeholder="Ex.3000"
                        onChangeText={(text) => {
                            props.setamount(text)
                            // setTextFieldValues("comment", data, index, text);
                        }}
                    />
                    {/* </View> */}
                    {/* <View> */}
                    <TextInput
                        value={props.paidBy}
                        name="qty"
                        style={{
                            margin: 10
                        }}
                        label="Paid by"

                        mode="outlined"

                        placeholder="Ex. Husain"
                        onChangeText={(text) => {
                            console.log(text);
                            props.setpaidBy(
                                text
                                // setAmount(text)
                                // setTextFieldValues("comment", data, index, text);
                            )
                        }}
                    />

                    <TextInput
                        value={props.paymentMethod}
                        name="qty"
                        style={{
                            margin: 10
                        }}
                        label="Payment method"

                        mode="outlined"

                        placeholder="Ex.Cash"
                        onChangeText={(text) => {
                            console.log(text);
                            props.setpaymentMethod(
                                text
                                // setAmount(text)
                                // setTextFieldValues("comment", data, index, text);
                            )
                        }}
                    />

                    <TextInput
                        value={props.balAmount}
                        name="qty"
                        style={{
                            margin: 10
                        }}
                        label="Balance amount"

                        mode="outlined"
                        keyboardType="numeric"

                        placeholder="Ex.1"
                        onChangeText={(text) => {
                            console.log(text);
                            props.setbalAmount(
                                text
                                // setAmount(text)
                                // setTextFieldValues("comment", data, index, text);
                            )
                        }}
                    />
                    {/* </View> */}
                    {/* <View> */}
                    {props.verityStatus ? <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={[
                            { label: "On the way", value: "0" },
                            { label: "Delivered", value: "1" },
                            { label: "Delivered with difference", value: "2" }
                        ]}

                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select status'}
                        searchPlaceholder="Search..."
                        value={props.status}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.value);
                            props.setStatus(item.value)
                            // setValue(item.value);
                            // setIsFocus(false);
                        }}

                    /> : null
                    }



                    <TouchableOpacity onPress={() => {
                        console.log(props.setImgObj);
                        pickImage(props.setImgObj,
                            props.setImg, "5",
                            '', '', '')
                    }}   >
                        <View style={{ flexDirection: "row", alignSelf: "center", alignItems: "center", width: 120, marginTop: 15, backgroundColor: "#c4c4c44d", paddingHorizontal: 10, paddingVertical: 5 }}>
                            <Icon name='camera' style={{ color: "#000", opacity: 0.54 }} size={24} />
                            <View style={{ justifyContent: "center" }}>
                                <Text>Add Photo</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View
                        style={{
                            margin: 5,
                            flexDirection: "row",
                            paddingLeft: 25,
                        }}
                    >

                        {


                            props.img !== '' ? <Image
                                style={{ width: 80, height: 80 }} source={{
                                    uri: props.img
                                }} /> : null

                        }



                    </View>
                    {/* </View> */}
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                            // props.onPress()
                            {
                                if (
                                    props.
                                        category === '') {
                                    showMessage({
                                        message: "Category is required!!",
                                        type: "danger",
                                        duration: 2850
                                    });

                                }
                                else if (props.amount === '') {
                                    showMessage({
                                        message: "Amount is required!!",
                                        type: "danger",
                                        duration: 2850
                                    });

                                }
                                else {
                                    // var formDetails = {
                                    //     category: category,
                                    //     amount: amount,
                                    //     comment: comment
                                    // }

                                    // props.setAmcLogDetails(formDetails)
                                    // console.log(formDetails);

                                    console.log("details: ", props.amcLogFormDetails);
                                    props.onSubmit()
                                }
                            }
                            }
                            style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 46, justifyContent: "center", borderRadius: 5, marginTop: 20, bottom: 10 }}>
                            <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                                Submit
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}


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

    dropDownClearText: {
        fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 12, color: "black",
        marginLeft: 'auto',
        borderRadius: 8,
        justifyContent: "center",
        margin: 2

    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,

        margin: 10

    }

});
