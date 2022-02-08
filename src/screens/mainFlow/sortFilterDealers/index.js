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
    const { clearFilter, applyFilter, onPressSortByOption } = route.params
    const filterData = route.params?.filterData || null
    const sortBy = route.params?.sortBy || null
    //console.log('filterData: ', filterData)
    //console.log('sortBy: ', sortBy)

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
        getSetInitialData()
    }, [])
    const getSetInitialData = async () => {
        await getSetServices()
        getSetSortFilterData()
    }

    const getSetSortFilterData = () => {
        console.log('filterData  --> ', filterData)
        console.log('sortBy  --> ', sortBy)
        if (sortBy) {
            const tempSortBy = defaultSortingOptions.find(ite => ite.value === sortBy)
            //console.log('tempSortBy: ', tempSortBy)
            if (tempSortBy) {
                const tempSortByIndex = defaultSortingOptions.indexOf(tempSortBy)
                //console.log('tempSortByIndex: ', tempSortByIndex)
                if (tempSortByIndex >= 0) {
                    setSelectedSortTabIndex(tempSortByIndex)
                }
            }
        }
        if (filterData) {
            const { latitude, longitude, address, distance, local_pickup, selected_services, } = filterData
            setLatitude(latitude)
            setLongitude(longitude)
            setDistance(distance)
            setAccptsLocalPickup(local_pickup)
            setAddress(address)
            // if (selected_services?.length) {
            //     let tempServices = services.slice()
            //     console.log('tempServices: ',tempServices)
            //     for (const ss of selected_services) {
            //         const matchedService = tempServices.find(s => s.id === ss.id)
            //         if (matchedService) {
            //             const tempServiceIndex = tempServices.indexOf(matchedService)
            //             if (tempServiceIndex >= 0) {
            //                 tempServices[tempServiceIndex].isSelected = true
            //             }
            //         }
            //     }
            //     setServices(tempServices)
            // }
        }
    }
    const getSetServices = async () => {
        await Backend.getAllServices().
            then(res => {
                if (res) {
                    setServices(res.data)
                    if(filterData?.selected_services){
                        const {selected_services}=filterData
                        if (selected_services?.length) {
                            let tempServices = res.data.slice()
                            console.log('tempServices: ',tempServices)
                            for (const ss of selected_services) {
                                const matchedService = tempServices.find(s => s.id === ss.id)
                                if (matchedService) {
                                    const tempServiceIndex = tempServices.indexOf(matchedService)
                                    if (tempServiceIndex >= 0) {
                                        tempServices[tempServiceIndex].isSelected = true
                                    }
                                }
                            }
                            setServices(tempServices)
                        }
                    }
                }
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
    const handleApplyFilter = async () => {
        // setLoading(true)
        const filteredDealersData = {
            //sortBy: defaultSortingOptions[selectedSortTabIndex].value,
            latitude, longitude, distance, address, local_pickup: acceptsLocalPickup, selected_services: getSelectedServices(),
        }

        console.log('filteredDealersData: ', filteredDealersData)
        applyFilter(filteredDealersData);
        goBack()

        //  await Backend.filterProducts(filteredDealersData).
        //      then(res => {
        //          setLoading(false)
        //          if (res) {
        //              console.log('filtered products: ',res.data.data)
        //              applyFilter(res.data.data, filteredDealersData);
        //              goBack()
        //          }
        //      })
    }
    const searchArea = address && distance ? `${address.length > 15 ? (address.slice(0, 15) + '...') : address} ~ within ${distance} miles` : ''
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
                    onPressButton={(item, index) => {
                        onPressSortByOption(item.value)
                        goBack()
                        setSelectedSortTabIndex(index)
                    }
                    }
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
                    onPress={handleApplyFilter}
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


