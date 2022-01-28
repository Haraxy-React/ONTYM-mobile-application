import { View, Text ,TouchableOpacity,Keyboard,ScrollView,SafeAreaView,Image,StyleSheet,StatusBar,KeyboardAvoidingView} from 'react-native';
import React ,{useState,useEffect}from 'react';

import { Hoshi } from 'react-native-textinput-effects';
import { TextInput } from 'react-native-gesture-handler';
const Forgot_Password= ({navigation}) => {

const [Email,setEmail] = useState('')
const [isKeyboardVisible, setKeyboardVisible] = useState(false);


useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setKeyboardVisible(true); // or some other action
    }
  );
  const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      console.log(isKeyboardVisible);
      setKeyboardVisible(false); // or some other action
    }
  );

  return () => {
    keyboardDidHideListener.remove();
    keyboardDidShowListener.remove();
  };
}, [isKeyboardVisible]);
  return (
   
    <SafeAreaView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',backgroundColor:"#fff"}} >
          <ScrollView contentContainerStyle={isKeyboardVisible ?{backgroundColor:"#fff",height:"150%"} : {backgroundColor:"#fff",flex:1}} >
            <View style={{alignItems:"center"}}>
  <Image  resizeMode={"contain"} style={{width:"80%",height:"30%",marginTop:50}}source={require('../../../Assets/logo.png')}/>
<View style={{alignItems:"center",flexWrap:"wrap"}}> 
<Text style={{color:"#2D9CDB",fontWeight:"700",fontSize:24,marginTop:40}}>Forgot Password  </Text>
<Text style={{color:"#000000",fontWeight:"400",fontSize:14,alignSelf:"center", textAlign: 'center',paddingHorizontal:65,marginTop:10}}>Please enter your registered email or mobile to reset your password.</Text>
</View>

{isKeyboardVisible ?
<Hoshi
style={{width:"80%",alignSelf:"center",marginTop:40}}
    label={'Email / Mobile Number'}
    labelStyle={{marginLeft:-5,marginTop:5}}
    borderColor={'#ABB4BD'}
    onChangeText={(text) => setEmail(text)}
    value={Email}
  /> :
  <Hoshi
style={{width:"80%",alignSelf:"center",marginTop:40}}
    label={'Enter Your Email Id'}
    labelStyle={{marginLeft:-5,marginTop:5}}
    borderColor={'#ABB4BD'}
    onChangeText={(text) => setEmail(text)}
    value={Email}
  /> }

  

  
    
            <TouchableOpacity 
               onPress={() => {navigation.navigate('Check_Email_Screen')}}
            style={Email.length !== 0 ? {alignSelf:"center" ,backgroundColor:"#2D9CDB",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}: {alignSelf:"center" ,backgroundColor:"#D9DDE2",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}}>
                <Text style={{alignSelf:"center",color:"#fff",fontSize:14,fontWeight:"500"}}>
                  Recover Password
                </Text>
            </TouchableOpacity>
          
    
   
    
           
            </View>
    
            </ScrollView>
            </SafeAreaView>
  );
};

export default Forgot_Password;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor:"#fff"
  },
  scrollView: {
 alignContent:"center",
backgroundColor:"pink"
  },
  text: {
    fontSize: 42,
  },
});
