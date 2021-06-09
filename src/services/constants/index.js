import React from 'react'
import { appStyles, colors } from "../../services"
import { BackIcon, ComponentWrapper } from "../../components"
import { Platform } from 'react-native'
import { sizes } from '../utilities'


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
    verifyPhone:'verifyPhone',
    home: 'home'
}
export const headers = {
    screenOptionsPrimary: {
        // headerShown: false,
        title: 'Title',
        headerTitleAlign: 'center',
        headerStyle: [appStyles.headerPrimaryStyle],
        headerTitleStyle: appStyles.headerTitleStyle,
        // headerTintColor: colors.appTextColor2,
        headerBackImage: () => <ComponentWrapper style={{ marginLeft: Platform.OS === 'ios' ? sizes.marginHorizontal : sizes.marginHorizontal / 2 }}><BackIcon /></ComponentWrapper>,
        headerBackTitle: ' '
    },
    screenOptionsSecondary: {
        // headerShown: false,
        title: 'Title',
        headerTitleAlign: 'center',
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
        activeTintColor: colors.appTextColor6,
        inactiveTintColor: colors.appTextColor6,
        allowFontScaling: true,
        style: appStyles.tabBarStyle,
        activeBackgroundColor: '#FFFFFF40',
        tabStyle: { borderRadius: 20, marginHorizontal: 7.5, marginVertical: 2 }
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