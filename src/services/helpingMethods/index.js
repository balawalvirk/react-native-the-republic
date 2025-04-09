import moment from 'moment';
import {
  UIManager,
  LayoutAnimation,
  Platform,
  Linking,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import dummyData from '../constants/dummyData';
import NetInfo from '@react-native-community/netinfo';
import store from '../store';
import {setCurrentLocation, setUserDetail} from '../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncConsts, Backend} from '..';
import {Toasts} from '../../components';
//import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import Share from 'react-native-share';
import messaging from '@react-native-firebase/messaging';
import {height} from 'react-native-dimension';
const {dispatch} = store;

export const handleAnimation = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};
export const checkExpiry = () => {
  var d1 = Date.parse('2012-11-01');
  var d2 = Date.parse('2012-11-04');
  var expiryDate = Date.parse('2020-12-18');
  var currentDate = Date.now();
  console.log(expiryDate > currentDate);
  if (expiryDate < currentDate) {
    return true;
  } else {
    return false;
  }
};
export const compareDate = () => {
  var date1 = new Date('December 25, 2017 01:30:00');
  var date2 = new Date('June 18, 2016 02:30:00');
  console.log(date1.getTime() > date2.getTime());
  //best to use .getTime() to compare dates
  //if (date1.getTime() === date2.getTime()) {
  //same date
  //}

  if (date1.getTime() > date2.getTime()) {
    return true;
  } else {
    return false;
  }
};
export const checkIsProductFavourite = productId => {
  let isFavourite = false;
  const state = store.getState();
  const {userDetail} = state.user;
  if (userDetail) {
    const {favorite_products} = userDetail;
    if (favorite_products) {
      if (favorite_products.length) {
        const matchedId = favorite_products.find(id => id === productId);
        if (matchedId) {
          isFavourite = true;
        }
      }
    }
  }
  return isFavourite;
};
export const checkIfServiceAdded = serviceId => {
  console.log('serviceId -->', serviceId);
  let isAdded = false;
  const state = store.getState();
  const {userDetail} = state.user;
  if (userDetail) {
    const {services} = userDetail;
    console.log('services --> ', services);
    if (services) {
      if (services.length) {
        const matchedId = services.find(item => item.id === serviceId);
        console.log('matchedId --> ', matchedId);
        if (matchedId) {
          isAdded = true;
        }
      }
    }
  }
  return isAdded;
};
export const checkIfDealerFavourite = dealerId => {
  let isFavourite = false;
  const state = store.getState();
  const {favorite_dealers} = state.user.userDetail;
  if (favorite_dealers) {
    if (favorite_dealers.length) {
      const matchedId = favorite_dealers.find(id => id === dealerId);
      if (matchedId) {
        isFavourite = true;
      }
    }
  }
  return isFavourite;
};
export const checkIfFollowingUser = userId => {
  let isFollowing = false;
  const state = store.getState();
  const {following_ids} = state.user.userDetail;
  if (following_ids) {
    if (following_ids.length) {
      const matchedId = following_ids.find(id => id === userId);
      if (matchedId) {
        isFollowing = true;
      }
    }
  }
  return isFollowing;
};
export const checkIfFollowRequestSent = userId => {
  let isRequestSent = false;
  const state = store.getState();
  const {follow_request_sent} = state.user.userDetail;
  if (follow_request_sent) {
    if (follow_request_sent.length) {
      const matchedId = follow_request_sent.find(id => id === userId);
      if (matchedId) {
        isRequestSent = true;
      }
    }
  }
  return isRequestSent;
};
export const checkIsPostLiked = postId => {
  let isLiked = false;
  const state = store.getState();
  const reacted_posts = state.user.userDetail.reacted_posts
    ? state.user.userDetail.reacted_posts
    : [];
  if (reacted_posts) {
    if (reacted_posts.length) {
      const matchedId = reacted_posts.find(id => id === postId);
      if (matchedId) {
        isLiked = true;
      }
    }
  }
  return isLiked;
};
export const checkIfGroupJoined = groupId => {
  let isJoined = false;
  const state = store.getState();
  const {joined_groups} = state.user.userDetail;
  if (joined_groups) {
    if (joined_groups.length) {
      const matchedId = joined_groups.find(id => id === groupId);
      if (matchedId) {
        isJoined = true;
      }
    }
  }
  return isJoined;
};
export const checkIfGroupJoinRequested = groupId => {
  let isJoinRequested = false;
  const state = store.getState();
  const {join_requested_groups} = state.user.userDetail;
  if (join_requested_groups) {
    if (join_requested_groups.length) {
      const matchedId = join_requested_groups.find(id => id === groupId);
      if (matchedId) {
        isJoinRequested = true;
      }
    }
  }
  return isJoinRequested;
};
export const getCardType = number => {
  // visa
  var re = new RegExp('^4');
  if (number.match(re) != null) return 'Visa';

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number,
    )
  )
    return 'Mastercard';

  // AMEX
  re = new RegExp('^3[47]');
  if (number.match(re) != null) return 'AMEX';

  // Discover
  re = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
  );
  if (number.match(re) != null) return 'Discover';

  // Diners
  re = new RegExp('^36');
  if (number.match(re) != null) return 'Diners';

  // Diners - Carte Blanche
  re = new RegExp('^30[0-5]');
  if (number.match(re) != null) return 'Diners - Carte Blanche';

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])');
  if (number.match(re) != null) return 'JCB';

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (number.match(re) != null) return 'Visa Electron';

  return '';
};
export const formateTime1 = date => {
  return moment(date).format('hh:mm A');
};
export const formateDate1 = date => {
  return moment(date).format('DD/MM/YYYY');
};
export const formateDateFromNow = date => {
  return moment(date).fromNow();
};
export const formateDate2 = date => {
  //'Fri, 4th June, 2021'
  return moment(date).format('ddd, DD MMMM, YYYY');
};
export const formateDate3 = date => {
  //'Fri, 4th June, 2021'
  return moment(date).format('DD MMMM, YYYY');
};
export const formateDatePost = date => {
  return moment(date).fromNow();
};
export const formateDateComment = date => {
  return moment(date).fromNow();
};
export const formateDateToDate1 = date => {
  return moment(date, 'YYYY-MM-DD').format('DD / MM / YYYY');
};
export const checkInternetConnectivity = async () => {
  let isConnected = false;
  await NetInfo.fetch().then(state => {
    // console.log("Connection type", state.type);
    //console.log("Is connected?", state.isConnected);
    isConnected = state.isConnected;
  });
  return isConnected;
};
export const logout = async () => {
  Alert.alert('Do you want to logout?', '', [
    {
      text: 'Cancel',
      //onPress: () => Alert.alert("Cancel Pressed"),
      //style: "cancel",
    },
    {
      text: 'Logout',
      onPress: () => [
        dispatch(setUserDetail(null)),
        AsyncStorage.clear(),
        // AsyncStorage.removeItem(asyncConsts.user_credentials),
        // AsyncStorage.removeItem(asyncConsts.instagram_credentials),
        // AsyncStorage.removeItem(asyncConsts.user_details)
        //setDownloads(downloads.filter(ite => ite != item))
      ],
      style: 'destructive',
      //style: "cancel",
    },
  ]);
};
export const getPickerData = data => {
  let tempData = [];
  if (data.length) {
    for (const item of data) {
      const tempObj = {
        ...item,
        label: item.name,
        value: item.name,
      };
      tempData.push(tempObj);
    }
  }
  return tempData;
};
export const getHiddenCardNumber = cardNumber => {
  return `**** **** **** ${cardNumber.slice(12, 16)}`;
  // return cardNumber
};
export const dialPhoneNumber = number => {
  console.warn('callNumber ----> ', number);
  let phoneNumber = number;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${number}`;
  } else {
    phoneNumber = `tel:${number}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Toasts.error('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.warn(err));
};
export const smsComposer = number => {
  const url = Platform.OS === 'android' ? `sms:${number}` : `sms:${number}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Toasts.error('Unsupported url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};
export const getMyLocation = () => {
  let latitude = '';
  let longitude = '';
  let userCurrentLocation = null;
  const state = store.getState();
  const {userDetail, currentLocation} = state.user;
  // const { latitude, longitude, distance, address } = userDetail
  currentLocation && [(userCurrentLocation = currentLocation.coords)];
  console.log('currentLocation', currentLocation);
  latitude = userDetail.latitude
    ? userDetail.latitude
    : userCurrentLocation
    ? userCurrentLocation.latitude
    : '';
  longitude = userDetail.longitude
    ? userDetail.longitude
    : userCurrentLocation
    ? userCurrentLocation.longitude
    : '';
  if (latitude && longitude) {
    return {latitude: Number(latitude), longitude: Number(longitude)};
  } else {
    return null;
  }
};
export const requestLocationAccess = async () => {
  if (Platform.OS === 'ios') {
    getUserLocation();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Device current location permission',
          message: 'Allow app to get your current location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getUserLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
export const getRoundedValue = value => {
  return Math.round(value * 10) / 10;
};
export const getTransectionCharges = amount => {
  return getRoundedValue((Number(amount) / 100) * 1.5);
};
export const handleShare = url => {
  console.log('url --> ', url);
  const shareOptions = {
    //title: 'Share via',
    //message: 'some message',
    url: url,
    //social: Share.Social.WHATSAPP,
    //  whatsAppNumber: "9199999999",  // country code + phone number
    //  filename: 'test' , // only for base64 file in Android
  };

  Share.open(shareOptions)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};
export const handleReplacePost = (allPosts, post) => {
  let tempData = allPosts.slice();
  const tempDataObj = tempData.find(item => item.id === post.id);
  if (tempDataObj) {
    const tempDataObjIndex = tempData.indexOf(tempDataObj);
    if (tempDataObjIndex >= 0) {
      tempData[tempDataObjIndex] = post;
    }
  }
  return tempData;
};
export const handleRemovePost = (allPosts, post) => {
  const tempData = allPosts.filter(item => item.id != post.id);
  return tempData;
};

export const getUserLocation = async () => {
  //await Geolocation.requestAuthorization('always')
  Geolocation.getCurrentPosition(
    position => {
      // setTimeout(() => {
      //     console.log("position==>", position);
      // }, 10000);
      console.log('User Location Saved--->', position);
      dispatch(setCurrentLocation(position));
    },
    error => {
      // See error code charts below.
      console.log('See error code charts below', error.code, error.message);
    },
    {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
  );
};
export const requestLocationPermissions = async () => {
  try {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      const locationPermissionCheck = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(
        'requestLocationPermissions locationPermissionCheck: ',
        locationPermissionCheck,
      );
      if (!locationPermissionCheck) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    }
  } catch (error) {
    console.log('requestLocationPermissions error: ', error);
  }
  getUserLocation();
};
//////Cloud messaging Tokens
export const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem(asyncConsts.fcm_token);
  console.log('before fcmToken: ', fcmToken);
  // alert(fcmToken);
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('after fcmToken: ', fcmToken);
      await AsyncStorage.setItem(asyncConsts.fcm_token, fcmToken);
      Backend.saveFcmToken(fcmToken);
    }
  } else {
    Backend.saveFcmToken(fcmToken);
    // await saveData('Users', userId, { Token: fcmToken });
  }
};
export const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  } else {
    console.log('Authorization status: Not grannted');
    //requestPermission();
  }
};
export const handlePushNotificationPermission = async () => {
  await messaging()
    .hasPermission()
    .then(enabled => {
      if (enabled === 1) {
        console.log('Permission granted');
        getFcmToken();
      } else {
        console.log('Request Permission');
        requestPermission();
      }
    });
};

export const checkPushNotificationPermission = async () => {
  let hasPermission = false;
  await messaging()
    .hasPermission()
    .then(enabled => {
      console.log('hasPermission-->', enabled);
      if (enabled === 1) {
        console.log('Permission granted');
        hasPermission = true;
      } else {
        //console.log('Request Permission');
        //requestPermission();
      }
    });
  return hasPermission;
};

export const isEndReached = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = height(5);
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export const handleCameraPermissions = async () => {
  if (Platform.OS == 'android') {
    const permissionAndroid = await PermissionsAndroid.check(
      'android.permission.CAMERA',
    );
    if (permissionAndroid != PermissionsAndroid.RESULTS.granted) {
      const reqPer = await PermissionsAndroid.request(
        'android.permission.CAMERA',
      );
      if (reqPer != 'granted') {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
};
