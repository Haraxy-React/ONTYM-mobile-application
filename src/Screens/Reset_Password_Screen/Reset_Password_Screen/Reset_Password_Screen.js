import { View, Text ,TouchableOpacity,Keyboard,ScrollView,SafeAreaView,Image,StyleSheet,StatusBar,KeyboardAvoidingView} from 'react-native';
import React ,{useState,useEffect}from 'react';

import { Hoshi } from 'react-native-textinput-effects';
import { TextInput } from 'react-native-gesture-handler';
const Reset_Password_Screen = ({navigation}) => {

const [Password,setPassword] = useState('')
const [isKeyboardVisible, setKeyboardVisible] = useState(false);

const [ConfirmPassword,setConfirmPassword] = useState('')
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
      setKeyboardVisible(false); // or some other action
    }
  );

  return () => {
    keyboardDidHideListener.remove();
    keyboardDidShowListener.remove();
  };
}, []);
  return (
   
    <SafeAreaView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} >
         <ScrollView contentContainerStyle={isKeyboardVisible ?{backgroundColor:"#fff",height:"150%"} : {backgroundColor:"#fff",flex:1}} >
            <View style={{alignItems:"center"}}>
  <Image  resizeMode={"contain"} style={{width:"80%",height:"30%",marginTop:50}}source={require('../../../Assets/logo.png')}/>
<View style={{alignItems:"center",flexWrap:"wrap"}}> 
<Text style={{color:"#2D9CDB",fontWeight:"700",fontSize:24,marginTop:40}}>Reset Password </Text>
<Text style={{color:"#000000",fontWeight:"400",fontSize:14,textAlign:"center",paddingHorizontal:60,marginTop:10}}>Please enter your new password and Confirm the password.</Text>

</View>

<Hoshi
style={{width:"80%",alignSelf:"center",marginTop:10}}
    label={'New Password'}
    labelStyle={{marginLeft:-5,marginTop:5}}
    borderColor={'#ABB4BD'}
    secureTextEntry={true}
    onChangeText={(text) => setPassword(text)}
    value={Password}
  />
   <Hoshi
style={{width:"80%",alignSelf:"center",}}
    label={'Confirm New Password'}
    labelStyle={{marginLeft:-5,marginTop:5}}
    borderColor={'#ABB4BD'}
    secureTextEntry={true}
    onChangeText={(text) => setConfirmPassword(text)}
    value={ConfirmPassword}
  />

  
    
            <TouchableOpacity 
               onPress={() => { navigation.navigate('TabBarNavigation')}}
            style={Password.length !== 0 &&  Password === ConfirmPassword ? {alignSelf:"center" ,backgroundColor:"#2D9CDB",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}: {alignSelf:"center" ,backgroundColor:"#D9DDE2",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}}>
                <Text style={{alignSelf:"center",color:"#fff",fontSize:14,fontWeight:"500"}}>
                   Update </Text>
            </TouchableOpacity>

    
   
    
           
            </View>
    
            </ScrollView>
            </SafeAreaView>
  );
};

export default Reset_Password_Screen ;


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
