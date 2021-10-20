import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const addBankAccount = async ({ bank_name, account_no }) => {
    let response = null
    const state = store.getState()
    const userId = state.user.userDetail.id
    let params = {
        user_id: userId,
        bank_name,
        account_no
    }
    console.log('addBankAccount Params', params);
    await axios
        .post(`${baseURL + endPoints.bank.add_bank_account}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('addBankAccount Response', tempResponseData);
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

export const getBankAccounts = async () => {
    let response = null
    const state = store.getState()
    const user_id =  state.user.userDetail.id
    let params = {
        user_id
    }
    console.log('getBankAccounts Params', params);
    await axios
        .post(`${baseURL + endPoints.bank.get_bank_accounts}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getBankAccounts response', tempResponseData);
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


export const getBanks = async () => {
    let response = null
    const state = store.getState()
    const user_id =  state.user.userDetail.id
    let params = {
        user_id
    }
    console.log('getBanks Params', params);
    await axios
        .get(`${baseURL + endPoints.bank.get_banks}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getBanks response', tempResponseData);
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