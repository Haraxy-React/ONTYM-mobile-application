import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, StatusBar, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import image1 from "../Assets/Almond_Tree.png";
import image2 from "../Assets/Chestnut_Villa.png";
import image3 from "../Assets/Salt_water_Villa.png";
import { useSelector, useDispatch } from 'react-redux';
import {
  taskList, staffDetails, locationList as locationListUrl,
  jobDurationUrl, jobStatusUrl, staffUrl, propertyUrl, jobType, causeOfIssue
} from '../api/ontym';

import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
// import SyncStorage from 'sync-storage';
import { log, set } from 'react-native-reanimated';

const Properties_screen = (props) => {
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 25,
    total: 0,
  });
  const [citys, setcitys] = useState([])
  const [property, setproperty] = useState([])
  // const user = SyncStorage.get('user');
  const image = [{
    id: 0,
    img: image1,
  },
  {
    id: 1,
    img: image2,
  },
  {
    id: 3,
    img: image3,
  }

  ]
  const [location, setlocation] = useState([])
  const [toggal, settoggal] = useState(true)
  const [flag, setflag] = useState(true)

  const {
    user
  } = useSelector(state => state.loginReducer);
  const staticData = [
    {
      id: 0,
      value: image1,
      no: 10,
      name: "Lonavala"
    },
    {
      id: 1,
      value: image2,
      no: 15,
      name: "Goa",
    },
    {
      id: 2,
      value: image3,
      no: 25,
      name: "Mumbai",
    },

  ];
  useEffect(() => {
    setflag(false)

    console.log("USER DATA ID: ", user.userData.id);
    axios.get(`${staffUrl}/${user.userData.id}`,
      {
        headers:
          { "Authorization": `Bearer ${user.accessToken}` }
      }

    ).then((response) => {

      let proper = []
      console.log("ree", response.data.property);
      for (let i = 0; i < response.data.property.length; i++) {
        axios.get(
          `${propertyUrl}/${response.data.property[i].id}`,
          {
            headers:
              { "Authorization": `Bearer ${user.accessToken}` }
          }
        ).then((response) => {

          proper.push(response.data)

        }).catch((error) => {
          console.log(error);
        })

      }
      setproperty(proper)
    }).catch((error) => {
      console.log(error);
    })
    // console.log('=======>',user.tenant_id + user.tenant_template_id);

    // setproperty(staticData)
    console.log('=======> property', property);

    fetchlocation()




  }, [flag, location]);
  const fetchlocation = () => {


    let loc = []

    for (let i = 0; i < property.length; i++) {
      {

        if (loc.includes(property[i].location)) {

        }
        else {
          loc.push(property[i].location)
        }


      }



    }
    loaddata(loc, property)





    // }).catch((error) => {
    //   console.log(error);
    // })


  }
  const loaddata = (loc, response) => {
    let total = []

    for (let i = 0; i < loc.length; i++) {
      let count = 0
      for (let j = 0; j < response.length; j++) {
        if (loc[i] === response[j].location) {
          count = count + 1
        }




      }
      total.push(count)


    }
    console.log('total', total);

    if (location.length === 0) {
      for (let i = 0; i < loc.length; i++) {


        location.push({ cityname: loc[i], image: image[i], id: i, Total: total[i] })


      }
      console.log(location);

    } else {
      console.log("else");
    }


    setflag(true)
  }

  const renderItem = ({ item }) => (

    <View style={styles.item}>
      <TouchableOpacity onPress={() => { props.navigation.navigate('Properties_screen1', { city: item.cityname }) }}>

        <Image resizeMode={"contain"} style={{ width: "95%", height: 168, borderRadius: 20, alignSelf: "center" }} source={item.image.img} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontWeight: "600", fontSize: 24, lineHeight: 36, letterSpacing: 0.1 }}>
            {item.cityname}
          </Text>
          <View style={{ width: 50, height: 33, backgroundColor: "#2d9cdb", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "600", fontSize: 18, lineHeight: 27, letterSpacing: 0.1, color: "#fff" }}>{item.Total}</Text>
          </View>
        </View>

        {/* <Text >{item.Area}</Text> */}
      </TouchableOpacity>
    </View>
  );

  if (!flag) {
    return (<View style={{ flex: 1, paddingBottom: 60 }}>
      <ActivityIndicator />
    </View>)
  }

  return (
    <View style={{ flex: 1, paddingBottom: 60 }}>
      <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
        <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }}>Properties </Text>
        {/* <TouchableOpacity onPress={() => { console.log('asdasd') }}>
          <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} />
        </TouchableOpacity> */}

      </View>
      <FlatList
        data={location}
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

export default Properties_screen;

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
    paddingHorizontal: 2,
    paddingVertical: 10,




  },
  title: {
    fontSize: 32,
  },
});
