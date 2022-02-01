import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { ButtonColoredSmall, ButtonGradient, ButtonGroupAnimated, ComponentWrapper, InputTitle, MainWrapper, MultiSliderPrimary, PickerPrimary, RegularText, RowWrapper, RowWrapperBasic, Spacer, TextInputUnderlined, Wrapper } from '../../../components';
import { appStyles, Backend, colors, orderStatuses, routes, sizes, sortingOptions } from '../../../services';
const defaultSortingOptions = [
    {
        title: 'Top Rated',
        value: sortingOptions.topRated
    },
    {
        title: 'Title (A-Z)',
        value: sortingOptions.title_a_z
    },
    {
        title: 'Title (Z-A)',
        value: sortingOptions.title_z_a
    },
    {
        title: 'Price (High-Low)',
        value: sortingOptions.price_high_to_low
    },
    {
        title: 'Price (Low-High)',
        value: sortingOptions.price_low_to_high
    }
]
const options = [
    {
        label: 'Option 1',
        value: 'Option 1'
    },
    {
        label: 'Option 2',
        value: 'Option 2'
    },
    {
        label: 'Option 3',
        value: 'Option 3'
    }
]
function SortFilter(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { clearFilter, applyFilter } = route.params
    const filterData = route.params?.filterData || null
    const sortBy = route.params?.sortBy || null
    //redux states
    const product = useSelector(state => state.product)
    const { categories, items, actions, manufacturers, conditions, calibers } = product

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

    const [selectedSortTabIndex, setSelectedSortTabIndex] = useState(0)
    const [make, setMake] = useState('')
    const [actionType, setActionType] = useState('')
    const [barrelLength, setBarrelLength] = useState('')
    const [caliber, setCalibre] = useState('')
    const [priceRange, setPriceRange] = useState([1, 1000000])
    const [loading, setLoading] = useState(false)

    const priceRangeValuesChange = values => setPriceRange(values)



    useEffect(() => {
        getSetFilterData()
    }, [])

    const getSetFilterData = () => {
        console.log('filterData  --> ', filterData)
        console.log('sortBy  --> ', sortBy)
        if (sortBy) {
            const tempSortBy = defaultSortingOptions.find(ite => ite.value === sortBy)
            console.log('tempSortBy: ',tempSortBy)
            if (tempSortBy) {
                const tempSortByIndex = defaultSortingOptions.indexOf(tempSortBy)
                console.log('tempSortByIndex: ',tempSortByIndex)
                if (tempSortByIndex >= 0) {
                    setSelectedSortTabIndex(tempSortByIndex)
                }
            }
        }
        if (filterData) {
            const { sortBy, make, action, caliber, minPrice, maxPrice, barel_length } = filterData
            const tempSortByObj = defaultSortingOptions.find(item => item.value === sortBy)
            const tempSortByIndex = defaultSortingOptions.indexOf(tempSortByObj)
            console.log('tempSortByIndex  --> ', tempSortByIndex)
            setSelectedSortTabIndex(tempSortByIndex)
            setActionType(action)
            setMake(make)
            setCalibre(caliber)
            setPriceRange([minPrice, maxPrice])
            setBarrelLength(barel_length)
        }
    }
    const handleApplyFilter = async () => {
        setLoading(true)
        const filteredProductsData = {
            sortBy: defaultSortingOptions[selectedSortTabIndex].value,
            make: make != 'placeholder' ? make : '',
            action: actionType != 'placeholder' ? actionType : '',
            caliber: caliber != 'placeholder' ? caliber : '',
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            barel_length: barrelLength != 'placeholder' ? barrelLength : ''
        }
        await Backend.filterProducts(filteredProductsData).
            then(res => {
                setLoading(false)
                if (res) {
                    applyFilter(res.data.data, filteredProductsData);
                    goBack()
                }
            })
    }
    return (
        <MainWrapper>
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
                    setSelectedSortTabIndex(index)
                    navigate(routes.find, { sortBy: item.value })
                }}
                inActiveButtonStyle={{ paddingVertical: sizes.marginVertical / 3, paddingHorizontal: sizes.marginHorizontalSmall, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.error }}
                inActiveTextStyle={{ color: colors.error }}
                activeButtonStyle={{ backgroundColor: colors.error }}
                activeTextStyle={[appStyles.textWhite]}
            />
            <Spacer height={sizes.baseMargin} />
            <ComponentWrapper>
                <RegularText style={[appStyles.fontBold]}>Filters</RegularText>
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
                title="Make"
                // placeholder="No Selected"
                data={manufacturers}
                value={make}
                onChange={(value, index) => setMake(value)}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
                title="Action Type"
                // placeholder="No Selected"
                data={actions}
                value={actionType}
                onChange={(value, index) => setActionType(value)}
            />
            {/* <Spacer height={sizes.baseMargin} />
            <PickerPrimary
                title="Barrel Length"
                // placeholder="No Selected"
                data={options}
                value={barrelLength}
                onChange={(value, index) => setBarrelLength(value)}
            /> */}
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
                title="Caliber / Gauge"
                // placeholder="No Selected"
                data={calibers}
                value={caliber}
                onChange={(value, index) => setCalibre(value)}
            />
            <Spacer height={sizes.doubleBaseMargin} />
            {/* <PickerPrimary
                title="Price Range"
                // placeholder="No Selected"
                data={options}
                value={priceRange}
                onChange={(value, index) => setPriceRange(value)}
            /> */}
            <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalLarge }}>
                <InputTitle>Price</InputTitle>

                <RowWrapperBasic>
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            value={'$ ' + priceRange[0].toString()}
                            editable={false}
                            containerStyle={{ marginHorizontal: 0 }}
                        />
                    </Wrapper>
                    <Spacer width={sizes.marginHorizontalXLarge} />
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            value={'$' + priceRange[1].toString()}
                            editable={false}
                            containerStyle={{ marginHorizontal: 0 }}
                        />
                    </Wrapper>
                </RowWrapperBasic>
            </ComponentWrapper>
            <ComponentWrapper>
                <MultiSliderPrimary
                    values={priceRange}
                    onValuesChange={priceRangeValuesChange}
                    minimumValue={1}
                    maximumValue={100000}
                    sliderLength={width(85)}
                    valuePrimary={'$' + priceRange[0]}
                    valueSecondary={'$' + priceRange[1]}
                />
            </ComponentWrapper>
            <Spacer height={sizes.doubleBaseMargin} />
            <ButtonGradient
                text="Apply Filters"
                onPress={handleApplyFilter}
                loading={loading}

            />
        </MainWrapper>
    );
}

export default SortFilter;
