import { View, Text,SafeAreaView, TouchableOpacity,Image,FlatList,StyleSheet,StatusBar,Modal, Settings} from 'react-native';
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
import { TextInput } from 'react-native-paper';

const Setting_Screen = () => {
  const [name, setname] = React.useState("")
  const [email, setemail] = React.useState("")
  const [status, setstatus] = React.useState("")
    const [currentDate, setCurrentDate] = useState('');
    const [bg,setbg] = useState();
    const [successfull,setsuccessfull] = useState(false)
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
        var date = moment()
      .utcOffset('+05:30')
      .format('MMMM DD/YYYY ');
     
        setCurrentDate(date);
      }, []);

      const success = () => {
        setModalVisible(true) 
        setsuccessfull(true)
        sheetRef.current.snapTo(2)
      }
      const fail= () => {
        setModalVisible(true) 
        setsuccessfull(false)
        sheetRef.current.snapTo(2)
      }
const opensheet = () => {
 setbg(true)
}
const closesheet = () => {
  setbg(false)
}
const sheetRef = React.useRef(null);
      const renderContent = () => (
    openbottomsheet === "logout" ? 
    <View
    style={{
      backgroundColor: '#fff',
     paddingHorizontal:20,
   
      height: "100%",
    }}
  >
   
    <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>

  <Text style={{alignSelf:"center",fontWeight:"600",fontSize:18,marginTop:40}}> Logout? </Text>
<Text style={{fontWeight:'500',fontSize:16,alignSelf:"center",color:"#91919f",marginTop:40}} > Are You sure do you wanna logout?</Text>
<View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:30}}>
  <TouchableOpacity 
  onPress={() => {

    Setopenbottomsheet('Filter')
  }}
  style={{backgroundColor:"#EEE5ff",width:"43%",padding:8,borderRadius:16,height:56,justifyContent:"center"}}>
    <Text style={{color:"#2d9cdb",fontSize:19,alignSelf:"center",lineHeight:22}}> No</Text>
  </TouchableOpacity>
  <TouchableOpacity 
  onPress={() => {console.log('adsasd');}}
  style={{backgroundColor:"#2d9cdb",width:"43%",padding:8,borderRadius:16,height:56,justifyContent:"center"}}>
    <Text style={{color:"#fff",fontSize:19,alignSelf:"center",lineHeight:22}}> Yes</Text>
  </TouchableOpacity>
</View>
  </View>
    :openbottomsheet === 'Filter' ? 
    <View
    style={{
      backgroundColor: '#fff',
     paddingHorizontal:20,
   
      height: "100%",
    }}
  >
   
    <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>

    <View style={{flexDirection:'row',marginTop:20}}>
      <View style={{borderColor:"#2d9cdb",borderWidth:3,width:90,height:90, borderRadius:180/2,justifyContent:"center" }}>
    <Image  resizeMode={"contain"} style={{width:82,height:80, borderRadius:50 ,alignSelf:"center" }} source={profilelarge} />
    </View>
    <View style={{marginTop:20,marginLeft:20}}>
    <Text style={{fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:14,color:"#91919f",}}>Username</Text>
    <Text style={{fontFamily:"Poppins-SemiBold",fontWeight:"500",fontSize:24,color:"#000000",}}>Iraiana Saliha</Text>
    </View>
    </View>
  <TouchableOpacity  onPress={() => {
  Setopenbottomsheet('Edit_Profile')
  sheetRef.current.snapTo(1)
  }}
  
  style={{flexDirection:"row",justifyContent:"space-between",borderBottomWidth:1,borderColor:"#A6A4A4",paddingBottom:25}}>
    <View style={{flexDirection:"row",marginTop:20,marginLeft:10 ,}}>

      <Image  resizeMode={"contain"} style={{alignSelf:"center",width:20,height:20 }} source={require('../Assets/edit_profile_icon.png')} />
     
    <Text style={{fontFamily:"Poppins-SemiBold",fontWeight:"500",fontSize:20,color:"#000000",lineHeight:30 , marginLeft:10}} >Edit Profile</Text>
  
</View>
<View style={{justifyContent:"center",marginTop:20}}>
<Icon name='chevron-right' style={{color:"#000"}} size={20}/>
</View>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => {
  Setopenbottomsheet('logout')
  }} style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:25}}>
    <View style={{flexDirection:"row",marginTop:20,marginLeft:13 ,}}>

      <Image  resizeMode={"contain"} style={{alignSelf:"center",width:20,height:20 }} source={require('../Assets/logout.png')} />
     
    <Text style={{fontFamily:"Poppins-SemiBold",fontWeight:"500",fontSize:20,color:"#000000",lineHeight:30 , marginLeft:10}} >Logout</Text>
  
</View>
<View style={{justifyContent:"center",marginTop:20}}>
<Icon name='chevron-right' style={{color:"#000"}} size={20}/>
</View>
  </TouchableOpacity>
  </View>:
           openbottomsheet ===  "Edit_Profile" ? 
           <View
           style={{
             backgroundColor: '#fff',
            paddingHorizontal:20,
          
             height: "100%",
           }}
         >
          <ScrollView>
           <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>
  
           <View style={{borderColor:"#2d9cdb",borderWidth:3,width:90,height:90, borderRadius:180/2,justifyContent:"center" ,alignSelf:"center",marginTop:20}}>
            <Image  resizeMode={"contain"} style={{width:82,height:80, borderRadius:160/2,alignSelf:"center" }} source={profilelarge} />
            </View>
            <TouchableOpacity
            onPress={() => {console.log('asdasd')}}
            style={{flexDirection:"row",width:"60%",alignSelf:"center",backgroundColor:"#c4c4c4",opacity:"90%",height:30,alignItems:"center",justifyContent:"center",marginTop:20 }}
            >
            <Icon name='camera' style={{color:"#000",opacity:0.54}} size={20}/>
            <Text style={{fontWeight:"400",fontFamily:"Poppins-Regular",fontSize:16,paddingLeft:5}}> Change Photo</Text>
            </TouchableOpacity>
            <TextInput
            mode="outlined"
      label="Name"
      value={name}
      style={{marginTop:20}}
      onChangeText={text => setname(text)}
    />
       <TextInput
            mode="outlined"
      label="E-Mail Id."
      value={email}
      style={{marginTop:10}}
      onChangeText={text => setemail(text)}
    />
       <TextInput
            mode="outlined"
      label="Status"
      value={status}
      style={{marginTop:10}}
      onChangeText={text => setstatus(text)}
    />
    <TouchableOpacity 
    
    onPress={() =>{ {name.length === 0  ? 
      
      success()

    : fail() }}}
    style={{backgroundColor:"#2d9cdb",width:135,height:46,borderRadius:16,justifyContent:"center",alignItems:"center",alignSelf:"center",marginTop:15}}>
      <Text style={{color:"#fcfcfc",fontSize:18,fontWeight:"600"}}>
        Submit </Text>
    </TouchableOpacity>
         </ScrollView>
         </View>
         :

          <View
            style={{
              backgroundColor: '#fff',
             paddingHorizontal:20,
           
              height: "100%",
            }}
          >
           
            <View style={{backgroundColor:"#c4c4c4",height:10,width:40,borderRadius:10,alignSelf:"center",marginTop:5}}/>
   
            <View style={{flexDirection:'row',marginTop:20}}>
              <View style={{borderColor:"#2d9cdb",borderWidth:3,width:90,height:90, borderRadius:180/2,justifyContent:"center" }}>
            <Image  resizeMode={"contain"} style={{width:82,height:80, borderRadius:50 ,alignSelf:"center" }} source={profilelarge} />
            </View>
            <View style={{marginTop:20,marginLeft:20}}>
            <Text style={{fontFamily:"Poppins-Regular",fontWeight:"400",fontSize:14,color:"#91919f",}}>Username</Text>
            <Text style={{fontFamily:"Poppins-SemiBold",fontWeight:"500",fontSize:24,color:"#000000",}}>Iraiana Saliha</Text>
            </View>
            </View>
            <TouchableOpacity  onPress={() => {
  Setopenbottomsheet('Edit_Profile')
  sheetRef.current.snapTo(1)
  }}
  
  style={{flexDirection:"row",justifyContent:"space-between",borderBottomWidth:1,borderColor:"#A6A4A4",paddingBottom:25}}>
    <View style={{flexDirection:"row",marginTop:20,marginLeft:10 ,}}>

      <Image  resizeMode={"contain"} style={{alignSelf:"center",width:20,height:20 }} source={require('../Assets/edit_profile_icon.png')} />
     
    <Text style={{fontFamily:"Poppins-SemiBold",fontWeight:"500",fontSize:20,color:"#000000",lineHeight:30 , marginLeft:10}} >Edit Profile</Text>
  
</View>
<View style={{justifyContent:"center",marginTop:20}}>
<Icon name='chevron-right' style={{color:"#000"}} size={20}/>
</View>
  </TouchableOpacity>
          <TouchableOpacity onPress={() => {
          Setopenbottomsheet('logout')
          }} style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:25}}>
            <View style={{flexDirection:"row",marginTop:20,marginLeft:13 ,}}>
  
              <Image  resizeMode={"contain"} style={{alignSelf:"center",width:20,height:20 }} source={require('../Assets/logout.png')} />
             
            <Text style={{fontFamily:"Poppins-SemiBold",fontWeight:"500",fontSize:20,color:"#000000",lineHeight:30 , marginLeft:10}} >Logout</Text>
          
      </View>
      <View style={{justifyContent:"center",marginTop:20}}>
      <Icon name='chevron-right' style={{color:"#000"}} size={20}/>
      </View>
          </TouchableOpacity>
          </View>
        
      );
    
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
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      
      >
        <View style={styles.centeredView}>
       
            { successfull ?  
               <View style={styles.modalView}>
             <Image  resizeMode={"contain"} style={{width:120,height:120}} source={require('../Assets/success.png')} />
          <Text style={{fontSize:22,fontWeight:"500",fontFamily:"Poppins-Regular",lineHeight:32,alignSelf:"center",marginTop:40}}>Success!</Text>
          <Text style={{fontSize:15,fontWeight:"400",fontFamily:"Poppins-Regular",lineHeight:20,alignSelf:"center",marginTop:5}} >Your Profile is updateed.</Text>
            
            <TouchableOpacity
          style={{backgroundColor:"#2d9cdb",width:"100%",padding:8,borderRadius:4,height:40,justifyContent:"center",marginTop:50}}
              onPress={() =>   { setModalVisible(!modalVisible)
              Setopenbottomsheet('Filter')
              sheetRef.current.snapTo(0)
              }}
            >
           <Text style={{color:"#fff",fontSize:14,alignSelf:"center",lineHeight:16}}> GOT IT</Text>
            </TouchableOpacity>
            </View>
            :
            <View style={styles.modalView}>
          <Image  resizeMode={"contain"} style={{width:120,height:120}} source={require('../Assets/failure.png')} />
          <Text style={{fontSize:22,fontWeight:"500",fontFamily:"Poppins-Regular",lineHeight:32,alignSelf:"center",marginTop:40}}>Sorry!</Text>
          <Text style={{fontSize:15,fontWeight:"400",fontFamily:"Poppins-Regular",lineHeight:20,alignSelf:"center",marginTop:5,textAlign:"center"}} >Ask your admin to change the E-mail Id.</Text>
            
            <TouchableOpacity
          style={{backgroundColor:"#2d9cdb",width:"100%",padding:8,borderRadius:4,height:40,justifyContent:"center",marginTop:40}}
              onPress={() => 
                
               { setModalVisible(!modalVisible)
              Setopenbottomsheet('Filter')
              sheetRef.current.snapTo(0)
              }}
            >
           <Text style={{color:"#fff",fontSize:14,alignSelf:"center",lineHeight:16}}> GOT IT</Text>
            </TouchableOpacity>
            </View>
}
        </View>
      </Modal>
  <View style={{backgroundColor:"#000000bf",opacity:0.75}}>
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Hello, jhon! </Text>
            <TouchableOpacity   onPress={() => console.log("asd")}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
        <View style={{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:25,alignContent:"center",paddingTop:15,backgroundColor:"#fff"}}>
<Text>Today, {currentDate}</Text>
<TouchableOpacity onPress={() => {
    Setopenbottomsheet('Filter')
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
        <TouchableOpacity
        onPress={ () => {

          Setopenbottomsheet('Addtask')
          setbg(true)
          sheetRef.current.snapTo(0)
        }}
        style={{borderWidth:0.5 ,borderRadius:25,height:50,width:50,alignSelf:"center",justifyContent:"center",alignItems:"center",position:"absolute",bottom:15,right:20,backgroundColor:"#fff"}}>
        <Icon name='plus' style={{color:"#000"}} size={50}/>
        </TouchableOpacity>
        <BottomSheet
        ref={sheetRef}
        snapPoints={[  "38%","70%",0]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
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
      marginTop: "36%",
      justifyContent:"center"
    },
    modalView: {
      
      margin: 20,
      height:370,
      width:343,
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
  