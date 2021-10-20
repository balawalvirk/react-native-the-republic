import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const addFulfillment = async ({ dealer_id, seller_id, buyer_id, seller_dealer_id, buyer_dealer_id, product_id, status }) => {
    let response = null
    //const state = store.getState()
    //const userId = user_id ? user_id : state.user.userDetail.id
    let params = {
        //user_id: userId,
        dealer_id,
        seller_id,
        buyer_id,
        seller_dealer_id,
        buyer_dealer_id,
        product_id,
        status
    }
    console.log('addFulfillment Params', params);
    await axios
        .post(`${baseURL + endPoints.fullfillment.add_fullfillment}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('addFulfillment response', tempResponseData);
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

export const getFulfillments = async (user_id) => {
    let response = null
    const state = store.getState()
    const userId = user_id ? user_id : state.user.userDetail.id
    let params = {
        dealer_id: userId,
    }
    console.log('getFulfillments Params', params);
    await axios
        .post(`${baseURL + endPoints.fullfillment.get_fullfillments}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getFulfillments response', tempResponseData);
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

export const updateFulfillment = async ({fullfillment_id,status}) => {
    let response = null
    //const state = store.getState()
    //const userId = user_id ? user_id : state.user.userDetail.id
    let params = {
        fullfillment_id,
        status
    }
    console.log('updateFulfillment Params', params);
    await axios
        .post(`${baseURL + endPoints.fullfillment.update_fullfillment}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('updateFulfillment response', tempResponseData);
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