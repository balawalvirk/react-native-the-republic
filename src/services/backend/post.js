import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
import { postTypes } from '..'
const { dispatch } = store


export const addPost = async ({ title, images, tags, group_id, product_id, }) => {
    let response = null
    const state = store.getState()
    const userId = state.user.userDetail.id
    const postType = group_id && product_id ? postTypes.groupProduct :
        group_id ? postTypes.group :
            product_id ? postTypes.product : postTypes.post
    const formDataObject = new FormData()
    formDataObject.append('user_id', userId)
    formDataObject.append('title', title)
    if (images) {
        if (images.length) {
            for (const item of images) {
                formDataObject.append('image[]', item)
            }
        }
    }
    if (tags) {
        if (tags.length) {
            for (const item of tags) {
                formDataObject.append('tags[]', item)
            }
        }
    }
    group_id && formDataObject.append('group_id', group_id)
    product_id && formDataObject.append('product_id', product_id)
    formDataObject.append('post_type', postType)

    console.log('addPost Params', formDataObject);
    await axios
        .post(`${baseURL + endPoints.post.add_post}`, formDataObject)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('addPost Response', tempResponseData);
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

export const reportPost = async ({ post_id, comment }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        post_id,
    }
    comment && [params['comment'] = comment]
    console.log('reportPost Params', params);
    await axios
        .post(`${baseURL + endPoints.post.report_post}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('reportPost response', tempResponseData);
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

export const deletePost = async (post_id) => {
    let response = null
    //const state = store.getState()
    //const user_id = state.user.userDetail.id
    let params = {
        post_id,
    }
    console.log('deletePost Params', params);
    await axios
        .post(`${baseURL + endPoints.post.delete_post}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('deletePost response', tempResponseData);
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
export const getPostDetail = async (post_id) => {
    let response = null
    // const state = store.getState()
    // const user_id = state.user.userDetail.id
    let params = {
        post_id,
    }
    console.log('getPostDetail Params', params);
    await axios
        .post(`${baseURL + endPoints.post.single_post}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getPostDetail response', tempResponseData);
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

export const getAllPosts = async (page) => {
    let response = null
    const defaultPage = page ? page : 1
    await axios
        .get(`${baseURL + endPoints.post.show_posts}?page=${defaultPage}`)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getAllPosts response', tempResponseData);
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

export const getUserPosts = async (data) => {
    const userId = data ? data.userId ? data.userId : null : null
    const page = data ? data.page ? data.page : null : null
    let response = null
    const state = store.getState()
    const user_id = userId ? userId : state.user.userDetail.id
    const defaultPage = page ? page : 1
    const params = {
        user_id
    }
    await axios
        .post(`${baseURL + endPoints.post.get_user_posts}?page=${defaultPage}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getUserPosts response', tempResponseData);
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

export const getSubscribedPosts = async (page) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const defaultPage = page ? page : 1
    const params = {
        user_id
    }
    await axios
        .post(`${baseURL + endPoints.post.get_subscribed_posts}?page=${defaultPage}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getSubscribedPosts response', tempResponseData);
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
export const getFollowingsPosts = async (page) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const defaultPage = page ? page : 1
    const params = {
        user_id
    }
    await axios
        .post(`${baseURL + endPoints.post.get_following_posts}?page=${defaultPage}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getFollowingsPosts response', tempResponseData);
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
export const getJoinedGroupsPosts = async (page) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const defaultPage = page ? page : 1
    const params = {
        user_id
    }
    await axios
        .post(`${baseURL + endPoints.post.get_joined_groups_posts}?page=${defaultPage}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getJoinedGroupsPosts response', tempResponseData);
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
export const getGroupPosts = async ({ group_id, page }) => {
    let response = null
    const defaultPage = page ? page : 1
    const params = {
        group_id
    }
    await axios
        .post(`${baseURL + endPoints.post.get_group_posts}?page=${defaultPage}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getGroupPosts response', tempResponseData);
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

export const addReactionToPost = async ({ post_id, reaction }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        post_id,
        reaction
    }
    console.log('addReactionToPost Params', params);
    await axios
        .post(`${baseURL + endPoints.post.add_reaction}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('addReactionToPost response', tempResponseData);
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

export const deleteReactionOfPost = async (reaction_id) => {
    let response = null
      const state = store.getState()
      const user_id = state.user.userDetail.id
    let params = {
        user_id,
        reaction_id
    }
    console.log('deleteReactionOfPost Params', params);
    await axios
        .post(`${baseURL + endPoints.post.delete_reaction}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('deleteReactionOfPost response', tempResponseData);
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

export const getReactionsOfPost = async (post_id) => {
    let response = null
    //  const state = store.getState()
    //  const user_id = state.user.userDetail.id
    let params = {
        post_id
    }
    console.log('getReactionsOfPost Params', params);
    await axios
        .post(`${baseURL + endPoints.post.show_reactions}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getReactionsOfPost response', tempResponseData);
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

export const addCommentToPost = async ({ post_id, comment, image }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    const formDataObject = new FormData()
    formDataObject.append('user_id', user_id)
    formDataObject.append('post_id', post_id)
    comment && formDataObject.append('comment', comment)
    image && formDataObject.append('image', image)

    console.log('addCommentToPost Params', formDataObject);
    await axios
        .post(`${baseURL + endPoints.post.add_comment}`, formDataObject)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('addCommentToPost response', tempResponseData);
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

export const getCommentsOfPost = async (post_id) => {
    let response = null
    //  const state = store.getState()
    //  const user_id = state.user.userDetail.id
    let params = {
        post_id
    }
    console.log('getCommentsOfPost Params', params);
    await axios
        .post(`${baseURL + endPoints.post.show_comments}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('getCommentsOfPost response', tempResponseData);
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

export const editCommentOfPost = async ({ comment_id, comment, image }) => {
    let response = null
    // const state = store.getState()
    // const user_id = state.user.userDetail.id
    const formDataObject = new FormData()
    formDataObject.append('comment_id', comment_id)
    comment && formDataObject.append('comment', comment)
    image && formDataObject.append('image', image)

    console.log('editCommentOfPost Params', formDataObject);
    await axios
        .post(`${baseURL + endPoints.post.edit_comment}`, formDataObject)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('editCommentOfPost response', tempResponseData);
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

export const deleteCommentOfPost = async (comment_id) => {
    let response = null
    // const state = store.getState()
    // const user_id = state.user.userDetail.id
    let params = {
        comment_id
    }
    console.log('deleteCommentOfPost Params', params);
    await axios
        .post(`${baseURL + endPoints.post.delete_comment}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('deleteCommentOfPost response', tempResponseData);
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

export const reportCommentOfPost = async ({ comment_id, comment }) => {
    let response = null
    const state = store.getState()
    const user_id = state.user.userDetail.id
    let params = {
        user_id,
        comment_id,
    }
    comment && [params['comment'] = comment]
    console.log('reportCommentOfPost Params', params);
    await axios
        .post(`${baseURL + endPoints.post.report_comment}`, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('reportCommentOfPost response', tempResponseData);
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