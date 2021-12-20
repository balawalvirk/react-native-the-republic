import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { MaterialIndicator } from 'react-native-indicators';
import { ButtonColoredSmall, ButtonGradient, ButtonGroupAnimated, CheckBoxPrimary, ComponentWrapper, MainWrapper, RegularText, Spacer, TextInputUnderlined, Wrapper, PickerPopup } from '../../../components';
import { appStyles, colors, HelpingMethods, routes, sizes, sortingOptions } from '../../../services';
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
        setTimeout(() => {
            getSetServices()
        }, 2000);
    }, [])

    const getSetServices = () => {
        let tempData = []
        for (let i = 0; i < 20; i++) {
            const tempObj = {
                name: 'Service Number ' + i,
                is_selected: i === 2 || i === 3 ? true : false
            }
            tempData.push(tempObj)
        }
        setServices(tempData)
    }
    const handlePressServices = (item, index) => {
        let tempData = services.slice()
        let tempIndex = services.indexOf(item)
        tempData[tempIndex].is_selected = !tempData[tempIndex].is_selected
        HelpingMethods.handleAnimation()
        setServices(tempData)
    }
    const handleGetSetLocation = (data) => {
        console.log('location data ---> ', data)
    }
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
                    title={'Services Offered'}
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
                />
                <Spacer height={sizes.baseMargin} />

                <TextInputUnderlined
                    title={'Search Area'}
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
                onPressItem={(item, index) => {
                    let tempData = services.slice()
                    tempData[index].is_selected = !tempData[index].is_selected
                    setServices(tempData)
                }}
                isSelected={(item, index) => {
                    return item.is_selected
                }}
                selectionIndicator={'radio'}
                headerTitle={'Services'}
            />
        </MainWrapper>
    );
}


