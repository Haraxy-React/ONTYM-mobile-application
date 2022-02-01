import { View, Text,SafeAreaView, TouchableOpacity,Image,FlatList,StyleSheet,StatusBar,Modal,TextInput} from 'react-native';
import React ,{useState,useEffect}from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment" 
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import  MaterialIcons from "react-native-vector-icons/MaterialIcons"
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
// import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker'
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import SwitchToggle from 'react-native-switch-toggle';

const Maintenance = () => {
  const [text, setText] = React.useState("")
    const [currentDate, setCurrentDate] = useState('');
    const [bg,setbg] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [openbottomsheet,Setopenbottomsheet] = useState('');
    const [switchOn1 ,setSwitchOn1] = useState(false);
    const [switchOn2 ,setSwitchOn2] = useState(false);
    const [switchOn3 ,setSwitchOn3] = useState(false);
    const [switchOn4 ,setSwitchOn4] = useState(false);
    const [switchOn5 ,setSwitchOn5] = useState(false);
    const [switchOn6 ,setSwitchOn6] = useState(false);
    const [switchOn7 ,setSwitchOn7] = useState(false);
    const [switchOn8 ,setSwitchOn8] = useState(false);
    const [switchOn9 ,setSwitchOn9] = useState(false);
    const staticData = [
      {
        id: 0,
        value: paramount,
       name:"paramount"
      },
      {
        id: 1,
        value: mongolia,
        name :"mongolia villa",
      },
      {
        id: 2,
        value: lake,
        name:"lake villa",
      },
      {
        id: 3,
        value: lake,
        name:"kailash villa",
      },
      {
        id: 4,
        value: lake,
        name:"lake villa",
      },
    ];
    const DATA = [
        {
          id: '1',
          profile:profilelarge,
          smallprofile:profileimagesmall,
          Area:"08",
          villaname: "Mongalia Vila",
          place: "08:12 PM" ,
          purpose:"04",
          color:"#fff"
          
        },
        {
            id: '2',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"12",
            villaname: "Sambhav Palace",
            place: "08:12 PM" ,
            purpose:"00",
            color:"#7Ed321"
          },
          {
            id: '3',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"10",
            villaname: "ABCD Palace",
            place: "08:12 PM" ,
            purpose:"02",
            color:"#7c24ed"
            
          },
          {
            id: '4',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"08",
            villaname: "Mongalia Vila",
            place: "08:12 PM" ,
            purpose:"04",
            color:"#fc0f1d"
            
          },
          {
            id: '5',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"12",
            villaname: "Sambhav Palace",
            place: "08:12 PM" ,
            purpose:"00",
            color:"#7Ed321"
            
          },
          {
            id: '6',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"10",
            villaname: "ABCD Palace",
            place: "08:12 PM" ,
            purpose:"02",
            color:"#7c24ed"
            
          },
          {
            id: '7',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"08",
            villaname: "Mongalia Vila",
            place: "08:12 PM" ,
            purpose:"04",
            color:"#fc0f1d"
            
          },
          {
            id: '8',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"12",
            villaname: "Sambhav Palace",
            place: "08:12 PM" ,
            purpose:"00",
            color:"#7Ed321"
            
          },
          {
            id: '9',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"10",
            villaname: "Mongalia Vila",
            place: "08:12 PM" ,
            purpose:"02",
            color:"#fc0f1d"
            
          },
          {
            id: '10',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"08",
            villaname: "Sambhav Palace",
            place: "08:12 PM" ,
            purpose:"04",
            color:"#7Ed321"
            
          },
        
      ];
      
      const onPress1= () => {
          setSwitchOn1(!switchOn1)
      }
      const onPress2= () => {
        setSwitchOn2(!switchOn2)
    }
    const onPress3= () => {
        setSwitchOn3(!switchOn3)
    }
    const onPress4= () => {
        setSwitchOn4(!switchOn4)
    }
    const onPress5= () => {
        setSwitchOn5(!switchOn5)
    }
    const onPress6= () => {
        setSwitchOn6(!switchOn6)
    }
    const onPress7= () => {
        setSwitchOn7(!switchOn7)
    }
    const onPress8= () => {
        setSwitchOn8(!switchOn8)
    }
    const onPress9= () => {
        setSwitchOn9(!switchOn9)
    }
      
    useEffect(() => {
       
        setCurrentDate('December');
      }, []);
const opensheet = () => {
 setbg(true)
}
const closesheet = () => {
  setbg(false)
}
      const renderContent = () => (
//  openbottomsheet === "Filter" ?
//  <View 
//  style={{
//   backgroundColor: '#fff',
//  paddingHorizontal:20,

//   height: "100%",
// }}>
//  <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>


//         <ScrollView
         
//         >

//           <View style={{flexDirection:'row',marginTop:20}}>
//           <Image  resizeMode={"contain"} style={{width:20,height:20,  }} source={require('../Assets/Filter.png')} />
//           <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:24,color:"#000000",marginLeft:20,marginTop:-5}}>Filters</Text>
      
//           </View>
//         <View >
//           <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Location</Text>
    
//       <DropDownPicker
//           items={[
//               {label: 'English', value: 'en'},
//               {label: 'Deutsch', value: 'de'},
//               {label: 'French', value: 'fr'},
//           ]}
//           defaultIndex={0}
//           containerStyle={{height: 40}}
//           onChangeItem={item => console.log(item.label, item.value)}
//       />
//           {/* <RNMultiSelect
//   disableAbsolute
//   data={staticData}
//   onSelect={(selectedItems) => console.log("SelectedItems: ", selectedItems)}
//   menuItemTextStyle={{color:"green"}}
//   menuBarContainerStyle={{backgroundColor:"#c4c4c4"}}
// /> */}

//         </View>
//         <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
//           <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Duration</Text>
    
//       <DropDownPicker
//           items={[
//               {label: 'English', value: 'en'},
//               {label: 'Deutsch', value: 'de'},
//               {label: 'French', value: 'fr'},
//           ]}
//           defaultIndex={0}
//           containerStyle={{height: 40}}
//           onChangeItem={item => console.log(item.label, item.value)}
//       />
      

//         </View>
//         <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
//           <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Task Type</Text>
    
//       <DropDownPicker
//           items={[
//               {label: 'English', value: 'en'},
//               {label: 'Deutsch', value: 'de'},
//               {label: 'French', value: 'fr'},
//           ]}
//           defaultIndex={0}
//           containerStyle={{height: 40}}
//           onChangeItem={item => console.log(item.label, item.value)}
//       />
      

//         </View>
//         <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
//           <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Status</Text>
    
//       <DropDownPicker
//           items={[
//               {label: 'English', value: 'en'},
//               {label: 'Deutsch', value: 'de'},
//               {label: 'French', value: 'fr'},
//           ]}
//           defaultIndex={0}
//           containerStyle={{height: 40}}
//           onChangeItem={item => console.log(item.label, item.value)}
//       />
      

//         </View>
//         <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
//           <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Properties</Text>
//     <ScrollView horizontal>
//     {staticData.map((item) => (
//         <View style={{justifyContent:"center",margin:10,borderWidth:0.8,paddingHorizontal:2,paddingVertical:20,borderColor:"#d9d9d9",width:120,alignItems:"center"}} >
//           <Image source={item.value}   resizeMode="contain" style={{width: 80, height: 52,margin:10 }} />
//           <Text style={{alignSelf:"center"}}>{item.name}</Text>
//         </View>
//       ))}
//     </ScrollView>
      

//         </View>
//         </ScrollView> 
//         </View>
//         :openbottomsheet === "Addtask" ? 
        <View 
        style={{
          backgroundColor: '#fff',
         paddingHorizontal:20,
       
          height: "100%",
        }}>
        <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>
        
        <ScrollView>
        
       
      

        <View style={{flexDirection:'row',marginTop:20}}>
        <Icon name='bank' style={{color:"#2d9cdb"}} size={25}/>
        <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:24,color:"#000000",marginLeft:20,marginTop:-5}}>Living Room </Text>
    
        </View>
      <View >
        <View style={{flexDirection:"row",width:"90%",paddingTop:20,justifyContent:"space-between"}}>
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
          switchOn={switchOn1}
          onPress={onPress1}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 1. Lawn and Entrance Area is clean. </Text>
          
          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>
       
        </View>
        <View style={{flexDirection:"row",width:"90%",paddingTop:20}}>
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
          switchOn={switchOn2}
          onPress={onPress2}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 2: Pool cleaned. </Text>
          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>

       
        </View>
        <View style={{flexDirection:"row",width:"90%",paddingTop:20}}>
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
          switchOn={switchOn3}
          onPress={onPress3}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 3 . All AC in Working Condition. </Text>
          
          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>
       
        </View>
        <View style={{flexDirection:"row",width:"90%",paddingTop:20}}>
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
          switchOn={switchOn4}
          onPress={onPress4}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 4.  Muisc System Working. </Text>
          
          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>
       
        </View>
        <View style={{flexDirection:"row",width:"90%",paddingTop:20}}>
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
          switchOn={switchOn5}
          onPress={onPress5}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 5. First aid box. </Text>
          

          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>
        </View>
        <View style={{flexDirection:"row",width:"90%",paddingTop:20}}>
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
          switchOn={switchOn6}
          onPress={onPress6}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 6. Dry bathroom floors NOT WET. </Text>
          
          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>
       
        </View>
        <View style={{flexDirection:"row",width:"90%",paddingTop:20}}>
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
          switchOn={switchOn7}
          onPress={onPress7}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 7. Toiletries and Replenishments (tissue/toilet paper etc.)  </Text>
          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>
</View>
       
          <View style={{flexDirection:"row",width:"90%",paddingTop:20}}>
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
          switchOn={switchOn8}
          onPress={onPress8}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 8. Proper Water Pressure & all Geyser in Working Condition. </Text>
          
          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>
       
        </View>
        <View style={{flexDirection:"row",width:"90%",paddingTop:20}}>
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
          switchOn={switchOn9}
          onPress={onPress9}
          circleColorOff='#FFF'
          circleColorOn='#fff'
          duration={100}
        />
          <Text style={{width:"88%",fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:18,color:"#000000",paddingHorizontal:30,textAlign:"left"}} > 9. Clean Kitchen & Gas Cylinder. </Text>
          
          <MaterialIcons name='comment' style={{color:"#2d9cdb"}} size={25}/>
       
        </View>
      {/* <TextInput
      label="Start Date"
      mode="outlined"
      value={text}
      onChangeText={text => setText(text)}
      right={<TextInput.Icon name="calendar-multiselect" />}
    />
     <TextInput
      label="Expected End Date"
      mode="outlined"
      value={text}
      style={{marginTop:30}}
      onChangeText={text => setText(text)}
      right={<TextInput.Icon name="calendar-multiselect" />}
    />
<TextInput
      label="Property Name"
      mode="outlined"
      value={text}
      style={{marginTop:30}}
      onChangeText={text => setText(text)}
      right={<TextInput.Icon name="chevron-down" />}
    />
    <TextInput
      label="Task Source"
      mode="outlined"
      value={text}
      style={{marginTop:30}}
      onChangeText={text => setText(text)}
      right={<TextInput.Icon name="chevron-down" />}
    />
    <TextInput
      label="Area of Property"
      mode="outlined"
      value={text}
      style={{marginTop:30}}
      onChangeText={text => setText(text)}
      right={<TextInput.Icon name="chevron-down" />}
    />
    <TextInput
      label="Cause of Issue"
      mode="outlined"
      value={text}
      style={{marginTop:30}}
      onChangeText={text => setText(text)}
      right={<TextInput.Icon name="chevron-down" />}
    />
    <TextInput
      label="Task Type"
      mode="outlined"
      value={text}
      style={{marginTop:30}}
      onChangeText={text => setText(text)}
      right={<TextInput.Icon name="chevron-down" />}
    /> */}

      </View>
   
    

      </ScrollView>
      </View>

//       :
//       <View 
//       style={{
//         backgroundColor: '#fff',
//        paddingHorizontal:20,
     
//         height: "100%",
//       }}
//     >
     
//       <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>

//       <View style={{flexDirection:'row',marginTop:20}}>
//       <Image  resizeMode={"contain"} style={{width:20,height:20,  }} source={require('../Assets/Filter.png')} />
//       <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:24,color:"#000000",marginLeft:20,marginTop:-5}}>Filters</Text>
  
//       </View>
//     <View >
//       <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Location</Text>

//   <DropDownPicker
//       items={[
//           {label: 'English', value: 'en'},
//           {label: 'Deutsch', value: 'de'},
//           {label: 'French', value: 'fr'},
//       ]}
//       defaultIndex={0}
//       containerStyle={{height: 40}}
//       onChangeItem={item => console.log(item.label, item.value)}
//   />
//       {/* <RNMultiSelect
// disableAbsolute
// data={staticData}
// onSelect={(selectedItems) => console.log("SelectedItems: ", selectedItems)}
// menuItemTextStyle={{color:"green"}}
// menuBarContainerStyle={{backgroundColor:"#c4c4c4"}}
// /> */}

//     </View>
//     <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
//       <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Duration</Text>

//   <DropDownPicker
//       items={[
//           {label: 'English', value: 'en'},
//           {label: 'Deutsch', value: 'de'},
//           {label: 'French', value: 'fr'},
//       ]}
//       defaultIndex={0}
//       containerStyle={{height: 40}}
//       onChangeItem={item => console.log(item.label, item.value)}
//   />
  

//     </View>
//     <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
//       <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Task Type</Text>

//   <DropDownPicker
//       items={[
//           {label: 'English', value: 'en'},
//           {label: 'Deutsch', value: 'de'},
//           {label: 'French', value: 'fr'},
//       ]}
//       defaultIndex={0}
//       containerStyle={{height: 40}}
//       onChangeItem={item => console.log(item.label, item.value)}
//   />
  

//     </View>
//     <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
//       <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Status</Text>

//   <DropDownPicker
//       items={[
//           {label: 'English', value: 'en'},
//           {label: 'Deutsch', value: 'de'},
//           {label: 'French', value: 'fr'},
//       ]}
//       defaultIndex={0}
//       containerStyle={{height: 40}}
//       onChangeItem={item => console.log(item.label, item.value)}
//   />
  

//     </View>
//     <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
//       <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Properties</Text>
// <ScrollView horizontal>
// {staticData.map((item) => (
//     <View style={{justifyContent:"center",margin:10,borderWidth:0.8,paddingHorizontal:2,paddingVertical:20,borderColor:"#d9d9d9",width:120,alignItems:"center"}} >
//       <Image source={item.value}   resizeMode="contain" style={{width: 80, height: 52,margin:10 }} />
//       <Text style={{alignSelf:"center"}}>{item.name}</Text>
//     </View>
//   ))}
// </ScrollView>
  

//     </View>
//     </View>
     
     
      );
     
      const sheetRef = React.useRef(null);
      const renderItem = ({ item }) => (
          
        <TouchableOpacity  onPress={() => {
            Setopenbottomsheet('Filter')
          setbg(true)
          sheetRef.current.snapTo(0)}} style={styles.item}>
           
            <View style={{flexDirection:"row"}}>
            <Icon name='calendar-range' style={{color:"#2d9cdb",marginTop:10}} size={30}/>
            <View style={{paddingLeft:20}}>
                <Text
                style={{fontSize:18,fontWeight:"600",lineHeight:27,fontFamily:"Poppins-SemiBold",color:"#000"}}
                >01-01-2021</Text>
                <View style={{flexDirection:"row"}}>
                <Image resizeMode={"contain"}  style={{width: 25, height: 25, borderRadius: 100/ 2,alignSelf:"flex-end"}} source={item.profile}/>
                {/* <Text style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"lightgreen",marginLeft:10}} >{item.Area}</Text> 
                <Text  style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"#9b9b9b"}}  > | </Text>
                <Text style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-SemiBold",color:"red"}}  >{item.purpose}</Text> */}
                </View>
                </View>
            </View>
            <View style={{marginTop:5}} >
            <TouchableOpacity   onPress={() => console.log("asd")}>
             <Icon name='dots-vertical' style={{color:"#000",alignSelf:"flex-end"}} size={20}/>
            </TouchableOpacity>
            <Text style={{fontSize:14,fontWeight:"400",lineHeight:21,fontFamily:"Poppins-Regular",color:"#9b9b9b",alignSelf:"flex-end"}} >{item.place}</Text>

            </View>
            
        {/* <Text >{item.Area}</Text> */}
      </TouchableOpacity>
      );
    

  return (
    <SafeAreaView style={{height:"92%",backgroundColor:"#fff"}}>
  <View style={bg ? {backgroundColor:"#000000bf",opacity:0.75}:{backgroundColor:"#fff"}}>
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Maintenance Audit </Text>
            <TouchableOpacity   onPress={() => console.log("asd")}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
        <View style={{flexDirection:"row",paddingHorizontal:25,alignContent:"center",paddingVertical:15,borderBottomWidth:1,width:"97%",alignSelf:"center"}}>
        <TouchableOpacity onPress={() => {
    Setopenbottomsheet('Filter')
  setbg(true)
  sheetRef.current.snapTo(0)}}>
    <Image  resizeMode={"contain"} style={{width:20,height:20}} source={require('../Assets/Filter.png')} />
</TouchableOpacity>
<Text style={{paddingLeft:20,fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:14,color:"#000000"}}>Month:  {currentDate}</Text>
<Icon name='calendar-range' style={{color:"#000",marginTop:3}} size={16}/>
        </View >
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={
         
            (({ highlighted }) => (
              <View
                style={{height:1,width:"95%",backgroundColor:"#A6a4a4",alignSelf:"center"}}
              />
            ))
          }
      />
      
        </View>
        <TouchableOpacity
        onPress={ () => {
            console.log("asdasS");
        //   Setopenbottomsheet('Addtask')
        //   setbg(true)
        //   sheetRef.current.snapTo(0)
        }}
        style={{borderWidth:0.5 ,borderRadius:25,height:50,width:50,alignSelf:"center",justifyContent:"center",alignItems:"center",position:"absolute",bottom:15,right:20,backgroundColor:"#fff"}}>
        <Icon name='plus' style={{color:"#000"}} size={50}/>
        </TouchableOpacity>
        <BottomSheet
        ref={sheetRef}
        snapPoints={[  "81%",0,0]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
        onCloseEnd={closesheet}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

export default Maintenance;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor:"#fff"
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
flexDirection:"row",
justifyContent:"space-between"
 
    },
    title: {
      fontSize: 32,
    },
  });
  