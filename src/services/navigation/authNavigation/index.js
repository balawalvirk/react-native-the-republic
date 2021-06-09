import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { header, routes, headers } from '../../constants';
import { Signin,ResetPassword,CreateAccount,CompleteYourProfile, VerifyPhone } from '../../../screens/authFlow';

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
        </AuthStack.Navigator>
    )
}

export default AuthNavigation