import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const getAllServices = async () => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
    }
    console.log('getAllServices Params', params);
    await axios
        .post(`${baseURL + endPoints.services.get_services}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getAllServices response', tempResponseData);
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

export const addService = async (service_id) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        service_id
    }
    console.log('addService Params', params);
    await axios
        .post(`${baseURL + endPoints.services.add_service}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('addService response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                // dispatch(setUserDetail({
                //     ...state.user.userDetail,
                //     services: tempResponseData.data.services
                // }))
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

export const removeService = async (service_id) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        service_id
    }
    console.log('removeService Params', params);
    await axios
        .post(`${baseURL + endPoints.services.remove_service}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('removeService response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                // dispatch(setUserDetail({
                //     ...state.user.userDetail,
                //     services: tempResponseData.data.services
                // }))
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

export const handleAddRemoveService = async (service_id) => {
    let response = null
    const state = store.getState()
    const { userDetail } = state.user
    const { services } = userDetail
    const isServiceAdded = HelpingMethods.checkIfServiceAdded(service_id)
    const newServices = isServiceAdded ? services.filter(item => item.id != service_id) : [...services, { id: service_id }]
    dispatch(setUserDetail({
        ...userDetail,
        services: newServices
    }))
    if (isServiceAdded) {
        await removeService(service_id).then((res) => {
            if (res) response = res
        })
    } else {
        await addService(service_id).then((res) => {
            if (res) response = res
        })
    }
    return response
}