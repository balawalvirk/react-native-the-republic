import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Text,
    DeviceEventEmitter,
    TouchableOpacity,
    Platform,
    ToastAndroid,
    View,
    Animated,
    Easing
} from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';

// import Animated, {
//     withTiming,
//     useSharedValue,
//     useAnimatedStyle,
// } from 'react-native-reanimated';
import { RowWrapper,Wrapper} from '../wrappers'
import {IconButton, } from '../icons'
import { colors, fontSize, sizes } from '../../services';
import { SHOW_TOAST_MESSAGE } from '../../services/constants';

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

const Toast = () => {

    const [messageType, setMessageType] = useState(null);
    const timeOutRef = useRef(null);

    const [animatedTopMargin] = useState(new Animated.Value(-height(50)));


    const [timeOutDuration, setTimeOutDuration] = useState(5000);

    const [message, setMessage] = useState(null);

    const onNewToast = data => {
        if (Platform.OS === 'android' && data.useNativeToast) {
            return ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
        if (data.duration) {
            setTimeOutDuration(data.duration);
        }
        setMessage(data.message);
        setMessageType(data.type);
    };

    const closeToast = useCallback(() => {
            Animated.timing(animatedTopMargin, { toValue: -height(50), duration: 250, easing: Easing.linear, useNativeDriver: false }).start()
            setTimeout(() => {
                setMessage(null);
                setTimeOutDuration(5000);
                clearInterval(timeOutRef.current);
            }, 250);
    }, [ animatedTopMargin]);

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
            Animated.timing(animatedTopMargin, { toValue: sizes.statusBarHeight*1.5, duration: 500, easing: Easing.linear, useNativeDriver: false }).start()
        }
    }, [message, animatedTopMargin]);

    useEffect(() => {
        DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);

        return () => {
            DeviceEventEmitter.removeAllListeners();
        };
    }, []);

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
                    backgroundColor: bgColors[messageType],
                    zIndex: 1,
                    elevation: 1,
                    borderRadius: sizes.cardRadius,
                    //height:animatedTopMargin
                },
                //animatedStyle,
            ]}>
            <View style={{ paddingVertical: height(2), paddingHorizontal: width(5) }}>
                <RowWrapper>
                    <Wrapper flex={1}>
                        <Text
                            style={{
                                color: contentColors[messageType],
                                fontSize: fontSize.large,
                            }}>
                            {message}
                        </Text>
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper>
                        <IconButton
                            iconName="close"
                            // iconType="ionicon"
                            buttonColor={contentColors[messageType]}
                            buttonSize={totalSize(2.5)}
                            iconColor={colors.appTextColor6}
                            iconSize={totalSize(1.75)}
                            onPress={closeToast}
                        />
                    </Wrapper>
                </RowWrapper>
            </View>
        </Animated.View>
    );
};

export default Toast;