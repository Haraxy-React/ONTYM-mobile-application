import { View, Text,SafeAreaView, TouchableOpacity,Image,FlatList,StyleSheet,StatusBar,Modal} from 'react-native';
import React ,{useState,useEffect}from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment" 
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"

import DropDownPicker from 'react-native-dropdown-picker'
const Setting_Screen = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [bg,setbg] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const staticData = [
      {
        id: 0,
        value: "Euismod Justo",
        isChecked: false,
      },
      {
        id: 1,
        value: "Risus Venenatis",
        isChecked: false,
      },
      {
        id: 2,
        value: "Vestibulum Ullamcorper",
        isChecked: false,
      },
      {
        id: 3,
        value: "Lorem Nibh",
        isChecked: false,
      },
      {
        id: 4,
        value: "Ligula Amet",
        isChecked: false,
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
        var date = moment()
      .utcOffset('+05:30')
      .format('MMMM DD/YYYY ');
     
        setCurrentDate(date);
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
          }}
        >
         
          <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>
 
          <View style={{flexDirection:'row',marginTop:20}}>
          <Image  resizeMode={"contain"} style={{width:20,height:20,  }} source={require('../Assets/Filter.png')} />
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:24,color:"#000000",marginLeft:20,marginTop:-5}}>Filters</Text>
       
          </View>
        <View>
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
      

        </View>
        </View>
      );
     
      const sheetRef = React.useRef(null);
      const renderItem = ({ item }) => (
          
        <View style={styles.item}>
           
            <View style={{flexDirection:"row"}}>
            <Image resizeMode={"contain"}  style={{width: 60, height: 60, borderRadius: 120/ 2}} source={item.profile} />
            <View style={{paddingLeft:10}}>
                <Text
                style={{fontSize:24,fontWeight:"400",lineHeight:36,fontFamily:"Poppins-Regular",color:"#000"}}
                >{item.villaname}</Text>
                <View style={{flexDirection:"row"}}>
                <Text style={{fontSize:16,fontWeight:"400",lineHeight:24,fontFamily:"Poppins-Regular",color:"#9b9b9b"}} >{item.Area}</Text> 
                <Text  style={{fontSize:16,fontWeight:"400",lineHeight:24,fontFamily:"Poppins-Regular",color:"#9b9b9b"}}  > . </Text>
                <Text style={{fontSize:16,fontWeight:"400",lineHeight:24,fontFamily:"Poppins-Regular",color:"#9b9b9b"}}  >{item.purpose}</Text>
                </View>
                </View>
            </View>
            <View style={{marginTop:5}} >
            <Text style={{fontSize:16,fontWeight:"400",lineHeight:24,fontFamily:"Poppins-Regular",color:"#9b9b9b",alignSelf:"flex-end"}} >{item.place}</Text>
<Image resizeMode={"contain"}  style={{width: 30, height: 30, borderRadius: 120/ 2,alignSelf:"flex-end"}} source={item.profile} />
            </View>
            <View style={{backgroundColor:item.color,height:21,width:6,position:"absolute",right:0,top:40}}>
                
            </View>
        {/* <Text >{item.Area}</Text> */}
      </View>
      );
    

  return (
    <SafeAreaView style={{height:"92%",backgroundColor:"#fff"}}>
  <View style={bg ? {backgroundColor:"#000000bf",opacity:0.75}:{backgroundColor:"#fff"}}>
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Hello, jhon! </Text>
            <TouchableOpacity   onPress={() => console.log("asd")}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
        <View style={{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:25,alignContent:"center",paddingTop:15}}>
<Text>Today, {currentDate}</Text>
<TouchableOpacity onPress={() => {
  setbg(true)
  sheetRef.current.snapTo(0)}}>
    <Image  resizeMode={"contain"} style={{width:20,height:20}} source={require('../Assets/Filter.png')} />
</TouchableOpacity>
        </View>
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={
         
            (({ highlighted }) => (
              <View
                style={{height:1,width:"90%",backgroundColor:"#A6a4a4",alignSelf:"center"}}
              />
            ))
          }
      />
      
        </View>
        <TouchableOpacity style={{borderWidth:0.5 ,borderRadius:25,height:50,width:50,alignSelf:"center",justifyContent:"center",alignItems:"center",position:"absolute",bottom:15,right:20,backgroundColor:"#fff"}}>
        <Icon name='plus' style={{color:"#000"}} size={50}/>
        </TouchableOpacity>
        <BottomSheet
        ref={sheetRef}
        snapPoints={["40%", "70%", "10%"]}
        borderRadius={20}
        onOpenEnd={opensheet}
        onCloseEnd={closesheet}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

export default Setting_Screen;
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
  