import moment from "moment";
import { UIManager, LayoutAnimation, Platform, Linking } from "react-native";
import dummyData from "../constants/dummyData";
import NetInfo from "@react-native-community/netinfo";
import store from "../store";
import { setUserDetail } from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncConts } from "..";
import { Toasts } from "../../components";

const { dispatch } = store
const HelpingMethods = {
    handleAnimation: () => {
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    },
    checkExpiry: () => {
        var d1 = Date.parse("2012-11-01");
        var d2 = Date.parse("2012-11-04");
        var expiryDate = Date.parse("2020-12-18");
        var currentDate = Date.now()
        console.log(expiryDate > currentDate)
        if (expiryDate < currentDate) {
            return true
        } else {
            return false
        }
    },
    compareDate: () => {
        var date1 = new Date('December 25, 2017 01:30:00');
        var date2 = new Date('June 18, 2016 02:30:00');
        console.log(date1.getTime() > date2.getTime())
        //best to use .getTime() to compare dates
        //if (date1.getTime() === date2.getTime()) {
        //same date
        //}

        if (date1.getTime() > date2.getTime()) {
            return true
        } else {
            return false
        }
    },
    checkIsProductFavourite: (productId) => {
        let isFavourite = false
        const favouritProducts = dummyData.userData.favourite_products
        const favProduct = favouritProducts.find(item => {
            return item === productId
        })
        if (favProduct) isFavourite = true
        return isFavourite
    },
    checkIsPostLiked: (postId) => {
        let isLiked = false
        const likedPosts = dummyData.userData.liked_posts
        const likedPost = likedPosts.find(item => {
            return item === postId
        })
        if (likedPost) isLiked = true
        return isLiked
    },
    getCardType: (number) => {
        // visa
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "Visa";

        // Mastercard 
        // Updated for Mastercard 2017 BINs expansion
        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
            return "Mastercard";

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "AMEX";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover";

        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null)
            return "Diners";

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners - Carte Blanche";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB";

        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron";

        return "";
    },
    formateTime1: (date) => {
        return moment(date).format('hh:mm A')
    },
    formateDate1: (date) => {
        return moment(date).format('DD / MM / YYYY')
    },
    formateDate2: (date) => {
        //'Fri, 4th June, 2021'
        return moment(date).format('ddd, DD MMMM, YYYY')
    },
    formateDateToDate1: (date) => {
        return moment(date, 'YYYY-MM-DD').format('DD / MM / YYYY')
    },
    checkInternetConnectivity: async () => {
        let isConnected = false
        await NetInfo.fetch().then(state => {
            // console.log("Connection type", state.type);
            //console.log("Is connected?", state.isConnected);
            isConnected = state.isConnected
        });
        return isConnected
    },
    logout: async () => {
        dispatch(setUserDetail(null))
        AsyncStorage.removeItem(asyncConts.user_credentials)
        AsyncStorage.removeItem(asyncConts.user_details)
    },
    getPickerData: (data) => {
        let tempData = []
        if (data.length) {
            for (const item of data) {
                const tempObj = {
                    ...item,
                    label: item.name,
                    value: item.name
                }
                tempData.push(tempObj)
            }
        }
        return tempData
    },
    getHiddenCardNumber: (cardNumber) => {
        return `**** **** **** ${cardNumber.slice(12, 16)}`
    },
    dialPhoneNumber: (number) => {
        console.warn('callNumber ----> ', number);
        let phoneNumber = number;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${number}`;
        }
        else {
            phoneNumber = `tel:${number}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Toasts.error('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.warn(err));
    },
    smsComposer: (number) => {
        const url = (Platform.OS === 'android')
            ? `sms:${number}`
            : `sms:${number}`

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Toasts.error('Unsupported url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error('An error occurred', err))
    },
}


export default HelpingMethods