import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, ProductsSecondary, Spacer } from '../../../components';
import { DummyData, routes, sizes } from '../../../services';

function MarketPlace(props) {
    const { navigate } = props.navigation
    const allProducts = DummyData.marketPlaceProducts
    return (
        <MainWrapper>
            <ProductsSecondary
                data={allProducts}
                onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
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

export default MarketPlace;
