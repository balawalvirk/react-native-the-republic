import React from 'react'
import { appStyles, colors } from "../../services"
import { BackIcon, ComponentWrapper } from "../../components"
import { Platform } from 'react-native'
import { fontFamily, sizes } from '../utilities'
import { totalSize } from 'react-native-dimension'
import DummyData from './dummyData'

export const baseURL = ''
export const endPoints = {
    login: 'login',
    courses: 'rooms',
    classes: 'classes',
}
export const routes = {
    auth: 'auth',
    app: 'app',
    splash: 'splash',
    signin: 'signin',
    resetPassword: 'resetPassword',
    createAccount: 'createAccount',
    completeYourProfil: 'completeYourProfil',
    verifyPhone: 'verifyPhone',
    verifyIdentity: 'verifyIdentity',
    selectSubscriptionPlan: 'selectSubscriptionPlan',
    subscriptionPayment: 'subscriptionPayment',
    onBoarding: 'onBoarding',
    mainBottomTab: 'mainBottomTab',
    mainDrawer: 'mainDrawer',
    home: 'home',
    community: 'community',
    explore: 'explore',
    marketPlace: 'marketPlace',
    account: 'account',
    followRequests: 'followRequests',
    dealers: 'dealers',
    trainings: 'trainings',
    comments: 'comments',
    theRepublicNews: 'theRepublicNews',
    contactUs: 'contactUs',
    subscriptionPlan: 'subscriptionPlan',
    shareApost: 'shareApost',
    notifications: 'notifications',
    search: 'search',
    chats: 'chats',
    yourLocation: 'yourLocation',
    myLocation: 'myLocation',
    productDetail: 'productDetail',
    reviews: 'reviews',
    userProfile: 'userProfile',
    sell: 'sell',
    categories: 'categories',
    CategoryDetail: 'CategoryDetail',
    sortFilter: 'sortFilter',
    groupDetail: 'groupDetail',
    favourites: 'favourites',
    editProfile: 'editProfile',
    changePassword: 'changePassword',
    purchaseHistory: 'purchaseHistory',
    paymentMethods: 'paymentMethods',
    chatScreen: 'chatScreen',
    tagFriends: 'tagFriends',
    buyNow: 'buyNow',
    deliveryAddress: 'deliveryAddress',
    fflDealers: 'fflDealers',
    orderDetail: 'orderDetail',
    orderInvoice: 'orderInvoice',
    upgradeSubscriptionPlan: 'upgradeSubscriptionPlan',
    selectDateTime: 'selectDateTime',
    payment: 'payment',
    createGroup: 'createGroup',
    groupPrivacySettings: 'privacySettings',
    groupMemberRequests: 'memberRequests',
    seller: {
        sellerDashboard: 'sellerDashboard',
        yourProducts: 'yourProducts',
        reports: 'reports',
        requests: 'requests',
        orders: 'orders',
        OrderDetail:'OrderDetails',
        earnings: 'earnings',
        trainings: 'yourTrainings',
        coupons: 'coupons',
        invoices: 'invoices'
    },
    dealer: {
        fulfillments: 'fulfillments',
    }

}
export const headers = {
    screenOptionsPrimary: {
        // headerShown: false,
        title: 'Title',
        headerTitleAlign: 'left',
        headerStyle: [appStyles.headerPrimaryStyle],
        headerTitleStyle: appStyles.headerTitleStyle,
        // headerTintColor: colors.appTextColor2,
        headerBackImage: () => <ComponentWrapper style={{ marginLeft: Platform.OS === 'ios' ? sizes.marginHorizontal : sizes.marginHorizontal / 2 }}><BackIcon /></ComponentWrapper>,
        headerBackTitle: ' '
    },
    screenOptionsSecondary: {
        // headerShown: false,
        title: 'Title',
        headerTitleAlign: 'left',
        headerStyle: [appStyles.headerSecondaryStyle],
        headerTitleStyle: appStyles.headerTitleStyle,
        //  headerTintColor: colors.appTextColor4,
        headerBackImage: () => <ComponentWrapper style={{ marginLeft: Platform.OS === 'ios' ? sizes.marginHorizontal : sizes.marginHorizontal / 2 }}><BackIcon /></ComponentWrapper>,
        headerBackTitle: ' '
    }
}
export const tabs = {
    tabBarOptions: {
        //showLabel: false,
        activeTintColor: colors.appColor1,
        inactiveTintColor: colors.appTextColor5,
        allowFontScaling: true,
        style: appStyles.tabBarStyle,
        labelStyle: { fontSize: totalSize(1.1), fontFamily: fontFamily.appTextBold }
        //activeBackgroundColor: '#FFFFFF40',
        //tabStyle: { borderRadius: 20, marginHorizontal: 7.5, marginVertical: 2 }
    },
    topTabBarOptions: {
        //showLabel: false,
        activeTintColor: colors.appColor1,
        inactiveTintColor: colors.appColor1,
        allowFontScaling: true,
        style: appStyles.searchTopTabBarStyle,
        showIcon: true,
        indicatorStyle: { backgroundColor: colors.appColor1 },
        tabStyle: { flexDirection: 'row' },
        labelStyle: [appStyles.textRegular, appStyles.textPrimaryColor]
        // activeBackgroundColor:'#FFFFFF40',
        //tabStyle:{borderRadius:20,marginHorizontal:7.5,marginVertical:2}
    }
}

export { DummyData }