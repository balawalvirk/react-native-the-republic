import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const withdrawAmount = async ({ user_id, amount, transfer_type }) => {
    let response = null
    const state = store.getState()
    const userId = user_id ? user_id : state.user.userDetail.id
    let params = {
        user_id: userId,
        amount,
        transfer_type
    }
    const uri = `${baseURL + endPoints.withdraw.withdraw_amount}`
    console.log('withdrawAmount Params', params, '\nUri', uri);
    await axios
        .post(`${baseURL + endPoints.withdraw.withdraw_amount}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('withdrawAmount Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
            } else {
                Toasts.error(tempResponseData.message)
            }

        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error('withdrawAmount Error', error);
        });
    return response
};

export const withdrawHistory = async (user_id) => {
    let response = null
    const state = store.getState()
    const userId = user_id ? user_id : state.user.userDetail.id
    let params = {
        user_id: userId,
    }
    console.log('withdrawHistory Params', params);
    await axios
        .post(`${baseURL + endPoints.withdraw.withdraw_history}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('withdrawHistory response', tempResponseData);
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