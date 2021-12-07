import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const getAllNews = async () => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id
    }
    console.log('getAllNews Params', params);
    await axios
        .post(`${baseURL + endPoints.news.get_news}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getAllNews Response', tempResponseData);
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

export const clearAllNews = async () => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
    }
    console.log('clearAllNews Params', params);
    await axios
        .post(`${baseURL + endPoints.news.clear_all_news}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('clearAllNews response', tempResponseData);
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

export const clearSingleNews = async (news_id) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        news_id
    }
    console.log('clearSingleNews Params', params);
    await axios
        .post(`${baseURL + endPoints.news.clear_single_news}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('clearSingleNews response', tempResponseData);
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
