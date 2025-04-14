import axios from 'axios';
import {endPoints, routes, baseURL, asyncConsts} from '../constants';
import {Toasts} from '../../components';
import store from '../store';
import * as Backend from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as HelpingMethods from '../helpingMethods';
import {setReports, setUserDetail} from '../store/actions';
const {dispatch} = store;

export const login = async (email, password) => {
  let response = null;
  let params = {
    email: email.toLowerCase(),
    password: password,
  };
  console.log('Params', params);
  await axios
    .post(`${baseURL + endPoints.user.login}`, params)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
        const userDetail = tempResponseData.data;
        dispatch(setUserDetail(userDetail));
        HelpingMethods.handlePushNotificationPermission();
        //Saving in local storage
        AsyncStorage.setItem(
          asyncConsts.user_credentials,
          JSON.stringify(params),
        );
        AsyncStorage.setItem(
          asyncConsts.user_details,
          JSON.stringify(userDetail),
        );
        // let fcmToken = await AsyncStorage.getItem(asyncConsts.fcm_token);
        // if (fcmToken) {
        //     Backend.update_profile({ fcmToken })
        // }
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const checkUser = async ({email, user_name}) => {
  let response = null;
  if (email || user_name) {
    let params = {};
    email && [(params['email'] = email.toLowerCase())];
    user_name && [(params['user_name'] = user_name)];
    console.log('checkUser Params', params);
    await axios
      .post(`${baseURL + endPoints.user.check_user}`, params)
      .then(async responseJson => {
        const tempResponseData = responseJson.data;
        console.log('checkUser Response', tempResponseData);
        if (tempResponseData.success) {
            response = tempResponseData;
        } else {
            Toasts.error(tempResponseData.message)
        }
      })
      .catch(error => {
        Toasts.error(error.response.data.message);
        console.error(error);
      });
  }
  return response;
};

export const auto_login = async (email, password) => {
  let response = null;
  let params = {
    email,
    password,
  };
  console.log('Params', params);
  const isInternetAvailable = await HelpingMethods.checkInternetConnectivity();
  if (isInternetAvailable) {
    await axios
      .post(`${baseURL + endPoints.user.login}`, params)
      .then(async responseJson => {
        const tempResponseData = responseJson.data;
        console.log('Response', tempResponseData);
        if (tempResponseData.success) {
          response = tempResponseData;
          const userDetail = tempResponseData.data;
          dispatch(setUserDetail(userDetail));
          //Saving in local storage
          AsyncStorage.setItem(
            asyncConsts.user_details,
            JSON.stringify(userDetail),
          );
          // let fcmToken = await AsyncStorage.getItem(asyncConsts.fcm_token);
          // if (fcmToken) {
          //     Backend.update_profile({ fcmToken })
          // }
        } else {
          Toasts.error(tempResponseData.message);
        }
      })
      .catch(error => {
        Toasts.error(error.response.data.message);
        console.error(error);
      });
  } else {
    const data = AsyncStorage.getItem(asyncConsts.user_details);
    if (data) {
      const dataParsed = JSON.parse(data);
      dispatch(setUserDetail(dataParsed));
    }
  }
  return response;
};

export const user_register = async ({
  email,
  password,
  password_confirmation,
}) => {
  let response = null;
  const uri = `${baseURL + endPoints.user.user_register}`;
  let params = {
    email: email.toLowerCase(),
    password,
    password_confirmation,
  };
  console.log('user_register\nuri', uri, '\nParams', params);
  await axios
    .post(uri, params)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
        const userCredentials = {
          email: params.email,
          password: params.password,
        };
        AsyncStorage.setItem(
          asyncConsts.user_credentials,
          JSON.stringify(userCredentials),
        );
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const complete_profile = async ({
  user_id,
  first_name,
  last_name,
  username,
  gender,
  birthday,
  phone,
  image,
  country_code,
  country_phone_code,
  is_phone_verified,
  is_email_verified,
}) => {
  let response = null;

  const uri = `${baseURL + endPoints.user.complete_profile}`;
  const formDataObject = new FormData();
  formDataObject.append('user_id', user_id);
  formDataObject.append('first_name', first_name);
  formDataObject.append('last_name', last_name);
  formDataObject.append('username', username);
  formDataObject.append('gender', gender);
  formDataObject.append('birthday', birthday);
  formDataObject.append('phone', phone);
  formDataObject.append('country_code', country_code);
  formDataObject.append('country_phone_code', country_phone_code);
  formDataObject.append('user_type', 'basic');
  formDataObject.append('subscription_plan', 'Basic');
  formDataObject.append('is_phone_verified', is_phone_verified);
  formDataObject.append('is_email_verified', is_email_verified);
  image && formDataObject.append('image', image);

  console.log('complete_profile\nuri', uri, '\nparams', formDataObject);
  await axios
    .post(uri, formDataObject)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('complete_profile Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
        AsyncStorage.setItem(
          asyncConsts.user_details,
          JSON.stringify(tempResponseData.data),
        );
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};
export const submit_identity = async ({user_id, attachment}) => {
  let response = null;

  const uri = `${baseURL + endPoints.user.submit_identity}`;
  const formDataObject = new FormData();
  formDataObject.append('user_id', user_id);
  formDataObject.append('attachment', attachment);

  console.log('submit_identity\nuri', uri, '\nparams', formDataObject);

  await axios
    .post(uri, formDataObject)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('submit_identity Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const update_profile = async ({
  user_id,
  first_name,
  last_name,
  username,
  gender,
  birthday,
  phone,
  image,
  country_code,
  country_phone_code,
  fcm_token,
  subscription_id,
  cancel_subscription,
  customer_id,
  payment_id,
  user_type,
  subscription_plan,
  latitude,
  longitude,
  distance,
  default_card_id,
  default_dealer_id,
  address,
  disableUpdateProfile,
  seller_stripe_account_id,
}) => {
  let response = null;
  const state = store.getState();
  const userId = user_id ? user_id : state.user.userDetail.id;
  const uri = `${baseURL + endPoints.user.complete_profile}`;
  const formDataObject = new FormData();
  formDataObject.append('user_id', userId);
  first_name && formDataObject.append('first_name', first_name);
  last_name && formDataObject.append('last_name', last_name);
  username && formDataObject.append('username', username);
  gender && formDataObject.append('gender', gender);
  birthday && formDataObject.append('birthday', birthday);
  phone && formDataObject.append('phone', phone);
  country_code && formDataObject.append('country_code', country_code);
  country_phone_code &&
    formDataObject.append('country_phone_code', country_phone_code);
  fcm_token && formDataObject.append('fcm_token', fcm_token);
  image && formDataObject.append('image', image);
  //user type configs
  user_type && formDataObject.append('user_type', user_type);
  subscription_plan &&
    formDataObject.append('subscription_plan', subscription_plan);
  //stripe configs
  subscription_id && formDataObject.append('subscription_id', subscription_id);
  customer_id && formDataObject.append('customer_id', customer_id);
  payment_id && formDataObject.append('payment_id', payment_id);
  cancel_subscription && formDataObject.append('subscription_id', '');
  //location configs
  address && formDataObject.append('address', address);
  latitude && formDataObject.append('latitude', latitude);
  longitude && formDataObject.append('longitude', longitude);
  distance && formDataObject.append('distance', distance);
  default_card_id && formDataObject.append('default_card_id', default_card_id);
  default_dealer_id &&
    formDataObject.append('default_dealer_id', default_dealer_id);
  seller_stripe_account_id &&
    formDataObject.append('seller_stripe_account_id', seller_stripe_account_id);

  console.log('update_profile\nuri: ', uri, '\nParams: ', formDataObject);
  await axios
    .post(uri, formDataObject)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
        !disableUpdateProfile && dispatch(setUserDetail(tempResponseData.data));
        AsyncStorage.setItem(
          asyncConsts.user_details,
          JSON.stringify(tempResponseData.data),
        );
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const getSellerReports = async () => {
  let response = null;
  const state = store.getState();
  const {id} = state.user.userDetail;
  const uri = `${baseURL + endPoints.order.get_reports}`;
  let params = {
    seller_id: id,
  };
  console.log('getSellerReports \nuri', uri, '\nParams', params);
  await axios
    .post(uri, params)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
        dispatch(
          setReports({
            ...tempResponseData.reports,
            ...tempResponseData.earnings,
          }),
        );
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const submitAppFeedback = async ({feature, comment, images}) => {
  let response = null;
  const state = store.getState();
  const {id} = state.user.userDetail;
  const uri = `${baseURL + endPoints.submit_app_feedback}`;
  const formDataObject = new FormData();
  formDataObject.append('user_id', id);
  formDataObject.append('feature', feature);
  formDataObject.append('comment', comment);
  if (images) {
    if (images.length) {
      for (const item of images) {
        formDataObject.append('image[]', item);
      }
    }
  }
  console.log('submitAppFeedback \nuri', uri, '\nParams', formDataObject);
  await axios
    .post(uri, formDataObject)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const contactUs = async message => {
  let response = null;
  const state = store.getState();
  const {id} = state.user.userDetail;
  const uri = `${baseURL + endPoints.contact_us}`;
  let params = {
    user_id: id,
    message,
  };
  console.log('contactUs \nuri', uri, '\nParams', params);
  await axios
    .post(uri, params)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};
export const updateDeliveryAddress = async ({
  house,
  street,
  address,
  city,
  state,
  zip_code,
  latitude,
  longitude,
}) => {
  let response = null;
  const reduxState = store.getState();
  const {userDetail} = reduxState.user;
  const {id} = userDetail;
  const uri = `${baseURL + endPoints.user.update_delivery_address}`;
  let params = {
    user_id: id,
    address,
    house,
    street,
    city,
    state,
    zip_code,
    latitude,
    longitude,
  };
  console.log('updateDeliveryAddress \nuri', uri, '\nParams', params);
  await axios
    .post(uri, params)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
        const newDeliveryAddress = tempResponseData.data;
        dispatch(
          setUserDetail({...userDetail, delivery_address: newDeliveryAddress}),
        );
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const getUserProfileDetail = async userId => {
  let response = null;
  const state = store.getState();
  const user_id = userId ? userId : state.user.userDetail.id;
  const uri = `${baseURL + endPoints.user.show_user_profile}`;
  let params = {
    user_id,
  };
  console.log('getUserDetail \nuri', uri, '\nParams', params);
  await axios
    .post(uri, params)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('getUserDetail Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const changePassword = async ({
  old_password,
  password,
  password_confirmation,
}) => {
  let response = null;
  const state = store.getState();
  const user_id = state.user.userDetail.id;
  let params = {
    user_id,
    old_password,
    password,
    password_confirmation,
  };
  console.log('changePassword Params', params);
  await axios
    .post(`${baseURL + endPoints.user.change_password}`, params)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('changePassword Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
      } else {
        Toasts.error(tempResponseData.message);
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      console.error(error);
    });
  return response;
};

export const saveFcmToken = async fcm_token => {
  let response = null;
  const state = store.getState();
  const user_id = state.user.userDetail.id;
  let params = {
    user_id,
    fcm_token,
  };
  console.log('saveFcmToken Params', params);
  await axios
    .post(`${baseURL + endPoints.user.save_fcm_token}`, params)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      console.log('saveFcmToken Response', tempResponseData);
      if (tempResponseData.success) {
        response = tempResponseData;
      } else {
        //Toasts.error(tempResponseData.message)
      }
    })
    .catch(error => {
      // Toasts.error(error.response.data.message)
      console.error(error);
    });
  return response;
};

export const uploadFile = async (file, userToken) => {
  let response = null;
  const formData = new FormData();
  formData.append('file', file);
  const uri = `http://34.238.26.44:5000/v1/file/create`;
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJvbmUiLCJzdWIiOiI2NDRhMDg5YmFmMjMyZmM5ZjAwMGRiOTgiLCJpYXQiOjE3NDQ2NTIxNjcsImV4cCI6MTc0NTk0ODE2N30.z6TcGViGWDqcmj1p7RBH2B-ahzEWwihyVXl6TdFPtqw`,
      'Content-Type': 'multipart/form-data',
    },
  };
  __DEV__ &&
    console.log('uploadFile \n\n uri===>', uri, '\n\n params', formData);
  await axios
    .post(uri, formData, config)
    .then(async responseJson => {
      __DEV__ && console.log('uploadFile Response', responseJson.data);
      if (responseJson.data) {
        if (responseJson.data.statusCode === 200) {
          response = responseJson.data;
        } else {
          Toasts.error(responseJson.data.message);
        }
      }
    })
    .catch(error => {
      Toasts.error(error.response.data.message);
      // Toasts.Error(error.response)
      console.error(error);
      __DEV__ && console.log('uploadFile error', error);
    });
  return response;
};
