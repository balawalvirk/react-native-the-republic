import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles } from '../../services';
import PropTypes from 'prop-types'
import { Wrapper, AbsoluteWrapper } from '../wrappers';
import { color } from 'react-native-reanimated';
//import LinearGradient from 'react-native-linear-gradient';

export const ImageRound = ({style, size, source}) => {
    const defaultSize = totalSize(5)
    return (
        <Image
            source={source}
            style={[{ height: size ? size : defaultSize, width: size ? size : defaultSize, borderRadius: 150 }, style]}
        />
    );
}

export const ImageSqareRound = ({style, size, source }) => {
    const defaultSize = totalSize(5)
    return (
        <Image
            source={source}
            style={[{ height: size ? size : defaultSize, width: size ? size : defaultSize, borderRadius: 15 }, style]}
        />
    );
}

export const ImageProfile = ({ imageStyle, source, containerStyle, animation, onPress, onPressCamera }) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <Image
                source={source}
                style={[styles.ImageProfile, imageStyle]}
            />
            {
                onPressCamera ?
                    <AbsoluteWrapper style={[{ top: 0, left: 0, bottom: 0, right: 0, backgroundColor: colors.appBgColor5 + '40', borderRadius: 100 }, appStyles.center]}>
                        <Icon
                            name="camera"
                            type="feather"
                            onPress={onPressCamera}
                            size={totalSize(4)}
                            color={colors.appTextColor6}
                        />
                    </AbsoluteWrapper>
                    :
                    null
            }

        </TouchableOpacity>
    );
}
export const ImageCollectionItem = ({imageStyle, source, containerStyle}) => {
    return (
        <Wrapper style={containerStyle}>
            <Image
                source={source}
                style={[styles.ImageCollectionItem, imageStyle]}
            />
        </Wrapper>
    );
}
export const ImageBackgroundTop = ({imageStyle, source, containerStyle}) => {
    return (
        <AbsoluteWrapper style={[containerStyle]}>
        <Image
          source={source}
          style={[{ width: width(100), height: height(45) },imageStyle]}
        />
        <AbsoluteWrapper style={{ top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors.appBgColor5 + '40' }} />
      </AbsoluteWrapper>
    );
}



const styles = StyleSheet.create({
    ImageProfileContainer:{
        ...appStyles.shadowColored,
       // backgroundColor:'transparent',
        borderRadius: 100,
        backgroundColor:colors.appBgColor1
    },
    ImageProfile: {
        width:totalSize(20),
        height:totalSize(20),
        borderRadius: 100,
        //borderWidth:5,
        //borderColor:colors.appBgColor1,
       
    },
    ImageProfileOverlay: {
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    ImageCollectionItem: {
        width: width(32.5),
        height: height(20),
        borderRadius: 15,
    }
})
