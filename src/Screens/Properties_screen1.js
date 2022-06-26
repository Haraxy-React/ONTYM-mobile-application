import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, StatusBar, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import image from "../Assets/property.png";
import { useSelector, useDispatch } from 'react-redux';
import Loader from "../Components/loader";
import { Permission } from "../Components/Permission";
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import {
  taskList, staffDetails, locationList as locationListUrl,
  jobDurationUrl, jobStatusUrl, staffUrl, propertyUrl, jobType, causeOfIssue
} from '../api/ontym';
// import SyncStorage from 'sync-storage';

const Properties_screen1 = (props) => {
  const [loader, setLoader] = useState(false);

  // const user = SyncStorage.get('user');
  const [flag, setflag] = useState(false)
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 25,
    total: 0,
  });
  const [property, setproperty] = useState([])
  const {
    user
  } = useSelector(state => state.loginReducer);

  useEffect(() => {
    setproperty(

      [

        [{

          id: "",
          property_image: "",
          property_name: "",
          location: "",
          is_active: true
        }]

      ]


    )
    setLoader(true)
    let proper = []
    console.log(user.userData.id);
    axios.get(`${staffUrl}/${user.userData.id}`,
      {
        headers:
          { "Authorization": `Bearer ${user.accessToken}` }
      }

    ).then((response) => {

      console.log("STAFF DETAILS:", response.data);

      for (let i = 0; i < response.data.property.length; i++) {
        axios.get(
          `${propertyUrl}/${response.data.property[i].id}`,
          {
            headers:
              { "Authorization": `Bearer ${user.accessToken}` }
          }
        ).then((response) => {
          console.log("PROPER:  ", response.data);
          // setproperty([response.data])
          proper.push(response.data)
          console.log("PROPER: lennnngth", proper.length);
          setproperty([...proper])
        }).catch((error) => {
          console.log(error);
        })
      }
      setLoader(false)
    }).catch((error) => {
      console.log(error.response.data);
      setLoader(false)
    })

  }, []);


  const renderItem = ({ item }) => (

    <View style={styles.item}>
      <Loader show={loader} />
      {/* <Permission /> */}
      <TouchableOpacity onPress={() => { props.navigation.navigate('Properties_screen2', { item: item }) }}>
        <View style={{ flexDirection: "row" }}>
          <Image resizeMode={"contain"} style={{ width: 50, height: 50, borderRadius: 100 }} source={{
            uri: item.property_image, headers: {
              Accept: '*/*',
            },
          }} />

          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "600", lineHeight: 30, fontFamily: "Poppins-SemiBold", color: "#000" }}
            >{item.property_name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#000" }} >{item.location}</Text>
              <Text style={{ fontSize: 14, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b" }}  > | </Text>
              <Text style={item.is_active === false ? { fontSize: 14, fontWeight: "600", lineHeight: 24, fontFamily: "Poppins-SemiBold", color: "red" } : { fontSize: 14, fontWeight: "600", lineHeight: 24, fontFamily: "Poppins-SemiBold", color: "lightgreen" }}  >true</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* <View style={{ marginTop: 5 }} >


        <TouchableOpacity onPress={() => { console.log('asdasd', item.is_active) }}>
          <Icon name='dots-vertical' style={{ color: "#000" }} size={20} />
        </TouchableOpacity>
      </View> */}

      {/* <Text >{item.Area}</Text> */}
    </View>
  );


  return (
    <View style={{ flex: 1, paddingBottom: 60 }}>
      <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
        <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Properties </Text>
        {/* <TouchableOpacity onPress={() => { console.log('asdasd') }}>
          <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
        </TouchableOpacity> */}

      </View>
      {user.permission_list != null ? user.permission_list[0].operation_and_booking_access === "1" ? <Permission /> : null : null
      }
      <FlatList
        data={property}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={

          (({ highlighted }) => (
            <View
              style={{ height: 1, width: "90%", backgroundColor: "#A6a4a4", alignSelf: "center" }}
            />
          ))
        }
      />
    </View>
  );
};

export default Properties_screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff"
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: "space-between"



  },
  title: {
    fontSize: 32,
  },
});
