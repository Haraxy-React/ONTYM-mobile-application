import { View, Text ,TouchableOpacity,Keyboard,ScrollView,SafeAreaView,Image,StyleSheet,StatusBar,KeyboardAvoidingView} from 'react-native';
import React ,{useState,useEffect}from 'react';

import { Hoshi } from 'react-native-textinput-effects';
import { TextInput } from 'react-native-gesture-handler';
const Check_Email_Screen= ({navigation}) => {





  return (
   
    <SafeAreaView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',backgroundColor:"#fff"}} >
          <ScrollView contentContainerStyle={{backgroundColor:"#fff",flex:1}} >
            <View style={{alignItems:"center"}}>
  <Image  resizeMode={"contain"} style={{width:"80%",height:"30%",marginTop:50}}source={require('../../../Assets/logo.png')}/>

<Image  resizeMode={"contain"} style={{width:"50%",height:140,marginTop:50}} source={require('../../../Assets/Mail.png')}/>
<View style={{alignItems:"center",flexWrap:"wrap"}}> 
<Text 
onPress={() => {navigation.navigate('Reset_Password_Screen')}} 

style={{color:"#2D9CDB",fontWeight:"700",fontSize:24,marginTop:40}}>Check your Email   </Text>
<Text style={{color:"#000000",fontWeight:"400",fontSize:14,alignSelf:"center", textAlign: 'center',paddingHorizontal:65,marginTop:10}}>We have sent you a reset password link on your  registered email address.</Text>
</View>

            </View>
    
            </ScrollView>
            </SafeAreaView>
  );
};

export default Check_Email_Screen;


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
