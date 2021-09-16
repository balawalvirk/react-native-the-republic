import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setUserDetail } from "../store/actions";
const { dispatch } = store


export const login = async (email, password) => {
    let response = null
    let params = {
        email: email.toLowerCase(),
        password: password
    }
    console.log('Params', params);
    await axios
        .post(`${baseURL + endPoints.user.login}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                const userDetail = tempResponseData.user
                dispatch(setUserDetail(userDetail))
                //Saving in local storage
                AsyncStorage.setItem(asyncConts.user_credentials, JSON.stringify(params))
                AsyncStorage.setItem(asyncConts.user_details, JSON.stringify(userDetail))
                // let fcmToken = await AsyncStorage.getItem(asyncConts.fcm_token);
                // if (fcmToken) {
                //     Backend.update_profile({ fcmToken })
                // }
            } else {
                Toasts.error(tempResponseData.message)
            }

        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const auto_login = async (email, password) => {
    let response = null
    let params = {
        email,
        password
    }
    console.log('Params', params);
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.user.login}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
                if (tempResponseData.success) {
                    response = tempResponseData
                    const userDetail = tempResponseData.user
                    dispatch(setUserDetail(userDetail))
                    //Saving in local storage
                    AsyncStorage.setItem(asyncConts.user_details, JSON.stringify(userDetail))
                    // let fcmToken = await AsyncStorage.getItem(asyncConts.fcm_token);
                    // if (fcmToken) {
                    //     Backend.update_profile({ fcmToken })
                    // }
                } else {
                    Toasts.error(tempResponseData.message)
                }

            })
            .catch(error => {
                Toasts.error(error.response.data.message)
                console.error(error);
            });
    } else {
        const data = AsyncStorage.getItem(asyncConts.user_details)
        if (data) {
            const dataParsed = JSON.parse(data)
            dispatch(setUserDetail(dataParsed))
        }
    }
    return response
};

export const user_register = async ({ email, password, password_confirmation }) => {
    let response = null
    const uri=`${baseURL + endPoints.user.user_register}`
    let params = {
        email: email.toLowerCase(),
        password,
        password_confirmation
    }
    console.log('user_register\nuri', uri,'\nParams', params);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                const userCredentials={
                    email:params.email,
                    password:params.password,
                }
                AsyncStorage.setItem(asyncConts.user_credentials, JSON.stringify(userCredentials))
            }else {
                Toasts.error(tempResponseData.message)
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const complete_profile = async ({ user_id, first_name, last_name, username, gender, birthday, phone, image, country_code, country_phone_code }) => {
    let response = null

    const uri = `${baseURL + endPoints.user.complete_profile}`
    const formDataObject = new FormData()
    formDataObject.append("user_id", user_id)
    formDataObject.append("first_name", first_name)
    formDataObject.append("last_name", last_name)
    formDataObject.append("username", username)
    formDataObject.append("gender", gender)
    formDataObject.append("birthday", birthday)
    formDataObject.append("phone", phone)
    formDataObject.append("image", image)
    formDataObject.append("country_code", country_code)
    formDataObject.append("country_phone_code", country_phone_code)
    console.log('complete_profile\nuri', uri, '\nparams', formDataObject);
    await axios
        .post(uri, formDataObject)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('complete_profile Response', tempResponseData);
            if (tempResponseData.success) {
                response = responseJson.data
            }else {
                Toasts.error(tempResponseData.message)
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};
export const submit_identity = async ({ user_id, attachment }) => {
    let response = null

    const uri=`${baseURL + endPoints.user.submit_identity}`
    const formDataObject = new FormData()
    formDataObject.append("user_id", user_id)
    formDataObject.append("attachment", attachment)
   
    console.log('submit_identity\nuri', uri, '\nparams', formDataObject);

    await axios
        .post(uri, formDataObject)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('submit_identity Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
            }else {
                Toasts.error(tempResponseData.message)
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};
export const update_profile = async ({ first_name, last_name, username, gender, birthday, phone, image, country_code, country_phone_code, fcmToken }) => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail
    let params = {
        user_id: id
    }
    first_name && [params['first_name'] = first_name]
    last_name && [params['last_name'] = last_name]
    username && [params['username'] = username]
    gender && [params['gender'] = gender]
    birthday && [params['birthday'] = birthday]
    phone && [params['phone'] = phone]
    image && [params['image'] = image]
    country_code && [params['country_code'] = country_code]
    country_phone_code && [params['country_phone_code'] = country_phone_code]
    fcmToken && [params['fcmToken'] = fcmToken]
    console.log('Params', params);
    await axios
        .put(`${baseURL + endPoints.user.update_profile}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('Response', tempResponseData);
            if (tempResponseData.success) {
                response = responseJson.data
                dispatch(setUserDetail(response.user))
                AsyncStorage.setItem(asyncConts.user_details, JSON.stringify(response.user))
            }else {
                Toasts.error(tempResponseData.message)
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};