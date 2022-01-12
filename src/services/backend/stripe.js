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
    let main_response = null
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'type': 'express',
        'country': 'US',
        'email': email,
        'capabilities[transfers][requested]': 'true',
        'external_account[object]': 'bank_account',
        'external_account[account_number]': account_number,
        'external_account[country]': 'US',
        'external_account[currency]': 'usd',
        'external_account[account_holder_name]': account_holder_name,
        'external_account[routing_number]': routing_number,
        'settings[payouts][schedule][interval]': 'manual'
    });
    var config = {
        method: 'post',
        url: 'https://api.stripe.com/v1/accounts',
        headers: {
            'Authorization': 'Basic c2tfdGVzdF80ZUMzOUhxTHlqV0Rhcmp0VDF6ZHA3ZGM6',
            //'Authorization': stripeKeys.authorization_key,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    await axios(config)
        .then(function (jsonResponse) {
            const tempResponse = jsonResponse.data
            console.log('createStripeAccount response: ', tempResponse);
            main_response = tempResponse

        })
        .catch(function (error) {
            console.log('createStripeAccount error: ', error);
        });
    return main_response
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
export const addBankAccountToStripeAccount = ({ stripe_account_id, account_number, country, currency, account_holder_name, routingNumber }) => {
    let response = null
    let body = {}
    body['bank_account'] = 'bank_account'
    body['account_number'] = account_number
    routingNumber && [body['routingNumber'] = routingNumber]
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

export const getStripeAccountDetail = async ({ stripe_account_id }) => {
    let response = null
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://api.stripe.com/v1/accounts/' + stripe_account_id,
        headers: {
            'Authorization': 'Basic c2tfdGVzdF80ZUMzOUhxTHlqV0Rhcmp0VDF6ZHA3ZGM6',
            //'Authorization': stripeKeys.authorization_key
        }
    };

    await axios(config)
        .then(function (jsonResponse) {
            console.log(jsonResponse.data);
            response = jsonResponse.data
        })
        .catch(function (error) {
            console.log(error);
        });
    return response

}

export const getStripeAccountLink = async ({ stripe_account_id, refresh_url, return_url }) => {
    let response
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'account': stripe_account_id,
        'refresh_url': refresh_url,
        'return_url': return_url,
        'type': 'account_onboarding'
    });
    var config = {
        method: 'post',
        url: 'https://api.stripe.com/v1/account_links',
        headers: {
            'Authorization': 'Basic c2tfdGVzdF80ZUMzOUhxTHlqV0Rhcmp0VDF6ZHA3ZGM6',
            //'Authorization': 'Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc',
            //'Authorization': stripeKeys.authorization_key,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    await axios(config)
        .then(function (jsonResponse) {
            console.log('getStripeAccountLink response: ',jsonResponse.data);
            response = jsonResponse.data
        })
        .catch(function (error) {
            console.log('getStripeAccountLink error: ',error);
        });
    return response
}

