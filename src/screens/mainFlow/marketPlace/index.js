import React, { Component, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { IconWithText, ImageSqareRound, LoaderAbsolute, MainWrapper, ProductsHorizontalyPrimary, ProductsSecondary, RegularText, Spacer, TitlePrimary, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';
import TopCategories from './topCategories';
import Skeleton from './skeleton'
function RenderProducts({ title, onPressViewAll, data, onPressProduct }) {
    return (
        <>
            {
                data.length ?
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
                    :
                    null
            }
        </>
    )
}
function MarketPlace(props) {
    const { navigate } = props.navigation


    //redux states
    const product = useSelector(state => state.product)
    const user = useSelector(state => state.user)
    const { categories } = product
    const { currentLocation } = user
    //local states
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [popularProducts, setPopularProducts] = useState([])
    const [nearYouProducts, setNearYouProducts] = useState([])
    const [topRatedProducts, setTopRatedProducts] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getSetData()
    }, [])

    useEffect(() => {
        currentLocation && Backend.getNearByProducts().
            then(res => {
                if (res) {
                    setNearYouProducts(res.data.data)
                }
            })
    }, [currentLocation])

    const getSetData = async () => {
        await HelpingMethods.RequestLocationAccess()
        await Backend.get_product_categories()
        await Backend.getFeaturedProducts().
            then(res => {
                if (res) {
                    setFeaturedProducts(res.data.data)
                }
            })
        await Backend.getPoluparProducts().
            then(res => {
                if (res) {
                    setPopularProducts(res.data.data)
                }
            })

        await Backend.getTopRatedProducts().
            then(res => {
                if (res) {
                    setTopRatedProducts(res.data.data)
                }
            })


        await Backend.get_credit_cards()
        await Backend.get_product_items()
        await Backend.get_product_manufacturers()
        await Backend.get_product_calibers()
        await Backend.get_product_actions()
        await Backend.get_product_conditions()
        setLoading(false)
    }


    const mainOptions = [
        {
            title: 'Featured',
            data: featuredProducts
        },
        {
            title: 'Popular',
            data: popularProducts
        },
        {
            title: 'Near You',
            data: nearYouProducts
        },
        {
            title: 'Top Rated',
            data: topRatedProducts
        }
    ]
    if (isLoading) {
        return (
            <Skeleton />
        )
    }
    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Spacer height={sizes.baseMargin} />
                <TopCategories
                    data={categories}
                    onPressCategory={(item, index) => { navigate(routes.CategoryDetail, { category: item }) }}
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
                                    onPressViewAll={() => { navigate(routes.CategoryDetail, { type: item }) }}
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
