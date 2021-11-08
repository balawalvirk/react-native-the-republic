import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { MainWrapper, Products, RowWrapper, Wrapper, ButtonGroupAnimated, CustomIcon, AbsoluteWrapper, ButtonColoredSmall, Spacer, ProductCardPrimary, TitleInfoPrimary, ButtonGradient, ArmerInfo, Toasts, MediumText, Dealers, FilterButton } from '../../../components';
import { appIcons, appStyles, Backend, colors, DummyData, HelpingMethods, mapStyles, routes, sizes } from '../../../services';
import MapView, { Marker } from "react-native-maps";
//import MapView from "react-native-map-clustering";
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles'
import { useSelector } from 'react-redux';
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
function Dealer(props) {
    const { navigate } = props.navigation

    //redux states
    const user = useSelector(state => state.user)
    const { userDetail, currentLocation } = user

    //local states 
    //const [myLocation, setMyLocation] = useState({...defaultLocation,...locationDelta})
    //const [myLocation, setMyLocation] = useState({"latitude": "32.3291197", "latitudeDelta": "0.9", "longitude": "74.3509711", "longitudeDelta": "0.5059970014992504"})

    const [myLocation, setMyLocation] = useState(null)
    const [dealers, setDealers] = useState([])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    //constants
    const [markers, setMarkers] = useState(DummyData.products)
    const dealerResults = [...DummyData.users, ...DummyData.users]


    //Refs
    const mapRef = useRef(null)

    useEffect(() => {
        getSetMyLocation()
        getSetFflDealers()
    }, [])

    const getSetMyLocation = () => {
        const tempMyLocation = HelpingMethods.getMyLocation()
        console.log('tempMyLocation -->', tempMyLocation)
        if (tempMyLocation) {
            console.log('setMyLocation -->', { ...tempMyLocation, ...locationDelta })
            setMyLocation({ ...tempMyLocation, ...locationDelta })
        }
    }
    const getSetFflDealers = async () => {
        await Backend.getDealers().
            then(res => {
                if (res) {
                    setDealers(res.data)
                }
            })
        setLoading(false)
    }

    const getValidMarkers = () => {
        let tempMarkers = []
        dealers.length && [
            tempMarkers = dealers.filter(item => item.latitude && item.longitude)
        ]
        return tempMarkers
    }
    return (
        <MainWrapper>
            {
                selectedTabIndex === 0 ?
                    <Wrapper flex={1}>
                        <Spacer height={sizes.doubleBaseMargin + sizes.TinyMargin} />
                        <TitleInfoPrimary
                            title={'Near You'}
                        />
                        <Dealers
                            data={dealers}
                            onPress={(item, index) => navigate(routes.userProfile, { user: item })}
                            // ListHeaderComponent={() => {
                            //     return <Spacer height={sizes.TinyMargin} />
                            // }}
                            ListFooterComponent={() => {
                                return <Spacer height={sizes.baseMargin} />
                            }}
                            isLoading={loading}
                        />
                    </Wrapper>
                    :
                    myLocation ?
                        <MapView
                            ref={mapRef}
                            initialRegion={myLocation}
                            style={styles.map}
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
                        onPress={() => navigate(routes.sortFilter, {
                            clearFilter: () => { Toasts.success('Filter cleared') },
                            applyFilter: () => { Toasts.success('Filter applied') }
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
