import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { RootNavigation, routes } from "..";
import { LoginWithGoogle } from "./auth";
import { appleAuth, appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { Platform } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
import axios from "axios";
import { Toasts } from "../../components";


// Couninue with google

export async function CountinueWithGoogle() {
    let response = null
    await GoogleSignin.hasPlayServices()
        .then(async () => {
            await GoogleSignin.signIn()
                .then(res => {
                    console.log('google User info==>', res)
                    // RootNavigation.navigate(routes.app)
                    response = res
                    // LoginWithGoogle(userInfo.idToken).then(res => {
                    //     console.log('Google login Response', res)
                    // })
                })
                .catch(error => {
                    response = null
                    console.log(error)
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        // play services not available or outdated
                    } else {
                        // some other error happened
                    }
                }
                )

        })

    return response
};






export async function ContinueWithApple() {
    let response = null
    if (Platform.OS === 'ios') {
        await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        }).then(appleAuthRequestResponse => {
            response = appleAuthRequestResponse
            //alert('appleAuthRequestResponse -->',appleAuthRequestResponse)
            //console.log('appleAuthRequestResponse -->',appleAuthRequestResponse)
        }).catch(error => {
            console.log('Apple Login Error --> ', error)
        })
    } else if (Platform.OS === 'android') {
        // Generate secure, random values for state and nonce
        const rawNonce = uuid();
        const state = uuid();

        // Configure the request
        appleAuthAndroid.configure({
            // The Service ID you registered with Apple
            clientId: 'com.example.client-android',

            // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
            // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
            redirectUri: 'https://example.com/auth/callback',

            // The type of response requested - code, id_token, or both.
            responseType: appleAuthAndroid.ResponseType.ALL,

            // The amount of user information requested from Apple.
            scope: appleAuthAndroid.Scope.ALL,

            // Random nonce value that will be SHA256 hashed before sending to Apple.
            nonce: rawNonce,

            // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
            state,
        });

        // Open the browser window for user sign in
        const appleAuthRequestResponse = await appleAuthAndroid.signIn();
        if (appleAuthRequestResponse) {
            response = appleAuthRequestResponse
        }
        // Send the authorization code to your backend for verification
    }
    return response
}

export async function continueWithInstagram({ user_id, access_token, }) {
    let response = null
    //const uri = `https://api.instagram.com/v1/users/${user_id}?access_token=${access_token}`
    const uri = `https://graph.instagram.com/v12.0/${user_id}?fields=id,username&access_token=${access_token}`
    //const uri=`https://graph.instagram.com/v12.0/${user_id}?access_token=${access_token}`
    //const uri=`https://graph.instagram.com/${access_token}?grant_type=ig_exchange_token&
    //client_secret=1a649971c966fdf8369e4d41db8fa7dd&
    //access_token=${access_token}`
    console.log('continueWithInstagram uri --> ', uri)


    await axios
        .get(uri)
        .then(responseJson => {
            const responseData = responseJson.data
            console.log('continueWithInstagram response --> ', responseData)
            if (responseJson) {
                response = {access_token,...responseData}
            }
        })
        .catch(error => {
            //Toasts.error(error.response.data.message)
            //console.error(error.response);
            console.log(error)
        });


    //  var requestOptions = {
    //      method: 'GET',
    //      redirect: 'follow'
    //  };

    //  fetch("https://graph.instagram.com/v12.0/17841407526996062?fields=id,username&access_token=IGQVJVOVNMaUp4d2ZAlUEdlVlh4ZAnQtaW9uOHFhVHhxTGZA4TzFrLXl0ZAUdkRm5LVnJ3T2xtZAG1jeGxiQ2pkQXBNVFkyUHhIYXQ3RmgyaWxmZAEZAocEhqRE85dlpkVnV2Y3NUNXF2TDdfMVE5ZAGt6OURWZAVgtUkViSDBQeWxZA", requestOptions)
    //      .then(response => response.text())
    //      .then(result => console.log(result))
    //      .catch(error => console.log('error', error));

    // var config = {
    //     method: 'get',
    //     url: uri,
    //     headers: { }
    //   };

    //   axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    return response
}

