import { endPoints, baseURL, asyncConsts } from "../constants"
import axios from "axios"
import * as HelpingMethods from "../helpingMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toasts } from "../../components";
import store from "../store";
import { Backend, routes } from "..";
import { setUserDetail } from "../store/actions";
import { navigate } from "../navigation/rootNavigation";
import auth from '@react-native-firebase/auth';
const { dispatch } = store


export const handleAutoLogin = async () => {
    let response = null
    const userCredentials = await AsyncStorage.getItem(asyncConsts.user_credentials)
    //const googleToken = await AsyncStorage.getItem(asyncConsts.google_token)
    const googleCredentials = await AsyncStorage.getItem(asyncConsts.google_credentials)
    // const instagramToken = await AsyncStorage.getItem(asyncConsts.instagram_token)
    const instagramCredentials = await AsyncStorage.getItem(asyncConsts.instagram_credentials)
    const appleToken = await AsyncStorage.getItem(asyncConsts.apple_token)
    if (userCredentials) {
        console.log('userCredentials --> ', userCredentials)
        const dataUserCredentials = JSON.parse(userCredentials)
        await Backend.auto_login(dataUserCredentials.email, dataUserCredentials.password).
            then(res => {
                if (res) {
                    response = res
                }
            })
    } else if (googleCredentials) {
        console.log('googleCredentials --> ', googleCredentials)
        const parsedGoogleCredentials = JSON.parse(googleCredentials)
        await autoLoginWithGoogle(parsedGoogleCredentials).
            then(res => {
                if (res) {
                    response = res
                }
            })
    } else if (instagramCredentials) {
        console.log('instagramCredentials --> ', instagramCredentials)
        const tempInstagramCredentials = JSON.parse(instagramCredentials)
        await autoLoginWithInstagram(tempInstagramCredentials).
            then(res => {
                if (res) {
                    response = res
                }
            })
    } else if (appleToken) {
        console.log('appleToken --> ', appleToken)
        await autoLoginWithApple(appleToken).
            then(res => {
                if (res) {
                    response = res
                }
            })
    }
    return response
}
//manage google authentications
export const handleContinueWithGoogle = async () => {
    let response = null
    await Backend.CountinueWithGoogle().then(async googleData => {
        if (googleData) {
            await Backend.checkUser({ email: googleData.user.email })
                .then(async res => {
                    if (res) {
                        if (res.success === false) {
                            //User already registered
                            //await autoLoginWithGoogle({ google_token: googleData.idToken, email: googleData.user.email })
                            const googleLoginParams = { google_token: googleData.idToken, email: googleData.user.email }
                            await autoLoginWithGoogle(loginParams).
                                then(res => {
                                    if (res) {
                                        const tempGoogleCredentials = JSON.stringify(googleLoginParams)
                                        AsyncStorage.setItem(asyncConsts.google_credentials, tempGoogleCredentials)
                                    }
                                })
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
        access_token: google_token
    }
    console.log('userRegisterGoogle \nuri', uri, '\nParams', params);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('userRegisterGoogle Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                // AsyncStorage.setItem(asyncConsts.google_token, google_token)
                const googleCredentials = JSON.parse(params)
                AsyncStorage.setItem(asyncConsts.google_credentials, googleCredentials)
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

export const autoLoginWithGoogle = async ({ google_token, email }) => {

    let response = null
    let params = {
        email: email.toLowerCase(),
        access_token: apple_token
    }
    console.log('autoLoginWithGoogle Params', params);
    await axios
        .post(`${baseURL + endPoints.sociaAuth.register_google}`, params)
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
        access_token: apple_token
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






export const userRegisterInstagram = async ({ access_token, user_id }) => {
    let response = null
    //const uri = `${baseURL + endPoints.sociaAuth.register_instagram}`
    const uri = `${baseURL + endPoints.sociaAuth.login_instagram}`
    let params = {
        user_id,
        access_token
    }
    console.log('userRegisterInstagram \nuri', uri, '\nParams', params);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            const tempResponseData = responseJson.data
            console.log('userRegisterInstagram Response', tempResponseData);
            if (tempResponseData.success) {
                response = tempResponseData
                const tempInstaCredentials = JSON.stringify(params)
                AsyncStorage.setItem(asyncConsts.instagram_credentials, tempInstaCredentials)
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

export const handleContinueWithInstagram = async (data) => {
    let response = null
    await Backend.continueWithInstagram(data).then(async instagramData => {
        if (instagramData) {
            await Backend.checkUser({ user_name: instagramData.username })
                .then(async res => {
                    if (res) {
                        if (res.success === false) {
                            //User already registered
                            await autoLoginWithInstagram(data).
                                then(res => {
                                    if (res) {
                                        const tempInstaCredentials = JSON.stringify(data)
                                        AsyncStorage.setItem(asyncConsts.instagram_credentials, tempInstaCredentials)
                                    }
                                })
                        } else {
                            let params = {
                                instagramToken: instagramData.access_token,
                                userName: instagramData.username,
                                instagramUserId: data.user_id
                            }
                            console.log('Params', params);
                            navigate(routes.completeYourProfil, { userSocialData: params })
                        }
                    } else {
                        let params = {
                            instagramToken: instagramData.access_token,
                            userName: instagramData.username,
                            instagramUserId: data.user_id
                        }
                        console.log('Params', params);
                        navigate(routes.completeYourProfil, { userSocialData: params })
                    }
                })
        }
    })
    return response
};

export const autoLoginWithInstagram = async ({ access_token, user_id }) => {
    let response = null
    let params = {
        access_token,
        user_id
    }
    console.log('autoLoginWithInstagram Params', params);
    await axios
        .post(`${baseURL + endPoints.sociaAuth.login_instagram}`, params)
        //.then(response => response.json())
        .then(async responseJson => {
            console.log('autoLoginWithInstagram Response', responseJson.data);
            // return responseJson;
            if (responseJson.data) {
                if (responseJson.data.success) {
                    response = responseJson.data
                    dispatch(setUserDetail(responseJson.data.data))
                } else {
                    Toasts.error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const sendPhoneCode = async ({ number }) => {
    let response = null
    let params = {
        phone_number:number,
    }
    console.log('sendPhoneCode Params', params);
    await axios
        .post(`${baseURL + endPoints.user.send_phone_code}`, params)
        .then(async responseJson => {
            console.log('sendPhoneCode Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.success) {
                    response = responseJson.data
                } else {
                    Toasts.error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const verifyPhoneCode = async ({ number, code }) => {
    let response = null
    let params = {
        phone_number:number,
        code
    }
    console.log('verifyPhoneCode Params', params);
    await axios
        .post(`${baseURL + endPoints.user.verify_phone_code}`, params)
        .then(async responseJson => {
            console.log('verifyPhoneCode Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.success) {
                    response = responseJson.data
                } else {
                    Toasts.error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const verifyPhoneUsingFirebase = async ({ confirmation, code }) => {
    let respons = null
    try {
        const credential = auth.PhoneAuthProvider.credential(confirmation.verificationId, code);
        console.log('credential ', credential)
        let signInWithCredential = await auth().signInWithCredential(credential);
        console.log('signInWithCredential ', signInWithCredential)
        if (signInWithCredential) {
            respons = signInWithCredential
        }
    } catch (error) {
        console.log('error', error);
        if (error.code == 'auth/invalid-verification-code') {
            //console.log('Invalid code.');
            Toasts.error('Invalid code.')
        } else {
            //console.log('Account linking error');
            Toasts.error(error.message)
        }
    }
    return respons
}