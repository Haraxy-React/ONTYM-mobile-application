import { View, Text,SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const Properties_screen = () => {
  return (
    <View>
        <View style={{backgroundColor:"#2D9cDB",height:80,justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignContent:"center",paddingTop:35}}>
            <Text style={{color:"#fff",fontSize:20,lineHeight:27,fontWeight:"700",width:200}}>Properties </Text>
            <TouchableOpacity onPress={() => {console.log('asdasd') }}>
             <Icon name='dots-vertical' style={{color:"#fff"}} size={24}/>
            </TouchableOpacity>

        </View>
      <Text>Properties_screen
Properties_screen</Text>
    </View>
  );
};

export default Properties_screen;
