import React, {useState, useEffect} from 'react';
import {Image, Linking,TextInput,View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';




const Input = ({width, placeholder,icon}) => {



    

    return (
    <>
      <Text style={{position:"absolute",top:-25,left:30,backgroundColor:"#fff",fontSize:18,paddingHorizontal:10,fontWeight:"400",fontFamily:"Poppins-Regular",zIndex:10}}>{placeholder}</Text>
         <TouchableOpacity  style={{
          height:60,
     borderRadius:4,
     width:width,
  borderWidth:1,
          borderColor: '#0f4c75',
          padding:10,
          marginTop:15,
          zIndex:0

       }}>
          
        <View style={{ flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"}}>
        
       <TextInput style={{fontSize:18,width:"90%",justifyContent:"center",height:35}} placeholder={placeholder} />
        
        <Icon name={icon} style={{color:"#000",alignSelf:"flex-end", marginTop:-1}} size={30}/>
        </View>
        </TouchableOpacity>
   
      </>
    );
  
}

export default Input