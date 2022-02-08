import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const getDealers = async ({ sort_by }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const params = {
        user_id,
        sort_by
    }
    const uri = `${baseURL + endPoints.dealer.get_dealers}`
    console.log('getDealers uri: ', uri, '\n params: ', params);
    await axios
        .post(uri, params)
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
export const addFavouriteDealer = async (dealer_id) => {
    let response = null
    const state = store.getState()
    const { userDetail, currentLocation } = state.user
    const user_id = userDetail.id
    const params = {
        user_id,
        dealer_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.dealer.add_favorite_dealer}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('addFavouriteProducts Response', tempResponseData);
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

export const removeFavouriteDealer = async (dealer_id) => {
    let response = null
    const state = store.getState()
    const { userDetail } = state.user
    const user_id = userDetail.id
    const params = {
        user_id,
        dealer_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.dealer.remove_favorite_dealer}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('removeFavouriteDealer Response', tempResponseData);
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

export const handleAddRemoveFavouriteDealer = async (dealer_id) => {
    let response = null
    const state = store.getState()
    const { userDetail } = state.user
    if (HelpingMethods.checkIfDealerFavourite(dealer_id)) {
        const newFavDealers = userDetail.favorite_dealers.filter(favDealerId => favDealerId != dealer_id)
        dispatch(setUserDetail({ ...userDetail, favorite_dealers: newFavDealers }))
        await removeFavouriteDealer(dealer_id).
            then(res => res && [response = res])
    } else {
        const newFavDealers = [...userDetail.favorite_dealers, dealer_id]
        dispatch(setUserDetail({ ...userDetail, favorite_dealers: newFavDealers }))
        await addFavouriteDealer(dealer_id).
            then(res => res && [response = res])
    }
    if (response) {

    }
    return response
};

export const getFavouriteDealers = async () => {
    let response = null
    const state = store.getState()
    const { userDetail } = state.user
    const user_id = userDetail.id
    let params = {
        user_id
    }
    console.log('getFavouriteDealers Params', params);
    await axios
        .post(`${baseURL + endPoints.dealer.show_favorite_dealers}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getFavouriteDealers response', tempResponseData);
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

export const filterDealers = async ({ sort_by, latitude, longitude, distance, local_pickup, selected_services, page }) => {
    let response = null
    const defaultPage = page ? page : 1
    const state = store.getState()
    const { userDetail } = state.user
    //const user_id = userDetail.id
    const user_id = 11
    let params = new FormData()
    params.append('user_id', user_id)
    params.append('sort_by', sort_by)
    latitude && params.append('latitude', latitude)
    longitude && params.append('longitude', longitude)
    distance && params.append('distance', distance)
    params.append('local_pickup', local_pickup)
    if (selected_services?.length) {
        for (const item of selected_services) {
            params.append('service[]', item.id)
        }
    } 
    const uri = `${baseURL + endPoints.dealer.filters_dealers}?page=${defaultPage}`
    console.log('\nfilterDealers \nparams: ', params, '\nuri: ', uri);

    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(uri, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('filterDealers Response', tempResponseData);
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