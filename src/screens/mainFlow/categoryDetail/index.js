import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonColoredSmall, ComponentWrapper, FilterButton, MainWrapper, Products, Spacer, Toasts } from '../../../components';
import { appStyles, DummyData, routes, sizes } from '../../../services';

function CategoryDetail(props) {
    const { navigation, route } = props
    const { navigate } = navigation
    const { item } = route.params
    console.log('item-->', item)
    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: item.title,
            headerRight: () => (
                <FilterButton
                    onPress={() => navigate(routes.sortFilter, {
                        clearFilter: () => { Toasts.success('Filter cleared') },
                        applyFilter: () => { Toasts.success('Filter applied') }
                    })}
                />
            )
        });
    }, [navigation]);


    const allProducts = [...DummyData.products, ...DummyData.products]

    return (
        <MainWrapper>
            <Products
                data={allProducts}
                onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                viewType={'grid'}
                ListHeaderComponent={() => {
                    return <Spacer height={sizes.baseMargin} />
                }}
                ListFooterComponent={() => {
                    return <Spacer height={sizes.baseMargin} />
                }}
            />
        </MainWrapper>
    );
}

export default CategoryDetail;
