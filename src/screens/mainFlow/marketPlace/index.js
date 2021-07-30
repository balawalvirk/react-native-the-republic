import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { IconWithText, ImageSqareRound, MainWrapper, ProductsHorizontalyPrimary, ProductsSecondary, RegularText, Spacer, TitlePrimary, Wrapper } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';
import TopCategories from './topCategories';
function RenderProducts({ title, onPressViewAll, data, onPressProduct }) {
    return (
        <Wrapper>
            <TitlePrimary
                title={title}
                onPressRight={onPressViewAll}
            />
            <Spacer height={sizes.smallMargin} />
            <ProductsHorizontalyPrimary
                data={data}
                onPressProduct={onPressProduct}
            />
        </Wrapper>
    )
}
function MarketPlace(props) {
    const { navigate } = props.navigation

    const categories = DummyData.categories.slice()

    const addSponseredProduct = () => {
        let products = []
        DummyData.products.forEach((item, index) => {
            let obj = {
                ...item,
                isSponsered: index === 0 ? true : false
            }
            products.push(obj)
        })
        return (products)
    }

    const mainOptions = [
        {
            title: 'Featured',
            data: addSponseredProduct()
        },
        {
            title: 'Popular',
            data: DummyData.products.slice().reverse()
        },
        {
            title: 'Near You',
            data: DummyData.products.slice()
        },
        {
            title: 'Top Rated',
            data: DummyData.products.slice().reverse()
        }
    ]
    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Spacer height={sizes.baseMargin} />
                <TopCategories
                    data={categories}
                    onPressCategory={(item, index) => { navigate(routes.CategoryDetail, { item }) }}
                    onPressViewAll={() => navigate(routes.categories)}
                />
                {
                    mainOptions.map((item, index) => {
                        return (
                            <>
                                <Spacer height={sizes.smallMargin * 1.5} />
                                <RenderProducts
                                    title={item.title}
                                    data={item.data}
                                    onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                                    onPressViewAll={() => { navigate(routes.CategoryDetail, { item }) }}
                                />
                            </>
                        )
                    })
                }


            </ScrollView>
        </MainWrapper>
    );
}

export default MarketPlace;
