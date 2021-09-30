import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setUserDetail } from "../store/actions";
const { dispatch } = store


export const addCreditCard = async ({ user_id, name, card_number, expiry_date, cvc }) => {
    let response = null
    const state = store.getState()
    const userId = user_id ? user_id : state.user.userDetail.id
    let params = {
        user_id: userId,
        name,
        card_number,
        expiry_date,
        cvc
    }
    console.log('addCreditCard Params', params);
    await axios
        .post(`${baseURL + endPoints.creditCard.add_card}`, params)
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
    return response
};