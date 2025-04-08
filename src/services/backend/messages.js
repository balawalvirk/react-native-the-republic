import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const getAllConversations = async () => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
    }
    console.log('getAllConversations Params', params);
    await axios
        .post(`${baseURL + endPoints.chat.show_conversations}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getAllConversations Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
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

export const sendChatMessage = async ({ receiver_id, message, image, product_id }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id

    const params = new FormData()
    params.append('sender_id', user_id)
    params.append('receiver_id', receiver_id)
    params.append('message', message)
    params.append('product_id', product_id?product_id:'')
    image && params.append('image', image)
    //product_id && params.append('product_id', product_id)
    console.log('sendMessage Params', params);
    await axios
        .post(`${baseURL + endPoints.chat.send_message}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('sendMessage response', tempResponseData);
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

export const getChatMessages = async (receiver_id) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const params = {
        user_id,
        receiver_id
    }
    console.log('getChat Params', params);
    await axios
        .post(`${baseURL + endPoints.chat.show_messages}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getChat response', tempResponseData);
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