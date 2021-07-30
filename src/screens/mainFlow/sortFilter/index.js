import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { ButtonColoredSmall, ButtonGradient, ButtonGroupAnimated, ComponentWrapper, MainWrapper, PickerPrimary, RegularText, Spacer } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';
const sortingOptions = [
    {
        title: 'Top Rated'
    },
    {
        title: 'Title (A-Z)'
    },
    {
        title: 'Title (Z-A)'
    },
    {
        title: 'Price (High-Low)'
    },
    {
        title: 'Price (Low-High)'
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

    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [make, setMake] = useState('')
    const [actionType, setActionType] = useState('')
    const [barrelLength, setBarrelLength] = useState('')
    const [caliber, setCalibre] = useState('')
    const [priceRange, setPriceRange] = useState('')
    return (
        <MainWrapper>
            <Spacer height={sizes.baseMargin} />
            <ComponentWrapper>
                <RegularText style={[appStyles.fontBold]}>Sort by</RegularText>
            </ComponentWrapper>
            <Spacer height={sizes.smallMargin} />
            <ButtonGroupAnimated
                data={sortingOptions}
                initalIndex={selectedTabIndex}
                text='title'
                onPressButton={(item, index) => setSelectedTabIndex(index)}
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
                data={options}
                value={make}
                onChange={(value, index) => setMake(value)}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
                title="Action Type"
                // placeholder="No Selected"
                data={options}
                value={actionType}
                onChange={(value, index) => setActionType(value)}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
                title="Barrel Length"
                // placeholder="No Selected"
                data={options}
                value={barrelLength}
                onChange={(value, index) => setBarrelLength(value)}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
                title="Caliber / Gauge"
                // placeholder="No Selected"
                data={options}
                value={caliber}
                onChange={(value, index) => setCalibre(value)}
            />
            <Spacer height={sizes.baseMargin} />
            <PickerPrimary
                title="Price Range"
                // placeholder="No Selected"
                data={options}
                value={priceRange}
                onChange={(value, index) => setPriceRange(value)}
            />
             <Spacer height={sizes.doubleBaseMargin} />
             <ButtonGradient
             text="Apply Filters"
             onPress={()=>{
                 applyFilter();
                 goBack()
             }}
             />
        </MainWrapper>
    );
}

export default SortFilter;
