import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { IconWithText, HeaderPrimary, Spacer, RowWrapperBasic, Wrapper, TextInputColored, MediumText,ButtonGroupAnimated } from '../../../../components';
import { height, width, totalSize } from 'react-native-dimension';
import { appStyles, sizes, colors, appIcons } from '../../../utilities';
import styles from './styles';
import { routes, HelpingMethods } from '../../..';
import { useSelector, useDispatch } from 'react-redux';


export default function CommunityCustomTopTab(props) {

    //redux states
    const user = useSelector(state => state.user)
    const { newItems } = user
    const tempTabs = [
        {
            title: 'Subscribed',
            route: routes.communitySubscribed
        },
        {
            title: 'Dealers',
            route: routes.communityDealers
        },
        {
            title: 'Groups',
            route: routes.communityGroups
        },
        {
            title: 'Your Groups',
            route: routes.communityYourGroups
        }
    ]
    const [tabs] = useState(tempTabs)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const navigationHandler = (routeName) => {
        props.navigation.navigate(routeName);
    }

    //Redus states
    // const dispatch = useDispatch()
    // const newItems = useSelector(state => state.user.newItems)


    const { state, descriptors, navigation } = props
    //console.log("state==>", state)
    const { index } = state;
    const activeIndex = index

    useEffect(()=>{
        setSelectedTabIndex(activeIndex)
    },[activeIndex])
    //console.log('Tab screen index --> ',activeIndex)
    if (activeIndex === 2) {
       // navigation.setOptions({ tabBarVisible: false })
    } else {
       // navigation.setOptions({ tabBarVisible: true })
    }
    return (
        <View style={{ backgroundColor: colors.appBgColor1 }}>
            <View
            // style={{ height: height(25),zIndex:1, width: width(100), position: 'absolute', top: 0, right: 0, left: 0 }}
            >
                {/* <HeaderPrimary
                    onpressLogo={() => { }}
                    //onPressSearch={handleSearchVisibility}
                    // hasNotification={HelpingMethods.checkIfNewItemsAvailable()}
                    notificationCount={HelpingMethods.getNewItemsCount()}
                    onPressSearch={() => {
                        //dispatch(setMapFocus(false))
                        props.navigation.navigate(routes.search)
                    }}
                    onPressNotification={() => {
                        props.navigation.navigate(routes.notifications)
                    }}
                    onPressUser={() => props.navigation.navigate(routes.profile)}
                /> */}
                {/* <AnimatedTabs
                    data={tabs}
                    text={'title'}
                    activeIndex={activeIndex}
                    containerStyle={styles.filterContainerStyle}
                    inActiveButtonStyle={styles.filterActive}
                    activeButtonStyle={styles.filterStyleBtn}
                    activeTextStyle={styles.filterActiveTxt}
                    inactiveTextStyle={styles.filterInactiveTxt}
                    onPressButton={(item, index) => {
                        setSelectedTabIndex(index)
                        navigationHandler(item.route)
                        //this.handleOnPress(item, key)

                    }}
                /> */}
                <Spacer height={sizes.smallMargin} />

                <ButtonGroupAnimated
                    initalIndex={selectedTabIndex}
                    data={tabs}
                    text='title'
                    onPressButton={(item, index) => {
                        setSelectedTabIndex(index)
                        navigationHandler(item.route)
                        //this.handleOnPress(item, key)
                    }}
                    
                />
                <Spacer height={sizes.smallMargin} />
            </View>

        </View>
    );
}



