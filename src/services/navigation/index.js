import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './authNavigation';
import AppNavigation from './appNavigation';
import { routes } from '../constants';
import { Splash } from '../../screens/authFlow';


const MainStack = createStackNavigator();

export function Navigation() {
    return (
        <NavigationContainer>
            <MainStack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={routes.auth}
            >
                <MainStack.Screen
                    name={routes.auth}
                    component={AuthNavigation}
                />
                <MainStack.Screen
                    name={routes.app}
                    component={AppNavigation}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

