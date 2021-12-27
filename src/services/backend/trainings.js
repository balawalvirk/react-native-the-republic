import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setProductActions, setProductCalibers, setProductCategories, setProductConditions, setProductItems, setProductManufacturers, setUserDetail } from "../store/actions";
const { dispatch } = store

export const getAllTranings = async () => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const params = {
        user_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.training.show_trainings}`, params)
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
export const getTrainingTimeSlots = async (training_id) => {
    let response = null
    const params = {
        training_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.training.show_timeslots}`, params)
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
export const sendTrainingRequest = async ({ training_id, timeSlot_id, sub_total,
    tax, transaction_charges, total, stripe_charge_id,coupon_id
}) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const params = {
        user_id,
        training_id,
        timeSlot_id,
        sub_total,
        tax,
        transaction_charges,
        total,
        stripe_charge_id
    }
    coupon_id && [params['coupon_id'] = coupon_id]
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.training.send_training_request}`, params)
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
export const add_traning = async ({ 
    title, description, location,
     duration, charges, spots, status, 
     latitude, longitude,
     start_date,
     end_date,
     start_time,
     end_time, }) => {
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
        latitude,
        longitude,
        start_date,
        end_date,
        start_time,
        end_time,
        status,
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

    const uri = `${baseURL + endPoints.training.add_timeslot}`
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

export const edit_traning = async ({
     training_id, title, description, 
     location, duration,
      charges, spots, 
      status, latitude, longitude,
    start_date,
        end_date,
        start_time,
        end_time, }) => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const uri = `${baseURL + endPoints.training.edit_training}`
    const params = {
        user_id: id,
        training_id,
        title,
        description,
        location,
        duration,
        charges,
        spots,
        status,
        latitude,
        longitude,
        start_date,
        end_date,
        start_time,
        end_time,
    }
    console.log('edit_traning \n uri: ', uri, '\n params: ', params)
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

export const delete_tranings = async ({ training_id }) => {
    let response = null
    const params = {
        training_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.training.delete_training}`, params)
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

export const get_trainer_traning_requests = async () => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const params = {
        user_id: id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.training.trainer_training_requests}`, params)
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

export const accept_traning_request = async ({ training_id, trainingRequest_id, user_id }) => {
    let response = null
    const params = {
        training_id,
        user_id,
        trainingRequest_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.training.accept_training_request}`, params)
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

export const reject_traning_request = async ({ training_id, trainingRequest_id }) => {
    let response = null
    const params = {
        training_id,
        trainingRequest_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.training.reject_training_request}`, params)
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