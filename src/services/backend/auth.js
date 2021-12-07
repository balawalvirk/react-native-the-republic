import { endPoints, baseURL, asyncConsts } from "../constants"
import axios from "axios"
import * as HelpingMethods from "../helpingMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toasts } from "../../components";
import store from "../store";
import { Backend, routes } from "..";
import { setUserDetail } from "../store/actions";
import { navigate } from "../navigation/rootNavigation";
const { dispatch } = store


//manage google authentications
export const handleContinueWithGoogle = async () => {
    let response = null
    await Backend.CountinueWithGoogle().then(async googleData => {
        if (googleData) {
            await Backend.checkUser({ email: googleData.user.email })
                .then(res => {
                    if (res) {
                        if (res.success === false) {
                            //User already registered
                            autoLoginWithGoogle(googleData.idToken)
                        } else {
                            let params = {
                                googleToken: googleData.idToken,
                                email: googleData.user.email,
                                firstName: googleData.user.givenName,
                                lastName: googleData.user.familyName,
                                //profileImage:googleData.user.photo
                            }
                            console.log('Params', params);
                            navigate(routes.completeYourProfil, { userSocialData: params })
                        }
                    }
                })
        }
    })
    return response
};

export const userRegisterGoogle = async ({ email, google_token }) => {
    let response = null
    const uri = `${baseURL + endPoints.sociaAuth.register_google}`
    let params = {
        email: email.toLowerCase(),
        google_token
    }
    console.log('userRegisterGoogle \nuri', uri, '\nParams', params);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('userRegisterGoogle Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                AsyncStorage.setItem(asyncConsts.google_token, google_token)
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
// export const LoginWithGoogle = async () => {
//     let response = null
//     await Backend.CountinueWithGoogle().then(async GoRes => {
//         if (GoRes) {
//             let params = {
//                 token: GoRes.idToken
//             }
//             console.log('Params', params);
//             await axios
//                 .post(`${baseURL + endPoints.sociaAuth.login_google}`, params)
//                 //.then(response => response.json())
//                 .then(async responseJson => {
//                     console.log('Response', responseJson.data);
//                     // return responseJson;
//                     response = responseJson.data
//                     dispatch(setUserDetail(responseJson.data.user))
//                     await AsyncStorage.setItem(asyncConsts.user_details, JSON.stringify(responseJson.data.user))
//                     //HelpingMethods.handleSendFcmTokenOnFirstLogin()
//                 })
//                 .catch(error => {
//                     Toasts.error(error.response.data.message)
//                     console.error(error);
//                 });
//         }
//     }).catch(error => {
//         // Toasts.error(error.response.data.message)
//         //console.error(error);
//     });
//     return response
// };

export const autoLoginWithGoogle = async (google_token) => {

    let response = null
    let params = {
        google_token
    }
    console.log('autoLoginWithGoogle Params', params);
    await axios
        .post(`${baseURL + endPoints.sociaAuth.login_google}`, params)
        //.then(response => response.json())
        .then(async responseJson => {
            console.log('autoLoginWithGoogle Response', responseJson.data);
            // return responseJson;
            response = responseJson.data
            dispatch(setUserDetail(responseJson.data.user))
            // await AsyncStorage.setItem(asyncConsts.user_details, JSON.stringify(responseJson.data.user))
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};


//manage Apple authentications
export const handleContinueWithApple = async () => {
    let response = null
    await Backend.ContinueWithApple().then(async aplResponse => {
        if (aplResponse) {
            await Backend.checkUser({ email: aplResponse.email })
                .then(res => {
                    if (res) {
                        if (res.success === false) {
                            autoLoginWithApple(aplResponse.identityToken)
                        }
                        else {
                            let params = {
                                appleToken: aplResponse.identityToken,
                                email: aplResponse.email,
                                firstName: aplResponse.fullName.givenName,
                                lastName: aplResponse.fullName.familyName
                            }
                            console.log('Params', params);
                            navigate(routes.completeYourProfil, { userSocialData: params })
                        }
                    }
                })
        }
    })
    return response
};
export const userRegisterApple = async ({ email, apple_token }) => {
    let response = null
    const uri = `${baseURL + endPoints.sociaAuth.register_google}`
    let params = {
        email: email.toLowerCase(),
        apple_token
    }
    console.log('userRegisterApple \nuri', uri, '\nParams', params);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('userRegisterApple Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                AsyncStorage.setItem(asyncConsts.apple_token, apple_token)
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
// export const LoginWithApple = async () => {
//     let response = null
//     await Backend.ContinueWithApple().then(async AplRes => {
//         if (AplRes) {
//             let params = {
//                 token: AplRes.identityToken
//             }
//             console.log('Params', params);
//             await axios
//                 .post(`${baseURL + endPoints.sociaAuth.login_apple}`, params)
//                 //.then(response => response.json())
//                 .then(async responseJson => {
//                     console.log('Response', responseJson.data);
//                     // return responseJson;
//                     response = responseJson.data
//                     dispatch(setUserDetail(responseJson.data.user))
//                     await AsyncStorage.setItem(asyncConsts.user_details, JSON.stringify(responseJson.data.user))
//                 })
//                 .catch(error => {
//                     Toasts.error(error.response.data.message)
//                     console.error(error);
//                 });
//         }
//     })
//     return response
// };

export const autoLoginWithApple = async (apple_token) => {

    let response = null
    let params = {
        apple_token
    }
    console.log('Params', params);
    await axios
        .post(`${baseURL + endPoints.sociaAuth.login_apple}`, params)
        //.then(response => response.json())
        .then(async responseJson => {
            console.log('Response', responseJson.data);
            // return responseJson;
            response = responseJson.data
            dispatch(setUserDetail(responseJson.data.user))
            // await AsyncStorage.setItem(asyncConsts.user_details, JSON.stringify(responseJson.data.user))
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const handleContinueWithInstagram = async (data) => {
    let response = null
    await Backend.continueWithInstagram(data).then(async instagramData => {
        if (instagramData) {
            await Backend.checkUser({ username: instagramData.username })
                .then(res => {
                    if (res) {
                            if (res.success === false) {
                                //User already registered
                                autoLoginWithGoogle(instagramData.access_token)
                            } else {
                                let params = {
                                    instagramToken: instagramData.access_token,
                                    username: instagramData.username,
                                    //email: instagramData.user.email,
                                    //firstName: instagramData.user.givenName,
                                    //lastName: instagramData.user.familyName,
                                    //profileImage:googleData.user.photo
                                }
                                console.log('Params', params);
                                navigate(routes.completeYourProfil, { userSocialData: params })
                            }
                    }else {
                        let params = {
                            instagramToken: instagramData.access_token,
                            userName: instagramData.username,
                            //email: instagramData.user.email,
                            //firstName: instagramData.user.givenName,
                            //lastName: instagramData.user.familyName,
                            //profileImage:googleData.user.photo
                        }
                        console.log('Params', params);
                        navigate(routes.completeYourProfil, { userSocialData: params })
                    }
                })
        }
    })
    return response
};

export const autoLoginWithInstagram = async (instagram_token) => {

    let response = null
    let params = {
        instagram_token
    }
    console.log('Params', params);
    await axios
        .post(`${baseURL + endPoints.sociaAuth.login_instagram}`, params)
        //.then(response => response.json())
        .then(async responseJson => {
            console.log('Response', responseJson.data);
            // return responseJson;
            response = responseJson.data
            dispatch(setUserDetail(responseJson.data.user))
            // await AsyncStorage.setItem(asyncConsts.user_details, JSON.stringify(responseJson.data.user))
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};