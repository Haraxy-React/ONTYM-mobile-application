import { View, Text ,TouchableOpacity, ScrollView,SafeAreaView,Image,StyleSheet,StatusBar} from 'react-native';
import React ,{useState,useEffect}from 'react';

import { Hoshi } from 'react-native-textinput-effects';
const Password_Screen= () => {

const [Password,setPassword] = useState('')

const [ConfirmPassword,setConfirmPassword] = useState('')

  return (
   
    <SafeAreaView style={styles.container}>
         <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems:"center",flex:1}}>

  <Image  resizeMode={"contain"} style={{width:"80%",height:"30%",marginTop:50}}source={require('../../../Assets/logo.png')}/>
<View style={{alignItems:"center",flexWrap:"wrap"}}> 
<Text style={{color:"#2D9CDB",fontWeight:"700",fontSize:24,marginTop:40}}>Login! </Text>
<Text style={{color:"#000000",fontWeight:"400",fontSize:14}}>You're E-mail has been registered in</Text>

</View>
<Image  resizeMode={"contain"} style={{width:"40%",height:50,}} source={require('../../../Assets/Ekostay-logo.png')}/>
<Hoshi
style={{width:"80%",alignSelf:"center",marginTop:10}}
    label={'Password'}
    labelStyle={{marginLeft:-5,marginTop:5}}
    borderColor={'#ABB4BD'}
    secureTextEntry={true}
    onChangeText={(text) => setPassword(text)}
    value={Password}
  />
   <Hoshi
style={{width:"80%",alignSelf:"center",}}
    label={'Confirm Password'}
    labelStyle={{marginLeft:-5,marginTop:5}}
    borderColor={'#ABB4BD'}
    secureTextEntry={true}
    onChangeText={(text) => setConfirmPassword(text)}
    value={ConfirmPassword}
  />

  
    
            <TouchableOpacity 
               onPress={() => { console.log('Email',Password.length);}}
            style={Password.length !== 0 &&  Password === ConfirmPassword ? {alignSelf:"center" ,backgroundColor:"#2D9CDB",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}: {alignSelf:"center" ,backgroundColor:"#D9DDE2",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}}>
                <Text style={{alignSelf:"center",color:"#fff",fontSize:14,fontWeight:"500"}}>
                    Login
                </Text>
            </TouchableOpacity>
            <Text style={{color:"#2D9CDB",fontSize:14,fontWeight:"400"}} onPress={() => {console.log("asdas");} }> Forgot Password? </Text>
    
   
    
            <TouchableOpacity 
               onPress={() => { console.log('Email',Password.length);}}
            style={Password.length !== 0 &&  Password === ConfirmPassword ? {alignSelf:"center" ,backgroundColor:"#2D9CDB",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}: {alignSelf:"center" ,backgroundColor:"#D9DDE2",width:"80%",height:46,justifyContent:"center",borderRadius:5,marginTop:50}}>
                <Text style={{alignSelf:"center",color:"#fff",fontSize:14,fontWeight:"500"}}>
                    Login
                </Text>
            </TouchableOpacity>
    
    
            </ScrollView>
            </SafeAreaView>
  );
};

export default Password_Screen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor:"#fff"
  },
  scrollView: {
 alignContent:"center"

  },
  text: {
    fontSize: 42,
  },
});
