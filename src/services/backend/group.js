import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
const { dispatch } = store


export const createGroup = async ({ name, description, join_privacy, post_privacy, image }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const params = new FormData()
    params.append('user_id', user_id)
    params.append('name', name)
    params.append('description', description)
    params.append('join_privacy', join_privacy)
    params.append('post_privacy', post_privacy)
    image && params.append('icon', image)
    console.log('createGroup Params', params);
    await axios
        .post(`${baseURL + endPoints.group.create_group}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('createGroup Response', tempResponseData);
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

export const editGroup = async ({ group_id, name, description, join_privacy, post_privacy, image }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const params = new FormData()
    params.append('user_id', user_id)
    params.append('group_id', group_id)
    params.append('name', name)
    params.append('description', description)
    params.append('join_privacy', join_privacy)
    params.append('post_privacy', post_privacy)
    image && params.append('icon', image)
    console.log('editGroup Params', params);
    await axios
        .post(`${baseURL + endPoints.group.edit_group}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('editGroup Response', tempResponseData);
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

export const sendGroupJoinReuqest = async (group_id) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        group_id
    }
    console.log('sendGroupJoinReuqest Params', params);
    await axios
        .post(`${baseURL + endPoints.group.send_join_request}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('sendGroupJoinReuqest response', tempResponseData);
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

export const acceptGroupJoinReuqest = async ({ group_id, groupRequest_id }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        group_id,
        groupRequest_id
    }
    console.log('acceptGroupJoinReuqest Params', params);
    await axios
        .post(`${baseURL + endPoints.group.accept_request}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('acceptGroupJoinReuqest response', tempResponseData);
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

export const declineGroupJoinReuqest = async ({ group_id, groupRequest_id }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        group_id,
        groupRequest_id
    }
    console.log('declineGroupJoinReuqest Params', params);
    await axios
        .post(`${baseURL + endPoints.group.decline_request}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('declineGroupJoinReuqest response', tempResponseData);
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

export const getGroupMembers = async (group_id) => {
    let response = null
    let params = {
        group_id,
    }
    console.log('getGroupMembers Params', params);
    await axios
        .post(`${baseURL + endPoints.group.show_group_members}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getGroupMembers response', tempResponseData);
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

export const RemoveGroupMember = async ({group_id,member_id}) => {
    let response = null
    let params = {
        group_id,
        user_id:member_id
    }
    console.log('RemoveGroupMember Params', params);
    await axios
        .post(`${baseURL + endPoints.group.remove_group_member}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('RemoveGroupMember response', tempResponseData);
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

export const getGroupJoinReuqests = async (group_id) => {
    let response = null
    let params = {
        group_id,
    }
    console.log('getGroupJoinReuqests Params', params);
    await axios
        .post(`${baseURL + endPoints.group.show_members_requests}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getGroupJoinReuqests response', tempResponseData);
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

export const searchGroups = async (query) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        query
    }
    console.log('searchGroups Params', params);
    await axios
        .post(`${baseURL + endPoints.group.search_groups}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('searchGroups response', tempResponseData);
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