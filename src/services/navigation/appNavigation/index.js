import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { header, routes,headers} from '../../constants';
import { Home } from '../../../screens/mainFlow';

const AppStack = createStackNavigator();

const AppNavigation = () => {
    return (
        <AppStack.Navigator
            screenOptions={headers.screenOptions}
            initialRouteName={routes.welcome}
        >
            <AppStack.Screen name={routes.signin} component={Home}
                options={{
                    headerShown: false,
                    //title: 'Sign In'
                }}
            />
        </AppStack.Navigator>
    )
}

export default AppNavigation