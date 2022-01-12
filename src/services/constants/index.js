import React from 'react'
import { appStyles, colors } from "../../services"
import { BackIcon, ComponentWrapper } from "../../components"
import { Platform } from 'react-native'
import { fontFamily, sizes } from '../utilities'
import { totalSize } from 'react-native-dimension'
import DummyData from './dummyData'

export const stripeKeys = {
    publishable_key: 'pk_test_51Jb6KVLAATci74dLLsZkauglGDRsOx377wrbAm69Q8jyZIRf95BvebllW2hYopF65KH1hBf5BGd1MTaZsXgIZYK200IHqAYJUa',
    secret_key: 'sk_test_51Jb6KVLAATci74dLGLOUlvIjucfhcHvHZHdgiLlXedshWcvr3efJDhwdkLfMxHKnZxzuONFWjuvBRdjEjOTVLS4S00YmPfQOaB',
    authorization_key: 'Bearer sk_test_51Jb6KVLAATci74dLGLOUlvIjucfhcHvHZHdgiLlXedshWcvr3efJDhwdkLfMxHKnZxzuONFWjuvBRdjEjOTVLS4S00YmPfQOaB',
    //Products
    subscription_dealerPro_price: 'price_1JfK9bLAATci74dLgFEnBC7F',
    subscription_premium_price: 'price_1JfK93LAATci74dLdguEUbWK'
}
export const baseURL = 'https://republic-backend.herokuapp.com/api/'
export const GOOGLE_MAPS_APIKEY = 'AIzaSyA2mTVqK-uOK_Pbo0tTXyUtUP84cClbS9Q&v'
export const google_places_api_key = 'AIzaSyAyItdXh8Zmxa7iCAyDVPH_UAJ5iUTGtEA'
export const endPoints = {
    user: {
        login: 'login',
        user_register: 'user-register',
        complete_profile: 'complete-profile',
        update_phone: 'update-phone',
        update_profile: 'update-profile',
        submit_identity: 'submit-identity',
        approve_identity: 'approve-identity',
        reject_identity: 'reject-identity',
        check_user: 'check-user',
        update_delivery_address: 'update-delivery-address',
        show_user_profile: 'show-user-profile',
        change_password: 'change-password',
        save_fcm_token: 'save-fcm-token'
    },
    sociaAuth: {
        register_google: 'google-register',
        login_google: 'google-login',
        register_instagram: 'instagram-register',
        login_instagram: 'instagram-login',
        register_apple: 'apple-register',
        login_apple: 'apple-login',
    },
    creditCard: {
        add_card: 'add-card',
        show_cards: 'show-cards'
    },
    fullfillment: {
        add_fullfillment: 'add-fullfillment',
        update_fullfillment: 'update-fullfillment',
        get_fullfillments: 'get-fullfillments'
    },
    follow: {
        send_follow_request: 'send-follow-request',
        show_follow_requests: 'show-follow-requests',
        accept_follow_request: 'accept-follow-request',
        decline_follow_request: 'decline-follow-request',
        show_followers: 'show-followers',
        //unfollow_user: 'unfollow-user',
        unfollow_follower: 'unfollow-follower',
        show_followings: 'show-followings',
        unfollow_following: 'unfollow-following'

    },
    training: {
        show_trainings: 'show-trainings',
        add_training: 'add-training',
        show_training: 'show-training',
        book_training: 'book-training',
        user_trainings: 'user-trainings',
        add_timeslot: 'add-timeslot',
        show_timeslots: 'show-timeslots',
        show_timeslot: 'show-timeslot',
        delete_timeslot: 'delete-timeslot',
        edit_training: 'edit-training',
        delete_training: 'delete-training',
        send_training_request: 'send-training-request',
        show_training_requests: 'show-training-requests',
        accept_training_request: 'accept-training-request',
        reject_training_request: 'reject-training-request',
        user_training_requests: 'user-training-requests',
        trainer_training_requests: 'all-training-requests',
        accept_training_request: 'accept-training-request',
        reject_training_request: 'reject-training-request'
    },
    category: {
        add_category: 'add-category',
        show_categories: 'show-categories',
        delete_category: 'delete-category'
    },
    product: {
        add_product: 'add-product',
        user_products: 'user-products',
        edit_product: 'edit-product',
        delete_product: 'delete-product',
        add_favorite_product: 'add-favorite-product',
        show_favorite_products: 'show-favorite-products',
        remove_favorite_product: 'remove-favorite-product',
        category_products: 'category-products',
        filter_products: 'filter-products',
        product_review: 'product-review',
        show_reviews: 'show-reviews',
        edit_review: 'edit-review',
        delete_review: 'delete-review',
        get_reviews_by_order: 'get-reviews-by-order',
        nearby_products: 'nearby-products',
        show_categories: 'show-categories',
        show_items: 'show-items',
        show_manufacturers: 'show-manufacturers',
        show_calibers: 'show-calibers',
        show_actions: 'show-actions',
        show_conditions: 'show-conditions',
        top_rated_products: 'top-rated-products',
        popular_products: 'popular-products',
        nearby_products: 'nearby-products',
        featured_products: 'featured-products',
        related_products: 'related-products',
        get_all_products: 'get-all-products',
        get_map_products: 'get-map-products',
        get_product_detail: 'single-product',

    },
    post: {
        add_post: 'add-post',
        show_posts: 'show-posts',
        single_post: 'single-post',
        delete_post: 'delete-post',
        report_post: 'report-post',
        add_reaction: 'add-reaction',
        show_reactions: 'show-reactions',
        delete_reaction: 'delete-reaction',
        add_comment: 'add-comment',
        show_comments: 'show-comments',
        edit_comment: 'edit-comment',
        delete_comment: 'delete-comment',
        report_comment: 'report-comment',
        get_group_posts: 'get-group-posts',
        get_following_posts: 'get-following-posts',
        get_joined_groups_posts: 'get-joined-group-posts',
        get_subscribed_posts: 'get-subscribed-posts',
        get_user_posts: 'get-user-posts'

    },
    chat: {
        show_conversations: 'show-conversations',
        send_message: 'send-message',
        show_messages: 'show-messages'
    },
    call: {
        add_callhistory: 'add-callhistory',
        show_callhistories: 'show-callhistories',
        delete_callhistory: 'delete-callhistory'
    },
    coupon: {
        create_coupon: 'create-coupon',
        show_coupons: 'show-coupons',
        edit_coupon: 'edit-coupon',
        delete_coupon: 'delete-coupon'
    },
    group: {
        create_group: 'create-group',
        edit_group: 'edit-group',
        send_join_request: 'send-join-request',
        accept_request: 'accept-request',
        decline_request: 'decline-request',
        show_group_members: 'show-group-members',
        remove_group_member: 'remove-group-member',
        show_members_requests: 'show-members-requests',
        search_groups: 'search-groups',
        get_user_groups: 'get-user-groups',
        get_joined_groups: 'get-joined-groups',
        get_group_detail: 'get-group-detail'
    },
    order: {
        create_order: 'create-order',
        update_order: 'update-order',
        get_orders: 'get-orders',
        update_order_status: 'update-order-status',
        get_reports: 'get-reports',
        get_invoices: 'get-invoices',
        get_invoice: 'get-invoice',
        get_earnings_reports: 'get-earnings',
        weekly_reports: 'weekly-reports',
        advance_reports: 'advance-reports',
        user_orders: 'user-orders',

    },
    dealer: {
        get_dealers: 'get-dealers',
        search_dealers: 'search-dealers',
        add_favorite_dealer: 'add-favorite-dealer',
        remove_favorite_dealer: 'remove-favorite-dealer',
        show_favorite_dealers: 'show-favorite-dealers'
    },
    bank: {
        add_bank_account: 'add-bank-account',
        get_bank_accounts: 'get-bank-accounts',
        get_banks: 'get-banks'
    },
    feature: {
        add_feature: 'add-feature',
        show_features: 'show-features',
    },
    notificaitons: {
        show_notifications: 'show-notifications',
        read_all_notifications: 'read-all-notifications',
        read_single_notification: 'read-single-notification',
        get_new_notification: 'get-new-notifications'
    },
    news: {
        get_news: 'get-news',
        clear_single_news: 'clear-single-news',
        clear_all_news: 'clear-all-news',
    },
    search: {
        recent_searches: 'recent-searches',
        search_all: 'search',
    },
    services: {
        create_service: 'create-service',
        add_service: 'add-service',
        remove_service: 'remove-service',
        get_services: 'get-services'
    },
    forgotPassword: {
        resetPassword: 'https://republic-backend.herokuapp.com/password/email',
        sendCsrfToken: 'https://republic-backend.herokuapp.com/get-csrf',
    },
    withdraw: {
        withdraw_amount: '/withdraw-amount',
        withdraw_history: '/withdraw-history'
    },
    contact_us: 'contact-us',
    add_card: 'add-card',
    submit_app_feedback: 'submit-app-feedback'
}
export const stripe_base_url = 'https://api.stripe.com/v1/'
export const stripe_endpoints = {
    accounts: 'accounts',
    external_accounts: 'external_accounts'
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
    communitySubscribed: 'communitySubscribed',
    communityDealers: 'communityDealers',
    communityGroups: 'communityGroups',
    communityYourGroups: 'communityYourGroups',
    find: 'find',
    marketPlace: 'marketPlace',
    profile: 'profile',
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
    postDetail: 'postDetail',
    reportContent: 'reportContent',
    sortFilterDealers: 'sortFilterDealers',
    trainingInfo: 'trainingInfo',
    seller: {
        sellerDashboard: 'sellerDashboard',
        yourProducts: 'yourProducts',
        reports: 'reports',
        requests: 'requests',
        orders: 'orders',
        OrderDetail: 'OrderDetails',
        earnings: 'earnings',
        trainings: 'yourTrainings',
        coupons: 'coupons',
        createCoupon: 'createCoupon',
        invoices: 'invoices',
        withdrawEarnings: 'withdrawEarnings',
        createTrainin: 'createTrainin',
        selectDateTime: 'sellcerSelectDateTime',
        services: 'services'
    },
    dealer: {
        fulfillments: 'fulfillments',
        fulfillmentDetail: 'fulfillmentDetail'
    },


}
export const asyncConsts = {
    user_credentials: 'USER_CREDENTIALS',
    google_token: 'GOOGLE_TOKEN',
    instagram_token: 'INSTAGRAM_TOKEN',
    instagram_credentials: 'INSTAGRAM_CREDENTIALS',
    google_credentials: 'GOOGLE_CREDENTIALS',
    apple_token: 'APPLE_TOKEN',
    user_details: 'USER_DETAILS',
    fcm_token: "FCM_TOKEN",
    product_categories: 'PRODUCT_CATEGORIES',
    product_items: 'PRODUCT_ITEMS',
    product_manufacturers: 'PRODUCT_MANUFACTURERS',
    product_calibers: 'PRODUCT_CALIBERS',
    product_actions: 'PRODUCT_ACTIONS',
    product_conditions: 'PRODUCT_CONDITIONS',
    fcmToken: 'FCM_TOKEN',
    recentSearches: 'RECENT_SEARCHES'
}
export const orderStatuses = {
    pending: 'pending',
    accepted: 'accepted',
    shipping: 'shipping',
    delivered: 'delivered',
    completed: 'completed',
    cancelled: 'cancelled'
}
export const fulfillmentStatuses = {
    inProgess: 'inProgress',
    received: 'received',
    shipmentPending: 'shipmentPending',
    sentForShipment: 'sentForShipment',
    delivered: 'delivered',
    completed: 'completed',
}
export const fulfillmentTypes = {
    buyerDealer: 'buyerDealer',
    sellerDealer: 'sellerDealer'
}
export const postTypes = {
    post: 'post',
    product: 'product',
    group: 'group',
    groupProduct: 'groupProduct'
}
export const groupJoinPrivacies = {
    everyone: 'everyone',
    onlyApprovedMembers: 'onlyApprovedMembers',
    onlyInvitedPeople: 'onlyInvitedPeople',
}
export const groupPostPrivacies = {
    everyone: 'everyone',
    onlyAdmin: 'onlyAdmin',
}
export const sortingOptions = {
    topRated: 'top_rated',
    title_a_z: 'a_to_z',
    title_z_a: 'z_to_a',
    price_low_to_high: 'lo_to_hi',
    price_high_to_low: 'hi_to_lo',
    distance: 'distance'
}
export const searchTypes = {
    all: 'all',
    dealer: 'dealer',
    product: 'product',
    group: 'group',
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
export const appDeeplinks = {
    app: 'https://republic://app',
    auth: 'https://republic://auth'
}
export const SHOW_TOAST_MESSAGE = 'SHOW_TOAST_MESSAGE';
export const SHOW_PUSH_NOTIFICATION = 'SHOW_PUSH_NOTIFICATION';
export { DummyData }