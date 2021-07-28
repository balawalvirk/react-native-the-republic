import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles } from '../../services';
import PropTypes from 'prop-types'
import { Wrapper, AbsoluteWrapper } from '../wrappers';
import { color } from 'react-native-reanimated';
import { LargeText } from '../text'
//import LinearGradient from 'react-native-linear-gradient';

export const ImageRound = ({ style, size, source }) => {
    const defaultSize = totalSize(5)
    return (
        <Image
            source={source}
            style={[{ height: size ? size : defaultSize, width: size ? size : defaultSize, borderRadius: 150 }, style]}
        />
    );
}

export const ImageSqareRound = ({ style, size, source,resizeMode }) => {
    const defaultSize = totalSize(5)
    return (
        <Image
            source={source}
            style={[{ height: size ? size : defaultSize, width: size ? size : defaultSize, borderRadius: 15 }, style]}
            resizeMode={resizeMode}
        />
    );
}

export const ImageProfile = ({ imageStyle, source, containerStyle, animation, onPress, onPressCamera, shadow }) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.ImageProfileContainer, shadow && appStyles.shadow]}>
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
export const ImageCollectionItem = ({ imageStyle, source, containerStyle }) => {
    return (
        <Wrapper style={containerStyle}>
            <Image
                source={source}
                style={[styles.ImageCollectionItem, imageStyle]}
            />
        </Wrapper>
    );
}
export const ImageBackgroundTop = ({ imageStyle, source, containerStyle }) => {
    return (
        <AbsoluteWrapper style={[containerStyle]}>
            <Image
                source={source}
                style={[{ width: width(100), height: height(45) }, imageStyle]}
            />
            <AbsoluteWrapper style={{ top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors.appBgColor5 + '40' }} />
        </AbsoluteWrapper>
    );
}
const ThumbnaiImage = ({ imageUrl,containerStyle }) => {
    return (
        <Wrapper flex={1} style={containerStyle}>
            <Image
                resizeMethod="resize"
                source={{ uri: imageUrl }}
                style={{ height: '100%', width: '100%', flex: 1,  }}
            />
        </Wrapper>
    )
}
export const ImageThumbnailGrid = ({ imageStyle, images, containerStyle, animation, duration }) => {
    return (
        <Wrapper animation={animation} duration={duration} flex={1} style={[{}, containerStyle]}>
            {
                images.length === 1 ?
                    <ThumbnaiImage imageUrl={images[0]} />
                    :
                    images.length === 2 ?
                        <>
                            {
                                images.map((item, key) => {
                                    return (
                                        <ThumbnaiImage imageUrl={item} containerStyle={{borderBottomWidth:key===0?0.5:0,borderColor:colors.appBgColor4}}/>
                                    )
                                })
                            }
                        </>
                        :
                        images.length === 3 ?
                            <Wrapper flex={1}>
                                <ThumbnaiImage imageUrl={images[0]} 
                                containerStyle={{borderBottomWidth:0.5,borderColor:colors.appBgColor4}}
                                />
                                <Wrapper flex={1} style={{ flexDirection: 'row', }}>
                                    {
                                        images.slice(1, 3).map((item, key) => {
                                            return (
                                                <ThumbnaiImage imageUrl={item} 
                                                containerStyle={{borderRightWidth:key===0?0.5:0,borderColor:colors.appBgColor4}}
                                                />
                                            )
                                        })
                                    }
                                </Wrapper>
                            </Wrapper>
                            :
                            images.length === 4 ?
                                <Wrapper flex={1} style={{ flexDirection: 'row', }}>
                                    <ThumbnaiImage imageUrl={images[0]} 
                                     containerStyle={{borderRightWidth:0.5,borderColor:colors.appBgColor4}}
                                    />
                                    <Wrapper flex={1} >
                                        {
                                            images.slice(1, 4).map((item, key) => {
                                                return (
                                                    <ThumbnaiImage imageUrl={item} 
                                                    containerStyle={{borderBottomWidth:key!=2?0.5:0,borderColor:colors.appBgColor4}}
                                                    />
                                                )
                                            })
                                        }
                                    </Wrapper>
                                </Wrapper>
                                :
                                images.length >= 5 ?
                                    <Wrapper flex={1}>
                                        <Wrapper flex={1} style={{ flexDirection: 'row', }}>
                                            {
                                                images.slice(0, 2).map((item, key) => {
                                                    return (
                                                        <ThumbnaiImage imageUrl={item} 
                                                        containerStyle={{borderRightWidth:key===0?0.5:0,borderColor:colors.appBgColor4}}
                                                        />
                                                    )
                                                })
                                            }
                                        </Wrapper>
                                        <Wrapper flex={1} style={{ flexDirection: 'row', }}>
                                            {
                                                images.slice(2, 5).map((item, key) => {
                                                    return (
                                                        <Wrapper flex={1}>
                                                            <ThumbnaiImage imageUrl={item} 
                                                             containerStyle={{borderRightWidth:key!=2?0.5:0,borderColor:colors.appBgColor4}}
                                                            />
                                                            {
                                                                key === 2 && images.length > 5 ?
                                                                    <AbsoluteWrapper style={{ top: 0, bottom: 0, right: 0, left: 0, backgroundColor: colors.appBgColor4 + 40, ...appStyles.center }}>
                                                                        <LargeText style={[appStyles.textWhite]}>+ {images.length - 5}</LargeText>
                                                                    </AbsoluteWrapper>
                                                                    :
                                                                    null
                                                            }
                                                        </Wrapper>
                                                    )
                                                })
                                            }
                                        </Wrapper>
                                    </Wrapper>
                                    :
                                    null
            }
        </Wrapper>
    );
}



const styles = StyleSheet.create({
    ImageProfileContainer: {
        // ...appStyles.shadowColored,
        // backgroundColor:'transparent',
        borderRadius: 100,
        backgroundColor: colors.appBgColor1
    },
    ImageProfile: {
        width: totalSize(20),
        height: totalSize(20),
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
