import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const searchAll = async ({ query, page,type, }) => {
    let response = null
     const state = store.getState()
     const user_id =  state.user.userDetail.id
    const defaultPage=page?page:1
    let params = {
        query,
        type:type?type:'',
        user_id
    }
    const uri=`${baseURL + endPoints.search.search_all}?page=${defaultPage}`
    await axios
        .post(`${baseURL + endPoints.search.search_all}?page=${defaultPage}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('searchAll uri', uri);
            console.log('searchAll Params', params);
            console.log('searchAll Response', tempResponseData);
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


export const getRecentSearchs = async () => {
    let response = null
     const state = store.getState()
     const user_id =state.user.userDetail.id
    let params = {
        user_id
    }
    console.log('getRecentSearchs Params', params);
    await axios
        .post(`${baseURL + endPoints.search.recent_searches}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getRecentSearchs Response', tempResponseData);
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
