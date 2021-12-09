import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts, stripeKeys } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setProductActions, setProductCalibers, setProductCategories, setProductConditions, setProductItems, setProductManufacturers, setUserDetail } from "../store/actions";
const { dispatch } = store

export const createStripeCustomer = async (userData) => {
    const state = store.getState()
    const userDetail = userData ? userData : state.user.userDetail

    const userFullName = userDetail.first_name + ' ' + userDetail.last_name
    const userEmail = userDetail.email || (userDetail.first_name + ' ' + userDetail.last_name)
    const userDescription = userDetail.first_name + ' ' + userDetail.last_name + '( ' + userDetail.email + ' )'
    const body = {};
    body['description'] = userDescription
    body['name'] = userFullName
    body['email'] = userEmail
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };
    let response = await fetch("https://api.stripe.com/v1/customers", requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}

export const updateStripeCustomerDefaultPaymentMethode = async (newPaymentMethodeId) => {
    const state = store.getState()
    const { userDetail } = state.user
    const stripeCustomerId = userDetail.customer_id
    //const body = {};
    //body['invoice_settings.default_payment_method'] = userDescription

    let body = {
        invoice_settings: {
            default_payment_method: newPaymentMethodeId
        }

    };
    // body['description'] = userDescription
    // body['name'] = userFullName
    // body['email'] = userEmail
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };
    let response = await fetch(`https://api.stripe.com/v1/customers/${stripeCustomerId}`, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}

export const attachStripePaymentMethodToCustomer = async (customerID, paymentMethodID) => {
    const body = {}
    body['customer'] = customerID
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };

    let response = await fetch("https://api.stripe.com/v1/payment_methods/" + paymentMethodID + "/attach", requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}
export const createStripeSubscription = async (subscriptionPriceId, customerID, paymentMethodID) => {
    const body = {}
    body['customer'] = customerID,
        //  body['items[0][price]'] = 'price_1HhCToL0H2ay7i0JTAoxdTaz'
        body['items[0][price]'] = subscriptionPriceId
    body['default_payment_method'] = paymentMethodID
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };

    let response = await fetch("https://api.stripe.com/v1/subscriptions", requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}
export const createStripePremiumSubscription = async (customerID, paymentMethodID) => {
    const body = {}
    body['customer'] = customerID,
        //  body['items[0][price]'] = 'price_1HhCToL0H2ay7i0JTAoxdTaz'
        body['items[0][price]'] = stripeKeys.subscription_premium_price
    body['default_payment_method'] = paymentMethodID
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };

    let response = await fetch("https://api.stripe.com/v1/subscriptions", requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}

export const createStripeDealerProSubscription = async (customerID, paymentMethodID) => {
    const body = {}
    body['customer'] = customerID,
        //  body['items[0][price]'] = 'price_1HhCToL0H2ay7i0JTAoxdTaz'
        body['items[0][price]'] = stripeKeys.subscription_dealerPro_price
    body['default_payment_method'] = paymentMethodID
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };

    let response = await fetch("https://api.stripe.com/v1/subscriptions", requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}

export const updateStripeSubscriptionDefaultPaymentMethod = async (paymentMethodID) => {
    const state = store.getState()
    const { userDetail } = state.user
    const body = {}
    //body['customer'] = customerID,
    //body['items[0][price]'] = 'price_1HhCToL0H2ay7i0JTAoxdTaz'
    //body['items[0][price]'] = stripeKeys.stripe_monthPlan
    body['default_payment_method'] = paymentMethodID
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };

    let response = await fetch(`https://api.stripe.com/v1/subscriptions/${userDetail.subscription_id}`, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}

export const createStripePaymentObject = async (paymentMethod) => {
    const body = {};
    body['type'] = 'card',
        body['card[number]'] = paymentMethod.card_number,
        body['card[exp_month]'] = paymentMethod.expiry_date.substring(0, 2);
    body['card[exp_year]'] = '20' + paymentMethod.expiry_date.slice(-2);
    body['card[cvc]'] = paymentMethod.cvc;
    console.log('body==>', body)
    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };

    let response = await fetch("https://api.stripe.com/v1/payment_methods", requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}
// updateStripePaymentObject: async (paymentMethod) => {
//     const body = {};
//     body['type'] = 'card',
//         body['card[number]'] = paymentMethod.card_number,
//         body['card[exp_month]'] = paymentMethod.expiry_date.substring(0, 2);
//     body['card[exp_year]'] = '20' + paymentMethod.expiry_date.slice(-2);
//     body['card[cvc]'] = paymentMethod.cvc;
//     console.log('body==>', body)
//     var requestOptions = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/x-www-form-urlencoded',
//             Authorization: stripeKeys.authorization_key,
//         },
//         body: Object.keys(body)
//             .map(key => key + '=' + body[key])
//             .join('&'),
//         redirect: 'follow'
//     };

//     let response = await fetch("https://api.stripe.com/v1/payment_methods/" + userDetail.payment_id, requestOptions)
//         .then(response => response.json())
//         .then(result => { return result })
//         .catch(error => console.log('error', error));
//     return response
// },

//NOTE: subscriptionID is returned by createSubscribtion response, need to save that too.
export const cancelStripeSubscribtion = async (subscriptionID) => {
    const body = {}
    var requestOptions = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };

    let response = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionID}`, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}
export const getStripeSubscribtion = async (subscriptionID) => {
    const body = {}
    var requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: stripeKeys.authorization_key,
        },
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
        redirect: 'follow'
    };

    let response = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionID}`, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    return response
}