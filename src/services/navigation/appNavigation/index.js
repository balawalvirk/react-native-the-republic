import React, {Component, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {header, routes, headers, tabs} from '../../constants';
import * as MainApp from '../../../screens/mainFlow';
import * as CommunityScreens from '../../../screens/mainFlow/community';
import * as Seller from '../../../screens/sellerFlow';
import {
  CustomIcon,
  ImageRound,
  ComponentWrapper,
  MediumText,
  Spacer,
  Wrapper,
  RowWrapper,
  AbsoluteWrapper,
  ImageProfile,
  SmallTitle,
  LogoMain,
  LocationPickerButton,
  PopupPrimary,
} from '../../../components';
import {
  appIcons,
  appImages,
  appStyles,
  colors,
  fontFamily,
  fontSize,
  sizes,
} from '../../utilities';
import {totalSize, width} from 'react-native-dimension';
import {Badge, Icon} from 'react-native-elements';
import {FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommunityCustomTopTab from './communityCustomTopTab';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from '../rootNavigation';
import {MyToast, PushNotification} from '../..';
const AppStack = createStackNavigator();
const MainBottomTab = createBottomTabNavigator();
const MainBottomTabStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();
const CommunityTopTab = createMaterialTopTabNavigator();

const drawerScreens = [
  {screen: 'Home', route: routes.mainDrawer},
  {screen: 'Follow Requests', route: routes.followRequests},
  {screen: 'Dealers', route: routes.dealers},
  {screen: 'Training', route: routes.trainings},
  {screen: 'Comments', route: routes.comments},
  {screen: 'The Republic News', route: routes.theRepublicNews},
  {screen: 'Contact Us', route: routes.contactUs},
];

const CommunityTopTabScreens = ({navigation}) => {
  return (
    <CommunityTopTab.Navigator
      tabBar={props => <CommunityCustomTopTab {...props} />}
      swipeEnabled={false}
      initialRouteName={routes.communitySubscribed}>
      <CommunityTopTab.Screen
        name={routes.communitySubscribed}
        component={CommunityScreens.Subscribed}
      />
      <CommunityTopTab.Screen
        name={routes.communityDealers}
        component={CommunityScreens.Dealers}
      />
      <CommunityTopTab.Screen
        name={routes.communityGroups}
        component={CommunityScreens.Groups}
      />
      <CommunityTopTab.Screen
        name={routes.communityYourGroups}
        component={CommunityScreens.yourGroups}
      />
    </CommunityTopTab.Navigator>
  );
};

function BottomTabScreens() {
  const tabIconSize = totalSize(3);
  //const colors = useSelector(state => state.theme.appTheme)

  //redux state
  const user = useSelector(state => state.user);
  const {userDetail} = user;

  return (
    <>
      <MainBottomTab.Navigator
        // tabBarOptions={{
        //     ...tabs.tabBarOptions,
        // }}
        screenOptions={{headerShown: false, ...tabs.tabBarOptions,}}>
        <MainBottomTab.Screen
          name={routes.marketPlace}
          component={MainApp.MarketPlace}
          options={() => ({
            tabBarLabel: 'Marketplace',
            tabBarIcon: ({color, size, focused}) => {
              return (
                <CustomIcon
                  icon={appIcons.marketplace}
                  size={tabIconSize}
                  color={color}
                  focused={focused}
                />
              );
            },
          })}
        />
        <MainBottomTab.Screen
          name={routes.find}
          component={MainApp.Find}
          options={() => ({
            tabBarLabel: 'Find',
            tabBarIcon: ({color, size, focused}) => {
              return (
                <CustomIcon
                  icon={appIcons.globe}
                  size={tabIconSize}
                  color={color}
                  focused={focused}
                />
              );
            },
          })}
        />
        <MainBottomTab.Screen
          name={'null'}
          component={() => null}
          options={() => ({
            tabBarLabel: 'Sell',
            tabBarIcon: ({color, size, focused}) => {
              // return <CustomIcon icon={appIcons.add_circle} size={tabIconSize} color={color} focused={focused} />
              return (
                <Icon
                  name="camera"
                  type="feather"
                  size={tabIconSize}
                  color={color}
                  focused={focused}
                />
              );
            },
          })}
          listeners={({navigation}) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate(routes.sell);
            },
          })}
        />
        <MainBottomTab.Screen
          name={routes.community}
          component={CommunityTopTabScreens}
          options={() => ({
            tabBarLabel: 'Community',
            tabBarIcon: ({color, size, focused}) => {
              return (
                <CustomIcon
                  icon={appIcons.users}
                  size={tabIconSize}
                  color={color}
                  focused={focused}
                />
              );
            },
          })}
        />

        <MainBottomTab.Screen
          name={routes.profile}
          component={MainApp.Profile}
          options={() => ({
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size, focused}) => {
              //return <CustomIcon icon={appIcons.marketplace} size={tabIconSize} color={color} focused={focused} />
              return (
                <ImageRound
                  source={{
                    uri: userDetail
                      ? userDetail.profile_photo_path
                        ? userDetail.profile_photo_path
                        : appImages.noUser
                      : appImages.noUser,
                  }}
                  size={tabIconSize}
                  style={{
                    opacity: focused ? 1 : 0.5,
                    borderColor: colors.appColor1,
                  }}
                />
              );
            },
          })}
        />
      </MainBottomTab.Navigator>
    </>
  );
}

function BottomTabStackScreens() {
  const user = useSelector(state => state.user);
  const {userDetail} = user;
  let newNotificationsCount = '';
  let newMessagesCount = '';
  if (userDetail) {
    newNotificationsCount = userDetail.notification_count;
    newMessagesCount = userDetail.messages_count;
  }
  const notificationData =
    '{"data":"User Twelve like  Your Post","profile_image":"https:\\/\\/republic-bucket-2.s3.us-west-2.amazonaws.com\\/images\\/16347381212663E500-76FB-4648-8828-3AA42EAAC2D7.jpg","user":"User Twelve","content":{"id":18,"user_id":10,"group_id":3,"product_id":null,"post_type":"group","images":"[\\"https:\\\\\\/\\\\\\/republic-bucket-2.s3.us-west-2.amazonaws.com\\\\\\/images\\\\\\/1636730533A20EF343-774A-4B33-B5E9-DE6DDCC89A45.jpg\\"]","title":null,"tags":null,"views":29,"created_at":"2021-11-12T15:22:13.000000Z","updated_at":"2021-11-25T13:04:56.000000Z","video":null,"profile":null,"user":{"id":10,"first_name":"User","last_name":"Seven","email":"user7@test.com","username":"user7","gender":"male","birthday":"1987-10-05T05:17:22.000Z","phone":"3450144778","email_verified_at":null,"profile_image":"https:\\/\\/republic-bucket-2.s3.us-west-2.amazonaws.com\\/images\\/1632112825473B82DC-C12F-41D4-BC6E-FFC425F6B67B.jpg","country_code":"AF","country_phone_code":"93","created_at":"2021-09-16T14:06:00.000000Z","updated_at":"2021-11-26T03:01:19.000000Z","identity_approved":false,"fcm_token":"e7W7izBvRAq7lKyT6d6Hx3:APA91bFpXKumU4xSVol9S7VLyk66y01yxL4a9upbornOHSmqPNIHsGvOmllcP0O1A5X0N13L6kbNqRkoh3ofy07j7FUd6-iPGP4t1ufdDYhVIrHT0ZAi8rpnL8RRNInFAG9eVpQayNmL","subscription_id":"sub_1JhSQBLAATci74dLqW1YU3lg","customer_id":"cus_KMAVvMYbynMxtk","payment_id":"pm_1JhSNLLAATci74dLsblfI7tv","user_type":"dealer\\/pro","latitude":"32.4944991","longitude":"74.5228916","distance":"10","subscription_plan":"Dealer\\/Pro","default_card_id":"3","default_dealer_id":18,"address":"Sialkot, Pakistan","get_notify":null,"get_chat":null,"profile_photo_url":"https:\\/\\/ui-avatars.com\\/api\\/?name=&color=7F9CF5&background=EBF4FF"},"reactions":[{"id":46,"user_id":18,"post_id":18,"comment_id":null,"reaction":"like","created_at":"2021-11-26T03:15:58.000000Z","updated_at":"2021-11-26T03:15:58.000000Z"}],"comments":[]},"type":"postReaction"}';
  return (
    <MainBottomTabStack.Navigator
      screenOptions={headers.screenOptionsSecondary}
      initialRouteName={'mainBottomTabScreens'}>
      <MainBottomTabStack.Screen
        name={'mainBottomTabScreens'}
        component={BottomTabScreens}
        options={({navigation, route}) => ({
          title: '',
          headerTitle: () => (
            <Wrapper style={{alignItems: 'flex-start'}}>
              <LocationPickerButton
                onPress={() => navigation.navigate(routes.myLocation)}
                // text="Broklyn, NYC"
              />
            </Wrapper>
          ),
          headerRight: () => (
            <RowWrapper style={[{marginRight: sizes.marginHorizontal}]}>
              <CustomIcon
                icon={appIcons.search}
                size={sizes.icons.medium}
                color={colors.appTextColor1}
                onPress={() => navigation.navigate(routes.search)}
              />
              <Spacer width={sizes.marginHorizontal} />
              <CustomIcon
                value={newNotificationsCount ? newNotificationsCount : ''}
                icon={appIcons.bell}
                size={sizes.icons.medium}
                color={colors.appTextColor1}
                onPress={() => navigation.navigate(routes.notifications)}
              />
              <Spacer width={sizes.marginHorizontal} />
              <CustomIcon
                value={newMessagesCount ? newMessagesCount : ''}
                icon={appIcons.chat}
                size={sizes.icons.medium}
                color={colors.appTextColor1}
                onPress={() => navigation.navigate(routes.chats)}
              />
            </RowWrapper>
          ),
          headerLeft: () => (
            <RowWrapper style={[{}]}>
              <CustomIcon
                onPress={() => navigation.toggleDrawer()}
                //onPress={() => MyToast.success({ message: 'asdasd' })}
                //  onPress={() => {
                //      const data = JSON.parse(notificationData)
                //      PushNotification.show({ image: data.profile_photo_path, message: data.data, data: data.content,notificationType:'postReaction' })
                //  }}
                icon={appIcons.menu}
                size={sizes.icons.medium}
                color={colors.appTextColor1}
              />
            </RowWrapper>
          ),
        })}
      />
    </MainBottomTabStack.Navigator>
  );
}
const CustomDrawerContent = props => {
  const {navigation} = props;
  const {navigate} = props.navigation;
  return (
    <Wrapper flex={1}>
      <Wrapper flex={3} style={[appStyles.center]}>
        <LogoMain size={width(35)} />
      </Wrapper>
      <Wrapper flex={6}>
        <FlatList
          data={drawerScreens}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate(item.route);
                  navigation.toggleDrawer();
                }}
                style={[
                  styles.drawerOption,
                  item.screen === 'Home' && styles.drawerOptionSelected,
                ]}>
                <MediumText>{item.screen}</MediumText>
              </TouchableOpacity>
            );
          }}
        />
      </Wrapper>
      <Wrapper flex={1}>
        <TouchableOpacity
          onPress={() => {
            navigate(routes.subscriptionPlan);
            navigation.toggleDrawer();
          }}
          style={[styles.upgradeBtn]}>
          <MediumText style={[appStyles.textWhite]}>Upgade</MediumText>
        </TouchableOpacity>
      </Wrapper>
    </Wrapper>
  );
};
const MainSideDrawer = () => {
  return (
    <MainDrawer.Navigator
      initialRouteName={routes.mainBottomTab}
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
          headerShown: false,
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
function AppNavigation() {
  const dispatch = useDispatch();

  useEffect(() => {
    handleOnOpenNotification();
    handelNotificationListner();
  }, []);
  const handleOnPressNotification = data => {
    const {navigate} = RootNavigation;
    // navigate(routes.postDetail, { item: JSON.parse(content) })
    const {type} = data;
    const content = JSON.parse(data.content);
    if (type === 'postReaction') {
      navigate(routes.postDetail, {postId: content.id});
    } else if (type === 'postComment') {
      navigate(routes.postDetail, {postId: content.id});
    } else if (type === 'followRequestAccepted') {
      navigate(routes.userProfile, {userId: content.id});
    } else if (type === 'newFollowRequest') {
      navigate(routes.followRequests);
    } else if (type === 'followUser') {
      // navigate(routes.followRequests)
      navigate(routes.userProfile, {userId: content.id});
    } else if (type === 'productReview') {
      //toggleApproveReview()
    }
  };
  const handleOnOpenNotification = () => {
    const {navigate} = RootNavigation;
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
        const {data} = remoteMessage;
        handleOnPressNotification(data);
      }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          //  setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          if (remoteMessage.data) {
            const {data} = remoteMessage;
            handleOnPressNotification(data);
          }
        }
      });
  };
  const handelNotificationListner = () => {
    messaging().onMessage(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification Has been recieved:', remoteMessage);
        //  setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        if (remoteMessage.data) {
          const {data} = remoteMessage;
          const content = JSON.parse(data.content);
          PushNotification.show({
            image: data.profile_photo_path,
            message: data.body,
            data: content,
            notificationType: data.type,
          });
          //MyToast.success({message:data.body})
        }
      }
    });
  };
  return (
    <AppStack.Navigator
      screenOptions={headers.screenOptionsSecondary}
      initialRouteName={routes.mainDrawer}>
      <AppStack.Screen
        name={routes.mainDrawer}
        component={MainSideDrawer}
        options={{
          headerShown: false,
          //title: 'Sign In'
        }}
      />
      <AppStack.Screen
        name={routes.sell}
        component={MainApp.Sell}
        options={{
          ...headers.screenOptionsPrimary,
          //headerShown: false,
          title: 'Post an Item',
        }}
      />
      <AppStack.Screen
        name={routes.shareApost}
        component={MainApp.ShareAPost}
        options={{
          //...headers.screenOptionsPrimary,
          //headerShown: false,
          title: 'Share a Post',
        }}
      />
      <AppStack.Screen
        name={routes.tagFriends}
        component={MainApp.TagFriends}
        options={{
          // headerShown: false,
          title: 'Tag Friends',
          // headerTitleAlign:'center'
        }}
      />
      <AppStack.Screen
        name={routes.followRequests}
        component={MainApp.FollowRequests}
        options={{
          // headerShown: false,
          title: 'Follow Requests',
        }}
      />
      <AppStack.Screen
        name={routes.dealers}
        component={MainApp.Dealers}
        options={({navigation, route}) => ({
          title: 'Dealers',
          headerRight: () => (
            <ComponentWrapper>
              <LocationPickerButton
                onPress={() => navigation.navigate(routes.myLocation)}
                // text="Broklyn, NYC"
              />
            </ComponentWrapper>
          ),
        })}
      />
      <AppStack.Screen
        name={routes.trainings}
        component={MainApp.Trainings}
        options={({navigation, route}) => ({
          title: 'Training',
          headerRight: () => (
            <ComponentWrapper>
              <LocationPickerButton
                onPress={() => navigation.navigate(routes.myLocation)}
                // text="Broklyn, NYC"
              />
            </ComponentWrapper>
          ),
        })}
      />
      <AppStack.Screen
        name={routes.trainingInfo}
        component={MainApp.TrainingInfo}
        options={({navigation, route}) => ({
          title: 'Training Info',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name={routes.comments}
        component={MainApp.Comments}
        options={{
          // headerShown: false,
          title: 'Comments',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.theRepublicNews}
        component={MainApp.TheRepublicNews}
        options={{
          // headerShown: false,
          title: 'The Republic News',
        }}
      />
      <AppStack.Screen
        name={routes.contactUs}
        component={MainApp.ContactUs}
        options={{
          // headerShown: false,
          title: 'Contact Us',
        }}
      />
      <AppStack.Screen
        name={routes.subscriptionPlan}
        component={MainApp.SubscriptionPlan}
        options={{
          // headerShown: false,
          title: 'Subscription Plan',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.myLocation}
        component={MainApp.MyLocation}
        options={{
          // headerShown: false,
          title: 'My Location',
        }}
      />
      <AppStack.Screen
        name={routes.search}
        component={MainApp.Search}
        options={({navigation, route}) => ({
          title: 'Search',
          headerRight: () => (
            <ComponentWrapper>
              <LocationPickerButton
                onPress={() => navigation.navigate(routes.myLocation)}
                //text="Broklyn, NYC"
              />
            </ComponentWrapper>
          ),
        })}
      />
      <AppStack.Screen
        name={routes.notifications}
        component={MainApp.Notifications}
        options={{
          // headerShown: false,
          title: 'Notifications',
        }}
      />
      <AppStack.Screen
        name={routes.chats}
        component={MainApp.Chats}
        options={{
          // headerShown: false,
          title: 'Messages',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.chatScreen}
        component={MainApp.ChatScreen}
        options={{
          // headerShown: false,
          title: 'Chat',
        }}
      />
      <AppStack.Screen
        name={routes.productDetail}
        component={MainApp.ProductDetail}
        options={{
          headerShown: false,
          //title: 'Chats'
        }}
      />
      <AppStack.Screen
        name={routes.reviews}
        component={MainApp.Reviews}
        options={{
          // headerShown: false,
          title: 'Reviews',
        }}
      />
      <AppStack.Screen
        name={routes.userProfile}
        component={MainApp.UserProfile}
        options={{
          headerShown: false,
          // title: 'Reviews'
        }}
      />
      <AppStack.Screen
        name={routes.CategoryDetail}
        component={MainApp.CategoryDetail}
        options={{
          // headerShown: false,
          title: 'Category Detail',
        }}
      />
      <AppStack.Screen
        name={routes.categories}
        component={MainApp.Categories}
        options={{
          // headerShown: false,
          title: 'Categories',
        }}
      />
      <AppStack.Screen
        name={routes.sortFilter}
        component={MainApp.SortFilter}
        options={{
          // headerShown: false,
          ...headers.screenOptionsPrimary,
          title: 'Sort & Filters',
        }}
      />
      <AppStack.Screen
        name={routes.groupDetail}
        component={MainApp.GroupDetail}
        options={{
          // headerShown: false,
          title: 'Group',
        }}
      />
      <AppStack.Screen
        name={routes.favourites}
        component={MainApp.Favourites}
        options={{
          // headerShown: false,
          title: 'Favourites',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.editProfile}
        component={MainApp.EditProfile}
        options={{
          // headerShown: false,
          title: 'Edit Profile',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.changePassword}
        component={MainApp.ChangePassword}
        options={{
          // headerShown: false,
          title: 'Change Password',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.paymentMethods}
        component={MainApp.PaymentMethods}
        options={{
          // headerShown: false,
          title: 'Payment Methods',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.purchaseHistory}
        component={MainApp.PurchaseHistory}
        options={{
          // headerShown: false,
          title: 'Purchase History',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.buyNow}
        component={MainApp.BuyNow}
        options={{
          // headerShown: false,
          title: 'Buy Now',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.deliveryAddress}
        component={MainApp.DeliveryAddress}
        options={{
          // headerShown: false,
          title: 'Delivery Address',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.fflDealers}
        component={MainApp.FflDealers}
        options={{
          // headerShown: false,
          title: 'FFL Dealers',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.orderDetail}
        component={MainApp.OrderDetail}
        options={{
          // headerShown: false,
          title: 'Order Detail',
        }}
      />
      <AppStack.Screen
        name={routes.orderInvoice}
        component={MainApp.OrderInvoice}
        options={{
          // headerShown: false,
          title: 'order Invoice',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.upgradeSubscriptionPlan}
        component={MainApp.UpgradeSubscriptionPlan}
        options={{
          // headerShown: false,
          title: 'Upgrade Subscription Plan',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.selectDateTime}
        component={MainApp.SelectDateTime}
        options={{
          // headerShown: false,
          title: 'Select Date and Time',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.payment}
        component={MainApp.Payment}
        options={{
          // headerShown: false,
          title: 'Payment',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.createGroup}
        component={MainApp.CreateGroup}
        options={{
          // headerShown: false,
          title: 'Create Group',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.groupPrivacySettings}
        component={MainApp.PrivacySettings}
        options={{
          // headerShown: false,
          title: 'Privacy Settings',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.groupMemberRequests}
        component={MainApp.MemberRequests}
        options={{
          // headerShown: false,
          title: 'Member Requests',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.postDetail}
        component={MainApp.PostDetail}
        options={{
          // headerShown: false,
          title: '',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.sortFilterDealers}
        component={MainApp.SortFilterDealers}
        options={{
          // headerShown: false,
          title: 'Sort & Filters',
          //headerTitleAlign: 'center'
        }}
      />
      <AppStack.Screen
        name={routes.reportContent}
        component={MainApp.ReportContent}
        // options={{
        //     // headerShown: false,
        //     title: 'Report',
        //     headerTitleAlign: 'center'
        // }}
        options={({navigation, route}) => ({
          title: 'Report ' + (route.params.post ? 'Post' : 'Comment'),
          headerTitleAlign: 'center',
          // headerRight: () =>
          //     <ComponentWrapper >
          //         <LocationPickerButton
          //             onPress={() => navigation.navigate(routes.myLocation)}
          //         //text="Broklyn, NYC"
          //         />
          //     </ComponentWrapper>,
        })}
      />

      {/* Seller screen */}
      <AppStack.Screen
        name={routes.seller.sellerDashboard}
        component={Seller.SellerDashboard}
        options={{
          // headerShown: false,
          title: 'Seller Dashboard',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.yourProducts}
        component={Seller.YourProducts}
        options={{
          // headerShown: false,
          title: 'Your Products',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.requests}
        component={Seller.Requests}
        options={{
          // headerShown: false,
          title: 'Requests',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.orders}
        component={Seller.Orders}
        options={{
          // headerShown: false,
          title: 'Orders',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.OrderDetail}
        component={Seller.OrderDetails}
        options={{
          // headerShown: false,
          title: 'Order Detail',
          // headerTitleAlign: 'center'
        }}
      />

      <AppStack.Screen
        name={routes.seller.earnings}
        component={Seller.Earnings}
        options={{
          // headerShown: false,
          title: 'Earnings',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.withdrawEarnings}
        component={Seller.WithdrawEarnings}
        options={{
          // headerShown: false,
          title: 'Withdraw Earnings',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.withdraw}
        component={Seller.Withdraw}
        options={{
          // headerShown: false,
          title: 'Withdraw',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.trainings}
        component={Seller.Trainings}
        options={{
          // headerShown: false,
          title: 'Trainings',
          //  headerTitleAlign: 'center'
        }}
      />
      <AppStack.Screen
        name={routes.seller.createTrainin}
        component={Seller.CreateTraining}
        options={{
          // headerShown: false,
          title: 'Create Trainin',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.selectDateTime}
        component={Seller.SelectDateTime}
        options={{
          // headerShown: false,
          title: 'Select Date and Time',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.coupons}
        component={Seller.Coupons}
        options={{
          // headerShown: false,
          title: 'Coupons',
          // headerTitleAlign: 'center'
        }}
      />
      <AppStack.Screen
        name={routes.seller.createCoupon}
        component={Seller.CreateCoupon}
        options={{
          // headerShown: false,
          title: 'Create Coupons',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.invoices}
        component={Seller.Invoices}
        options={{
          // headerShown: false,
          title: 'Invoices',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.reports}
        component={Seller.Reports}
        options={{
          // headerShown: false,
          title: 'Reports',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.seller.services}
        component={Seller.Services}
        options={{
          // headerShown: false,
          title: 'Services',
          headerTitleAlign: 'center',
        }}
      />

      {/* Dealer App Screens */}
      <AppStack.Screen
        name={routes.dealer.fulfillments}
        component={Seller.Fulfillments}
        options={{
          // headerShown: false,
          title: 'Fulfillments',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name={routes.dealer.fulfillmentDetail}
        component={Seller.FulfillmentDetail}
        options={{
          // headerShown: false,
          title: 'Fulfillment Detail',
        }}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
