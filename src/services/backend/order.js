import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store

export const createOrder = async ({
    product_id, sub_total, private_sale, house, street, city, state, zip_code,
    seller_id, tax, transaction_charges, total, seller_dealer_id, buyer_dealer_id,
    seller_fullfillment_id, buyer_fullfillment_id, address }) => {
    let response = null
    const reduxState = store.getState()
    const userId = reduxState.user.userDetail.id
    let params = {
        user_id: userId,
        product_id,
        sub_total,
        private_sale,
        house,
        street,
        city,
        state,
        zip_code,
        seller_id,
        tax,
        transaction_charges,
        total,
        seller_dealer_id,
        buyer_dealer_id,
        seller_fullfillment_id,
        buyer_fullfillment_id,
        address
    }
    console.log('createOrder Params', params);
    await axios
        .post(`${baseURL + endPoints.order.create_order}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('createOrder Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                //tempResponseData.orders
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

export const updateOrder = async ({
    order_id, product_id, sub_total, private_sale, house, street, city, state, zip_code,
    seller_id, tax, transaction_charges, total, seller_dealer_id, buyer_dealer_id,
    seller_fullfillment_id, buyer_fullfillment_id, address }) => {
    let response = null
    //const state = store.getState()
    //const userId = state.user.userDetail.id
    let params = {
        //user_id: userId,
        order_id,

    }
    product_id && [params['product_id'] = product_id]
    sub_total && [params['sub_total'] = sub_total]
    private_sale && [params['private_sale'] = private_sale]
    house && [params['house'] = house]
    street && [params['street'] = street]
    city && [params['city'] = city]
    state && [params['state'] = state]
    zip_code && [params['zip_code'] = zip_code]
    seller_id && [params['seller_id'] = seller_id]
    tax && [params['tax'] = tax]
    transaction_charges && [params['transaction_charges'] = transaction_charges]
    total && [params['total'] = total]
    seller_dealer_id && [params['seller_dealer_id'] = seller_dealer_id]
    buyer_dealer_id && [params['buyer_dealer_id'] = buyer_dealer_id]
    seller_fullfillment_id && [params['seller_fullfillment_id'] = seller_fullfillment_id]
    buyer_fullfillment_id && [params['buyer_fullfillment_id'] = buyer_fullfillment_id]
    address && [params['address'] = address]
    console.log('updateOrder Params', params);
    await axios
        .post(`${baseURL + endPoints.order.create_order}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('updateOrder Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                //tempResponseData.orders
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
export const getOrders = async (user_id) => {
    let response = null
    const state = store.getState()
    const userId = user_id ? user_id : state.user.userDetail.id
    let params = {
        seller_id: userId,
    }
    console.log('getOrders Params', params);
    await axios
        .post(`${baseURL + endPoints.order.get_orders}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getOrders Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                //tempResponseData.orders
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

export const updateOrderStatus = async ({order_id,status}) => {
    let response = null
    //const state = store.getState()
   // const userId = user_id ? user_id : state.user.userDetail.id
    let params = {
        order_id,
        status
    }
    console.log('updateOrderStatus Params', params);
    await axios
        .post(`${baseURL + endPoints.order.update_order_status}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('updateOrderStatus response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                dispatch(setCreditCards(tempResponseData.cards))
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