import axios from "axios"
import { endPoints, routes, baseURL, asyncConts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpingMethods from "../helpingMethods";
import { setProductActions, setProductCalibers, setProductCategories, setProductConditions, setProductItems, setProductManufacturers, setUserDetail } from "../store/actions";
const { dispatch } = store

export const add_Product = async ({
    title, item, type, manufacturer, caliber,
    action, condition, description, city, statee,
    zip_code, price, discounted_price, latitude,
    longitude, image, address
}) => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const uri = `${baseURL + endPoints.product.add_product}`
    const formDataObject = new FormData()
    formDataObject.append("user_id", id)
    formDataObject.append("title", title)
    formDataObject.append("item", item)
    formDataObject.append("type", type)
    formDataObject.append("manufacturer", manufacturer)
    formDataObject.append("caliber", caliber)
    formDataObject.append("action", action)
    formDataObject.append("condition", condition)
    formDataObject.append("description", description)
    formDataObject.append("address", address)
    formDataObject.append("city", city)
    formDataObject.append("state", statee)
    formDataObject.append("zip_code", zip_code)
    formDataObject.append("price", price)
    latitude && formDataObject.append("latitude", latitude)
    longitude && formDataObject.append("longitude", longitude)
    discounted_price && formDataObject.append("discounted_price", discounted_price)
    image && formDataObject.append("image[]", image)

    console.log('add_Product\nuri', uri, '\nparams', formDataObject);
    await axios
        .post(uri, formDataObject)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('response', tempResponseData);
            if (tempResponseData.success) {
                response = responseJson.data
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

export const get_user_products = async (userId) => {
    let response = null
    const state = store.getState()
    const user_id = userId ? userId : state.user.userDetail.id
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.user_products}`, { user_id })
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

export const edit_Product = async ({
    product_id, title, item, type, manufacturer,
    caliber, action, condition, description, city,
    statee, zip_code, price, discounted_price,
    latitude, longitude, image, address
}) => {
    let response = null
    const state = store.getState()
    const { id } = state.user.userDetail

    const uri = `${baseURL + endPoints.product.edit_product}`
    const formDataObject = new FormData()
    formDataObject.append("user_id", id)
    formDataObject.append("product_id", product_id)
    formDataObject.append("title", title)
    formDataObject.append("item", item)
    formDataObject.append("type", type)
    formDataObject.append("manufacturer", manufacturer)
    formDataObject.append("caliber", caliber)
    formDataObject.append("action", action)
    formDataObject.append("condition", condition)
    formDataObject.append("description", description)
    formDataObject.append("address", address)
    formDataObject.append("city", city)
    formDataObject.append("state", statee)
    formDataObject.append("zip_code", zip_code)
    formDataObject.append("price", price)
    latitude && formDataObject.append("latitude", latitude)
    longitude && formDataObject.append("longitude", longitude)
    discounted_price && formDataObject.append("discounted_price", discounted_price)
    image && formDataObject.append("image[]", image)

    console.log('edit_Product\nuri', uri, '\nparams', formDataObject);
    await axios
        .post(uri, formDataObject)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('response', tempResponseData);
            if (tempResponseData.success) {
                response = responseJson.data
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

export const delete_product = async (product_id) => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.delete_product}`, { product_id })
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
export const getProductDetail = async (product_id) => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.get_product_detail}`, { product_id })
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
export const getAllProducts = async (page) => {
    let response = null
    const defaultPage = page ? page : 1
    // const state = store.getState()
    // const { id } = state.user.userDetail
    const params = {
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.get_all_products}?page=${defaultPage}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getAllProducts Response', tempResponseData);
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
export const getMapProducts = async () => {
    let response = null
    // const state = store.getState()
    // const { id } = state.user.userDetail
    const params = {
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.get_map_products}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getMapProducts Response', tempResponseData);
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

export const getFeaturedProducts = async (page) => {
    let response = null
    const defaultPage = page ? page : 1
    const state = store.getState()
    const { id } = state.user.userDetail
    const params = {
        user_id: id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.featured_products}?page=${defaultPage}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getFeaturedProducts Response', tempResponseData);
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

export const getPoluparProducts = async (page) => {
    let response = null
    const defaultPage = page ? page : 1
    const state = store.getState()
    const { id } = state.user.userDetail
    const params = {
        user_id: id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.popular_products}?page=${defaultPage}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getPoluparProducts Response', tempResponseData);
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

export const getNearByProducts = async (page) => {
    let response = null
    const defaultPage = page ? page : 1
    const state = store.getState()
    const { userDetail, currentLocation } = state.user
    const { coords } = currentLocation
    const latitude = userDetail.latitude ? userDetail.latitude : coords ? coords.latitude : ''
    const longitude = userDetail.longitude ? userDetail.longitude : coords ? coords.longitude : ''
    const { id } = userDetail
    const params = {
        user_id: id,
        city: 'Daska',
        latitude,
        longitude,
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.nearby_products}?page=${defaultPage}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getNearByProducts Response', tempResponseData);
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

export const getTopRatedProducts = async (page) => {
    let response = null
    const defaultPage = page ? page : 1
    const state = store.getState()
    const { id } = state.user.userDetail
    const params = {
        user_id: id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.top_rated_products}?page=${defaultPage}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getTopRatedProducts Response', tempResponseData);
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
export const getRelatedProducts = async ({ product_id, page }) => {
    let response = null
    const defaultPage = page ? page : 1
    const state = store.getState()
    const { userDetail, currentLocation } = state.user
    const { id } = userDetail
    const params = {
        product_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.related_products}?page=${defaultPage}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getNearByProducts Response', tempResponseData);
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
export const get_product_items = async () => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .get(`${baseURL + endPoints.product.show_items}`)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
                if (tempResponseData.success) {
                    response = tempResponseData
                    let tempData = HelpingMethods.getPickerData(tempResponseData.data)
                    dispatch(setProductItems(tempData))
                    //Saving in local storage
                    AsyncStorage.setItem(asyncConts.product_items, JSON.stringify(tempData))
                } else {
                    Toasts.error(tempResponseData.message)
                }

            })
            .catch(error => {
                Toasts.error(error.response.data.message)
                console.error(error);
            });
    } else {
        const data = AsyncStorage.getItem(asyncConts.product_items)
        if (data) {
            const dataParsed = JSON.parse(data)
            dispatch(setProductItems(dataParsed))
        }
    }
    return response
};

export const get_product_categories = async () => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .get(`${baseURL + endPoints.product.show_categories}`)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
                if (tempResponseData.success) {
                    response = tempResponseData
                    const tempData = HelpingMethods.getPickerData(tempResponseData.data)
                    dispatch(setProductCategories(tempData))
                    //Saving in local storage
                    AsyncStorage.setItem(asyncConts.product_categories, JSON.stringify(tempData))
                } else {
                    Toasts.error(tempResponseData.message)
                }

            })
            .catch(error => {
                Toasts.error(error.response.data.message)
                console.error(error);
            });
    } else {
        const data = AsyncStorage.getItem(asyncConts.product_categories)
        if (data) {
            const dataParsed = JSON.parse(data)
            dispatch(setProductCategories(dataParsed))
        }
    }
    return response
};

export const get_product_manufacturers = async () => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .get(`${baseURL + endPoints.product.show_manufacturers}`)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
                if (tempResponseData.success) {
                    response = tempResponseData
                    const tempData = HelpingMethods.getPickerData(tempResponseData.data)
                    dispatch(setProductManufacturers(tempData))
                    //Saving in local storage
                    AsyncStorage.setItem(asyncConts.product_manufacturers, JSON.stringify(tempData))
                } else {
                    Toasts.error(tempResponseData.message)
                }

            })
            .catch(error => {
                Toasts.error(error.response.data.message)
                console.error(error);
            });
    } else {
        const data = AsyncStorage.getItem(asyncConts.product_manufacturers)
        if (data) {
            const dataParsed = JSON.parse(data)
            dispatch(setProductManufacturers(dataParsed))
        }
    }
    return response
};

export const get_product_calibers = async () => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .get(`${baseURL + endPoints.product.show_calibers}`)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
                if (tempResponseData.success) {
                    response = tempResponseData
                    const tempData = HelpingMethods.getPickerData(tempResponseData.data)
                    dispatch(setProductCalibers(tempData))
                    //Saving in local storage
                    AsyncStorage.setItem(asyncConts.product_calibers, JSON.stringify(tempData))
                } else {
                    Toasts.error(tempResponseData.message)
                }

            })
            .catch(error => {
                Toasts.error(error.response.data.message)
                console.error(error);
            });
    } else {
        const data = AsyncStorage.getItem(asyncConts.product_calibers)
        if (data) {
            const dataParsed = JSON.parse(data)
            dispatch(setProductCalibers(dataParsed))
        }
    }
    return response
};

export const get_product_actions = async () => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .get(`${baseURL + endPoints.product.show_actions}`)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
                if (tempResponseData.success) {
                    response = tempResponseData
                    const tempData = HelpingMethods.getPickerData(tempResponseData.data)
                    dispatch(setProductActions(tempData))
                    //Saving in local storage
                    AsyncStorage.setItem(asyncConts.product_actions, JSON.stringify(tempData))
                } else {
                    Toasts.error(tempResponseData.message)
                }

            })
            .catch(error => {
                Toasts.error(error.response.data.message)
                console.error(error);
            });
    } else {
        const data = AsyncStorage.getItem(asyncConts.product_actions)
        if (data) {
            const dataParsed = JSON.parse(data)
            dispatch(setProductActions(dataParsed))
        }
    }
    return response
};

export const get_product_conditions = async () => {
    let response = null
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .get(`${baseURL + endPoints.product.show_conditions}`)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('Response', tempResponseData);
                if (tempResponseData.success) {
                    response = tempResponseData
                    const tempData = HelpingMethods.getPickerData(tempResponseData.data)
                    dispatch(setProductConditions(tempData))
                    //Saving in local storage
                    AsyncStorage.setItem(asyncConts.product_conditions, JSON.stringify(tempData))
                } else {
                    Toasts.error(tempResponseData.message)
                }

            })
            .catch(error => {
                Toasts.error(error.response.data.message)
                console.error(error);
            });
    } else {
        const data = AsyncStorage.getItem(asyncConts.product_conditions)
        if (data) {
            const dataParsed = JSON.parse(data)
            dispatch(setProductConditions(dataParsed))
        }
    }
    return response
};


export const getProductsByCategory = async ({ page, category }) => {
    let response = null
    const defaultPage = page ? page : 1
    const params = {
        category
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.category_products}?page=${defaultPage}`, params)
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

export const addFavouriteProduct = async (product_id) => {
    let response = null
    const state = store.getState()
    const { userDetail, currentLocation } = state.user
    const user_id = userDetail.id
    const params = {
        user_id,
        product_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.add_favorite_product}`, params)
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

export const removeFavouriteProduct = async (product_id) => {
    let response = null
    const state = store.getState()
    const { userDetail } = state.user
    const user_id = userDetail.id
    const params = {
        user_id,
        product_id
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.remove_favorite_product}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('removeFavouriteProduct Response', tempResponseData);
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

export const getFavouriteProducts = async () => {
    let response = null
    const state = store.getState()
    const { userDetail } = state.user
    const user_id = userDetail.id
    const params = {
        user_id,
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.show_favorite_products}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getFavouriteProducts Response', tempResponseData);
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

export const addProductReview = async ({ product_id, order_id, rating, comment }) => {
    let response = null
    const state = store.getState()
    const { userDetail } = state.user
    const user_id = userDetail.id
    const params = {
        user_id,
        product_id,
        order_id,
        rating,
        comment
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.product_review}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('addProductReview Response', tempResponseData);
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

export const getProductReviews = async (product_id) => {
    let response = null
    // const state = store.getState()
    // const { userDetail } = state.user
    // const user_id = userDetail.id
    const params = {
        product_id,
    }
    const isInternetAvailable = await HelpingMethods.checkInternetConnectivity()
    if (isInternetAvailable) {
        await axios
            .post(`${baseURL + endPoints.product.show_reviews}`, params)
            .then(async responseJson => {
                const tempResponseData = responseJson.data
                console.log('getProductReviews Response', tempResponseData);
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

export const handleAddRemoveFavouriteProduct = async (product_id) => {
    let response = null
    if (HelpingMethods.checkIsProductFavourite(product_id)) {
        await removeFavouriteProduct(product_id)
    } else {
        await addFavouriteProduct(product_id)
    }
    return response
};

