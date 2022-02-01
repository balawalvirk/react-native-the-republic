import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useRef, useState } from 'react';
import { ScrollView, Animated } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { MaterialIndicator } from 'react-native-indicators';
import { AbsoluteWrapper, ButtonColored, ButtonColoredSmall, ButtonGroupAnimated, ComponentWrapper, Dealers, Groups, MainWrapper, NoDataViewPrimary, Products, SearchTextinput, Spacer, TitleInfoPrimary, UserSkeletons, ViewAllListButton, Wrapper } from '../../../components';
import { appStyles, asyncConsts, Backend, colors, DummyData, HelpingMethods, routes, searchTypes, sizes } from '../../../services';
import RecentSearches from './recentSearches';
const dummyRecentSearches = ['Mark Field', 'Mark Plus Vision', 'Taurus Raging Hunter 357', 'Jimmy Doe']
const topTabs = [
    {
        title: 'All',
        value: searchTypes.all
    },
    {
        title: 'Dealers',
        value: searchTypes.dealer
    },
    {
        title: 'Groups',
        value: searchTypes.group
    },
    {
        title: 'Products',
        value: searchTypes.product
    },
    {
        title: 'Service Providers',
        value: searchTypes.service_provider
    }
]
// const productResults = [...DummyData.products, ...DummyData.products]
// const dealerResults = [...DummyData.users, ...DummyData.users]
// const groupResults = [...DummyData.groups, ...DummyData.groups]

function Search(props) {
    const { navigation } = props
    const { navigate } = navigation

    //local states
    const [searchQuery, setSearchQuery] = useState('')
    const [recentSearches, setrecentSearches] = useState([])
    const [productResults, setproductResults] = useState(null)
    const [dealerResults, setdealerResults] = useState(null)
    const [groupResults, setgroupResults] = useState(null)
    const [serviceProviderResults, setServiceProviderResults] = useState(null)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [loadingmore, setLoadingMore] = useState(false)
    const [currentPage, setCurrentPage] = useState(2)
    const [allItemsLoaded, setAllItemLoaded] = useState(false)


    const isSearchingAll = topTabs[selectedTabIndex].value === searchTypes.all
    const isSearchingProducts = topTabs[selectedTabIndex].value === searchTypes.product
    const isSearchingDealer = topTabs[selectedTabIndex].value === searchTypes.dealer
    const isSearchingGroups = topTabs[selectedTabIndex].value === searchTypes.group
    const isSearchingServiceProviders = topTabs[selectedTabIndex].value === searchTypes.service_provider
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

    useEffect(() => {
        getSetRecentSearches()
    }, [])

    const getSetRecentSearches = async () => {
        const tempRecentSearches = await AsyncStorage.getItem(asyncConsts.recentSearches)
        console.log('tempRecentSearches ==> ', tempRecentSearches)
        if (tempRecentSearches) {
            const tempRecentSearchesParsed = JSON.parse(tempRecentSearches)
            setrecentSearches(tempRecentSearchesParsed)
        }
    }
    const addNewRecentSearch = (newSearchQuery) => {
        const isAlreadySearched = recentSearches.find(item => item.toLowerCase() === newSearchQuery.toLowerCase())
        if (!isAlreadySearched) {
            const tempNewRecentSearches = [...recentSearches, newSearchQuery]
            setrecentSearches(tempNewRecentSearches)
            AsyncStorage.setItem(asyncConsts.recentSearches, JSON.stringify(tempNewRecentSearches))
        }
    }
    const removeRecentSearch = (recentSearchQuery, index) => {
        const tempNewRecentSearches = recentSearches.filter(item => item != recentSearchQuery)
        setrecentSearches(tempNewRecentSearches)
        AsyncStorage.setItem(asyncConsts.recentSearches, JSON.stringify(tempNewRecentSearches))
    }

    const handleSearchContent = async (search_query, selected_type) => {
        const query = search_query ? search_query : searchQuery
        const searchingAll = selected_type ? selected_type === 'all' : isSearchingAll
        const searchingDealers = selected_type ? selected_type === searchTypes.dealer : isSearchingDealer
        const searchingGroups = selected_type ? selected_type === searchTypes.group : isSearchingGroups
        const searchingProducts = selected_type ? selected_type === searchTypes.product : isSearchingProducts
        const searchingServiceProviders = selected_type ? selected_type === searchTypes.service_provider : isSearchingServiceProviders
        const selectedType = selected_type ? selected_type != 'all' ? selected_type : '' :
            !searchingAll ? topTabs[selectedTabIndex].value : ''
        console.log('searchingAll -->', searchingAll)
        if (query) {
            setLoadingSearch(true)
            currentPage > 2 && setCurrentPage(2)
            allItemsLoaded && setAllItemLoaded(false)
            loadingmore && setLoadingMore(false)
            addNewRecentSearch(query)
            await Backend.searchAll({ query, type: selectedType }).
                then(res => {
                    if (res) {
                        if (searchingAll) {
                            const { dealers, groups, products, serviceProvider } = res.data
                            setdealerResults(dealers.data ? dealers.data : [])
                            setgroupResults(groups.data)
                            setproductResults(products.data)
                            setServiceProviderResults(serviceProvider.data)
                        } else {
                            const { data } = res.data
                            console.log('handleSearchContent --> ', res)
                            console.log('handleSearchContent data --> ', data)
                            if (searchingDealers) {
                                // setdealerResults(res.data.data)
                                data ? setdealerResults(data) : setdealerResults([])
                            } else if (searchingGroups) {
                                // setgroupResults(res.data.data)
                                data ? setgroupResults(data) : setgroupResults([])
                            } else if (searchingProducts) {
                                // setproductResults(res.data.data)
                                data ? setproductResults(data) : setproductResults([])
                            } else if (searchingServiceProviders) {
                                // setServiceProviderResults(res.data.data)
                                data ? setServiceProviderResults(data) : setServiceProviderResults([])
                            }
                            !res.data.next_page_url && setAllItemLoaded(true)
                            //setCurrentPage(currentPage+1)
                        }
                    }
                })
            setLoadingSearch(false)
        }
    }
    const handleLoadingMore = async (nativeEvent) => {
        //console.log('nativeEvent --> ', nativeEvent)
        const query = searchQuery
        if (query && !isSearchingAll && HelpingMethods.isEndReached(nativeEvent) && !allItemsLoaded && !loadingmore && !loadingSearch) {
            setLoadingMore(true)
            const selectedType = !isSearchingAll ? topTabs[selectedTabIndex].value : ''
            await Backend.searchAll({ query, type: selectedType, page: currentPage }).
                then(res => {
                    if (res) {
                        const oldDealerResults = dealerResults ? dealerResults : []
                        const oldGroupResults = groupResults ? groupResults : []
                        const oldProductResults = productResults ? productResults : []
                        const oldServiceProviderResults = serviceProviderResults ? serviceProviderResults : []
                        if (isSearchingAll) {
                            const { dealers, groups, products, serviceProvider } = res.data
                            setdealerResults([...oldDealerResults, ...dealers.data])
                            setgroupResults([...oldGroupResults, ...groups.data])
                            setproductResults([...oldProductResults, ...products.data])
                            setServiceProviderResults([...oldServiceProviderResults, ...serviceProvider.data])
                        } else {
                            if (isSearchingDealer) {
                                setdealerResults([...oldDealerResults, ...res.data.data])
                            } else if (isSearchingGroups) {
                                setgroupResults([...oldGroupResults, ...res.data.data])
                            } else if (isSearchingProducts) {
                                setproductResults([...oldProductResults, ...res.data.data])
                            } else if (isSearchingServiceProviders) {
                                setServiceProviderResults([...oldServiceProviderResults, ...res.data.data])
                            }
                            !res.data.next_page_url && setAllItemLoaded(true)
                            setCurrentPage(currentPage + 1)
                        }
                    }
                })
            setLoadingMore(false)
        }
    }
    return (
        <MainWrapper>
            <Spacer height={sizes.smallMargin} />
            <SearchTextinput
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                placeholder="Search by make, model, dealer"
                onPressCross={() => {
                    setSearchQuery('')
                    setdealerResults(null)
                    setgroupResults(null)
                    setproductResults(null)
                    currentPage > 1 && setCurrentPage(1)
                    allItemsLoaded && setAllItemLoaded(false)
                    loadingmore && setLoadingMore(false)
                    selectedTabIndex > 0 && setSelectedTabIndex(0)
                }}
                returnKeyLabel="Search"
                returnKeyType="google"
                onSubmitEditing={() => handleSearchContent()}
                autoFocus
                right={
                    loadingSearch ?
                        <ComponentWrapper>
                            <MaterialIndicator size={totalSize(2)} color={colors.appTextColor4} />
                        </ComponentWrapper>
                        :
                        null
                }
            />
            <Spacer height={sizes.smallMargin} />
            {
                !dealerResults && !groupResults && !productResults && !loadingSearch ?
                    recentSearches ?
                        <RecentSearches
                            data={recentSearches}
                            onPressItem={(item, index) => {
                                setSearchQuery(item)
                                handleSearchContent(item)
                            }}
                            onPressCross={removeRecentSearch}
                        />
                        :
                        null
                    :
                    <Wrapper flex={1}>
                        <Animated.ScrollView
                            ref={mainScrollRef}
                            onScroll={Animated.event([
                                { nativeEvent: { contentOffset: { y: scroll_y } } },
                            ],
                                {
                                    listener: event => {
                                        //console.log('Scroll Event: ', event.nativeEvent)
                                        handleLoadingMore(event.nativeEvent)
                                    },
                                }
                            )}
                            scrollEventThrottle={1}
                            showsVerticalScrollIndicator={false}
                        >
                            <Spacer height={DATE_HEADER_MAX_HEIGHT} />
                            {
                                isSearchingAll ?
                                    <Wrapper flex={1}>
                                        {
                                            !loadingSearch ?
                                                dealerResults.length || groupResults.length || productResults.length || serviceProviderResults.length ?
                                                    <Wrapper flex={1}>
                                                        <Wrapper>
                                                            <Dealers
                                                                data={dealerResults ? dealerResults.length > 3 ? dealerResults.slice(0, 3) : dealerResults : []}
                                                                onPress={(item, index) => navigate(routes.userProfile, { user: item })}
                                                                onPressHeart={(item, index) => { }}
                                                                ListHeaderComponent={() => {
                                                                    return <TitleInfoPrimary
                                                                        title={'Dealers'}
                                                                    />
                                                                }}
                                                                ListFooterComponent={() => {
                                                                    return <ViewAllListButton onPress={() => { setSelectedTabIndex(1), handleSearchContent() }} />
                                                                }}
                                                                // isLoading={loadingSearch}
                                                                disableNoDataView
                                                            />
                                                        </Wrapper>
                                                        <Wrapper>
                                                            <Groups
                                                                data={groupResults ? groupResults.length > 3 ? groupResults.slice(0, 3) : groupResults : []}
                                                                onPress={(item, index) => navigate(routes.groupDetail, { item: item })}
                                                                handleJoin={(item, index) => { }}
                                                                ListHeaderComponent={() => {
                                                                    return <TitleInfoPrimary
                                                                        title={'Groups'}
                                                                    />
                                                                }}
                                                                ListFooterComponent={() => {
                                                                    return <ViewAllListButton onPress={() => { setSelectedTabIndex(2), handleSearchContent() }} />
                                                                }}
                                                                //isLoading={loadingSearch}
                                                                disableNoDataView
                                                            />
                                                        </Wrapper>
                                                        <Wrapper>
                                                            <Products
                                                                data={productResults ? productResults.length > 3 ? productResults.slice(0, 3) : productResults : []}
                                                                onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                                                                viewType={'list'}
                                                                ListHeaderComponent={() => {
                                                                    return <TitleInfoPrimary
                                                                        title={'Products'}
                                                                    />
                                                                }}
                                                                ListFooterComponent={() => {
                                                                    return <ViewAllListButton onPress={() => { setSelectedTabIndex(3), handleSearchContent() }} />
                                                                }}
                                                                // isLoading={loadingSearch}
                                                                disableNoDataView
                                                                scrollEnabled={false}
                                                            />
                                                        </Wrapper>
                                                        <Wrapper>
                                                            <Dealers
                                                                data={serviceProviderResults ? serviceProviderResults.length > 3 ? serviceProviderResults.slice(0, 3) : serviceProviderResults : []}
                                                                onPress={(item, index) => navigate(routes.userProfile, { user: item })}
                                                                onPressHeart={(item, index) => { }}
                                                                ListHeaderComponent={() => {
                                                                    return <TitleInfoPrimary
                                                                        title={'Service Providers'}
                                                                    />
                                                                }}
                                                                ListFooterComponent={() => {
                                                                    return <ViewAllListButton onPress={() => { setSelectedTabIndex(4), handleSearchContent() }} />
                                                                }}
                                                                // isLoading={loadingSearch}
                                                                disableNoDataView
                                                            />
                                                        </Wrapper>
                                                        <Spacer height={sizes.doubleBaseMargin} />
                                                    </Wrapper>
                                                    :
                                                    <NoDataViewPrimary
                                                        title={'Results'}
                                                    />
                                                :
                                                <UserSkeletons NumOfItems={10} />
                                        }
                                    </Wrapper>
                                    :
                                    isSearchingDealer ?
                                        <Wrapper flex={1}>
                                            {
                                                !loadingSearch ?
                                                    <TitleInfoPrimary
                                                        title={dealerResults ? dealerResults.length + ' results found' : ''}
                                                    />
                                                    :
                                                    null
                                            }
                                            <Dealers
                                                data={dealerResults}
                                                onPress={(item, index) => navigate(routes.userProfile, { user: item })}
                                                viewType={'list'}
                                                ListHeaderComponent={() => {
                                                    return <Spacer height={sizes.smallMargin} />
                                                }}
                                                ListFooterComponent={() => {
                                                    return <>
                                                        {
                                                            loadingmore ?
                                                                <>
                                                                    <UserSkeletons />
                                                                    <Spacer height={sizes.baseMargin} />
                                                                </>
                                                                :
                                                                <Spacer height={sizes.baseMargin} />
                                                        }
                                                    </>
                                                }}
                                                isLoading={loadingSearch}
                                            // isLoadingMore={loadingmore}
                                            />
                                        </Wrapper>
                                        :
                                        isSearchingGroups ?
                                            <Wrapper flex={1}>
                                                {
                                                    !loadingSearch ?
                                                        <TitleInfoPrimary
                                                            title={groupResults.length + ' results found'}
                                                        />
                                                        :
                                                        null
                                                }
                                                <Groups
                                                    data={groupResults}
                                                    onPress={(item, index) => navigate(routes.groupDetail, { group: item })}
                                                    handleJoin={(item, index) => { }}
                                                    ListHeaderComponent={() => {
                                                        return <Spacer height={sizes.smallMargin} />
                                                    }}
                                                    ListFooterComponent={() => {
                                                        return <>
                                                            {
                                                                loadingmore ?
                                                                    <>
                                                                        <UserSkeletons />
                                                                        <Spacer height={sizes.baseMargin} />
                                                                    </>
                                                                    :
                                                                    <Spacer height={sizes.baseMargin} />
                                                            }
                                                        </>
                                                    }}
                                                    isLoading={loadingSearch}
                                                />
                                            </Wrapper>
                                            :
                                            isSearchingProducts ?
                                                <Wrapper flex={1}>
                                                    {
                                                        !loadingSearch ?
                                                            <TitleInfoPrimary
                                                                title={productResults.length + ' results found'}
                                                            />
                                                            :
                                                            null
                                                    }
                                                    <Wrapper flex={1}>
                                                        <Products
                                                            data={productResults}
                                                            onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                                                            viewType={'list'}
                                                            ListHeaderComponent={() => {
                                                                return <Spacer height={sizes.smallMargin} />
                                                            }}
                                                            // ListFooterComponent={() => {
                                                            //     return <Spacer height={sizes.baseMargin} />
                                                            // }}
                                                            isLoading={loadingSearch}
                                                            isLoadingMore={loadingmore}
                                                        />
                                                    </Wrapper>
                                                </Wrapper>
                                                :
                                                isSearchingServiceProviders ?
                                                    <Wrapper flex={1}>
                                                        {
                                                            !loadingSearch ?
                                                                <TitleInfoPrimary
                                                                    title={serviceProviderResults ? serviceProviderResults.length + ' results found' : ''}
                                                                />
                                                                :
                                                                null
                                                        }
                                                        <Dealers
                                                            data={serviceProviderResults}
                                                            onPress={(item, index) => navigate(routes.userProfile, { user: item })}
                                                            viewType={'list'}
                                                            ListHeaderComponent={() => {
                                                                return <Spacer height={sizes.smallMargin} />
                                                            }}
                                                            ListFooterComponent={() => {
                                                                return <>
                                                                    {
                                                                        loadingmore ?
                                                                            <>
                                                                                <UserSkeletons />
                                                                                <Spacer height={sizes.baseMargin} />
                                                                            </>
                                                                            :
                                                                            <Spacer height={sizes.baseMargin} />
                                                                    }
                                                                </>
                                                            }}
                                                            isLoading={loadingSearch}
                                                        // isLoadingMore={loadingmore}
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
                                    onPressButton={(item, index) => {

                                        // currentPage > 1 && setCurrentPage(1)
                                        // allItemsLoaded && setAllItemLoaded(false)
                                        // loadingmore && setLoadingMore(false)
                                        handleSearchContent('', item.value)
                                        setSelectedTabIndex(index)
                                    }}
                                // disableAutoSwipe
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
