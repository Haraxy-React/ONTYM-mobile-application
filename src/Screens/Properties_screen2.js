import { View, Text,SafeAreaView, TouchableOpacity ,FlatList,StyleSheet,StatusBar,Image} from 'react-native';
import React,{useState,useEffect} from 'react';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import  image from "../Assets/Almond.png";
import profile from "../Assets/profile1.png";

import { ScrollView, TextInput } from 'react-native-gesture-handler';


const Properties_screen1 = ({navigation}) => {

    const staticData = [
        {
          id: 0,
     
      name:"Pre-CheckIn Audit",
      screen_name:'Pre_check'
        },
        {
          id: 1,
       
          name:"Maintenance Audit",
          screen_name:"Maintenance"
         
        },
        {
          id: 2,
     
          name:"Inventory Audit",
          screen_name:"inventory"

      
        },
        {
            id: 3,
      
            name:"AMC Log",
            screen_name:"null"
          },
          {
            id: 4,

           name:"Purchase & Billing",
           screen_name:"null"
          },
       
       
      ];
  

  return (
    <ScrollView style={{flex:1,marginBottom:60,backgroundColor:"#fff"}}>
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Properties </Text>
            <TouchableOpacity onPress={() => {console.log('asdasd') }}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
<Image resizeMode="contain" style={{width:"95%",height:235,alignSelf:"center",marginTop:10}} source={image}/>
<Text style={{fontSize:24,fontWeight:"600",lineHeight:36,fontFamily:"Poppins-SemiBold",color:"#2d9cdb",paddingLeft:"5%"}}>Paramount</Text>
<Text style={{fontSize:18,fontWeight:"400",lineHeight:27,fontFamily:"Poppins-Regular",color:"#979797",paddingLeft:"5%"}}>Lonavala</Text>
       <View style={{paddingVertical:"3%",paddingHorizontal:"5%",flexDirection:"row"}}>
           <Image  resizeMode={"contain"}  style={{width: 50, height: 50, borderRadius: 100/ 2}} source={profile}/>
           <View>
               <Text style={{fontSize:18,fontWeight:"500",lineHeight:27,fontFamily:"Poppins-SemiBold",color:"#000",paddingLeft:"5%"}}>
                   Kishan Patel
               </Text>
               <Text style={{fontSize:14,fontWeight:"300",lineHeight:21,fontFamily:"Poppins-Regular",color:"#979797",paddingLeft:"5%"}}>Property Mnager</Text>
           </View>
       </View>
       <Text  style={{fontSize:24,fontWeight:"600",lineHeight:36,fontFamily:"Poppins-SemiBold",color:"#2d9cdb",paddingLeft:"5%",paddingVertical:3}}>To-do List </Text>
      <View style={{borderTopWidth:2,width:"95%",alignSelf:"center",borderColor:"#c4c4c4"}}>
      {staticData.map((item) => (
        <TouchableOpacity onPress={item.screen_name === "null"?() => {console.log('nulll screen');}  :  () => {navigation.navigate(item.screen_name)}} style={{justifyContent:"space-between",margin:10,borderBottomWidth:1,borderColor:"#d9d9d9",width:"95%",flexDirection:"row",padding:5}} >
        <View style={{flexDirection:"row"}}>
          <Icon name='circle-medium' style={{fontSize:20,fontWeight:"500",lineHeight:36,fontFamily:"Poppins-Regular",color:"#000"}} size={20}/>
          <Text style={{fontSize:24,fontWeight:"500",lineHeight:36,fontFamily:"Poppins-Regular",color:"#000"}} >{item.name}</Text>
          </View>
         
          <Icon name='chevron-right' style={{color:"#000"}} size={20}/>

        </TouchableOpacity>
      ))}
      </View>
    </ScrollView>
  );
};

export default Properties_screen1;

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
    paddingHorizontal: 20,
    paddingVertical:10,
flexDirection:'row',
justifyContent:"space-between"



  },
  title: {
    fontSize: 32,
  },
});
