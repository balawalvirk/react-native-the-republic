import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { MaterialIndicator } from 'react-native-indicators';
import { ButtonColoredSmall, ButtonGradient, ButtonGroupAnimated, CheckBoxPrimary, ComponentWrapper, MainWrapper, RegularText, Spacer, TextInputUnderlined, Wrapper, PickerPopup, RenderTags } from '../../../components';
import { appStyles, Backend, colors, HelpingMethods, routes, sizes, sortingOptions } from '../../../services';
const defaultSortingOptions = [
    {
        title: 'Top Rated',
        value: sortingOptions.topRated
    },
    {
        title: 'Distance',
        value: sortingOptions.distance
    },
]

export default function SortFilterDealers({ navigation, route }) {
    const { goBack, navigate } = navigation
    const { clearFilter, applyFilter } = route.params

    const [selectedSortTabIndex, setSelectedSortTabIndex] = useState(0)
    const [acceptsLocalPickup, setAccptsLocalPickup] = useState(false)
    const [services, setServices] = useState(null)
    const [address, setAddress] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [distance, setDistance] = useState(null)
    const [isServicePopupVisible, setServicesPopupVisibility] = useState(false)
    const toggleServicePopup = () => setServicesPopupVisibility(!isServicePopupVisible)
    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ComponentWrapper>
                    <ButtonColoredSmall
                        text="Clear Filters"
                        onPress={() => {
                            clearFilter();
                            goBack()
                        }}
                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontal / 2, paddingVertical: sizes.marginVertical / 1.75, borderRadius: 100, backgroundColor: colors.error }}
                    />
                </ComponentWrapper>
            )
        });
    }, [navigation]);

    useEffect(() => {
        getSetServices()
    }, [])

    const getSetServices = () => {
        // let tempData = []
        // for (let i = 0; i < 20; i++) {
        //     const tempObj = {
        //         name: 'Service Number ' + i,
        //         isSelected: i === 2 || i === 3 ? true : false
        //     }
        //     tempData.push(tempObj)
        // }
        // setServices(tempData)
        Backend.getAllServices().
            then(res => {
                if (res) setServices(res.data)
            })
    }
    const handlePressServices = (item, index) => {
        let tempData = services.slice()
        const tempIndex = services.indexOf(item)
        if (tempIndex >= 0) {
            tempData[tempIndex].isSelected = !tempData[tempIndex].isSelected
            setServices(tempData)
        }

    }
    const getSelectedServices = () => {
        let tempData = []
        if (services) {
            tempData = services.filter(item => item.isSelected)
        }
        return tempData
    }
    const handleGetSetLocation = (data) => {
        console.log('location data ---> ', data)
        if (data) {
            const { address, distance, latitude, longitude } = data
            setAddress(address)
            setDistance(distance)
            setLatitude(latitude)
            setLongitude(longitude)
        }
    }
    const searchArea = address && distance ? `${address.length>15?(address.slice(0,15)+'...'):address} ~ within ${distance} miles` : ''
    return (
        <MainWrapper>
            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <RegularText style={[appStyles.fontBold]}>Sort by</RegularText>
                </ComponentWrapper>
                <Spacer height={sizes.smallMargin} />
                <ButtonGroupAnimated
                    data={defaultSortingOptions}
                    initalIndex={selectedSortTabIndex}
                    text='title'
                    onPressButton={(item, index) => setSelectedSortTabIndex(index)}
                    inActiveButtonStyle={{ paddingVertical: sizes.marginVertical / 3, paddingHorizontal: sizes.marginHorizontalSmall, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.error }}
                    inActiveTextStyle={{ color: colors.error }}
                    activeButtonStyle={{ backgroundColor: colors.error }}
                    activeTextStyle={[appStyles.textWhite]}
                />
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <RegularText style={[appStyles.fontBold]}>Filters</RegularText>
                </ComponentWrapper>
                <Spacer height={sizes.smallMargin} />
                <ComponentWrapper>
                    <CheckBoxPrimary
                        text={'Accepts Local Pickup'}
                        checked={acceptsLocalPickup}
                        onPress={() => setAccptsLocalPickup(!acceptsLocalPickup)}
                        checkIconColor={colors.success}
                    />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    titleStatic={getSelectedServices().length ? 'Services Offered' : null}
                    title={!getSelectedServices().length ? 'Services Offered' : ''}
                    iconNameRight={'caret-down'}
                    iconTypeRight={'ionicon'}
                    iconColorRight={colors.appColor1}
                    iconSizeRight={totalSize(1.5)}
                    onPress={toggleServicePopup}
                    right={
                        !services ?
                            <Wrapper>
                                <MaterialIndicator
                                    size={totalSize(1.5)}
                                    color={colors.appBgColor4}
                                />
                            </Wrapper>
                            :
                            null
                    }
                >
                    {
                        getSelectedServices().length ?
                            <Wrapper style={{ paddingVertical: sizes.smallMargin }}>
                                <RenderTags
                                    tags={getSelectedServices()}
                                    value={'name'}
                                    onPressCross={handlePressServices}
                                    ContainerStyle={{ flexWrap: 'wrap', }}
                                    tagStyle={{ marginBottom: sizes.TinyMargin }}
                                />
                            </Wrapper>
                            :
                            null
                    }
                </TextInputUnderlined>
                <Spacer height={sizes.baseMargin} />

                <TextInputUnderlined
                    title={'Search Area'}
                    value={searchArea}
                    iconNameRight={'map-pin'}
                    iconTypeRight={'feather'}
                    iconColorRight={colors.appColor1}
                    iconSizeRight={totalSize(2.5)}
                    onPress={() => navigate(routes.myLocation, { getLocation: (data) => handleGetSetLocation(data) })}
                />
            </Wrapper>
            <Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ButtonGradient
                    text={'Apply Filters'}
                    shadow
                />
                <Spacer height={sizes.baseMargin} />
            </Wrapper>
            <PickerPopup
                visible={isServicePopupVisible}
                toggle={toggleServicePopup}
                textKey={'name'}
                data={services ? services : []}
                onPressItem={handlePressServices}
                isSelected={(item, index) => {
                    return item.isSelected
                }}
                selectionIndicator={'check'}
                headerTitle={'Services'}
                enableSearch
            />
        </MainWrapper>
    );
}


