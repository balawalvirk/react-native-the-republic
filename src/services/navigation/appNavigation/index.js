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
import * as Seller from '../../../screens/sellerFlow';
import { CustomIcon, ImageRound, ComponentWrapper, MediumText, Spacer, Wrapper, RowWrapper, AbsoluteWrapper, ImageProfile, SmallTitle, LogoMain, LocationPickerButton } from '../../../components';
import { appIcons, appImages, appStyles, colors, fontFamily, fontSize, sizes } from '../../utilities';
import { totalSize, width } from 'react-native-dimension';
import { Badge, Icon } from 'react-native-elements';
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
    { screen: 'Training', route: routes.trainings },
    { screen: 'Comments', route: routes.comments },
    { screen: 'The Republic News', route: routes.theRepublicNews },
    { screen: 'Contact Us', route: routes.contactUs },
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
                name={routes.explore}
                component={MainApp.Explore}
                options={() => ({
                    tabBarLabel: "Find",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <CustomIcon icon={appIcons.globe} size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTab.Screen
                name={'null'}
                component={() => null}
                options={() => ({
                    tabBarLabel: "Sell",
                    tabBarIcon: ({ color, size, focused }) => {
                        // return <CustomIcon icon={appIcons.add_circle} size={tabIconSize} color={color} focused={focused} />
                        return <Icon name="camera" type="feather" size={tabIconSize} color={color} focused={focused} />
                    },
                })}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate(routes.sell)
                    }
                })}
            />
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
                name={routes.account}
                component={MainApp.Account}
                options={() => ({
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size, focused }) => {
                        //return <CustomIcon icon={appIcons.marketplace} size={tabIconSize} color={color} focused={focused} />
                        return <ImageRound source={{ uri: appImages.user3 }} size={tabIconSize} style={{ opacity: focused ? 1 : 0.5, borderColor: colors.appColor1 }} />
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
                    headerTitle: () => <Wrapper style={{ alignItems: 'flex-start', }}>
                        <LocationPickerButton
                            onPress={() => navigation.navigate(routes.myLocation)}
                            text="Broklyn, NYC" />
                    </Wrapper>,
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
                        {/* <Spacer width={sizes.marginHorizontal} />
                     <LocationPickerButton
                            onPress={() => navigation.navigate(routes.myLocation)}
                            text="Broklyn, NYC" /> */}
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
            <AppStack.Screen name={routes.sell} component={MainApp.Sell}
                options={{
                    ...headers.screenOptionsPrimary,
                    //headerShown: false,
                    title: 'Post an Item',

                }}
            />
            <AppStack.Screen name={routes.shareApost} component={MainApp.ShareAPost}
                options={{
                    //...headers.screenOptionsPrimary,
                    //headerShown: false,
                    title: 'Share a Post',

                }}
            />
            <AppStack.Screen name={routes.tagFriends} component={MainApp.TagFriends}
                options={{
                    // headerShown: false,
                    title: 'Tag Friends',
                    // headerTitleAlign:'center'
                }}
            />
            <AppStack.Screen name={routes.followRequests} component={MainApp.FollowRequests}
                options={{
                    // headerShown: false,
                    title: 'Follow Requests'
                }}
            />
            <AppStack.Screen name={routes.dealers} component={MainApp.Dealers}
                options={({ navigation, route }) => ({
                    title: 'Dealers',
                    headerRight: () =>
                        <ComponentWrapper >
                            <LocationPickerButton
                                onPress={() => navigation.navigate(routes.myLocation)}
                                text="Broklyn, NYC" />
                        </ComponentWrapper>,

                })}
            />
            <AppStack.Screen name={routes.trainings} component={MainApp.Trainings}
                options={({ navigation, route }) => ({
                    title: 'Training',
                    headerRight: () =>
                        <ComponentWrapper >
                            <LocationPickerButton
                                onPress={() => navigation.navigate(routes.myLocation)}
                                text="Broklyn, NYC" />
                        </ComponentWrapper>,

                })}
            />
            <AppStack.Screen name={routes.comments} component={MainApp.Comments}
                options={{
                    // headerShown: false,
                    title: 'Comments',
                    headerTitleAlign: 'center'
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
                    title: 'Subscription Plan',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.myLocation} component={MainApp.MyLocation}
                options={{
                    // headerShown: false,
                    title: 'My Location'
                }}
            />
            <AppStack.Screen name={routes.search} component={MainApp.Search}
                options={({ navigation, route }) => ({
                    title: 'Search',
                    headerRight: () =>
                        <ComponentWrapper >
                            <LocationPickerButton
                                onPress={() => navigation.navigate(routes.myLocation)}
                                text="Broklyn, NYC" />
                        </ComponentWrapper>,

                })}
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
                    title: 'Messages',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.chatScreen} component={MainApp.ChatScreen}
                options={{
                    // headerShown: false,
                    title: 'Chat',
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
            <AppStack.Screen name={routes.CategoryDetail} component={MainApp.CategoryDetail}
                options={{
                    // headerShown: false,
                    title: 'Category Detail'
                }}
            />
            <AppStack.Screen name={routes.categories} component={MainApp.Categories}
                options={{
                    // headerShown: false,
                    title: 'Categories'
                }}
            />
            <AppStack.Screen name={routes.sortFilter} component={MainApp.SortFilter}
                options={{
                    // headerShown: false,
                    ...headers.screenOptionsPrimary,
                    title: 'Sort & Filters'
                }}
            />
            <AppStack.Screen name={routes.groupDetail} component={MainApp.GroupDetail}
                options={{
                    // headerShown: false,
                    title: 'Group'
                }}
            />
            <AppStack.Screen name={routes.favourites} component={MainApp.Favourites}
                options={{
                    // headerShown: false,
                    title: 'Favourites',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.editProfile} component={MainApp.EditProfile}
                options={{
                    // headerShown: false,
                    title: 'Edit Profile',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.changePassword} component={MainApp.ChangePassword}
                options={{
                    // headerShown: false,
                    title: 'Change Password',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.paymentMethods} component={MainApp.PaymentMethods}
                options={{
                    // headerShown: false,
                    title: 'Payment Methods',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.purchaseHistory} component={MainApp.PurchaseHistory}
                options={{
                    // headerShown: false,
                    title: 'Purchase History',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.buyNow} component={MainApp.BuyNow}
                options={{
                    // headerShown: false,
                    title: 'Buy Now',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.deliveryAddress} component={MainApp.DeliveryAddress}
                options={{
                    // headerShown: false,
                    title: 'Delivery Address',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.fflDealers} component={MainApp.FflDealers}
                options={{
                    // headerShown: false,
                    title: 'FFL Dealers',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.orderDetail} component={MainApp.OrderDetail}
                options={{
                    // headerShown: false,
                    title: 'Order Detail',
                }}
            />
            <AppStack.Screen name={routes.orderInvoice} component={MainApp.OrderInvoice}
                options={{
                    // headerShown: false,
                    title: 'order Invoice',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.upgradeSubscriptionPlan} component={MainApp.UpgradeSubscriptionPlan}
                options={{
                    // headerShown: false,
                    title: 'Upgrade Subscription Plan',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.selectDateTime} component={MainApp.SelectDateTime}
                options={{
                    // headerShown: false,
                    title: 'Select Date and Time',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.payment} component={MainApp.Payment}
                options={{
                    // headerShown: false,
                    title: 'Payment',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.createGroup} component={MainApp.CreateGroup}
                options={{
                    // headerShown: false,
                    title: 'Create Group',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.groupPrivacySettings} component={MainApp.PrivacySettings}
                options={{
                    // headerShown: false,
                    title: 'Privacy Settings',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.groupMemberRequests} component={MainApp.MemberRequests}
                options={{
                    // headerShown: false,
                    title: 'Member Requests',
                    headerTitleAlign: 'center'
                }}
            />


            {/* Seller screen */}
            <AppStack.Screen name={routes.seller.sellerDashboard} component={Seller.SellerDashboard}
                options={{
                    // headerShown: false,
                    title: 'Seller Dashboard',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.yourProducts} component={Seller.YourProducts}
                options={{
                    // headerShown: false,
                    title: 'Your Products',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.requests} component={Seller.Requests}
                options={{
                    // headerShown: false,
                    title: 'Requests',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.orders} component={Seller.Orders}
                options={{
                    // headerShown: false,
                    title: 'Orders',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.OrderDetail} component={Seller.OrderDetails}
                options={{
                    // headerShown: false,
                    title: 'Order Detail',
                   // headerTitleAlign: 'center'
                }}
            />

            <AppStack.Screen name={routes.seller.earnings} component={Seller.Earnings}
                options={{
                    // headerShown: false,
                    title: 'Earnings',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.withdrawEarnings} component={Seller.WithdrawEarnings}
                options={{
                    // headerShown: false,
                    title: 'Withdraw Earnings',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.trainings} component={Seller.Trainings}
                options={{
                    // headerShown: false,
                    title: 'Trainings',
                  //  headerTitleAlign: 'center'
                }}
            />
             <AppStack.Screen name={routes.seller.createTrainin} component={Seller.CreateTraining}
                options={{
                    // headerShown: false,
                    title: 'Create Trainin',
                    headerTitleAlign: 'center'
                }}
            />
             <AppStack.Screen name={routes.seller.selectDateTime} component={Seller.SelectDateTime}
                options={{
                    // headerShown: false,
                    title: 'Select Date and Time',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.coupons} component={Seller.Coupons}
                options={{
                    // headerShown: false,
                    title: 'Coupons',
                   // headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.createCoupon} component={Seller.CreateCoupon}
                options={{
                    // headerShown: false,
                    title: 'Create Coupons',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.invoices} component={Seller.Invoices}
                options={{
                    // headerShown: false,
                    title: 'Invoices',
                    headerTitleAlign: 'center'
                }}
            />
            <AppStack.Screen name={routes.seller.reports} component={Seller.Reports}
                options={{
                    // headerShown: false,
                    title: 'Reports',
                    headerTitleAlign: 'center'
                }}
            />

            {/* Dealer App Screens */}
            <AppStack.Screen name={routes.dealer.fulfillments} component={Seller.Fulfillments}
                options={{
                    // headerShown: false,
                    title: 'Fulfillments',
                    headerTitleAlign: 'center'
                }}
            />
             <AppStack.Screen name={routes.dealer.fulfillmentDetail} component={Seller.FulfillmentDetail}
                options={{
                    // headerShown: false,
                    title: 'Fulfillment Detail',
                }}
            />
        </AppStack.Navigator>
    )
}

export default AppNavigation