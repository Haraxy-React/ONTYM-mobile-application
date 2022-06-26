import { View, Text, SafeAreaView, TouchableOpacity, Platform, Image, FlatList, StyleSheet, StatusBar, Modal, KeyboardAvoidingView, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Animated, { log } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment"
import profilelarge from "../Assets/profile1.png"
import profileimagesmall from "../Assets/profilesmall.png"
import { TextInput } from 'react-native-paper';
import paramount from "../Assets/paramount_vector.png";
import mongolia from "../Assets/mongolia_vector.png";
import { Dropdown } from 'react-native-element-dropdown';
import { uploadFilesOnFirestorage } from "../Components/FirestorageUploadFile";
import Constants from 'expo-constants';
import { firestore } from "../Components/FirebaseSetup";
import { Permission } from "../Components/Permission";
import { collection, addDoc, doc, runTransaction, setDoc, updateDoc } from "firebase/firestore";
import * as Notifications from 'expo-notifications';

import lake from "../Assets/Lake_vector.png";
import { dbDate, datePickerDateTime, dbDateTime, datePickerFormat } from "../Components/datetimeFormat";
import { getpropertyList, staffListFunction, taskSourceFunction, areaOfPropertyFunction, causeOfIssueFunction, pickImage } from "../Components/getFunction";
// import * as ImagePicker from 'expo-image-picker';
import { EmptyView } from "../Components/EmptyView";
// import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';

import Multiselect from 'multiselect-react-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import StepIndicator from 'react-native-step-indicator';
import profile from "../Assets/profile1.png";
import { login, refresh, getUser, session } from "../api/auth"
import { useSelector, useDispatch } from 'react-redux';
import Loader from "../Components/loader";
import { showMessage, hideMessage } from "react-native-flash-message";
import { BackHandler } from 'react-native';

import axios from 'axios';
import Input from "../Components/Input"
import {
  taskList, staffDetails, locationList as locationListUrl,
  jobDurationUrl, jobStatusUrl, staffUrl, propertyUrl, jobType, causeOfIssue
} from '../api/ontym';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

var isBottomSheet = false;


const TaskScreen = (props) => {
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const [open, setOpen] = useState(false);
  const [openDurationDropDown, setOpenDurationDropDown] = useState(false);
  const [openTaskTypeDropDown, setOpenTaskTypeDropDown] = useState(false);
  const [openStatusDropDown, setOpenStatusDropDown] = useState(false);
  const [staffName, setstaffName] = useState('');
  const [openStaffDropDown, setOpenStaffDropDown] = useState(false);
  const [openPropetyDropDown, setOpenPropertyDropDown] = useState(false);
  const [openCauseOfissueDropDown, setOpenCauseOfIssueDropDown] = useState(false);
  const [openTaskSourceDropDown, setOpenTaskSourceDropDown] = useState(false);
  const [openAreaOfPropertyDropDown, setOpenAreaOdPropertyDropDown] = useState(false);
  const [imageObj, setImageObj] = useState({});
  const dispatch = useDispatch();
  const [taskAssignee, setTaskAssignee] = useState(null);

  const [loader, setLoader] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [text, setText] = React.useState("");
  const [currentDate, setCurrentDate] = useState('');
  const [taskDurationList, setTaskDurationList] = useState([])
  const [taskStatuslist, setTaskStatusList] = useState([])
  const [causeOfissueList, setCasuseOfIssueList] = useState([])
  const [taskSourceList, setTaskSourceList] = useState([]);
  const [areaOfPropertyList, setAreaOfPropertyList] = useState([]);

  const [staffList, setStaffList] = useState([])
  const [propertyList, setPropetyList] = useState([])
  const [taskTypeList, settaskTypeList] = useState([])
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');

  const [locationVal, setLocationVal] = useState(null);
  const [durationVal, setDurationVal] = useState(null);
  const [taskTypeVal, setTaskTypeVal] = useState(null);
  const [taskStatusVal, setTaskStatusVal] = useState(null);
  const [causeOfIssueVal, setCauseOfIssueVal] = useState(null);
  const [taskSourceVal, setTaskSourceVal] = useState(null);
  const [areaOfPropertyVal, setAreaOfPropertyVal] = useState(null);
  const [propertyVal, setPropertyVal] = useState(null);
  const [staffVal, setStaffVal] = useState(null);
  const [startDateVal, setStartDateVal] = useState(new Date())
  const [endDateVal, setEndDateVal] = useState(new Date())
  const [isDisplayStartDate, showDisplayStartDate] = useState(false);
  const [isDisplayEndDate, showDisplayEndDate] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [bg, setbg] = useState();
  const [displaymode, setMode] = useState('datetime');
  const [taskId, setTaskId] = useState('');
  const [task, setTaskList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});
  const [name, setname] = useState('');
  const [openbottomsheet, Setopenbottomsheet] = useState('');
  const [taskGeneratoeDetails, setTeaskGeneratorDetails] = useState({});
  const [taskAssignDetails, setTaskAssignDetails] = useState({});
  const [locationList, setLocationList] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const labels = ["Task Deatils", "Task Follow-ups", 'many more'];


  const staticData = [
    {
      id: 0,
      value: paramount,
      name: "paramount"
    },
    {
      id: 1,
      value: mongolia,
      name: "mongolia villa",
    },
    {
      id: 2,
      value: lake,
      name: "lake villa",
    },
    {
      id: 3,
      value: lake,
      name: "kailash villa",
    },
    {
      id: 4,
      value: lake,
      name: "lake villa",
    },
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#005478',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#005478',
    stepStrokeUnFinishedColor: '#005478',
    separatorFinishedColor: '#005478',
    separatorUnFinishedColor: '#005478',
    stepIndicatorFinishedColor: '#005478',
    stepIndicatorUnFinishedColor: '#005478',
    stepIndicatorCurrentColor: '#005478',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#005478',
    stepIndicatorLabelFinishedColor: '#005478',
    stepIndicatorLabelUnFinishedColor: 'white',
    labelColor: '#005478',
    labelSize: 13,
    currentStepLabelColor: '#005478'
  }

  const {
    user
  } = useSelector(state => state.loginReducer);

  const getTaskList = async () => {
    setLoader(true)
    let userId = user.userData.id;
    let tokenId = user.accessToken;
    console.log("user if:  ", userId);

    let filter = {
      where: {
        staff_id: userId,

      },
      order: ["sequence DESC"],
      include: [
        {
          "relation": "areaOfHouse",

        },
        {
          "relation": "causeOfIssue",

        },
        {
          "relation": "jobType",

        },
        {
          "relation": "property",

        },


      ]
      // skip: offset * limit,
      // limit: limit,
    };

    // const res = await axios.get(taskList + "?filter=" + JSON.stringify(filter));

    await axios.get(taskList + "?filter=" + JSON.stringify(filter),
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {
      // setname(response.data.staff_name)
      // SyncStorage.set('user', response.data);
      // id: '1',
      // profile: profilelarge,
      // smallprofile: profileimagesmall,
      // Area: "Garden",
      // villaname: "Mongalia Vila",
      // place: "Goa",
      // purpose: "Cleaning",
      // color: "#fff"

      // console.log("TASK CAUSE OF:", response.data);
      const taskList = response.data.map((data) => {
        return {
          ...data,
          id: data.id,
          profile: data.property.property_image,
          smallprofile: profileimagesmall,
          Area: data.areaOfHouse.area_name,
          villaname: data.property.property_name,
          place: data.property.location,
          purpose: data.jobType.type,
          color: "#fc0f1d"
        }
      }
      )

      setLoader(false)
      setTaskList(taskList)

    }).catch((error) => {
      setLoader(false)
      console.log("ERORR: ", error);
    })
  }

  const submitCommentAndPhoto = async () => {
    setbg(false)
    sheetRef.current.snapTo(0)
    let tokenId = user.accessToken;

    setLoader(true);
    try {
      // update


      const res = await axios.patch(`${taskList}/${taskId}`, {
        "comment": [{ comment }],

      }, {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }


      );
      console.log(res.status);
      if (res.status === 200) {


        if (typeof imageObj.uri !== "undefined") {

          let blobObj = '';


          const response = await fetch(imageObj.uri)
          blobObj = await response.blob();
          // file = new File([blobSol], filename, { type: "image/jpeg", lastModified: new Date() });

          // console.log("FILE; ", JSON.stringify(file));
          const uploadRes = await uploadFilesOnFirestorage(setLoader, taskId, blobObj);
          console.log("UPLO RES FILE::  ", uploadRes);

          let imageData = {
            comment_image: [{ url: uploadRes }],
          };
          await axios.patch(`${taskList}/${taskId}`, {
            ...imageData,
          },
            {
              headers:
                { "Authorization": `Bearer ${user.accessToken}` }
            }

          );
        }
        setImage('')
        setComment('')


        showMessage({
          message: "Task updated!",
          type: "success",

          duration: 2850
        });
        setLoader(false)
        getTaskList()
      }
    } catch (error) {
      setLoader(false);
      showMessage({
        message: "Failed to create task!!",
        description: error,
        type: "danger",

        duration: 2850
      });

    } finally {
      setLoader(false);
    }



  }

  const getAssignToDetails = async (id) => {
    let tokenId = user.accessToken;

    await axios.get(staffDetails + "/" + id,
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {
      // setname(response.data.staff_name)
      // SyncStorage.set('user', response.data);
      // id: '1',
      // profile: profilelarge,
      // smallprofile: profileimagesmall,
      // Area: "Garden",
      // villaname: "Mongalia Vila",
      // place: "Goa",
      // purpose: "Cleaning",
      // color: "#fff"


      // setTaskAssignDetails(response.data)

      console.log("assign details LIST: ", response.data);
      setTaskAssignDetails(response.data)

    }).catch((error) => {
      console.log("ERORR: ", error);
    })
  }

  const getTaskGeneratorDetails = async (id) => {
    let tokenId = user.accessToken;

    await axios.get(getUser + "/" + id,
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {
      // setname(response.data.staff_name)
      // SyncStorage.set('user', response.data);
      // id: '1',
      // profile: profilelarge,
      // smallprofile: profileimagesmall,
      // Area: "Garden",
      // villaname: "Mongalia Vila",
      // place: "Goa",
      // purpose: "Cleaning",
      // color: "#fff"

      console.log("task generator details: ", response.data);

      setTeaskGeneratorDetails(response.data)

      // console.log("generator details LIST: ", taskGeneratoeDetails);


    }).catch((error) => {
      console.log("ERORR: ", error);
    })
  }


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    setname(user?.userData?.firstName)

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };


  }, []);

  function handleBackButtonClick() {
    var { navigate } = props.navigation;
    // sheetRef.current.close()
    console.log('sheet', isBottomSheet);
    if (isBottomSheet) {
      closesheet()
      return true;
    } else {
      return false;
      ;
    }

    // console.log(bg);
    // return true;
    // if (bg) {
    //   setbg(false)
    //   sheetRef.current.snapTo(0)
    // } else {
    //   props.navigation.goBack();
    //   return true;
    // }

  }

  useEffect(() => {
    // update header list

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [])

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token, user.userData.id);
      await setDoc(doc(firestore, "staff_list", user.userData.id), {
        token: token,
        ...user.userData

      });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }
  const updateHead = (id, token) => {

    axios.get(`${staffUrl}/${user.userData.id}`,
      {
        headers:
          { "Authorization": `Bearer ${token}` }
      }

    ).then((response) => {
      let headList = response.data.head_list;
      console.log("STAFF DETAILS:", response.data);
      let permissionList = response.data.permission_list;
      let staffImg = response.data.staff_image;
      const staffRef = doc(firestore, "staff_list", id);
      if (headList != null) {
        updateDoc(staffRef, {
          head_list: headList,

        });
        dispatch({
          type: "LOGIN",
          payload: { ...user, head_list: headList, permission_list: permissionList, accessToken: token, img: staffImg }
        })
      } else {
        console.log("ELSE:  ", { ...user, head_list: [] });
        updateDoc(staffRef, {
          head_list: headList
        });
        dispatch({
          type: "LOGIN",
          payload: { ...user, head_list: [], permission_list: permissionList, accessToken: token, img: staffImg }
        })
      }


    }).catch((error) => {
      console.log(error.response.data);
    })


  }

  useEffect(() => {

    getTaskList();
    var date = moment()
      .utcOffset('+05:30')
      .format('MMMM DD/YYYY ');
    let tokenId = user.accessToken;
    console.log('TOKEN ID: ', tokenId);
    checkToken(tokenId)

    setCurrentDate(date);
    getLocationList();
    getDurationList();
    getTaskType();
    getStatus();
    causeOfIssueFunction(setCasuseOfIssueList, tokenId);
    taskSourceFunction(setTaskSourceList, tokenId)
    areaOfPropertyFunction(setAreaOfPropertyList, tokenId)
    getpropertyList(setPropetyList, tokenId)
    staffListFunction(setStaffList, tokenId)

    console.log("USER DATA: ", user);

  }, []);


  const checkToken = async (jwt) => {
    try {


      const res = await axios.post(
        session,
        { accessToken: jwt },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        },
      );
      console.log("RES STATUS: uss ", res.status);
      if (res.status === 200) {
        dispatch({
          type: "LOGIN",
          payload: { ...user, accessToken: res.data.accessToken }
        })
        console.log('UPDATED TOKEN ', user);
        updateHead(user.userData.id, res.data.accessToken)

        // localStorage.setItem("jwt", res.data.accessToken);
        // error.response.config.headers = {
        //   Authorization: `Bearer ${res.data.accessToken}`,
        // };
        // error.response.config.data = JSON.parse(error.response.config.data);
        // return axios.request(error.response.config);
      } else {
        Logout()
        showMessage({
          message: "Failed to fetch the data!!",
          description: error,
          type: "danger",

          duration: 2850
        });

      }

    } catch (error) {
      console.log("RES STATUS: uss ", error.response.data);

      // console.log(error);
      Logout()

    }
  }

  const Logout = () => {
    // SyncStorage.set('token', 'null');
    // SyncStorage.set('userid', 'null');
    dispatch({
      type: "LOGIN",
      payload: {}
    })
    props.navigation.navigate('Login_Screen')
  }


  const getStatus = async () => {
    let tokenId = user.accessToken;

    await axios.get(jobStatusUrl,
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {




      const statusList = response.data.map((data) => {
        return {
          ...data,
          label: data.status,
          value: data.id
        }
      }
      )

      setTaskStatusList(statusList)
      // console.log("LOCATION LIST: ", locationList);

      // setLocationList(locationList)

      // console.log("TASK LIST: ", task);
    }).catch((error) => {
      console.log("ERORR: ", error);
    })
  }



  const getTaskType = async () => {
    let tokenId = user.accessToken;

    await axios.get(jobType,
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {
      // setname(response.data.staff_name)
      // SyncStorage.set('user', response.data);
      // id: '1',
      // profile: profilelarge,
      // smallprofile: profileimagesmall,
      // Area: "Garden",
      // villaname: "Mongalia Vila",
      // place: "Goa",
      // purpose: "Cleaning",
      // color: "#fff"


      const taskType = response.data.map((data) => {
        return {
          ...data,
          label: data.type,
          value: data.id
        }
      }
      )
      // setTask
      // console.log("LOCATION LIST: ", locationList);

      // setLocationList(locationList)
      settaskTypeList(taskType)
      // console.log("TASK LIST: ", task);
    }).catch((error) => {
      console.log("ERORR: ", error);
    })
  }

  const updateTaskData = async () => {
    setbg(false)
    sheetRef.current.snapTo(0)
    let tokenId = user.accessToken;

    setLoader(true);
    try {
      // update


      const res = await axios.patch(`${taskList}/${taskId}`, {
        "start_date_time": startDateVal,
        "end_date_time": endDateVal,
        "job_description": taskDescription,
        "staff_name": staffName,
        "updated_by": user.userData.id,
        "updated_date": new Date(),
        "area_of_house_id": areaOfPropertyVal,
        "staff_id": staffVal,
        "cause_of_issue_id": causeOfIssueVal,
        "job_duration_id": durationVal,
        "job_source_id": taskSourceVal,
        "job_status_id": taskStatusVal,
        "job_type_id": taskTypeVal,
        "property_id": propertyVal,
        "tenant_id": user.tenantId,
        "tenant_template_id": user.tenantTemplateDataId
      }, {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }


      );
      if (res.status === 200) {

        if (typeof imageObj.uri !== "undefined") {

          let blobObj = '';


          const response = await fetch(imageObj.uri)
          blobObj = await response.blob();
          // file = new File([blobSol], filename, { type: "image/jpeg", lastModified: new Date() });

          // console.log("FILE; ", JSON.stringify(file));
          const uploadRes = await uploadFilesOnFirestorage(setLoader, taskId, blobObj);
          console.log("UPLO RES FILE::  ", uploadRes);

          let imageData = {
            comment_image: [{ url: uploadRes }],
          };
          await axios.patch(`${taskList}/${taskId}`, {
            ...imageData,
          },
            {
              headers:
                { "Authorization": `Bearer ${user.accessToken}` }
            }

          );
        }
        showMessage({
          message: "Task updated!",
          type: "success",

          duration: 2850
        });
        // const resData = jobs.map((value) =>
        //   stateUpdateData.id === value.id ? { ...value, ...res.data } : value,
        // );

        // const resJobData = resData.filter((job) =>
        //   moment(job.start_date_time, dbDateTime)
        //     .startOf("day")
        //     .isSame(moment(currentDate).startOf("day")),
        // );
        // setJobs(resData);
        // setJobsData(resJobData);
        // toast.success(`${t("task")} ${c("updated")}`);
        // setStateData({ type: "RESET_STATE" });
        // dispatch({ type: "close" });
        setImageObj({})
        setImage('')


        setStartDateVal(
          new Date()
          // moment(item.start_date_time).format(datePickerFormat)
          // new Date().toLocaleDateString()
        )
        // return;



        setEndDateVal(
          new Date()

        )
        setPropertyVal(null)
        setCauseOfIssueVal(null)
        setTaskTypeVal(null)
        setTaskSourceVal(null)
        setAreaOfPropertyVal(null)
        setDurationVal(null)
        setTaskStatusVal(null)
        setTaskDescription(null)

        getTaskList()
      }
    } catch (error) {
      setLoader(false);
      showMessage({
        message: "Failed to create task!!",
        description: error,
        type: "danger",

        duration: 2850
      });

    } finally {
      setLoader(false);
    }
  };

  const createTask = async () => {
    let tokenId = user.accessToken;


    if (propertyVal == null) {
      showMessage({
        message: "Failed to create task!!",
        description: "property is required!",
        type: "danger",

        duration: 2850
      });
      return;
    } else if (causeOfIssueVal == null) {
      showMessage({
        message: "Failed to create task!!",
        description: "cause of issue is required!",
        type: "danger",

        duration: 2850
      });
      return;
    } else if (taskTypeVal == null) {
      showMessage({
        message: "Failed to create task!!",
        description: "task type is required!",
        type: "danger",

        duration: 2850
      });
      return;
    } else if (taskSourceVal == null) {
      showMessage({
        message: "Failed to create task!!",
        description: "task source is required!",
        type: "danger",

        duration: 2850
      });
      return;
    } else if (areaOfPropertyVal == null) {
      showMessage({
        message: "Failed to create task!!",
        description: "area of property is required!",
        type: "danger",

        duration: 2850
      });
      return;
    } else if (durationVal == null) {
      showMessage({
        message: "Failed to create task!!",
        description: "duration is required!",
        type: "danger",

        duration: 2850
      });
      return;
    } else if (taskStatusVal == null) {
      showMessage({
        message: "Failed to create task!!",
        description: "status is required!",
        type: "danger",

        duration: 2850
      });
      return;
    } else if (staffVal == null) {
      showMessage({
        message: "Failed to create task!!",
        description: "staff is required!",
        type: "danger",

        duration: 2850
      });
      return;
    }
    setbg(false)
    sheetRef.current.snapTo(0)
    setLoader(true)
    try {
      const res = await axios.post(taskList, {
        "start_date_time": startDateVal,
        "end_date_time": endDateVal,
        "job_description": taskDescription,
        "staff_name": staffName,
        "created_by": user.userData.id,
        "created_date": new Date(),
        "area_of_house_id": areaOfPropertyVal,
        "staff_id": staffVal,
        "cause_of_issue_id": causeOfIssueVal,
        "job_duration_id": durationVal,
        "job_source_id": taskSourceVal,
        "job_status_id": taskStatusVal,
        "job_type_id": taskTypeVal,
        "property_id": propertyVal,
        "vendor_id": '',
        "tenant_id": user.tenantId,
        "tenant_template_id": user.tenantTemplateDataId,
        "comment": [],
        "comment_image": []
      },
        {
          headers:
            { "Authorization": `Bearer ${tokenId}` }
        }

      );

      if (res.status === 200) {


        if (typeof imageObj.uri !== "undefined") {

          let blobObj = '';


          const response = await fetch(imageObj.uri)
          blobObj = await response.blob();
          // file = new File([blobSol], filename, { type: "image/jpeg", lastModified: new Date() });

          // console.log("FILE; ", JSON.stringify(file));
          const uploadRes = await uploadFilesOnFirestorage(setLoader, res.data.id, blobObj);
          console.log("UPLO RES FILE::  ", uploadRes);

          let imageData = {
            comment_image: [{ url: uploadRes }],
          };
          await axios.patch(`${taskList}/${res.data.id}`, {
            ...imageData,
          },
            {
              headers:
                { "Authorization": `Bearer ${user.accessToken}` }
            }

          );
        }

        await setDoc(doc(firestore, "tasks", res.data.id), {
          "start_date_time": startDateVal,
          "end_date_time": endDateVal,
          "job_description": taskDescription,
          "staff_name": staffName,
          "created_by": user.userData.id,
          "created_date": new Date(),
          "area_of_house_id": areaOfPropertyVal,
          "staff_id": staffVal,
          "cause_of_issue_id": causeOfIssueVal,
          "job_duration_id": durationVal,
          "job_source_id": taskSourceVal,
          "job_status_id": taskStatusVal,
          "job_type_id": taskTypeVal,
          "property_id": propertyVal,
          "vendor_id": '',
          "tenant_id": user.tenantId,
          "tenant_template_id": user.tenantTemplateDataId,

        });

        setImage('')
        setImageObj({})
        getTaskList();
        showMessage({
          message: "Task created!",
          type: "success",

          duration: 2850
        });

        setStartDateVal(
          new Date()
          // moment(item.start_date_time).format(datePickerFormat)
          // new Date().toLocaleDateString()
        )
        // return;

        // setStartDateVal(
        //   item.start_date_time.toISOString().split('T')[0]
        //   // moment(item.start_date_time).format(datePickerFormat)
        //   // new Date().toLocaleDateString()
        // )
        setEndDateVal(
          new Date()
          // new Date(item.end_date_time).toLocaleDateString()
          // moment(item.end_date_time).format(datePickerFormat)

        )
        setPropertyVal(null)
        setCauseOfIssueVal(null)
        setTaskTypeVal(null)
        setTaskSourceVal(null)
        setAreaOfPropertyVal(null)
        setDurationVal(null)
        setTaskStatusVal(null)
        setTaskDescription(null)

        return true;
      }
      setLoader(false);
      console.log("hhh");
      showMessage({
        message: "Failed to create task!!",
        description: "something went wrong",
        type: "danger",

        duration: 2850
      });

      return false;
    } catch (error) {
      console.log('ERR: ', error);
      console.log('ERROR JYJ: ', error.response);
      setLoader(false);
      showMessage({
        message: "Failed to create task!!",
        description: "something went wrong",
        type: "danger",

        duration: 2850
      });

    } finally {
      setLoader(false);
    }

  }

  const getDurationList = async () => {
    let tokenId = user.accessToken;

    await axios.get(jobDurationUrl,
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {
      // setname(response.data.staff_name)
      // SyncStorage.set('user', response.data);
      // id: '1',
      // profile: profilelarge,
      // smallprofile: profileimagesmall,
      // Area: "Garden",
      // villaname: "Mongalia Vila",
      // place: "Goa",
      // purpose: "Cleaning",
      // color: "#fff"


      const durationList = response.data.map((data) => {
        return {
          ...data,
          label: data.duration,
          value: data.id
        }
      }
      )
      setTaskDurationList(durationList)


      // console.log("LOCATION LIST: ", locationList);

      // setLocationList(locationList)

    }).catch((error) => {
      console.log("ERORR: ", error);
    })
  }

  const getLocationList = async () => {
    let tokenId = user.accessToken;

    await axios.get(locationListUrl,
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {
      // setname(response.data.staff_name)
      // SyncStorage.set('user', response.data);
      // id: '1',
      // profile: profilelarge,
      // smallprofile: profileimagesmall,
      // Area: "Garden",
      // villaname: "Mongalia Vila",
      // place: "Goa",
      // purpose: "Cleaning",
      // color: "#fff"


      const locationList = response.data.map((data) => {
        return {
          ...data,
          label: data.location_name,
          value: data.location_id
        }
      }
      )


      setLocationList(locationList)

    }).catch((error) => {
      console.log("ERORR: ", error);
    })
  }

  const filterTheTaskData = async () => {

    let userId = staffVal;
    let tokenId = user.accessToken;
    let duration = durationVal;
    let typeVal = taskTypeVal;
    let status = taskStatusVal;
    let propertyId = propertyVal;

    let where = {};
    if (taskAssignee === '0') {
      where = {
        created_by: user.userData.id

      }
    } else if (taskAssignee === '1') {
      where = {
        staff_id: user.userData.id

      }
    }

    console.log(JSON.stringify(where));
    let filter = {
      where: { ...where },
      order: ["sequence DESC"],
      include: [
        {
          "relation": "areaOfHouse",

        },
        {
          "relation": "causeOfIssue",

        },
        {
          "relation": "jobType",

        },
        {
          "relation": "property",

        },


      ]
      // skip: offset * limit,
      // limit: limit,
    };

    console.log(JSON.stringify(filter));
    // return;
    // const res = await axios.get(taskList + "?filter=" + JSON.stringify(filter));
    setLoader(true)
    await axios.get(taskList + "?filter=" + JSON.stringify(filter),
      {
        headers:
          { "Authorization": `Bearer ${tokenId}` }
      }

    ).then((response) => {
      let assign = taskAssignee;
      let createdBy = null;
      let assignToMe = null;
      if (assign !== null) {
        if (assign === '0') {
          createdBy = taskAssignee;
        } else {
          assignToMe = taskAssignee;
        }

      } else {

      }
      console.log('res: le ', response.data.length);
      // || locationVal !== null && data.property?.location_id === locationVal
      const taskList = response.data.filter(data =>
        createdBy !== null && data.created_by || assignToMe !== null && data.staff_id || propertyId != null && data.property_id === propertyId || duration !== null && data.job_duration_id === duration || status !== null && data.job_status_id === status
        || taskTypeVal !== null && data.job_type_id === taskTypeVal || staffVal !== null && data.staff_id === staffVal

      ).map((data) => {
        return {
          ...data,
          id: data.id,
          profile: data.property.property_image,
          smallprofile: profileimagesmall,
          Area: data.areaOfHouse.area_name,
          villaname: data.property.property_name,
          place: data.property.location,
          purpose: data.jobType.type,
          color: "#fc0f1d"
        }
      })


      closesheet()
      setLoader(false)

      console.log(taskList.length);
      if (taskList.length === 0) {
        showMessage({
          message: "Data Not Found",
          type: "danger",
          duration: 2850
        });
      }
      setTaskList(taskList)

    }).catch((error) => {
      setLoader(false)
      showMessage({
        message: "Error!",
        description: "Something went wrong!",
        type: "danger",
        duration: 2850
      });
      console.log(error.response);
      console.log("ERORR: ", error);
    })


  }

  const opensheet = () => {
    setbg(true)
  }
  const closesheet = () => {
    isBottomSheet = false;
    setbg(false)
    console.log("herer");
    sheetRef.current.snapTo(0)
    setUpdate(false)
    setTaskId('')
    // resetVal()
  }

  const resetVal = () => {
    setImage('')
    setImageObj({})
    getTaskList();
    setTaskDetails({})

    setStartDateVal(
      new Date()
      // moment(item.start_date_time).format(datePickerFormat)
      // new Date().toLocaleDateString()
    )
    // return;

    // setStartDateVal(
    //   item.start_date_time.toISOString().split('T')[0]
    //   // moment(item.start_date_time).format(datePickerFormat)
    //   // new Date().toLocaleDateString()
    // )
    setEndDateVal(
      new Date()
      // new Date(item.end_date_time).toLocaleDateString()
      // moment(item.end_date_time).format(datePickerFormat)

    )
    setPropertyVal(null)
    setCauseOfIssueVal(null)
    setTaskTypeVal(null)
    setTaskSourceVal(null)
    setAreaOfPropertyVal(null)
    setDurationVal(null)
    setTaskStatusVal(null)
    setTaskDescription(null)

  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log('STATUS: ', status);
      // setHasPermission(status === 'granted');
    })();
  }, []);


  const renderContent = () => (
    openbottomsheet === "Filter" ?
      <View
        style={{

          backgroundColor: '#fff',
          paddingHorizontal: 20,
          height: "115%",
        }}>
        <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

        {/* <Text>HIHIIHI</Text> */}
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1 }}   >

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Image resizeMode={"contain"} style={{ width: 20, height: 20, }} source={require('../Assets/Filter.png')} />
            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>Filters</Text>

          </View>
          <View  >
            <View style={{

              flexDirection: "row",

            }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Task assignee</Text>
              <TouchableOpacity
                style={styles.dropDownClearText}
                onPress={() => {

                  setTaskAssignee(null)
                }}
              >
                <Text  >clear</Text>

              </TouchableOpacity>
            </View>
            <View
            // style={Platform.OS === 'ios' ? { position: 'relative', zIndex: 1 } : { position: 'relative' }}
            >

              <Dropdown
                style={[styles.dropdown, { borderColor: 'black' }]}
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={[{ label: "Created by me", value: "0" }, { label: "Assign to me", value: "1" }]}

                maxHeight={300}
                labelField="label"
                valueField="value"
                // placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={taskAssignee}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setTaskAssignee(item.value)
                  // setValue(item.value);
                  // setIsFocus(false);
                }}

              />

              {/* <DropDownPicker
                scrollViewProps={{
                  decelerationRate: "fast"
                }}
                searchable={true}
                searchablePlaceholder="Search"
                searchableError={() => <Text fontSize={16}>Not found</Text>}
                open={open}
                setOpen={setOpen}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                items={locationList}
                value={locationVal}
                setValue={setLocationVal}
                dropDownStyle={{
                  backgroundColor: "red",
                }}

                containerStyle={{
                  height: 40
                }}

                onChangeItem={item => console.log(item.label, item.value)}
              /> */}
            </View>

          </View>


          <View style={{ marginTop: 25, borderTopWidth: 1, borderColor: "#C1c1c1", zIndex: 4 }}>
            <View style={{

              flexDirection: "row",

            }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Task Type</Text>
              <TouchableOpacity
                style={styles.dropDownClearText}
                onPress={() => {

                  setTaskTypeVal(null)
                }}
              >
                <Text  >clear</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Dropdown
                style={[styles.dropdown, { borderColor: 'black' }]}
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={taskTypeList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                // placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={taskTypeVal}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                  console.log(item.value);
                  setTaskTypeVal(item.value)
                  // setValue(item.value);
                  // setIsFocus(false);
                }}

              />
              {/* <DropDownPicker
                items={taskTypeList}
                defaultIndex={0}
                open={openTaskTypeDropDown}
                setOpen={setOpenTaskTypeDropDown
                }
                containerStyle={{ height: 40 }}
                onChangeItem={item => console.log(item.label, item.value)}
                value={taskTypeVal}
                setValue={setTaskTypeVal}
                dropDownStyle={{
                  backgroundColor: "red"
                }}

                containerStyle={{
                  height: 40
                }}
              /> */}
            </View>

          </View>
          <View style={{ marginTop: 25, borderTopWidth: 1, borderColor: "#C1c1c1", zIndex: 3 }}>
            <View style={{

              flexDirection: "row",

            }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Status</Text>
              <TouchableOpacity
                style={styles.dropDownClearText}
                onPress={() => {

                  setTaskStatusVal(null)
                }}
              >
                <Text  >clear</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Dropdown
                style={[styles.dropdown, { borderColor: 'black' }]}
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={taskStatuslist}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                // placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={taskStatusVal}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                  console.log(item.value);
                  setTaskStatusVal(item.value)
                  // setValue(item.value);
                  // setIsFocus(false);
                }}

              />


              {/* <DropDownPicker
                items={taskStatuslist}
                defaultIndex={0}
                open={openStatusDropDown}
                setOpen={setOpenStatusDropDown}
                containerStyle={{ height: 40 }}
                onChangeItem={item => console.log(item.label, item.value)}

                value={taskStatusVal}
                setValue={setTaskStatusVal}
                dropDownStyle={{
                  backgroundColor: "red",
                }}

                containerStyle={{
                  height: 40,
                }}
              /> */}
            </View>

          </View>
          <View style={{ marginTop: 25, borderTopWidth: 1, borderColor: "#C1c1c1", zIndex: 2 }}>
            <View style={{

              flexDirection: "row",

            }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Properties</Text>
              <TouchableOpacity
                style={styles.dropDownClearText}
                onPress={() => {

                  setPropertyVal(null)
                }}
              >
                <Text  >clear</Text>
              </TouchableOpacity>
            </View>
            <View>

              <Dropdown
                style={[styles.dropdown, { borderColor: 'black' }]}
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={
                  propertyList
                }
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                // placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={propertyVal}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                  console.log(item.value);
                  setPropertyVal(item.value)
                  // setValue(item.value);
                  // setIsFocus(false);
                }}

              />

              {/* <DropDownPicker
                items={propertyList}
                defaultIndex={0}
                open={openPropetyDropDown}
                setOpen={setOpenPropertyDropDown}
                containerStyle={{ height: 40 }}
                onChangeItem={item => console.log(item.label, item.value)}

                value={propertyVal}
                setValue={setPropertyVal}
                dropDownStyle={{
                  backgroundColor: "red",
                }}

                containerStyle={{
                  height: 40,
                }}
              /> */}
            </View>
          </View>
          {/* <View style={{ marginTop: 25, borderTopWidth: 1, borderColor: "#C1c1c1", zIndex: -1 }}>
            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Properties</Text>
            <ScrollView horizontal>

              {propertyList.map((item) => (

                <View style={{ justifyContent: "center", margin: 10, borderWidth: 0.8, paddingHorizontal: 2, paddingVertical: 20, borderColor: "#d9d9d9", width: 120, alignItems: "center" }} >

                  <Image source={item.value} resizeMode="contain" style={{ width: 80, height: 52, margin: 10 }} />
                  <Text style={{ alignSelf: "center" }}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>


          </View> */}
          <View style={{ marginTop: 25, borderTopWidth: 1, borderColor: "#C1c1c1", marginBottom: 25, zIndex: 1 }}>
            <View style={{

              flexDirection: "row",

            }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Staff</Text>
              <TouchableOpacity
                style={styles.dropDownClearText}
                onPress={() => {

                  setStaffVal(null)
                }}
              >
                <Text  >clear</Text>
              </TouchableOpacity>
            </View>
            <View>

              <Dropdown
                style={[styles.dropdown, { borderColor: 'black' }]}
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={
                  staffList
                }
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                // placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={staffVal}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                  console.log(item.value);
                  setStaffVal(item.value)
                  // setValue(item.value);
                  // setIsFocus(false);
                }}

              />

              {/*               
              <DropDownPicker
                items={staffList}
                value={staffVal}
                setValue={setStaffVal}
                open={openStaffDropDown}
                setOpen={setOpenStaffDropDown}
                containerStyle={{ height: 40 }}
                onChangeItem={item => console.log(item.label, item.value)}
              /> */}

            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              filterTheTaskData();
            }
            }
            style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "80%", height: 46, justifyContent: "center", borderRadius: 5, zIndex: -1 }} >
            <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
              Submit
        </Text>
          </TouchableOpacity>
        </ScrollView>
      </View >
      : openbottomsheet === "Timeline" ?
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            marginBottom: 50,
            height: "120%",
          }}>
          <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />


          <ScrollView

          >

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Icon name='bank' style={{ color: "#2d9cdb" }} size={24} />
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>Timeline</Text>


            </View>

            <View style={{ height: "100%", borderLeftWidth: 5, marginLeft: 20, borderColor: "#2d9cdb" }}>
              <View style={{ backgroundColor: "#2d9cdb", borderRadius: 25, width: 35, height: 35, justifyContent: "center", marginLeft: -20 }}>
                <View style={{ flexDirection: "row", marginLeft: 5 }}>
                  <Icon name='bank' style={{ color: "#fff", marginLeft: 3, marginTop: 5 }} size={20} />
                  <Text style={{ width: 300, marginLeft: 20, fontSize: 18, fontFamily: "Poppins-Regular" }} >Task Details</Text>
                </View>



              </View>
              <Text style={{ marginLeft: 30, fontSize: 14, fontFamily: "Poppins-Regular" }}> Property Name:- {taskDetails.villaname}</Text>
              <Text style={{ marginLeft: 30, fontSize: 14, fontFamily: "Poppins-Regular" }}> Task Type:- {taskDetails.purpose}</Text>
              <Text style={{ marginLeft: 30, fontSize: 14, fontFamily: "Poppins-Regular" }}> Are of House:- {taskDetails.Area}</Text>
              <Text style={{ marginLeft: 30, fontSize: 14, fontFamily: "Poppins-Regular" }}> Cause of Issue:- {taskDetails.causeOfIssue}</Text>
              <Text style={{ marginLeft: 30, fontSize: 14, fontFamily: "Poppins-Regular" }}> Start Date:- {moment(taskDetails.start_date_time).format(dbDate)}</Text>
              <Text style={{ marginLeft: 30, fontSize: 14, fontFamily: "Poppins-Regular" }}> End Datye:- {moment(taskDetails.end_date_time).format(dbDate)}</Text>
              <Text style={{ marginLeft: 30, fontSize: 18, fontFamily: "Poppins-SemiBold" }}> Task Generator</Text>

              <View style={{ marginLeft: 30, paddingVertical: "3%", flexDirection: "row" }}>

                <Image resizeMode={"contain"} style={{ width: 50, height: 50, borderRadius: 100 / 2 }} source={{ uri: taskGeneratoeDetails.profilePhoto }} />
                <View>
                  <Text style={{ fontSize: 18, fontWeight: "500", lineHeight: 27, fontFamily: "Poppins-SemiBold", color: "#000", paddingLeft: "5%" }}>
                    {taskGeneratoeDetails.firstName}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: "300", lineHeight: 21, fontFamily: "Poppins-Regular", color: "#979797", paddingLeft: "5%" }}>{taskGeneratoeDetails.defaultAccount}</Text>
                </View>
              </View>
              <Text style={{ marginLeft: 30, fontSize: 18, fontFamily: "Poppins-SemiBold", fontWeight: "500" }}> Task Assign To</Text>
              <View style={{ marginLeft: 30, paddingVertical: "3%", flexDirection: "row" }}>


                <Image resizeMode={"contain"} style={{ width: 50, height: 50, borderRadius: 100 / 2 }} source={{ uri: taskAssignDetails.staff_image }} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "500", lineHeight: 27, fontFamily: "Poppins-SemiBold", color: "#000", }}>
                    {taskAssignDetails.staff_name}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: "300", lineHeight: 21, fontFamily: "Poppins-Regular", color: "#979797", paddingLeft: "5%" }}>
                    {taskAssignDetails.defaultAccount}
                  </Text>
                </View>
              </View>
              <Text style={{ marginLeft: 30, fontSize: 18, fontFamily: "Poppins-SemiBold", fontWeight: "500" }}> Task Assign To</Text>
              <Text style={{ marginLeft: 30, fontSize: 14, fontFamily: "Poppins-Regular" }} >.  {taskDetails.job_description}</Text>
              <View style={{ backgroundColor: "#2d9cdb", borderRadius: 25, width: 35, height: 35, justifyContent: "center", marginLeft: -20 }}>
                <View style={{ flexDirection: "row", marginLeft: 5 }}>
                  <Icon name='bank' style={{ color: "#fff", alignSelf: "center", marginLeft: 3 }} size={20} />
                  <Text style={{ width: 300, marginLeft: 20, fontSize: 18, fontFamily: "Poppins-Regular" }} >Task Follow-ups</Text>
                </View>


              </View>

              <View style={{ width: "90%", height: 100, marginHorizontal: 30, flexDirection: "row", marginTop: 15 }}>


                <View style={{ height: 50, justifyContent: "center", width: "80%" }}>
                  {/* <Text style={{ backgroundColor: "#fff", width: 96, position: "absolute", top: -12, left: 20, fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: "400" }}>  Comments</Text> */}
                  {/* <Text style={{ marginHorizontal: 20, fontFamily: "Poppins-Regular", fontSize: 14, fontWeight: "400", color: "#000000", opacity: 0.5 }}>Any Comment</Text> */}
                  <TextInput
                    label="Any Comment"
                    mode="outlined"
                    value={data.comment}
                    onChangeText={text => {
                      setComment(text)
                    }
                    }

                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // createThreeButtonAlert()
                    pickImage(setImageObj,
                      setImage, "",
                      '', '', '')
                  }}
                >
                  <Icon name='camera' style={{ color: "#2d9cdb", margin: 10 }} size={25} />
                  <View>
                    {
                      image !== '' ? <Image
                        className="preview-img"
                        style={{ width: 100, height: 100 }}
                        source={
                          {
                            uri: image
                          }
                        }
                      /> : null
                    }
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    display: "flex",
                    paddingLeft: 30
                  }}
                >
                  <Icon name="comment" style={{ color: "#2185d0", }} size={28} />

                  {
                    <View>
                      {/* {console.log("TASK COMMENT: ", taskDetails.comment)} */}
                      {

                        taskDetails.comment.map((element) => {
                          return <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 16, color: "#000000", paddingLeft: 10, textAlign: "left" }}>{element.comment}</Text>;
                        })
                      }
                    </View>

                  }



                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    {/* <Icon
                                        name="pencil"
                                        style={{ color: "#2D9CDB", position: "absolute" }}
                                    // onClick={() => setEditable(true)}
                                    /> */}
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row", display: "flex" }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      display: "flex",
                      marginTop: 15,
                      paddingLeft: 30

                    }}
                  >
                    <Icon name='camera' style={{ color: "#2d9cdb" }} size={25} />

                    <View
                    >


                      {

                        taskDetails.comment_image.map((element) => {
                          // downloadImageUrl = element?.url;
                          return <Image
                            className="preview-img"
                            style={{ width: 100, height: 100 }}
                            source={
                              {
                                uri: element.url
                              }
                            }
                          />

                        })

                      }

                    </View>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                  // props.onPress()
                  {
                    submitCommentAndPhoto(taskId)
                  }
                  }
                  style={{ alignSelf: "center", backgroundColor: "#2D9CDB", width: "30%", height: 40, justifyContent: "center", borderRadius: 5, marginTop: 10 }}>
                  <Text style={{ alignSelf: "center", color: "#fff", fontSize: 14, fontWeight: "500" }}>
                    Submit
                        </Text>
                </TouchableOpacity>
              </View>



            </View>


          </ScrollView>
        </View>
        : openbottomsheet === "Addtask" ?
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,

              height: "100%",
            }}>
            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

            <ScrollView
              style={{
                backgroundColor: '#fff',

              }}>

              <KeyboardAvoidingView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}>



                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <Icon name='bank' style={{ color: "#2d9cdb" }} size={25} />
                  <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>Add Tasks</Text>

                </View>


                <View >
                  {/* <View style={{height:60,borderWidth:2}}>
          <Text style={{backgroundColor:"#fff",width:50,position:"absolute",top:-13,left:30}}>   asdas  </Text>
          <TextInput placeholder="asf" />

       
        </View> */}
                  {/* <Input width={"100%"} icon={"bank"} label={"Start Date"} placeholder={"asdad"}/> */}
                  <TextInput
                    label="Start Date"
                    mode="outlined"
                    editable={false}
                    value={
                      moment(startDateVal).format(dbDateTime)

                    }
                    // onChangeText={text => setStartDateVal(text)}
                    right={<TextInput.Icon name="calendar-multiselect" onPress={() => {
                      showDisplayStartDate(true)
                      setLoader(true)
                    }} />}
                  />

                  {isDisplayStartDate ?

                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startDateVal}
                      mode={displaymode}
                      is24Hour={true}

                      display="default"
                      onChange={(event, selectedValue) => {
                        // setShowCheckInDate(false)
                        showDisplayStartDate(Platform.OS === 'ios');
                        if (displaymode == 'date') {
                          const currentDate = selectedValue || new Date();
                          setStartDateVal(currentDate);
                          setMode('time');
                          showDisplayStartDate(Platform.OS !== 'ios'); // to show the picker again in time mode
                          setLoader(false)
                        } else {
                          const selectedTime = selectedValue || new Date();
                          setStartDateVal(selectedTime);
                          console.log("TIME: ", selectedTime);
                          showDisplayStartDate(Platform.OS === 'ios');
                          setMode('date');
                          setLoader(false)
                        }

                      }} /> : null
                  }

                  {/* <DateTimePicker */}
                  {/* //   testID="dateTimePicker"
                  //   value={startDateVal}
                  //   mode={displaymode}
                  //   is24Hour={true}
                  //   display="default"
                  //   onChange={(event, date) => { */}
                  {/* //     setStartDateVal(date)
                  //   }}
                  // />
                // )} */}

                  <TextInput
                    label="End Date"
                    mode="outlined"
                    editable={false}
                    value={
                      moment(endDateVal).format(dbDateTime)
                    }
                    onChangeText={text => setText(text)}
                    right={<TextInput.Icon name="calendar-multiselect"
                      onPress={() => {
                        showDisplayEndDate(true)
                        setLoader(true)

                      }

                      }
                    />}
                    style={{ marginTop: 20 }}

                  />
                  {
                    isDisplayEndDate ?
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={endDateVal}
                        mode={displaymode}
                        is24Hour={true}

                        display="default"
                        onChange={(event, selectedValue) => {
                          // setShowCheckInDate(false)
                          showDisplayEndDate(Platform.OS === 'ios');
                          if (displaymode == 'date') {
                            const currentDate = selectedValue || new Date();
                            setEndDateVal(currentDate);
                            setMode('time');
                            showDisplayEndDate(Platform.OS !== 'ios'); // to show the picker again in time mode
                            setLoader(false)
                          } else {
                            const selectedTime = selectedValue || new Date();
                            setEndDateVal(selectedTime);
                            console.log("TIME: ", selectedTime);
                            showDisplayEndDate(Platform.OS === 'ios');
                            setMode('date');
                            setLoader(false)
                          }

                        }} /> : null
                  }
                  {isDisplayEndDate && (


                    <DateTimePicker
                      testID="dateTimePicker"
                      value={endDateVal}
                      mode={displaymode}
                      is24Hour={true}
                      display="default"
                      onChange={(e, date) => {
                        setEndDateVal(date)
                      }}
                    />


                  )}
                  {/* <Input width={"100%"} icon={"bank"} label={"Start Date"} placeholder={"asdad"}/> */}
                  <View style={{ marginTop: 20, zIndex: 7 }}>
                    <View style={{

                      flexDirection: "row",

                    }}>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Properties</Text>
                      <TouchableOpacity
                        style={styles.dropDownClearText}
                        onPress={() => {

                          setPropertyVal(null)
                        }}
                      >
                        <Text  >clear</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={
                          propertyList
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={propertyVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          console.log("FEF", item.value);
                          setPropertyVal(item.value)
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}

                      />
                    </View>
                  </View>

                  <View style={{ zIndex: 6, marginTop: 20 }} >
                    <View style={{

                      flexDirection: "row",

                    }}>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Cause of Issue</Text>
                      <TouchableOpacity
                        style={styles.dropDownClearText}
                        onPress={() => {

                          setCauseOfIssueVal(null)
                        }}
                      >
                        <Text  >clear</Text>

                      </TouchableOpacity>
                    </View>
                    <View
                    // style={Platform.OS === 'ios' ? { position: 'relative', zIndex: 1 } : { position: 'relative' }}
                    >

                      <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={causeOfissueList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={causeOfIssueVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          console.log(item.value);
                          setCauseOfIssueVal(item.value)
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}

                      />

                      {/* <DropDownPicker
                      open={openCauseOfissueDropDown}
                      setOpen={setOpenCauseOfIssueDropDown}
                      itemStyle={{
                        justifyContent: 'flex-start'
                      }}
                      items={causeOfissueList}
                      value={causeOfIssueVal}
                      setValue={setCauseOfIssueVal}
                      dropDownStyle={{
                        backgroundColor: "red",
                      }}

                      containerStyle={{
                        height: 40
                      }}

                      onChangeItem={item => console.log(item.label, item.value)}
                    /> */}
                    </View>

                  </View>

                  <View style={{ marginTop: 20, zIndex: 5 }}>
                    <View style={{

                      flexDirection: "row",

                    }}>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Task Type</Text>
                      <TouchableOpacity
                        style={styles.dropDownClearText}
                        onPress={() => {

                          setTaskTypeVal(null)
                        }}
                      >
                        <Text  >clear</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={taskTypeList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={taskTypeVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          console.log(item.value);
                          setTaskTypeVal(item.value)
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}

                      />
                    </View>

                  </View>

                  <View style={{ marginTop: 20, zIndex: 4 }}>
                    <View style={{

                      flexDirection: "row",

                    }}>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Task Source</Text>
                      <TouchableOpacity
                        style={styles.dropDownClearText}
                        onPress={() => {

                          setTaskSourceVal(null)
                        }}
                      >
                        <Text  >clear</Text>
                      </TouchableOpacity>
                    </View>
                    <View>

                      <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={taskSourceList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={taskSourceVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          console.log(item.value);
                          setTaskSourceVal(item.value)
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}

                      />
                      {/* <DropDownPicker
                      items={taskSourceList}
                      defaultIndex={0}
                      open={openTaskSourceDropDown}
                      setOpen={setOpenTaskSourceDropDown}
                      containerStyle={{ height: 40 }}
                      onChangeItem={item => console.log(item.label, item.value)}

                      value={taskSourceVal}
                      setValue={setTaskSourceVal}
                      dropDownStyle={{
                        backgroundColor: "red",
                      }}

                      containerStyle={{
                        height: 40,
                      }}
                    /> */}
                    </View>
                  </View>


                  <View style={{ marginTop: 20, zIndex: 3 }}>
                    <View style={{

                      flexDirection: "row",

                    }}>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Area of Property</Text>
                      <TouchableOpacity
                        style={styles.dropDownClearText}
                        onPress={() => {

                          setAreaOfPropertyVal(null)
                        }}
                      >
                        <Text  >clear</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={areaOfPropertyList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={areaOfPropertyVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          console.log(item.value);
                          setAreaOfPropertyVal(item.value)
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}

                      />


                      {/* <DropDownPicker
                      items={areaOfPropertyList}
                      value={areaOfPropertyVal}
                      setValue={setAreaOfPropertyVal}
                      open={openAreaOfPropertyDropDown}
                      setOpen={setOpenAreaOdPropertyDropDown}
                      containerStyle={{ height: 40 }}
                      onChangeItem={item => console.log(item.label, item.value)}
                    /> */}

                    </View>
                  </View>

                  <View
                    style={{ marginTop: 20, zIndex: 2 }}
                  >
                    <View style={{

                      flexDirection: "row",

                    }}>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Duration</Text>
                      <TouchableOpacity
                        style={styles.dropDownClearText}
                        onPress={() => {

                          setDurationVal(null)
                        }}
                      >
                        <Text  >clear</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={taskDurationList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={durationVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          console.log(item.value);
                          setDurationVal(item.value)
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}

                      />
                      {/* <DropDownPicker
                      open={openDurationDropDown}
                      setOpen={setOpenDurationDropDown}
                      items={taskDurationList}
                      value={durationVal}
                      setValue={setDurationVal}
                      containerStyle={{ height: 40 }}
                      onChangeItem={item => console.log(item.label, item.value)}
                      dropDownStyle={{
                        backgroundColor: "red"
                      }}

                      containerStyle={{
                        height: 40
                      }}


                    /> */}
                    </View>

                  </View>

                  <View style={{ marginTop: 20, zIndex: 1 }}>
                    <View style={{

                      flexDirection: "row",

                    }}>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Status</Text>
                      <TouchableOpacity
                        style={styles.dropDownClearText}
                        onPress={() => {

                          setTaskStatusVal(null)
                        }}
                      >
                        <Text  >clear</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={taskStatuslist}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={taskStatusVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          console.log(item.value);
                          setTaskStatusVal(item.value)
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}

                      />
                    </View>

                  </View>

                  <View style={{ marginTop: 25, borderTopWidth: 1, borderColor: "#C1c1c1", marginBottom: 25, zIndex: 1 }}>
                    <View style={{

                      flexDirection: "row",

                    }}>
                      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Staff</Text>
                      <TouchableOpacity
                        style={styles.dropDownClearText}
                        onPress={() => {

                          setStaffVal(null)
                        }}
                      >
                        <Text  >clear</Text>
                      </TouchableOpacity>
                    </View>
                    <View>

                      <Dropdown
                        style={[styles.dropdown, { borderColor: 'black' }]}
                        // placeholderStyle={styles.placeholderStyle}
                        // selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={
                          staffList
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={staffVal}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          console.log(item.value);
                          setStaffVal(item.value)
                          setstaffName(item.label)
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}

                      />

                      {/*               
              <DropDownPicker
                items={staffList}
                value={staffVal}
                setValue={setStaffVal}
                open={openStaffDropDown}
                setOpen={setOpenStaffDropDown}
                containerStyle={{ height: 40 }}
                onChangeItem={item => console.log(item.label, item.value)}
              /> */}

                    </View>
                  </View>



                  <TextInput
                    label="Description"
                    mode="outlined"
                    value={taskDescription}
                    style={{ marginTop: 30 }}
                    onChangeText={text => setTaskDescription(text)}

                  />
                  <TouchableOpacity onPress={() => {
                    // createThreeButtonAlert()

                    pickImage(setImageObj,
                      setImage, "",
                      '', '', '')
                  }}   >
                    <View style={{ flexDirection: "row", alignSelf: "center", alignItems: "center", width: 120, marginTop: 15, backgroundColor: "#c4c4c44d", paddingHorizontal: 10, paddingVertical: 5 }}>
                      <Icon name='camera' style={{ color: "#000", opacity: 0.54 }} size={24} />
                      <View style={{ justifyContent: "center" }}>
                        <Text>Add Photo</Text>
                      </View>
                    </View>
                  </TouchableOpacity>



                  {image !== '' ? <Image source={{ uri: image }} style={{ width: 100, height: 100, alignSelf: "center" }} /> : null}

                  <TouchableOpacity onPress={() => {
                    if (isUpdate) {
                      updateTaskData()
                    } else {
                      createTask()
                    }


                  }}
                    style={{ backgroundColor: "#2d9cdb", width: 146, height: 46, borderRadius: 16, alignSelf: "center", marginVertical: 20, justifyContent: "center", alignItems: "center" }}
                  >
                    <View >

                      <Text style={{ fontFamily: "Poppins-Regular", color: "#fff", fontSize: 18 }}> Submit </Text>
                    </View>
                  </TouchableOpacity>

                </View>



              </KeyboardAvoidingView>
            </ScrollView>
          </View>
          :
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,

              height: "100%",
            }}
          >

            <View style={{ backgroundColor: "#c4c4c4", height: 10, width: 40, borderRadius: 10, alignSelf: "center", marginTop: 5 }} />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image resizeMode={"contain"} style={{ width: 20, height: 20, }} source={require('../Assets/Filter.png')} />
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 24, color: "#000000", marginLeft: 20, marginTop: -5 }}>Filters</Text>

            </View>
            <View >
              <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 18, color: "#000000" }} >Location</Text>

              <DropDownPicker
                items={[
                  { label: 'English', value: 'en' },
                  { label: 'Deutsch', value: 'de' },
                  { label: 'French', value: 'fr' },
                ]}
                defaultIndex={0}
                containerStyle={{ height: 40 }}
                onChangeItem={item => console.log(item.label, item.value)}
              />


            </View>

          </View>


  );



  const sheetRef = React.useRef(null);
  const renderItem = ({ item }) => (

    <View>
      <TouchableOpacity onPress={() => {
        Setopenbottomsheet('Timeline')
        setbg(true)
        sheetRef.current.snapTo(1)
        isBottomSheet = true
        console.log("ITEM: ", item);
        setTaskDetails(item)
        getAssignToDetails(item.staff_id);
        getTaskGeneratorDetails(item.created_by)
      }} style={styles.item}>
        <View style={{ flexDirection: "row" }}>
          <Image resizeMode={"contain"} style={{ width: 60, height: 60, borderRadius: 120 / 2 }} source={{ uri: item.profile }} />


          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{ fontSize: 24, fontWeight: "400", lineHeight: 36, fontFamily: "Poppins-Regular", color: "#000" }}
            >{item.villaname}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b" }} >{item.Area}</Text>
              <Text style={{ fontSize: 16, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b" }}  > . </Text>
              <Text ellipsizeMode='tail'
                numberOfLines={1} style={{ fontSize: 16, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b", flex: 1 }}  >{item.purpose}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 5 }} >
          <Text

            style={{

              fontSize: 16, fontWeight: "400", lineHeight: 24, fontFamily: "Poppins-Regular", color: "#9b9b9b", alignSelf: "flex-end"
            }} >{item.place}</Text>
          <TouchableOpacity

            onPress={() => {
              isBottomSheet = true;
              Setopenbottomsheet('Addtask')
              setbg(true)
              sheetRef.current.snapTo(1)
              var startDate = new Date(item.start_date_time);
              var endDate = new Date(item.end_date_time);
              // startDate = moment(startDate).format(datePickerFormat)

              // var formattedDate = format(startDate, "MMMM do, yyyy H:mma");
              // console.log(startDate.toISOString());
              setStartDateVal(
                startDate
                // moment(item.start_date_time).format(datePickerFormat)
                // new Date().toLocaleDateString()
              )
              // return;
              setTaskId(item.id)
              setUpdate(true)
              // showDisplayStartDate(true)
              // showDisplayEndDate(true)
              // setStartDateVal(
              //   item.start_date_time.toISOString().split('T')[0]
              //   // moment(item.start_date_time).format(datePickerFormat)
              //   // new Date().toLocaleDateString()
              // )
              setEndDateVal(
                endDate
                // new Date(item.end_date_time).toLocaleDateString()
                // moment(item.end_date_time).format(datePickerFormat)

              )

              console.log(item.property_id);

              setImage(item?.comment_image[0]?.url)
              setPropertyVal(item.property_id)
              setCauseOfIssueVal(item.cause_of_issue_id)
              setTaskTypeVal(item.job_type_id)
              setTaskSourceVal(item.job_source_id)
              setAreaOfPropertyVal(item.area_of_house_id)
              setDurationVal(item.job_duration_id)
              setTaskStatusVal(item.job_status_id)
              setTaskDescription(item.job_description)
            }}
          >
            <Icon name='pencil' style={{ zIndex: 1, position: "relative", color: "#2d9cdb", width: 30, height: 30, borderRadius: 120 / 2, alignSelf: "flex-end" }} size={24} />
          </TouchableOpacity>
          {/* <Text style={{}}>Update</Text> */}
          {/* <Image resizeMode={"contain"} style={{ width: 30, height: 30, borderRadius: 120 / 2, alignSelf: "flex-end" }} source={item.profile} /> */}
        </View>
        <View style={{ backgroundColor: item.color, height: 21, width: 6, position: "absolute", right: 0, top: 40 }}>

        </View>
        {/* <Text >{item.Area}</Text> */}
      </TouchableOpacity>
    </View>
  );

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <EmptyView />
    );
  };


  return (
    <SafeAreaView style={{ height: "92%", backgroundColor: "#fff", marginBottom: 50, }}>
      <Loader show={loader} />
      <View style={bg ? {
        backgroundColor: "#000000bf", opacity: 0.75,
      } : { backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "#2D9cDB", height: 80, justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 20, alignContent: "center", paddingTop: 35 }}>
          <Text style={{ color: "#fff", fontSize: 20, lineHeight: 27, fontWeight: "700", width: 200 }} numberOfLines={1}>Hello, {name}! </Text>
          <TouchableOpacity onPress={() => console.log("asd")}>
            {/* <Icon name='dots-vertical' style={{ color: "#fff" }} size={24} /> */}
          </TouchableOpacity>

        </View>

        {user.permission_list != null ? user.permission_list[0].operation_and_booking_access === "1" ? <Permission /> : null : null
        }
        <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 25, alignContent: "center", paddingTop: 15 }}>
          <Text>Today, {currentDate}</Text>

          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              justifyContent: "center",
              marginRight: 10
            }}
            onPress={() => {

              getTaskList()
            }}
          >
            <Icon name='refresh' style={{ width: 30, height: 30, color: "#2D9cDB" }} size={24} />


          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Setopenbottomsheet('Filter')
            setbg(true)
            sheetRef.current.snapTo(1)
            isBottomSheet = true
          }}>
            <Image resizeMode={"contain"} style={{ width: 20, height: 20 }} source={require('../Assets/Filter.png')} />
          </TouchableOpacity>
        </View>
        {/* { */}
        {/* // } */}
        <FlatList
          style={{
            marginBottom: 150,
          }}
          data={task}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={EmptyListMessage}

          ItemSeparatorComponent={

            (({ highlighted }) => (
              <View
                style={{ height: 1, width: "90%", backgroundColor: "#A6a4a4", alignSelf: "center" }}
              />
            ))
          }
        />

      </View>
      {

        user.permission_list != null ? user.permission_list[0].operation_and_booking_access === "0" || user.permission_list[0].operation_and_booking_access === "2" ? <TouchableOpacity
          onPress={() => {
            isBottomSheet = true
            Setopenbottomsheet('Addtask')
            setbg(true)
            sheetRef.current.snapTo(1)
            isBottomSheet = true
          }}
          style={{ borderWidth: 0.5, borderRadius: 25, height: 50, width: 50, alignSelf: "center", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 25, right: 20, backgroundColor: "#fff" }}>
          <Icon name='plus' style={{ color: "#000" }} size={50} />
        </TouchableOpacity> : null : null
      }
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, "81%", 0]}
        borderRadius={20}
        onOpenEnd={opensheet}
        initialSnap={0}
        onCloseEnd={closesheet}
        isVisible={bg}

        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

export default TaskScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff"
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"

  },
  title: {
    fontSize: 32,
  },

  dropDownClearText: {
    fontFamily: "Poppins-Regular", fontWeight: "500", fontSize: 12, color: "black",
    marginLeft: 'auto',
    borderRadius: 8,
    justifyContent: "center",
    margin: 2

  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  }

});
