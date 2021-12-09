import axios from "axios"
import { endPoints, routes, baseURL, asyncConsts } from "../constants"
import { Toasts } from "../../components";
import store from "../store";
import * as Backend from './index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as HelpingMethods from "../helpingMethods";
import { setCreditCards, setUserDetail } from "../store/actions";
import stripe from 'tipsi-stripe'
import { stripeKeys } from '../constants'
const { dispatch } = store


//CREATE CARD TOKEN AND ATTEMPT PURCHASE AND TRANSFER

export const payWithStripe = async (paymentMethod, payableAmount) => {
    let response = null
    const params = {
        number: paymentMethod.card_number,
        expMonth: parseInt(paymentMethod.expiry_date.substring(0, 2)),
        expYear: parseInt(paymentMethod.expiry_date.substring(3, 5)),
        cvc: paymentMethod.cvc
    }
    await stripe.createTokenWithCard(params).
        then(async token => {
            if (token.tokenId) {
                //console.log(parseInt(payableAmount)) // total buy price
                let total_buy_price = parseInt(payableAmount);
                // total_buy_price += total_buy_price * (2.9 / 100) + 0.30
                total_buy_price = total_buy_price * 100;
                //let amount_to_transfer = total_buy_price - total_buy_price * (18 / 100)
                total_buy_price = parseInt(total_buy_price)
                //amount_to_transfer = parseInt(amount_to_transfer)
                await charge(token.tokenId, total_buy_price).
                    then(async (data) => {
                        console.log('charge data-->', data)
                        if (data.amount && data.amount_captured) {
                            response = data
                            console.log('Card captured and charged')
                        }
                        else if (data.error) {
                            Toasts.error('Transaction failed, please try again')
                        }
                        else {
                            Toasts.error('Transaction failed, please try again')
                        }
                    })
                    .catch(() => {
                        Toasts.error('Could not access your card at this time')
                    })
            }
        }).
        catch(err => {
            Toasts.error('Invalid payment details.')
        })


    return response
}



//CREATE A CHARGE AND CAPTURE

export const charge = async (id, amount) => {
    console.log(id, amount)
    const body = {};
    body['amount'] = amount,
        body['currency'] = 'usd',
        body['source'] = id;
    body['capture'] = true;

    let data = await fetch('https://api.stripe.com/v1/' + 'charges', {
        headers: {
            // Use the correct MIME type for your server
            Accept: 'application/json',
            // Use the correct Content Type to send data in request body
            'Content-Type': 'application/x-www-form-urlencoded',
            // Use the Stripe publishable key as Bearer
            Authorization: stripeKeys.authorization_key,
            // Authorization: `Bearer sk_test_jbVThMJnytG859dT7o8AvBc500oeMZcOo0`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(body)
            .map(key => key + '=' + body[key])
            .join('&'),
    });
    data = data.json()
    return data
}


//TRANSFER MONEY AFTER CHARGE

export async function transfer(seller_stripe_account_id, amount) {
    // let source_transaction = id
    // let remaining = 100;
    // let loop = 0;
    // let returning = -1

    let response = null

    var myHeaders = new Headers();
    myHeaders.append("Authorization", stripeKeys.authorization_key);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch("https://api.stripe.com/v1/transfers?amount=" + parseInt(amount) + "&currency=usd&destination=" + seller_stripe_account_id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            response = result
        })
        .catch(error => {
            console.log('error', error)
            return false
        });
    return response
}