import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { header, routes, headers } from '../../constants';
import { Signin, ResetPassword, CreateAccount, CompleteYourProfile, VerifyPhone, VerifyIdentity, SelectSubscriptionPlan, SubscriptionPayment, OnBoarding } from '../../../screens/authFlow';

const AuthStack = createStackNavigator();

function AuthNavigation() {
    return (
        <AuthStack.Navigator
            screenOptions={headers.screenOptionsSecondary}
            initialRouteName={routes.signin}
        >
            <AuthStack.Screen name={routes.signin} component={Signin}
                options={{
                    headerShown: false,
                    //title: 'Sign In'
                }}
            />
            <AuthStack.Screen name={routes.resetPassword} component={ResetPassword}
                options={{
                    //headerShown: false,
                    title: 'Reset Password'
                }}
            />
            <AuthStack.Screen name={routes.createAccount} component={CreateAccount}
                options={{
                    //headerShown: false,
                    title: 'Create an Account'
                }}
            />
            <AuthStack.Screen name={routes.completeYourProfil} component={CompleteYourProfile}
                options={{
                    //headerShown: false,
                    title: 'Complete Your Profile'
                }}
            />
            <AuthStack.Screen name={routes.verifyPhone} component={VerifyPhone}
                options={{
                    //headerShown: false,
                    title: 'Verify Phone Number'
                }}
            />
            <AuthStack.Screen name={routes.verifyIdentity} component={VerifyIdentity}
                options={{
                    //headerShown: false,
                    title: 'Verify Your Identity',
                    headerTitleAlign: 'center',
                    headerBackImage: () => null
                }}
            />
            <AuthStack.Screen name={routes.onBoarding} component={OnBoarding}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen name={routes.selectSubscriptionPlan} component={SelectSubscriptionPlan}
                options={{
                    //headerShown: false,
                    title: 'Select Subscription Plan',
                    headerTitleAlign: 'center'
                }}
            />
            <AuthStack.Screen name={routes.subscriptionPayment} component={SubscriptionPayment}
                options={{
                    //headerShown: false,
                    title: 'Subscription Payment',
                    headerTitleAlign: 'center'

                }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthNavigation