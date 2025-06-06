import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './authNavigation';
import AppNavigation from './appNavigation';
import { routes } from '../constants';
import { Splash } from '../../screens/authFlow';
import { navigationRef } from './rootNavigation';
import { useSelector } from 'react-redux';
import { PushNotification, Toast } from '../../components';
import linking from '../linking';

const MainStack = createStackNavigator();

export function Navigation() {

    const user = useSelector(state => state.user)
    const { userDetail } = user
    return (
        <>
            <Toast />
            <PushNotification />
            <NavigationContainer
                ref={navigationRef}
                linking={linking}
            >
                <MainStack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName={routes.auth}
                >
                    {
                        !userDetail ?
                            <MainStack.Screen
                                name={routes.auth}
                                component={AuthNavigation}
                            />
                            :
                            <MainStack.Screen
                                name={routes.app}
                                component={AppNavigation}
                            />
                    }
                </MainStack.Navigator>
            </NavigationContainer>
        </>
    );
}

