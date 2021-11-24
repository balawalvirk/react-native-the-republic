import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const getAllNotifications = async () => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id
    }
    console.log('getAllNotifications Params', params);
    await axios
        .post(`${baseURL + endPoints.notificaitons.show_notifications}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getAllNotifications Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
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

export const clearAllNotifications = async () => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
    }
    console.log('clearAllNotifications Params', params);
    await axios
        .post(`${baseURL + endPoints.notificaitons.read_all_notifications}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('clearAllNotifications response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
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

export const clearSingleNotifications = async (notification_id) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        notification_id
    }
    console.log('clearSingleNotifications Params', params);
    await axios
        .post(`${baseURL + endPoints.notificaitons.read_single_notification}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('clearSingleNotifications response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
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

export const getNewNotificationsCount = async () => {
    let response = null
    const state = store.getState()
    const {userDetail}=state.user
    const user_id = userDetail.id
    let params = {
        user_id,
    }
    console.log('getNewNotificationsCount Params', params);
    await axios
        .post(`${baseURL + endPoints.notificaitons.get_new_notification}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getNewNotificationsCount response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                dispatch(setUserDetail({...userDetail,newNotificationsCount:tempResponseData.notifications.length}))
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