import React, { Component, useEffect, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { useDispatch, useSelector } from 'react-redux';
import { IconWithText, ImageSqareRound, LoaderAbsolute, MainWrapper, ProductsHorizontalyPrimary, ProductsSecondary, RegularText, Spacer, TitlePrimary, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';
import TopCategories from './topCategories';
//import Skeleton from './skeleton'
import { CategoriesSkeleton, PostTypesSkeleton } from './skeleton'
import { setMyGroups } from '../../../services/store/actions';

function MarketPlace(props) {
    const { navigate } = props.navigation


    //redux states
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const user = useSelector(state => state.user)
    const { categories } = product
    const { currentLocation, userDetail } = user
    //local states
    const [featuredProducts, setFeaturedProducts] = useState(null)
    const [popularProducts, setPopularProducts] = useState(null)
    const [nearYouProducts, setNearYouProducts] = useState(null)
    const [topRatedProducts, setTopRatedProducts] = useState(null)
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
        await HelpingMethods.requestLocationPermissions()
        //await HelpingMethods.requestLocationAccess()
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
        //setLoading(false)
        // await Backend.getNewNotificationsCount()
        await Backend.get_credit_cards()
        await Backend.get_product_items()
        await Backend.get_product_manufacturers()
        await Backend.get_product_calibers()
        await Backend.get_product_actions()
        await Backend.get_product_conditions()
        userDetail.seller_stripe_account_id && Backend.getStripeAccountDetail({stripe_account_id:userDetail.seller_stripe_account_id})

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
    // if (isLoading) {
    //     return (
    //         <Skeleton />
    //     )
    // }
    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Spacer height={sizes.baseMargin} />
                {
                    categories ?
                        <TopCategories
                            data={categories}
                            onPressCategory={(item, index) => { navigate(routes.CategoryDetail, { category: item }) }}
                            onPressViewAll={() => navigate(routes.categories)}
                        />
                        :
                        Platform.OS === 'ios' ?
                            <CategoriesSkeleton />
                            :
                            null
                }
                {
                    mainOptions.map((item, index) => {
                        return (
                            <>
                                <Spacer height={sizes.smallMargin * 1.5} />
                                {
                                    item.data ?
                                        <RenderProducts
                                            title={item.title}
                                            data={item.data}
                                            onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                                            onPressViewAll={() => { navigate(routes.CategoryDetail, { type: item }) }}
                                        />
                                        :
                                        index === 0 || index === 1 ?
                                            Platform.OS === 'ios' ?
                                                <PostTypesSkeleton />
                                                :
                                                null
                                            :
                                            null
                                }

                            </>
                        )
                    })
                }
            </ScrollView>
        </MainWrapper>
    );
}

export default MarketPlace;

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