import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { MainWrapper, RowWrapper, Wrapper, ButtonGroupAnimated, CustomIcon, AbsoluteWrapper, ButtonColoredSmall, Spacer, ProductCardPrimary, TitleInfoPrimary, ButtonGradient, ArmerInfo, Toasts, MediumText, Dealers, FilterButton, TinyTitle } from '../../../components';
import { appIcons, appStyles, Backend, colors, DummyData, HelpingMethods, mapStyles, routes, sizes, sortingOptions } from '../../../services';
import MapView, { Marker } from "react-native-maps";
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
const delta = 0.9
const ASPECT_RATIO = width(100) / height(100)
const locationDelta = {
    latitudeDelta: delta,
    longitudeDelta: delta * ASPECT_RATIO,
}
const defaultLocation = {
    latitude: 51.5159,
    longitude: 0.1136,

}

const bottomTabs = [
    {
        title: 'List'
    },
    {
        title: 'Map'
    },

]
function Dealer({ navigation, route }) {
    const { navigate, setParams } = navigation
    const filterData = route.params?.filterData || null
    const sortBy = route.params?.sortBy || sortingOptions.topRated
    //redux states
    const user = useSelector(state => state.user)
    const { userDetail, currentLocation } = user

    //local states 
    //const [myLocation, setMyLocation] = useState({...defaultLocation,...locationDelta})
    //const [myLocation, setMyLocation] = useState({"latitude": "32.3291197", "latitudeDelta": "0.9", "longitude": "74.3509711", "longitudeDelta": "0.5059970014992504"})

    const [myLocation, setMyLocation] = useState(null)
    const [dealers, setDealers] = useState([])
    const [dealersCurrentPage, setDealersCurrentPage] = useState(1)
    const [dealersLoadingMore, setDealersLoadingMore] = useState(false)
    const [allDealersLoaded, setAllDealersLoaded] = useState(false)
    //const [sortBy, setSortBy] = useState(sortingOptions.topRated)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    //filter items states
    const [filteredDealers, setFilteredDealers] = useState(null)
    const [filteredDealersCurrentPage, setFilteredDealersCurrentPage] = useState(1)
    const [filteredDealersLoadingMore, setFilteredDealersLoadingMore] = useState(false)
    const [allFilteredDealersLoaded, setAllFilteredDealersLoaded] = useState(false)
    //constants
    const [markers, setMarkers] = useState(DummyData.products)
    const dealerResults = [...DummyData.users, ...DummyData.users]


    //Refs
    const mapRef = useRef(null)

    useEffect(() => {
        getSetMyLocation()
    }, [userDetail])

    useEffect(() => {
        getSetDealers()
    }, [sortBy, filterData, userDetail])

    const getSetMyLocation = () => {
        const tempMyLocation = HelpingMethods.getMyLocation()
        console.log('tempMyLocation -->', tempMyLocation)
        if (tempMyLocation) {
            console.log('setMyLocation -->', { ...tempMyLocation, ...locationDelta })
            setMyLocation({ ...tempMyLocation, ...locationDelta })
        }
    }

    const getSetDealers = async () => {
        !loading && setLoading(true)
        if (!filterData) {
            await getSetFflDealers(true)
        } else {
            await getSetFilteredDealers(true)
        }
        setLoading(false)
    }
    const getSetFflDealers = async (isInitialData) => {
        const tempPage = isInitialData ? 1 : dealersCurrentPage
        await Backend.getDealers({ sort_by: sortBy, page: tempPage }).
            then(res => {
                if (res) {
                    const pre_data = !isInitialData ? dealers : []
                    setDealers([...pre_data, ...res.data])
                    !res.data.next_page_url ? setAllDealersLoaded(true):
                    setDealersCurrentPage(tempPage + 1)
                }
            })
    }
    const handleLoadingMoreDealers = async () => {
        if (!allDealersLoaded) {
            setDealersLoadingMore(true)
            await getSetFflDealers()
            setDealersLoadingMore(false)
        }
    }
    const getValidMarkers = () => {
        let tempMarkers = []
        dealers.length && [
            tempMarkers = dealers.filter(item => item.latitude && item.longitude)
        ]
        return tempMarkers
    }
    const getSetFilteredDealers = async (isInitialData) => {
        const tempPage = isInitialData ? 1 : filteredDealersCurrentPage
        await Backend.filterDealers({ ...filterData, sort_by: sortBy, page: tempPage }).
            then(res => {
                if (res) {
                    const pre_data = !isInitialData ? filteredDealers : []
                    // console.log('pre_data: ', pre_data)
                    // console.log('new Data: ', res.data.data)
                    setFilteredDealers([...pre_data, ...res.data.data])
                    //setFilteredDealers(res.data.data)
                    !res.data.next_page_url ?
                        setAllFilteredDealersLoaded(true) :
                        setFilteredDealersCurrentPage(tempPage + 1)
                }
            })
    }
    const handleLoadingMoreFilteredDealers = async () => {
        if (!allFilteredDealersLoaded) {
            setFilteredDealersLoadingMore(true)
            await getSetFilteredDealers()
            setFilteredDealersLoadingMore(false)
        }
    }
    const handleClearFilter = () => {
        setFilteredDealers(null)
        setAllFilteredDealersLoaded(false)
        setFilteredDealersCurrentPage(1)
        setParams({ filterData: null })

        // Toasts.success('Filter cleared')
    }
    return (
        <MainWrapper>
            {
                selectedTabIndex === 0 ?
                    <Wrapper flex={1}>
                        <Spacer height={sizes.doubleBaseMargin + sizes.smallMargin} />
                        {
                            !filteredDealers ?
                                <TitleInfoPrimary
                                    title={'Near You'}
                                />
                                :
                                <>
                                    <Spacer height={sizes.smallMargin} />
                                    <RowWrapper>
                                        <TinyTitle>Filter Results</TinyTitle>
                                        <Icon
                                            name="close"
                                            type="ionicon"
                                            size={totalSize(3)}
                                            onPress={handleClearFilter}
                                        />
                                    </RowWrapper>
                                    <Spacer height={sizes.smallMargin} />
                                </>
                        }
                        <Dealers
                            data={dealers}
                            onPress={(item, index) => navigate(routes.userProfile, { user: item })}
                            //  ListHeaderComponent={() => {
                            //      return <Spacer height={sizes.TinyMargin} />
                            //  }}
                            // ListFooterComponent={() => {
                            //     return <Spacer height={sizes.baseMargin} />
                            // }}
                            isLoading={loading}
                            isLoadingMore={ !filteredDealers ?dealersLoadingMore:filteredDealersLoadingMore}
                            onEndReached={(data) => {
                                console.log('onEndReached Data --->', data)
                                !filteredDealers ? handleLoadingMoreDealers() : handleLoadingMoreFilteredDealers()
                            }}
                        />
                    </Wrapper>
                    :
                    myLocation ?
                        <MapView
                            ref={mapRef}
                            initialRegion={myLocation}
                            style={{ ...StyleSheet.absoluteFillObject }}
                            clusterColor={colors.appColor1}
                            customMapStyle={mapStyles.light}
                            //  showsUserLocation={true}
                            animationEnabled={false}
                        >
                            {
                                getValidMarkers().map((item, key) => {
                                    const { latitude, longitude } = item
                                    //  const coords={item.la}
                                    return (
                                        <Marker
                                            coordinate={{ latitude, longitude }}

                                            onPress={() => {
                                                // setProduct(item)
                                                //sheetRef.current.snapTo(1)
                                                navigate(routes.userProfile, { user: item })
                                            }}
                                        >
                                            <CustomIcon
                                                icon={appIcons.map_pin}
                                                size={totalSize(5)}
                                            />
                                        </Marker>
                                    )
                                })
                            }
                        </MapView>
                        :
                        null
            }
            <AbsoluteWrapper style={{ top: 0, right: 0, left: 0 }}>
                <Spacer height={sizes.smallMargin} />
                <RowWrapper>
                    <Wrapper>
                        <ButtonGroupAnimated
                            data={bottomTabs}
                            initalIndex={selectedTabIndex}
                            text='title'
                            onPressButton={(item, index) => setSelectedTabIndex(index)}
                            containerStyle={[{ backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: selectedTabIndex === 0 ? colors.appBgColor3 : 'transparent' }, selectedTabIndex === 1 && appStyles.shadow]}
                            inActiveButtonStyle={{ backgroundColor: 'transparent', marginRight: 0, marginLeft: 0, paddingHorizontal: sizes.marginHorizontal * 1.5, paddingVertical: sizes.marginVertical / 2 }}
                            activeButtonStyle={{ backgroundColor: colors.appColor2 }}
                        />

                    </Wrapper>
                    <FilterButton
                        onPress={
                            () => navigate(routes.sortFilterDealers, {
                                clearFilter: handleClearFilter,
                                applyFilter: (filterData) => {
                                    setParams({ filterData })
                                },
                                onPressSortByOption: (sortBy) => {
                                    setParams({ sortBy })
                                },
                                filterData,
                                sortBy,
                            })}
                        buttonStyle={{ marginHorizontal: 0 }}
                    />
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
            </AbsoluteWrapper>

        </MainWrapper>
    );
}

export default Dealer;
