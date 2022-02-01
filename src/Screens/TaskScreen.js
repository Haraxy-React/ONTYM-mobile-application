import { View, Text,SafeAreaView, TouchableOpacity,Image,FlatList,StyleSheet,StatusBar,Modal} from 'react-native';
import React ,{useState,useEffect}from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment" 
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import { TextInput } from 'react-native-paper';
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import lake from "../Assets/Lake_vector.png";
// import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker'
import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

const TaskScreen = () => {
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
 openbottomsheet === "Filter" ?
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
        <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Duration</Text>
    
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
        <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Task Type</Text>
    
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
        <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Status</Text>
    
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
        <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
          <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Properties</Text>
    <ScrollView horizontal>
    {staticData.map((item) => (
        <View style={{justifyContent:"center",margin:10,borderWidth:0.8,paddingHorizontal:2,paddingVertical:20,borderColor:"#d9d9d9",width:120,alignItems:"center"}} >
          <Image source={item.value}   resizeMode="contain" style={{width: 80, height: 52,margin:10 }} />
          <Text style={{alignSelf:"center"}}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
      

        </View>
        </ScrollView> 
        </View>
        :openbottomsheet === "Addtask" ? 
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
        <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:24,color:"#000000",marginLeft:20,marginTop:-5}}>Add Tasks</Text>
    
        </View>
      <View >
        {/* <View style={{height:60,borderWidth:2}}>
          <Text style={{backgroundColor:"#fff",width:50,position:"absolute",top:-13,left:30}}>   asdas  </Text>
          <TextInput placeholder="asf" />

       
        </View> */}
       
      <TextInput
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
    />

      </View>
   
    

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
    <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
      <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Duration</Text>

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
    <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
      <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Task Type</Text>

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
    <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
      <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Status</Text>

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
    <View style={{marginTop:25,borderTopWidth:1,borderColor:"#C1c1c1"}}>
      <Text style={{fontFamily:"Poppins-Regular",fontWeight:"500",fontSize:18,color:"#000000"}} >Properties</Text>
<ScrollView horizontal>
{staticData.map((item) => (
    <View style={{justifyContent:"center",margin:10,borderWidth:0.8,paddingHorizontal:2,paddingVertical:20,borderColor:"#d9d9d9",width:120,alignItems:"center"}} >
      <Image source={item.value}   resizeMode="contain" style={{width: 80, height: 52,margin:10 }} />
      <Text style={{alignSelf:"center"}}>{item.name}</Text>
    </View>
  ))}
</ScrollView>
  

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

export default TaskScreen;
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
  