import { View, Text,SafeAreaView, TouchableOpacity ,FlatList,StyleSheet,StatusBar,Image} from 'react-native';
import React,{useState,useEffect} from 'react';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import  image from "../Assets/property.png";

import { TextInput } from 'react-native-gesture-handler';


const Properties_screen1 = ({navigation}) => {

  const staticData = [
    {
      id: 0,
      value: image,
     name:"Mountain View",
     place:"Goa",
     status:"Enable"
    },
    {
      id: 1,
      value: image,
      name:"Abhi-Shree Villa",
      place:"Goa",
      status:"Disable"
     
    },
    {
      id: 2,
      value: image,
      name:"River Plaza",
      place:"Goa",
      status:"Active"
    },
    {
        id: 3,
        value:image,
        name:"Hillside",
        place:"Goa",
        status:"Active"
      },
      {
        id: 4,
        value: image,
       name:"The Heaven",
       place:"Goa",
       status:"Disable"
      },
      {
        id: 5,
        value: image,
       name:"Lilac Cottage",
       place:"Goa",
       status:"Active"
      },
      {
        id: 6,
        value: image,
       name:"Lake View",
       place:"Goa",
       status:"Active"
      },
      {
        id: 7,
        value: image,
       name:"Lake View",
       place:"Goa",
       status:"Active"
      },
      {
        id: 8,
        value: image,
       name:"Lake View",
       place:"Goa",
       status:"Active"
      },
      {
        id: 9,
        value: image,
       name:"Lake View",
       place:"Goa",
       status:"Active"
      },
   
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
           <TouchableOpacity onPress={() => {navigation.navigate('Properties_screen2')}}>
            <View style={{flexDirection:"row"}}>
            <Image resizeMode={"contain"}  style={{width: 50, height: 50, borderRadius: 100/ 2}} source={item.value} />
            <View style={{paddingLeft:10}}>
                <Text
                style={{fontSize:20,fontWeight:"600",lineHeight:30,fontFamily:"Poppins-SemiBold",color:"#000"}}
                >{item.name}</Text>
                <View style={{flexDirection:"row"}}>
                <Text style={{fontSize:14,fontWeight:"400",lineHeight:24,fontFamily:"Poppins-Regular",color:"#000"}} >{item.place}</Text> 
                <Text  style={{fontSize:14,fontWeight:"400",lineHeight:24,fontFamily:"Poppins-Regular",color:"#9b9b9b"}}  > | </Text>
                <Text style={item.status === "Disable" ? {fontSize:14,fontWeight:"600",lineHeight:24,fontFamily:"Poppins-SemiBold",color:"red"} :{fontSize:14,fontWeight:"600",lineHeight:24,fontFamily:"Poppins-SemiBold",color:"lightgreen"}}  >{item.status}</Text>
                </View>
                </View>
            </View>
            </TouchableOpacity>
            <View style={{marginTop:5}} >
            

            <TouchableOpacity onPress={() => {console.log('asdasd') }}>
             <Icon name='dots-vertical' style={{color:"#000"}} size={20}/>
            </TouchableOpacity>
            </View>
            
        {/* <Text >{item.Area}</Text> */}
      </View>
);
  

  return (
    <View style={{flex:1,paddingBottom:60}}>
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Properties </Text>
            <TouchableOpacity onPress={() => {console.log('asdasd') }}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
        <FlatList
        data={staticData}
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
