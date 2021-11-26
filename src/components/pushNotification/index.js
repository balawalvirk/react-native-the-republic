import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Text,
    DeviceEventEmitter,
    Platform,
    ToastAndroid,
    View,
    Animated,
    Easing,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import {TouchableOpacity} from 'react-native-gesture-handler'
// import Animated, {
//     withTiming,
//     useSharedValue,
//     useAnimatedStyle,
// } from 'react-native-reanimated';
import { AbsoluteWrapper,  RowWrapper, Wrapper } from '../wrappers'
import {  IconButton,  } from '../icons'
import { NotificationCardPrimary,  } from '../cards'
import { colors, fontSize, sizes, routes } from '../../services';
import { SHOW_PUSH_NOTIFICATION } from '../../services/constants';
import { navigate } from '../../services/navigation/rootNavigation';

const contentColors = {
    warn: '#CE8313',
    success: '#496C1C',
    error: '#C91D28',
};
const bgColors = {
    warn: '#F6E8D2',
    success: '#E4F4D4',
    error: '#FFE9EA',
};

const PushNotification = () => {


    const timeOutRef = useRef(null);

    const [animatedTopMargin] = useState(new Animated.Value(-height(50)));


    const [timeOutDuration, setTimeOutDuration] = useState(5000);

    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState(null);
    const [data, setData] = useState(null);

    const onNewToast = data => {
        if (Platform.OS === 'android' && data.useNativeToast) {
            return ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
        if (data.duration) {
            setTimeOutDuration(data.duration);
        }
        setImage(data.image);
        setMessage(data.message);
        setData(data.data);
        setType(data.notificationType);
        console.log(data.notificationType)
    };

    const closeToast = useCallback(() => {
        Animated.timing(animatedTopMargin, { toValue: -height(50), duration: 250, easing: Easing.linear, useNativeDriver: false }).start()
        setTimeout(() => {

            setImage(null);
            setMessage(null);
            setData(null);
            setType(null);

            setTimeOutDuration(5000);
            clearInterval(timeOutRef.current);
        }, 250);
    }, [animatedTopMargin]);

    useEffect(() => {
        if (message) {
            timeOutRef.current = setInterval(() => {
                if (timeOutDuration === 0) {
                    closeToast();
                } else {
                    setTimeOutDuration(prev => prev - 500);
                }
            }, 500);
        }
        return () => {
            clearInterval(timeOutRef.current);
        };
    }, [closeToast, message, timeOutDuration]);

    useEffect(() => {
        if (message) {
            Animated.timing(animatedTopMargin, { toValue: sizes.statusBarHeight * 1.5, duration: 500, easing: Easing.linear, useNativeDriver: false }).start()
        }
    }, [message, animatedTopMargin]);

    useEffect(() => {
        DeviceEventEmitter.addListener(SHOW_PUSH_NOTIFICATION, onNewToast);

        return () => {
            DeviceEventEmitter.removeAllListeners();
        };
    }, []);
    const handlePressNotification = () => {
        if (type === 'postReaction') {
            navigate(routes.postDetail, { postId: data.id })
        } else if (type === 'postComment') {
            navigate(routes.postDetail, { postId: data.id })
        } else if (type === 'followRequestAccepted') {
            navigate(routes.userProfile, { userId: data.id })
        } else if (type === 'newFollowRequest') {
            navigate(routes.followRequests)
        } else if (type === 'followUser') {
            // navigate(routes.followRequests)
            navigate(routes.userProfile, { userId: data.id })
        } else if (type === 'productReview') {
            navigate(routes.notifications,)
        }
    }
    if (!message) {
        return null;
    }

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    top: animatedTopMargin,
                    left: '4%',
                    right: '4%',
                    backgroundColor: colors.appBgColor3,
                    zIndex: 1,
                    elevation: 1,
                    borderRadius: sizes.cardRadius,
                    //height:animatedTopMargin
                },
                //animatedStyle,
            ]}>

            <TouchableOpacity
                onPress={() => {
                    closeToast()
                    handlePressNotification()
                }}
            >
                <RowWrapper>
                    <Wrapper flex={1}>
                        <NotificationCardPrimary
                            //containerStyle={{ backgroundColor: !item.isView ? index === notifications.length - 1 ? colors.appColor2 + '20' : colors.rating + '20' : 'transparent' }}
                            //containerStyle={{ backgroundColor: colors.appBgColor1 }}
                            text={message}
                            image={image}
                            type={type}
                            //time={'Just now'}
                            // onPress={() => {
                            //     closeToast()
                            //     handlePressNotification()
                            // }}
                            disabled
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper>
                        <IconButton
                            iconName="close"
                            // iconType="ionicon"
                            buttonColor={colors.appBgColor4}
                            buttonSize={totalSize(2.5)}
                            iconColor={colors.appTextColor1}
                            iconSize={totalSize(1.75)}
                            onPress={closeToast}
                        />
                    </Wrapper>
                </RowWrapper>
            </TouchableOpacity>


        </Animated.View>
    );
};

export default PushNotification;