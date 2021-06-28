import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { header, routes, headers, tabs } from '../../constants';
import * as MainApp from '../../../screens/mainFlow';
import { CustomIcon, ImageRound, ComponentWrapper, MediumText, Spacer, Wrapper, RowWrapper, AbsoluteWrapper, ImageProfile, SmallTitle, LogoMain, LocationPickerButton } from '../../../components';
import { appIcons, appImages, appStyles, colors, fontFamily, fontSize, sizes } from '../../utilities';
import { totalSize, width } from 'react-native-dimension';
import { Badge } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native';
import styles from './styles'

const AppStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const BottomTabStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();


const drawerScreens = [
    { screen: 'Home', route: routes.mainDrawer },
    { screen: 'Follow Requests', route: routes.followRequests },
    { screen: 'Dealers', route: routes.dealers },
    { screen: 'Trainings', route: routes.trainings },
    { screen: 'Comments', route: routes.comments },
    { screen: 'The Republic News', route: routes.theRepublicNews },
    { screen: 'Contact us', route: routes.contactUs },
];

function BottomTabScreens() {
    const tabIconSize = totalSize(3)
    //const colors = useSelector(state => state.theme.appTheme)
    return (
        <BottomTab.Navigator
            tabBarOptions={{
                ...tabs.tabBarOptions,

            }}
        //initialRouteName={routes.welcome}
        >
            <BottomTab.Screen
                name={routes.community}
                component={MainApp.Community}
                options={() => ({
                    tabBarLabel: "Community",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <CustomIcon icon={appIcons.users} size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTab.Screen
                name={routes.explore}
                component={MainApp.Explore}
                options={() => ({
                    tabBarLabel: "Explore",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <CustomIcon icon={appIcons.globe} size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTab.Screen
                name={routes.shareApost}
                component={() => null}
                options={() => ({
                    tabBarLabel: "Post",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <CustomIcon icon={appIcons.add_circle} size={tabIconSize} color={color} focused={focused} />
                    },
                })}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate(routes.shareApost)
                    }
                })}
            />
            <BottomTab.Screen
                name={routes.marketPlace}
                component={MainApp.MarketPlace}
                options={() => ({
                    tabBarLabel: "Marketplace",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <CustomIcon icon={appIcons.marketplace} size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTab.Screen
                name={routes.account}
                component={MainApp.Account}
                options={() => ({
                    tabBarLabel: "Account",
                    tabBarIcon: ({ color, size, focused }) => {
                        //return <CustomIcon icon={appIcons.marketplace} size={tabIconSize} color={color} focused={focused} />
                        return <ImageRound source={{ uri: appImages.user3 }} size={tabIconSize} style={{ borderWidth: focused ? 1 : 0, borderColor: colors.appColor1 }} />
                    },
                })}
            />
        </BottomTab.Navigator>
    )
}

function BottomTabStackScreens() {
    return (
        <BottomTabStack.Navigator
            screenOptions={headers.screenOptionsSecondary}
            initialRouteName={routes.mainBottomTab}
        >
            <BottomTabStack.Screen name={routes.mainBottomTab} component={BottomTabScreens}
                options={({ navigation, route }) => ({
                    title: '',
                    // headerTitle:()=><LocationPickerButton text="Broklyn, NYC"/>,
                    headerRight: () =>
                        <RowWrapper style={[{ marginRight: sizes.marginHorizontal }]}>
                            <CustomIcon icon={appIcons.search} size={sizes.icons.medium} color={colors.appTextColor1} onPress={() => navigation.navigate(routes.search)} />
                            <Spacer width={sizes.marginHorizontal} />
                            <CustomIcon value='2' icon={appIcons.bell} size={sizes.icons.medium} color={colors.appTextColor1} onPress={() => navigation.navigate(routes.notifications)} />
                            <Spacer width={sizes.marginHorizontal} />
                            <CustomIcon value='5' icon={appIcons.chat} size={sizes.icons.medium} color={colors.appTextColor1} onPress={() => navigation.navigate(routes.chats)} />
                        </RowWrapper>,
                    headerLeft: () => <RowWrapper style={[{}]}>
                        <CustomIcon onPress={() => navigation.toggleDrawer()} icon={appIcons.menu} size={sizes.icons.medium} color={colors.appTextColor1} />
                        <LocationPickerButton
                            onPress={() => navigation.navigate(routes.myLocation)}
                            text="Broklyn, NYC" />
                    </RowWrapper>
                })}
            />
        </BottomTabStack.Navigator>
    )
}
const CustomDrawerContent = props => {
    const { navigation } = props
    const { navigate } = props.navigation;
    return (
        <Wrapper flex={1}>
            <Wrapper flex={3} style={[appStyles.center,]}>
                <LogoMain size={width(35)} />
            </Wrapper>
            <Wrapper flex={6}>
                <FlatList
                    data={drawerScreens}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigate(item.route);
                                    navigation.toggleDrawer();
                                }}
                                style={[styles.drawerOption, item.screen === 'Home' && styles.drawerOptionSelected]}
                            >
                                <MediumText>{item.screen}</MediumText>
                            </TouchableOpacity>
                        )
                    }}
                />
            </Wrapper>
            <Wrapper flex={1}>
                <TouchableOpacity
                    onPress={() => {
                        navigate(routes.subscriptionPlan);
                        navigation.toggleDrawer();
                    }}
                    style={[styles.upgradeBtn,]}
                >
                    <MediumText style={[appStyles.textWhite]}>Upgade</MediumText>
                </TouchableOpacity>
            </Wrapper>
        </Wrapper>
    );
};
const MainSideDrawer = () => {
    return (
        <MainDrawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
                activeTintColor: colors.appColor1,
                inactiveTintColor: colors.appTextColor4,
            }}>
            <MainDrawer.Screen
                name={routes.mainBottomTab}
                component={BottomTabStackScreens}
                options={{
                    title: 'Main Tab',
                    // drawerIcon: ({ color, size }) => (
                    //     <Icon
                    //         name="home-outline"
                    //         type="material-community"
                    //         color={color}
                    //         size={size}
                    //     />
                    // ),
                }}
            />
        </MainDrawer.Navigator>
    );
};
const AppNavigation = () => {
    return (
        <AppStack.Navigator
            screenOptions={headers.screenOptionsSecondary}
            initialRouteName={routes.mainBottomTab}
        >
            <AppStack.Screen name={routes.mainDrawer} component={MainSideDrawer}
                options={{
                    headerShown: false,
                    //title: 'Sign In'
                }}
            />
            <AppStack.Screen name={routes.followRequests} component={MainApp.FollowRequests}
                options={{
                    // headerShown: false,
                    title: 'Follow Requests'
                }}
            />
            <AppStack.Screen name={routes.dealers} component={MainApp.Dealers}
                options={{
                    // headerShown: false,
                    title: 'Dealers'
                }}
            />
            <AppStack.Screen name={routes.trainings} component={MainApp.Trainings}
                options={{
                    // headerShown: false,
                    title: 'Trainings'
                }}
            />
            <AppStack.Screen name={routes.comments} component={MainApp.Comments}
                options={{
                    // headerShown: false,
                    title: 'Comments'
                }}
            />
            <AppStack.Screen name={routes.theRepublicNews} component={MainApp.TheRepublicNews}
                options={{
                    // headerShown: false,
                    title: 'The Republic News'
                }}
            />
            <AppStack.Screen name={routes.contactUs} component={MainApp.ContactUs}
                options={{
                    // headerShown: false,
                    title: 'Contact Us'
                }}
            />
            <AppStack.Screen name={routes.subscriptionPlan} component={MainApp.SubscriptionPlan}
                options={{
                    // headerShown: false,
                    title: 'Subscription Plan'
                }}
            />
            <AppStack.Screen name={routes.myLocation} component={MainApp.MyLocation}
                options={{
                    // headerShown: false,
                    title: 'My Location'
                }}
            />
            <AppStack.Screen name={routes.search} component={MainApp.Search}
                options={{
                    // headerShown: false,
                    title: 'Search'
                }}
            />
            <AppStack.Screen name={routes.notifications} component={MainApp.Notifications}
                options={{
                    // headerShown: false,
                    title: 'Notifications'
                }}
            />
            <AppStack.Screen name={routes.chats} component={MainApp.Chats}
                options={{
                    // headerShown: false,
                    title: 'Chats'
                }}
            />
              <AppStack.Screen name={routes.productDetail} component={MainApp.ProductDetail}
                options={{
                     headerShown: false,
                    //title: 'Chats'
                }}
            />
              <AppStack.Screen name={routes.reviews} component={MainApp.Reviews}
                options={{
                    // headerShown: false,
                    title: 'Reviews'
                }}
            />
             <AppStack.Screen name={routes.userProfile} component={MainApp.UserProfile}
                options={{
                     headerShown: false,
                   // title: 'Reviews'
                }}
            />
        </AppStack.Navigator>
    )
}

export default AppNavigation