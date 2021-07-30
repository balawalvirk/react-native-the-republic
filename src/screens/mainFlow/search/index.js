import React, { Component, useRef, useState } from 'react';
import { ScrollView, Animated } from 'react-native';
import { height } from 'react-native-dimension';
import { AbsoluteWrapper, ButtonColored, ButtonColoredSmall, ButtonGroupAnimated, ComponentWrapper, Dealers, Groups, MainWrapper, Products, SearchTextinput, Spacer, TitleInfoPrimary, ViewAllListButton, Wrapper } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';
import RecentSearches from './recentSearches';
const recentSearches = ['Mark Field', 'Mark Plus Vision', 'Taurus Raging Hunter 357', 'Jimmy Doe']
const topTabs = [
    {
        title: 'All'
    },
    {
        title: 'Dealers'
    },
    {
        title: 'Groups'
    },
    {
        title: 'Products'
    }
]
const productResults = [...DummyData.products, ...DummyData.products]
const dealerResults = [...DummyData.users, ...DummyData.users]
const groupResults = [...DummyData.groups, ...DummyData.groups]

function Search(props) {
    const { navigation } = props
    const { navigate } = navigation
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    //top tab buttons
    const mainScrollRef = useRef(null)
    let scroll_y = new Animated.Value(0)
    const DATE_HEADER_MAX_HEIGHT = height(6)
    const header_height = scroll_y.interpolate({
        inputRange: [0, DATE_HEADER_MAX_HEIGHT],
        outputRange: [DATE_HEADER_MAX_HEIGHT, 0],
        extrapolate: 'clamp',
    });
    const header_opacity = scroll_y.interpolate({
        inputRange: [0, DATE_HEADER_MAX_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const header_translate_y = scroll_y.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -50],
        extrapolate: 'clamp'
    })
    return (
        <MainWrapper>
            <Spacer height={sizes.smallMargin} />
            <SearchTextinput
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                placeholder="Search by make, model, dealer"
            />
            <Spacer height={sizes.smallMargin} />
            {
                !searchQuery ?
                    <RecentSearches
                        data={recentSearches}
                        onPressItem={(item, index) => { }}
                        onPressCross={(item, index) => { }}
                    />
                    :
                    <Wrapper flex={1}>
                        {/* {
                            selectedTabIndex != 0 ? 
                            <TitleInfoPrimary
                                title={'72 results found'}
                            />
                                :
                                null
                        } */}

                        <Animated.ScrollView
                            ref={mainScrollRef}
                            onScroll={Animated.event([
                                { nativeEvent: { contentOffset: { y: scroll_y } } },
                            ],
                                {
                                    listener: event => {
                                        //console.log('Scroll Event: ', event.nativeEvent)
                                    },
                                }
                            )}
                            scrollEventThrottle={1}
                            showsVerticalScrollIndicator={false}
                        >
                            <Spacer height={DATE_HEADER_MAX_HEIGHT} />
                            {
                                selectedTabIndex === 0 ?
                                    <Wrapper flex={1}>
                                        <Wrapper>
                                            <Dealers
                                                data={dealerResults.slice(0, 3)}
                                                onPress={(item, index) => navigate(routes.userProfile, { item: item })}
                                                onPressHeart={(item, index) => { }}
                                                ListHeaderComponent={() => {
                                                    return <TitleInfoPrimary
                                                        title={'Dealers'}
                                                    />
                                                }}
                                                ListFooterComponent={() => {
                                                    return <ViewAllListButton onPress={() => setSelectedTabIndex(1)} />
                                                }}
                                            />
                                        </Wrapper>
                                        <Wrapper>
                                            <Groups
                                                data={groupResults.slice(0, 3)}
                                                onPress={(item, index) => navigate(routes.groupDetail, { item: item })}
                                                handleJoin={(item, index) => { }}
                                                ListHeaderComponent={() => {
                                                    return <TitleInfoPrimary
                                                        title={'Groups'}
                                                    />
                                                }}
                                                ListFooterComponent={() => {
                                                    return <ViewAllListButton onPress={() => setSelectedTabIndex(2)} />
                                                }}
                                            />
                                        </Wrapper>
                                        <Wrapper>
                                            <Products
                                                data={productResults.slice(0, 3)}
                                                onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                                                viewType={'list'}
                                                ListHeaderComponent={() => {
                                                    return <TitleInfoPrimary
                                                        title={'Products'}
                                                    />
                                                }}
                                                ListFooterComponent={() => {
                                                    return <ViewAllListButton onPress={() => setSelectedTabIndex(3)} />
                                                }}
                                            />
                                        </Wrapper>
                                        <Spacer height={sizes.doubleBaseMargin} />

                                    </Wrapper>
                                    :
                                    selectedTabIndex === 1 ?
                                        <Wrapper flex={1}>
                                            <TitleInfoPrimary
                                                title={dealerResults.length + ' results found'}
                                            />
                                            <Dealers
                                                data={dealerResults}
                                                onPress={(item, index) => navigate(routes.userProfile, { item: item })}
                                                viewType={'list'}
                                                ListHeaderComponent={() => {
                                                    return <Spacer height={sizes.smallMargin} />
                                                }}
                                                ListFooterComponent={() => {
                                                    return <Spacer height={sizes.baseMargin} />
                                                }}
                                            />
                                        </Wrapper>
                                        :
                                        selectedTabIndex === 2 ?
                                            <Wrapper flex={1}>
                                                <TitleInfoPrimary
                                                    title={groupResults.length + ' results found'}
                                                />
                                                <Groups
                                                    data={groupResults}
                                                    onPress={(item, index) => navigate(routes.groupDetail, { item: item })}
                                                    handleJoin={(item, index) => { }}
                                                    ListHeaderComponent={() => {
                                                        return <Spacer height={sizes.smallMargin} />
                                                    }}
                                                    ListFooterComponent={() => {
                                                        return <Spacer height={sizes.baseMargin} />
                                                    }}
                                                />
                                            </Wrapper>
                                            :
                                            selectedTabIndex === 3 ?
                                                <Wrapper flex={1}>
                                                    <TitleInfoPrimary
                                                        title={productResults.length + ' results found'}
                                                    />
                                                    <Products
                                                        data={productResults}
                                                        onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                                                        viewType={'list'}
                                                        ListHeaderComponent={() => {
                                                            return <Spacer height={sizes.smallMargin} />
                                                        }}
                                                        ListFooterComponent={() => {
                                                            return <Spacer height={sizes.baseMargin} />
                                                        }}
                                                    />
                                                </Wrapper>
                                                :
                                                null
                            }
                        </Animated.ScrollView>
                        <AbsoluteWrapper style={{ top: 0, right: 0, left: 0 }}>
                            <Animated.View
                                style={{
                                }, {
                                    // height: header_height,
                                    transform: [{ translateY: header_translate_y }],
                                    opacity: header_opacity,
                                    // backgroundColor: colors.appBgColor1
                                }}
                            >
                                <ButtonGroupAnimated
                                    data={topTabs}
                                    initalIndex={selectedTabIndex}
                                    text='title'
                                    onPressButton={(item, index) => setSelectedTabIndex(index)}
                                />
                                <Spacer height={sizes.smallMargin} />
                            </Animated.View>
                        </AbsoluteWrapper>
                    </Wrapper>

            }
        </MainWrapper>
    );
}

export default Search;
