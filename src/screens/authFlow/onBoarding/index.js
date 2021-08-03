import React, { Component, useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { ButtonColoredSmall, IconButton, MainWrapper, MediumText, RowWrapper, RowWrapperBasic, Spacer, Wrapper } from '../../../components';
import { appStyles, colors, routes, sizes } from '../../../services';
const PaginationDots = ({ data, activeIndex }) => {
    return (
        <RowWrapperBasic>
            {
                data.map((item, key) => {
                    return (
                        <Icon
                            name="circle"
                            size={totalSize(0.8)}
                            color={key === activeIndex ? colors.appColor1 : colors.appColor1 + '40'}
                            iconStyle={{ marginHorizontal: totalSize(0.2) }}
                        />
                    )
                })
            }
        </RowWrapperBasic>
    )
}
const androidContent = [
    { imageUri: 'https://www.devicesfaq.com/img/screenshot/home-android-en.jpg' },
    { imageUri: 'https://www.devicesfaq.com/img/screenshot/home-android-en.jpg' },
    { imageUri: 'https://www.devicesfaq.com/img/screenshot/home-android-en.jpg' },
    { imageUri: 'https://www.devicesfaq.com/img/screenshot/home-android-en.jpg' },
    { imageUri: 'https://www.devicesfaq.com/img/screenshot/home-android-en.jpg' },
]
const iosContent = [
    { imageUri: 'https://wmstatic.global.ssl.fastly.net/ml/190521-f-1af8d64c-01f5-447f-9c6c-70cdd8a335e7.png?width=460&height=800' },
    { imageUri: 'https://wmstatic.global.ssl.fastly.net/ml/190521-f-1af8d64c-01f5-447f-9c6c-70cdd8a335e7.png?width=460&height=800' },
    { imageUri: 'https://wmstatic.global.ssl.fastly.net/ml/190521-f-1af8d64c-01f5-447f-9c6c-70cdd8a335e7.png?width=460&height=800' },
    { imageUri: 'https://wmstatic.global.ssl.fastly.net/ml/190521-f-1af8d64c-01f5-447f-9c6c-70cdd8a335e7.png?width=460&height=800' },
    { imageUri: 'https://wmstatic.global.ssl.fastly.net/ml/190521-f-1af8d64c-01f5-447f-9c6c-70cdd8a335e7.png?width=460&height=800' },
]

function OnBoarding(props) {
    const { navigate } = props.navigation
    const [activeIndex, setActiveIndex] = useState(0)

    const flatListRef = useRef(null)
    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        setActiveIndex(viewableItems[0].index)
    }, []);
    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    const data = Platform.OS === 'ios' ? iosContent : androidContent
    const dataIndexsCount = data.length - 1
    return (
        <MainWrapper>
            <Wrapper flex={8}>
                <FlatList
                    data={data}
                    pagingEnabled
                    ref={flatListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment={"start"}
                    // snapToInterval={width(100)} // Adjust to your content width
                    decelerationRate={"fast"}
                    onViewableItemsChanged={_onViewableItemsChanged}
                    viewabilityConfig={_viewabilityConfig}
                    renderItem={({ item, index }) => {
                        return (
                            <Wrapper style={{ height: '100%', width: width(100), backgroundColor: 'transparent', paddingTop: sizes.statusBarHeight + sizes.marginVertical }}>
                                <Image
                                    source={{ uri: item.imageUri }}
                                    style={{ flex: 1, height: null, width: null }}
                                    resizeMode="contain"
                                />
                            </Wrapper>
                        )
                    }}
                />
                <Wrapper style={{ alignItems: 'center', }}>
                    <Spacer height={sizes.baseMargin} />
                    <PaginationDots
                        data={data}
                        activeIndex={activeIndex}
                    />
                </Wrapper>
            </Wrapper>
            <Wrapper flex={2} style={{ justifyContent: 'center', }}>
                <RowWrapper>
                    <Wrapper flex={2}>
                        {
                            activeIndex != 0 ?
                                <IconButton
                                    iconName="arrow-left"
                                    iconType="feather"
                                    buttonColor={colors.appColor1}
                                    iconColor={colors.appTextColor6}
                                    onPress={() => flatListRef.current.scrollToIndex({ index: activeIndex - 1 })}
                                /> : null
                        }
                    </Wrapper>
                    <Wrapper flex={6} style={[appStyles.center]}>
                        {
                            activeIndex < dataIndexsCount ?
                                <MediumText
                                    onPress={() => navigate(routes.selectSubscriptionPlan)}
                                    style={[appStyles.textPrimaryColor]}>Skip</MediumText>
                                :
                                <ButtonColoredSmall
                                onPress={() => navigate(routes.selectSubscriptionPlan)}
                                    text="Get Started"
                                    buttonStyle={[{ borderRadius: 100, paddingVertical: totalSize(1.5) }]}
                                    textStyle={[appStyles.textMedium, appStyles.fontMedium, appStyles.textWhite]}
                                />
                        }
                    </Wrapper>
                    <Wrapper flex={2} style={[appStyles.center]}>
                        {
                            activeIndex < dataIndexsCount ?
                                <IconButton
                                    iconName="arrow-right"
                                    iconType="feather"
                                    buttonColor={colors.appColor1}
                                    iconColor={colors.appTextColor6}
                                    onPress={() => flatListRef.current.scrollToIndex({ index: activeIndex + 1 })}
                                /> : null
                        }
                    </Wrapper>
                </RowWrapper>
            </Wrapper>
        </MainWrapper>
    );
}

export default OnBoarding;
