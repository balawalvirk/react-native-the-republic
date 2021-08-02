import React, { Component, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { MainWrapper, Products, RowWrapper, Wrapper, ButtonGroupAnimated, CustomIcon, AbsoluteWrapper, ButtonColoredSmall, Spacer, ProductCardPrimary, TitleInfoPrimary, ButtonGradient, ArmerInfo, Toasts, MediumText, Dealers, FilterButton } from '../../../components';
import { appIcons, appStyles, colors, DummyData, HelpingMethods, mapStyles, routes, sizes } from '../../../services';
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles'
const defaultLocation = {
    latitude: 51.5159,
    longitude: 0.1136,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}
const bottomTabs = [
    {
        title: 'List'
    },
    {
        title: 'Map'
    },

]
function Explore(props) {
    const { navigate } = props.navigation
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [currentlocation, setCurrentLocation] = useState(defaultLocation)
    const [markers, setMarkers] = useState(DummyData.products)
    const dealerResults = [...DummyData.users, ...DummyData.users]

    //Refs
    const mapRef = useRef(null)


    return (
        <MainWrapper>
            {
                selectedTabIndex === 0 ?
                    <Wrapper flex={1}>
                        <Spacer height={sizes.doubleBaseMargin+sizes.TinyMargin} />
                        <TitleInfoPrimary
                            title={'Near You'}
                        />
                        <Dealers
                            data={dealerResults}
                            onPress={(item, index) => navigate(routes.userProfile, { item: item })}
                            // ListHeaderComponent={() => {
                            //     return <Spacer height={sizes.TinyMargin} />
                            // }}
                            ListFooterComponent={() => {
                                return <Spacer height={sizes.baseMargin} />
                            }}
                        />
                    </Wrapper>
                    :
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        clusterColor={colors.appColor1}
                        customMapStyle={mapStyles.light}
                        initialRegion={currentlocation}
                        showsUserLocation={true}
                    >
                        {
                            markers.map((item, key) => {
                                return (
                                    <Marker
                                        coordinate={item.cooards}

                                        onPress={() => {
                                            // setProduct(item)
                                            //sheetRef.current.snapTo(1)
                                            navigate(routes.userProfile, { item: dealerResults[0] })
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
                            containerStyle={[{ backgroundColor: 'white', borderRadius: 100, borderWidth:  1 ,borderColor:selectedTabIndex === 0 ?colors.appBgColor3:'transparent' },selectedTabIndex === 1&& appStyles.shadow]}
                            inActiveButtonStyle={{ backgroundColor: 'transparent', marginRight: 0, marginLeft: 0, paddingHorizontal: sizes.marginHorizontal * 1.5, paddingVertical: sizes.marginVertical / 2 }}
                            activeButtonStyle={{backgroundColor:colors.appColor2}}
                        />

                    </Wrapper>
                    <FilterButton
                        onPress={() => navigate(routes.sortFilter, {
                            clearFilter: () => { Toasts.success('Filter cleared') },
                            applyFilter: () => { Toasts.success('Filter applied') }
                        })}
                        buttonStyle={{marginHorizontal:0}}
                    />
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
            </AbsoluteWrapper>

        </MainWrapper>
    );
}

export default Explore;
