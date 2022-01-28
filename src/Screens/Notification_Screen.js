import { View, Text,SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const Notification_Screen = () => {
  return (
    <View>
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Notification </Text>
            <TouchableOpacity onPress={() => {console.log('asdasd') }}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
      <Text>Notification_Screen
Notification_Screen</Text>
    </View>
  );
};

export default Notification_Screen;
