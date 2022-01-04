import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const getCsrfToken = async () => {
    let response = null
    await axios
        .get(`${endPoints.forgotPassword.sendCsrfToken}`)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getCsrfToken Response', tempResponseData);
            response = tempResponseData
            // if (tempResponseData.success) {
            // } else {
            //     Toasts.error(tempResponseData.message)
            // }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};


export const resetPassword = async ({ email, _token }) => {
    let response = null
    let params = {
        email,
        _token
    }
    const uri=`${endPoints.forgotPassword.resetPassword}`
    console.log('resetPassword Params', params);
    console.log('Uri', uri);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('resetPassword response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                // dispatch(setCreditCards(tempResponseData.data))
            } else {
                // Toasts.error(tempResponseData.message)
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};