import { View, Text,SafeAreaView, TouchableOpacity,Image,FlatList,StyleSheet,StatusBar,Modal,TextInput} from 'react-native';
import React ,{useState,useEffect}from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment" 
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"

import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
// import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker'
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

const Booking_Screen = () => {
  const [text, setText] = React.useState("")
    const [currentDate, setCurrentDate] = useState('');
    const [bg,setbg] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [openbottomsheet,Setopenbottomsheet] = useState('');
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
          Area:"Garden",
          villaname: "Mongalia Vila",
          place: "Goa",
          purpose:"Cleaning",
          color:"#fff"
          
        },
        {
            id: '2',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Kitchen",
            villaname: "Sambhav Palace",
            place: "Rajasthan",
            purpose:"Pest Control",
            color:"#7Ed321"
          },
          {
            id: '3',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Kitchen",
            villaname: "ABCD Palace",
            place: "Mumbai",
            purpose:"Pest Control",
            color:"#7c24ed"
            
          },
          {
            id: '4',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Garden",
            villaname: "Mongalia Vila",
            place: "Goa",
            purpose:"Cleaning",
            color:"#fc0f1d"
            
          },
          {
            id: '5',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Kitchen",
            villaname: "Sambhav Palace",
            place: "Rajasthan",
            purpose:"Pest Control",
            color:"#7Ed321"
            
          },
          {
            id: '6',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Kitchen",
            villaname: "ABCD Palace",
            place: "Mumbai",
            purpose:"Pest Control",
            color:"#7c24ed"
            
          },
          {
            id: '7',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Garden",
            villaname: "Mongalia Vila",
            place: "Goa",
            purpose:"Cleaning",
            color:"#fc0f1d"
            
          },
          {
            id: '8',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Kitchen",
            villaname: "Sambhav Palace",
            place: "Rajasthan",
            purpose:"Pest Control",
            color:"#7Ed321"
            
          },
          {
            id: '9',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Garden",
            villaname: "Mongalia Vila",
            place: "Goa",
            purpose:"Cleaning",
            color:"#fc0f1d"
            
          },
          {
            id: '10',
            profile:profilelarge,
            smallprofile:profileimagesmall,
            Area:"Kitchen",
            villaname: "Sambhav Palace",
            place: "Rajasthan",
            purpose:"Pest Control",
            color:"#7Ed321"
            
          },
        
      ];
      
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

 <View 
 style={{
  backgroundColor: '#fff',
 paddingHorizontal:20,

  height: "100%",
}}>
 <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>


        <ScrollView
         
        >

          <View style={{flexDirection:'row',marginTop:20}}>
          <Image  resizeMode={"contain"} style={{width:20,height:20,  }} source={require('../Assets/Filter.png')} />
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:24,color:"#000000",marginLeft:20,marginTop:-5}}>Filters</Text>
      
          </View>
        <View >
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Location</Text>
    
      <DropDownPicker
          items={[
              {label: 'English', value: 'en'},
              {label: 'Deutsch', value: 'de'},
              {label: 'French', value: 'fr'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
      />
          {/* <RNMultiSelect
  disableAbsolute
  data={staticData}
  onSelect={(selectedItems) => console.log("SelectedItems: ", selectedItems)}
  menuItemTextStyle={{color:"green"}}
  menuBarContainerStyle={{backgroundColor:"#c4c4c4"}}
/> */}

        </View>
        <View style={{marginTop:25,}}>
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Properties</Text>
    
      <DropDownPicker
          items={[
              {label: 'English', value: 'en'},
              {label: 'Deutsch', value: 'de'},
              {label: 'French', value: 'fr'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
      />
      

        </View>
        <View style={{marginTop:25,}}>
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Staff</Text>
    
      <DropDownPicker
          items={[
              {label: 'English', value: 'en'},
              {label: 'Deutsch', value: 'de'},
              {label: 'French', value: 'fr'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
      />
      

        </View>

        
        </ScrollView> 
        </View>
        
   
     
     
      );
     
      const sheetRef = React.useRef(null);
      
    

  return (
    <SafeAreaView style={{height:"92%",backgroundColor:"#fff"}}>
  <View style={bg ? {backgroundColor:"#000000bf",opacity:0.75}:{backgroundColor:"#fff"}}>
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Booking </Text>
            <TouchableOpacity   onPress={() => console.log("asd")}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
        <View style={{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:10,alignContent:"center",paddingTop:15,borderBottomWidth:2,borderColor:"#a6a4a4",margin:10,padding:10}}>
<View style={bg ?{flexDirection:"row",backgroundColor:"#000000bf",opacity:0.75}:{flexDirection:"row",backgroundColor:"#fff"}}>
<Text style={{fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:14,color:"#000000",}}>Month:  {currentDate}</Text>
<Icon name='calendar-range' style={{color:"#000",marginTop:3}} size={16}/>
</View>
<TouchableOpacity onPress={() => {
    Setopenbottomsheet('Filter')
  setbg(true)
  sheetRef.current.snapTo(0)}}>
    <Image  resizeMode={"contain"} style={{width:20,height:20}} source={require('../Assets/Filter.png')} />
</TouchableOpacity>
        </View>
       <Image resizeMode={"contain"} style={{width:238,height:238,alignSelf:"center",marginTop:110}} source={require('../Assets/booking.png')}/>
      <Text style={{alignSelf:"center",fontWeight:"500",fontSize:24,lineHeight:36,letterSpacing:0.1,fontFamily:"Poppins-Regular",textAlign:"center"}}>Please  Filter your requirements for booking.</Text>
        </View>
       
        <BottomSheet
        ref={sheetRef}
        snapPoints={[  "40%","50%",0]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
        onCloseEnd={closesheet}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

export default Booking_Screen;
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
  