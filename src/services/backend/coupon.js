import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setProductActions, setProductCalibers, setProductCategories, setProductConditions, setProductItems, setProductManufacturers, setUserDetail } from "../store/actions";
const { dispatch } = store

export const get_user_coupons = async () => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const uri = `${baseURL + endPoints.coupon.show_coupons}`
    const params = {
        user_id: id,
    }
    console.log('get_user_coupons \n uri: ', uri, '\n params: ', params)
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(uri,params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
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
    }
    return response
};



export const create_coupon = async ({ code, discount_type, discount_amount, minimum_order, expiry_date,  }) => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const uri = `${baseURL + endPoints.coupon.create_coupon}`
    const params = {
        user_id: id,
        code,
        discount_type,
        discount_amount,
        minimum_order,
        expiry_date, //2021-09-20
        
    }
    console.log('create_coupon \n uri: ', uri, '\n params: ', params)
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(uri, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
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
    }
    return response
};

export const edit_coupon = async ({ coupon_id,code, discount_type, discount_amount, minimum_order, expiry_date,  }) => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const uri = `${baseURL + endPoints.coupon.edit_coupon}`
    const params = {
        user_id: id,
        coupon_id,
        code,
        discount_type,
        discount_amount,
        minimum_order,
        expiry_date, //2021-09-20
        
    }
    console.log('edit_coupon \n uri: ', uri, '\n params: ', params)
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(uri, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
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
    }
    return response
};



export const delete_coupon = async ({ coupon_id, }) => {
    let response = null
    const uri = `${baseURL + endPoints.coupon.delete_coupon}`
    const params = {
        coupon_id,
    }
    console.log('delete_coupon \n uri: ', uri, '\n params: ', params)
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(uri, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
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
    }
    return response
};