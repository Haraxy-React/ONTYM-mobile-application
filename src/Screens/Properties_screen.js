import { View, Text,SafeAreaView, TouchableOpacity ,FlatList,StyleSheet,StatusBar,Image} from 'react-native';
import React,{useState,useEffect} from 'react';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import  image1 from "../Assets/Almond_Tree.png";
import image2  from "../Assets/Chestnut_Villa.png";
 import image3  from "../Assets/Salt_water_Villa.png";
import { TextInput } from 'react-native-gesture-handler';


const Properties_screen = ({navigation}) => {

  const staticData = [
    {
      id: 0,
      value: image1,
      no: 10,
     name:"Lonavala"
    },
    {
      id: 1,
      value: image2,
      no: 15,
      name :"Goa",
    },
    {
      id: 2,
      value: image3,
      no: 25,
      name:"Mumbai",
    },
   
  ];

  const renderItem = ({ item }) => (
          
    <View style={styles.item}>
       <TouchableOpacity onPress={() => { navigation.navigate('Properties_screen1')}}>
       
        <Image resizeMode={"contain"}  style={{width: "95%", height: 168, borderRadius: 20,alignSelf:"center"}} source={item.value} />
      <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:10,paddingHorizontal:20}}>
        <Text style={{fontFamily:"Poppins-SemiBold",fontWeight:"600",fontSize:24,lineHeight:36,letterSpacing:0.1}}>
          {item.name}
        </Text>
        <View style={{width:50,height:33,backgroundColor:"#2d9cdb",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"600",fontSize:18,lineHeight:27,letterSpacing:0.1,color:"#fff"}}>{item.no}</Text>
        </View>
      </View>
       
    {/* <Text >{item.Area}</Text> */}
    </TouchableOpacity>
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

export default Properties_screen;

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
    paddingHorizontal: 2,
    paddingVertical:10,




  },
  title: {
    fontSize: 32,
  },
});
