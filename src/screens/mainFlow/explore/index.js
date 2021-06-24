import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { MainWrapper, Products, RowWrapper, Wrapper, ButtonGroupAnimated, AbsoluteWrapper, ButtonColoredSmall, Spacer } from '../../../components';
import { appIcons, appStyles, DummyData, sizes } from '../../../services';
import Map from './map'
const bottomTabs = [
    {
        title: 'List'
    },
    {
        title: 'Map'
    },

]
const topTabs = [
    {
        title: 'Grid',
        icon: appIcons.grid
    },
    {
        title: 'List',
        icon: appIcons.list
    },

]
function Explore() {
    const [selectedViewIndex, setViewIndex] = useState(0)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const allProducts = DummyData.products
    return (
        <MainWrapper>

            {
                selectedTabIndex === 0 ?
                    <Products
                        data={allProducts}
                        viewType={selectedViewIndex === 0 ? 'grid' : 'list'}
                        ListHeaderComponent={() => {
                            return <Spacer height={sizes.baseMargin * 4} />
                        }}
                    // viewType={'grid'}
                    />
                    :
                    <Map />
            }
            <AbsoluteWrapper style={{ top: 0, right: 0, left: 0 }}>
                <Spacer height={sizes.smallMargin} />
                <RowWrapper>
                    <Wrapper>
                        {
                            selectedTabIndex === 0 ?
                                <ButtonGroupAnimated
                                    data={topTabs}
                                    text='title'
                                    onPressButton={(item, index) => setViewIndex(index)}
                                    containerStyle={[{ backgroundColor: 'white', borderRadius: 100, }, appStyles.shadow]}
                                    inActiveButtonStyle={{ backgroundColor: 'transparent', marginRight: 0, marginLeft: 0, paddingHorizontal: sizes.marginHorizontal / 1.5, paddingVertical: sizes.smallMargin, }}
                                    iconSize={totalSize(2)}
                                />
                                :
                                null
                        }
                    </Wrapper>
                    <ButtonColoredSmall
                        text="Sort & Filter"
                        buttonStyle={{ borderRadius: 100, paddingHorizontal: sizes.marginHorizontalSmall }}
                        customIcon={appIcons.filter}
                    />
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
            </AbsoluteWrapper>
            <AbsoluteWrapper style={{ bottom: sizes.marginVertical, right: 0, left: 0 }}>
                <Wrapper style={[{ height: height(5), alignSelf: 'center', }, appStyles.center]}>
                    <ButtonGroupAnimated
                        data={bottomTabs}
                        text='title'
                        onPressButton={(item, index) => setSelectedTabIndex(index)}
                        containerStyle={[{ backgroundColor: 'white', borderRadius: 100, }, appStyles.shadow]}
                        inActiveButtonStyle={{ backgroundColor: 'transparent', marginRight: 0, marginLeft: 0, paddingHorizontal: sizes.marginHorizontal * 2, }}
                    />
                </Wrapper>
            </AbsoluteWrapper>
        </MainWrapper>
    );
}

export default Explore;
