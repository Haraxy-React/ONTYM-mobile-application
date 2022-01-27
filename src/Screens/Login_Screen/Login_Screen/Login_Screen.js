import { View, Text ,TouchableOpacity, ScrollView,SafeAreaView,Image} from 'react-native';
import React ,{useState,useEffect}from 'react';

import { Hoshi } from 'react-native-textinput-effects';
const Login_Screen = ({navigation}) => {

const [Email,setEmail] = useState('')

  return (
   
   <View style={{flex:1,backgroundColor:"#fff",alignItems:"center"}}>

  <Image  resizeMode={"contain"} style={{width:"80%",height:"30%",marginTop:50}}source={require('../../../Assets/logo.png')}/>

<Text style={{color:"#2D9CDB",fontWeight:"700",fontSize:24,marginTop:40}}>Login! </Text>

<Hoshi
style={{width:"80%",alignSelf:"center",marginTop:20}}
    label={'Email ID'}
    labelStyle={{marginLeft:-5,marginTop:5}}
    borderColor={'#ABB4BD'}
    onChangeText={(text) => setEmail(text)}
    value={Email}
  />
   <TouchableOpacity 
               onPress={() => { navigation.navigate("Password_Screen")}}
            style={Email.length !== 0 ? {alignSelf:"center" ,backgroundColor:"#2D9CDB",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}: {alignSelf:"center" ,backgroundColor:"#D9DDE2",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}}>
                <Text style={{alignSelf:"center",color:"#fff",fontSize:14,fontWeight:"500"}}>
                    Login
                </Text>
            </TouchableOpacity>
    </View>
  );
};

export default Login_Screen;
