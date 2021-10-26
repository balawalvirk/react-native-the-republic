import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const getDealers = async () => {
    let response = null
    await axios
        .get(`${baseURL + endPoints.dealer.get_dealers}`)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getDealers Response', tempResponseData);
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

export const searchDealers = async (query) => {
    let response = null
    let params = {
        query
    }
    console.log('searchDealers Params', params);
    await axios
        .post(`${baseURL + endPoints.dealer.search_dealers}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('searchDealers response', tempResponseData);
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