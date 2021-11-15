import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const sendFollowRequest = async ({ following_id }) => {
    let response = null
    const state = store.getState()
    const { user } = state
    const user_id = user.userDetail.id
    const params = {
        user_id,
        following_id
    }
    await axios
        .post(`${baseURL + endPoints.follow.send_follow_request}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('sendFollowRequest Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                const { follow_request_sent } = tempResponseData.data
                dispatch(setUserDetail({ ...user.userDetail, follow_request_sent }))
                console.log('New User Detail-- > ', { ...user.userDetail, follow_request_sent })
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

export const getFollowRequests = async () => {
    let response = null
    const state = store.getState()
    const { user } = state
    const user_id = user.userDetail.id
    const params = {
        user_id,
    }
    console.log('getFollowRequests Params', params);
    await axios
        .post(`${baseURL + endPoints.follow.show_follow_requests}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getFollowRequests response', tempResponseData);
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

export const acceptFollowRequest = async ({ request_id, follower_id }) => {
    let response = null
    const state = store.getState()
    const { user } = state
    const user_id = user.userDetail.id
    const params = {
        user_id,
        request_id,
        follower_id
    }
    await axios
        .post(`${baseURL + endPoints.follow.accept_follow_request}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('acceptFollowRequest Response', tempResponseData);
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

export const declineFollowRequest = async ({ request_id }) => {
    let response = null
    const state = store.getState()
    const { user } = state
    const user_id = user.userDetail.id
    const params = {
        user_id,
        request_id,
    }
    await axios
        .post(`${baseURL + endPoints.follow.decline_follow_request}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('declineFollowRequest Response', tempResponseData);
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

export const getFollowings = async () => {
    let response = null
    const state = store.getState()
    const { user } = state
    const user_id = user.userDetail.id
    const params = {
        user_id,
    }
    await axios
        .post(`${baseURL + endPoints.follow.show_followers}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getFollowers Response', tempResponseData);
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
export const unfollowFollowing = async ({ following_id }) => {
    let response = null
    const state = store.getState()
    const { user } = state
    const { userDetail } = user
    const user_id = userDetail.id
    const params = {
        user_id,
        following_id
    }
    await axios
        .post(`${baseURL + endPoints.follow.unfollow_following}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('unfollowUser Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                const { following_ids } = tempResponseData.data
                dispatch(setUserDetail({ ...userDetail, following_ids }))
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

export const handleFollowUnfollowFollowing = async (userId) => {
    let response = null
    if (!HelpingMethods.checkIfFollowRequestSent(userId)) {
        if (!HelpingMethods.checkIfFollowingUser(userId)) {
            await sendFollowRequest({ following_id: userId })
        } else {
            await unfollowFollowing({ following_id: userId })
        }
    } else {
        Toasts.warn('Follow request already send')
    }
    return response
}