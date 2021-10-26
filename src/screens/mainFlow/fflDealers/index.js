import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { AbsoluteWrapper, ButtonColoredSmall, ButtonGradient, ComponentWrapper, CustomIcon, IconButton, ImageRound, KeyboardAvoidingScrollView, MainWrapper, MediumText, NoDataViewPrimary, PopupPrimary, RowWrapper, SearchTextinput, SkeletonPrimary, Spacer, TextInputUnderlined, TinyTitle, UserCardPrimary, Wrapper } from '../../../components';
import { appIcons, appStyles, Backend, colors, DummyData, mapStyles, routes, sizes } from '../../../services';
import styles from './styles';
import Slider from '@react-native-community/slider';
import { ScrollView } from 'react-native';
import { navigate } from '../../../services/navigation/rootNavigation';
import { useSelector } from 'react-redux';
import { DotIndicator, MaterialIndicator } from 'react-native-indicators';


const defaultLocation = {
    latitude: 51.5359,
    longitude: 0.1236,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}
const defaultMarker = {
    cooards: {
        latitude: 51.5359,
        longitude: 0.1236
    }
}
function FflDealers(props) {
    const { navigate } = props


    //redux states
    const user = useSelector(state => state.user)
    const { default_dealer_id } = user.userDetail

    //local states
    const [fflDealers, setFflDealers] = useState(null)
    const [searchedFflDealers, setSearchedFflDealers] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDealerIndex, selectDealerIndex] = useState(1)
    const [loadingDealerIndex, setLoadingDealerIndex] = useState(-1)
    const [loadingSearch, setLoadingSearch] = useState(false)


    useEffect(() => {
        getSetFflDealers()
    }, [])

    const getSetFflDealers = async () => {
        await Backend.getDealers().
            then(res => {
                if (res) {
                    setFflDealers(res.dealers)
                }
            })
    }

    const searchFflDealers = async (query) => {
        setSearchQuery(query)
        if (query.length) {
            setLoadingSearch(true)
            await Backend.searchDealers(query).
                then(res => {
                    if (res) {
                        setSearchedFflDealers(res.dealers)
                    }
                })
            setLoadingSearch(false)
        } else {
            setSearchedFflDealers(null)
        }
    }

    const selectDefaultDealer = async (item, index) => {
        setLoadingDealerIndex(index)
        await Backend.update_profile({ default_dealer_id: item.id })
        setLoadingDealerIndex(-1)
    }

    const getSetDealers = () => {
        let tempDealers = []
        let index = 0
        for (const item of DummyData.users) {
            const tempObj = {
                ...item,
                cooards: {
                    latitude: 51.5359 + (index + 0.0020),
                    longitude: 0.1236 + (index + 0.0020)
                }
            }
            tempDealers.push(tempObj)
            index = index + 1
        }
        return tempDealers
    }



    const dealers = searchQuery ? getSetDealers() : getSetDealers().reverse()
    const filteredDealers = searchQuery ? searchedFflDealers ? searchedFflDealers : fflDealers : fflDealers
    if (!fflDealers) {
        return (
            <>
                <SkeletonPrimary
                    itemStyle={{ height: height(45), marginHorizontal: 0, borderRadius: 0 }}
                />
                <Spacer height={sizes.baseMargin} />
                {
                    [1, 2, 3, 4].map((item, index) => {
                        return (
                            <SkeletonPrimary itemStyle={{ marginBottom: sizes.smallMargin }} />
                        )
                    })
                }
            </>
        )
    }
    return (
        <MainWrapper>
            <ScrollView
            >
                <Wrapper >
                    <MapView
                        style={{
                            height: height(45)
                        }}
                        clusterColor={colors.appColor1}
                        // provider = { MapView.PROVIDER_GOOGLE }
                        customMapStyle={mapStyles.light}
                        initialRegion={defaultLocation}
                    // showsUserLocation={true}
                    >
                        {
                            dealers.map((item, index) => {
                                return (
                                    <Marker
                                        coordinate={item.cooards}
                                        onPress={() => selectDealerIndex(index)}

                                    >
                                        {/* <CustomIcon
                                    icon={appIcons.map_pin}
                                    size={totalSize(6)}
                                /> */}
                                        <Wrapper
                                            style={[{ borderRadius: 100, borderWidth: 2, borderColor: selectedDealerIndex === index ? colors.appColor1 : colors.appBgColor1 }, appStyles.shadowColored]}
                                        >
                                            <ImageRound
                                                source={{ uri: item.image }}

                                            />
                                        </Wrapper>
                                    </Marker>
                                )
                            })
                        }

                    </MapView>
                    <AbsoluteWrapper style={{ top: 0, right: 0, left: 0 }}>
                        <Spacer height={sizes.baseMargin} />
                        <SearchTextinput
                            value={searchQuery}
                            onChangeText={searchFflDealers}
                            placeholder={'Search for dealers'}
                            inputContainerStyle={[{ backgroundColor: colors.appBgColor1 }, appStyles.shadow]}
                            onPressCross={() => { setSearchQuery(null); setSearchedFflDealers(null) }}
                            right={
                                loadingSearch ?
                                   <ComponentWrapper>
                                        <MaterialIndicator size={totalSize(2.25)} color={colors.appTextColor4}/>
                                   </ComponentWrapper>
                                    :
                                    null
                            }
                        />
                        <Spacer height={sizes.baseMargin} />
                    </AbsoluteWrapper>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <Wrapper>
                    <ComponentWrapper>
                        <TinyTitle>{searchQuery ? filteredDealers.length + ' results found' : 'Your Nearest FFL Dealers'}</TinyTitle>
                    </ComponentWrapper>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                {
                    filteredDealers.length ?
                        filteredDealers.map((item, index) => {
                            //const isSelected = index === selectedDealerIndex
                            const isSelected = item.id === default_dealer_id
                            const isLoading = index === loadingDealerIndex
                            return (
                                <UserCardPrimary
                                    onPress={() => selectDefaultDealer(item, index)}
                                    containerStyle={{ marginBottom: sizes.marginVertical / 2, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.appBgColor3 }}
                                    title={item.first_name + ' ' + item.last_name}
                                    imageUri={item.profile_image}
                                    subTitle={7 * (index + 1) + ' miles away'}
                                    right={
                                        <ButtonColoredSmall
                                            text="View Profile"
                                            buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.appColor2 }}
                                        />
                                    }
                                    left={

                                        <Wrapper style={[appStyles.center]}>
                                            <Wrapper style={{ opacity: isLoading ? 0 : 1, }}>
                                                <IconButton
                                                    iconName="circle"
                                                    iconColor={isSelected ? colors.appColor1 : colors.appBgColor1}
                                                    buttonSize={totalSize(2.75)}
                                                    iconSize={totalSize(2.5)}
                                                    //buttonColor={colors.appBgColor3}
                                                    buttonStyle={{ borderWidth: 1, borderColor: isSelected ? colors.appColor1 : colors.appBgColor3, marginRight: sizes.marginHorizontalSmall }}
                                                />
                                            </Wrapper>
                                            {isLoading ?
                                                <AbsoluteWrapper >
                                                    <MaterialIndicator
                                                        size={totalSize(2.25)}
                                                        color={colors.appBgColor4}
                                                    />
                                                </AbsoluteWrapper>
                                                :
                                                null
                                            }
                                        </Wrapper>
                                    }
                                />
                            )
                        })
                        :
                        <NoDataViewPrimary
                            title="Dealers"
                        />
                }
                <Spacer height={sizes.doubleBaseMargin} />
            </ScrollView>

        </MainWrapper>
    );
}

export default FflDealers;
