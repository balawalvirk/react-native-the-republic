import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
import stripe from 'tipsi-stripe'
import { stripeKeys, stripe_endpoints, stripe_base_url } from '../constants'
const { dispatch } = store



export const createStripeAccount = async ({
    email,
    country,
    default_currency,
    type,
    business_type,
    account_number,
    currency,
    account_holder_name,
    routing_number
}) => {
    let response = null
    let body = {}
    email && [body['email'] = email]
    body['country'] = country ? country : 'US'
    //body['default_currency'] = default_currency ? default_currency : 'usd'
    body['type'] = type ? type : 'express'
    //body['business_type'] = business_type ? business_type : 'individual'
    // body['capabilities[card_payments][requested]'] = 'true'
    body['capabilities[transfers][requested]'] = 'true'

    //bank account params
    body['external_account[object]'] = 'bank_account'
    body['external_account[account_number]'] = account_number
    body['external_account[routing_number]'] = routing_number
    body['external_account[country]'] = country ? country : 'US'
    body['external_account[currency]'] = currency ? currency : 'usd'
    account_holder_name && [body['external_account[account_holder_name]'] = account_holder_name]
    const uri = `${stripe_base_url + stripe_endpoints.accounts}`
    const config = {
        headers: {
            //'Authorization': stripeKeys.authorization_key,
            'Authorization': 'Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
    console.log('\ncreateStripeAccount==>\nuri: ', uri, '\nbody: ', body, '\nconfig: ', config)

    await axios.post(uri, body, config)
        .then(function (responseJson) {
            const tempResponseData = responseJson.data
            console.log('createStripeAccount response', tempResponseData);
            response = tempResponseData
        })
        .catch(function (error) {
            console.log('createStripeAccount error', error);
        });
    return response
}

export const createStripeAccountFetch = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", stripeKeys.authorization_key);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("country", "US");
    urlencoded.append("email", "jenny.rosen@example.com");
    urlencoded.append("capabilities[transfers][requested]", "true");
    urlencoded.append("external_account[object]", "bank_account");
    urlencoded.append("external_account[account_number]", "000123456789");
    urlencoded.append("external_account[country]", "US");
    urlencoded.append("external_account[currency]", "usd");
    urlencoded.append("external_account[account_holder_name]", "User Seven");
    urlencoded.append("external_account[routing_number]", "110000000");
    urlencoded.append("type", "express");
    
    const uri = "https://api.stripe.com/v1/accounts"

    console.log('\ncreateStripeAccountFetch==>\nuri: ', uri, '\nurlencoded: ', urlencoded, '\nmyHeaders: ', myHeaders)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

   await fetch(uri, requestOptions)
        .then(response => response.text())
        .then(result => console.log('createStripeAccountFetch response', result))
        .catch(error => console.log('createStripeAccountFetch error', error));
}

export const updateStripeAccount = ({ email, country, type, business_type, stripe_account_id, default_currency }) => {
    let response = null
    let body = {}
    email && [body['email'] = email]
    country && [body['country'] = country]
    default_currency && [body['default_currency'] = default_currency]
    type && [body['type'] = type]
    //body['capabilities[card_payments][requested]'] = 'true'
    //body['capabilities[transfers][requested]'] = 'true'
    business_type && [body['business_type'] = 'individual']
    const uri = `${stripe_base_url + stripe_endpoints.accounts}/${stripe_account_id}`
    const config = {
        headers: {
            'Authorization': stripeKeys.authorization_key,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
    console.log('updateStripeAccount==> \n uri: ', uri, '\n body: ', body, '\n config: ', config)

    axios.post(uri, body, config)
        .then(function (responseJson) {
            const tempResponseData = responseJson.data
            console.log('updateStripeAccount Response', tempResponseData);
            response = tempResponseData
        })
        .catch(function (error) {
            console.log(error);
        });
    return response
}
export const addBankAccountToStripeAccount = ({ stripe_account_id, account_number, country, currency, account_holder_name }) => {
    let response = null
    let body = {}
    body['bank_account'] = 'bank_account'
    body['account_number'] = account_number
    body['country'] = country ? country : 'US'
    body['currency'] = currency ? currency : 'usd'
    account_holder_name && [body['account_holder_name'] = account_holder_name]
    const uri = `${stripe_base_url + stripe_endpoints.accounts}/${stripe_account_id}/${stripe_endpoints.external_accounts}`
    const config = {
        headers: {
            'Authorization': stripeKeys.authorization_key,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
    console.log('addBankAccountToStripeAccount==> \n uri: ', uri, '\n body: ', body, '\n config: ', config)

    axios.post(uri, body, config)
        .then(function (responseJson) {
            const tempResponseData = responseJson.data
            console.log('addBankAccountToStripeAccount Response', tempResponseData);
            response = tempResponseData
        })
        .catch(function (error) {
            console.log(error);
        });
    return response
}

export const updateBankAccountOfStripeAccount = ({ stripe_account_id, external_account_id, account_number, country, currency, account_holder_name }) => {
    let response = null
    let body = {}
    body['bank_account'] = 'bank_account'
    account_number && [body['account_number'] = account_number]
    country && [body['country'] = country]
    currency && [body['currency'] = currency]
    account_holder_name && [body['account_holder_name'] = account_holder_name]
    const uri = `${stripe_base_url + stripe_endpoints.accounts}/${stripe_account_id}/${stripe_endpoints.external_accounts}/${external_account_id}`
    const config = {
        headers: {
            'Authorization': stripeKeys.authorization_key,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
    console.log('addBankAccountToStripeAccount==> \n uri: ', uri, '\n body: ', body, '\n config: ', config)

    axios.post(uri, body, config)
        .then(function (responseJson) {
            const tempResponseData = responseJson.data
            console.log('addBankAccountToStripeAccount Response', tempResponseData);
            response = tempResponseData
        })
        .catch(function (error) {
            console.log(error);
        });
    return response
}

export const getBankAccountsOfStripeAccount = ({ stripe_account_id, }) => {
    let response = null
    let body = {}

    const uri = `${stripe_base_url + stripe_endpoints.accounts}/${stripe_account_id}/${stripe_endpoints.external_accounts}`
    const config = {
        headers: {
            'Authorization': stripeKeys.authorization_key,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
    console.log('getBankAccountsOfStripeAccount==> \n uri: ', uri, '\n body: ', body, '\n config: ', config)

    axios.get(uri, config)
        .then(function (responseJson) {
            const tempResponseData = responseJson.data
            console.log('getBankAccountsOfStripeAccount Response', tempResponseData);
            response = tempResponseData
        })
        .catch(function (error) {
            console.log(error);
        });
    return response
}