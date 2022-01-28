import { View, Text,SafeAreaView, TouchableOpacity,Image,FlatList,StyleSheet,StatusBar} from 'react-native';
import React ,{useState,useEffect}from 'react';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment" 
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
const TaskScreen = () => {
    const [currentDate, setCurrentDate] = useState('');
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
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Hello, jhon! </Text>
            <TouchableOpacity onPress={() => {console.log('asdasd') }}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
        <View style={{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:25,alignContent:"center",paddingTop:15}}>
<Text>Today, {currentDate}</Text>
<TouchableOpacity>
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
        <TouchableOpacity style={{borderWidth:0.5 ,borderRadius:25,height:50,width:50,alignSelf:"center",justifyContent:"center",alignItems:"center",position:"absolute",bottom:15,right:20,backgroundColor:"#fff"}}>
        <Icon name='plus' style={{color:"#000"}} size={50}/>
        </TouchableOpacity>
      
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
  