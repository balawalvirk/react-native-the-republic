import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setProductActions, setProductCalibers, setProductCategories, setProductConditions, setProductItems, setProductManufacturers, setUserDetail } from "../store/actions";
const { dispatch } = store

export const get_all_tranings = async () => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .get(`${baseURL + endPoints.training.show_training}`)
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

export const get_user_tranings = async () => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const params = {
        user_id: id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.training.user_trainings}`, params)
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

export const add_traning = async ({ title, description, location, duration, charges, spots, status, latitude, longitude }) => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const uri = `${baseURL + endPoints.training.add_training}`
    const params = {
        user_id: id,
        title,
        description,
        location,
        duration,
        charges,
        spots,
        status,
        latitude,
        longitude
    }
    console.log('add_traning \n uri: ', uri, '\n params: ', params)
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

export const add_traning_timeSlots = async ({ training_id, date, start_time, end_time }) => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const uri=`${baseURL + endPoints.training.add_timeslot}`
    const params = {
        training_id,
        date, //2021-09-16
        start_time,//04:00 pm
        end_time,//04:00 pm
    }
    console.log('add_traning_timeSlots \n uri: ', uri, '\n params: ', params)
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

