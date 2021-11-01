import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ButtonColoredSmall, ComponentWrapper, FilterButton, MainWrapper, NoDataViewPrimary, Products, Spacer, Toasts } from '../../../components';
import { appStyles, Backend, DummyData, routes, sizes } from '../../../services';
import Skeleton from './skeleton'


function CategoryDetail(props) {
    const { navigation, route } = props
    const { navigate } = navigation
    const { params } = route
    const category = params.category ? params.category : null
    const type = params.type ? params.type : null
    console.log('category-->', category)
    console.log('type-->', type)

    //local states
    const [products, setProducts] = useState(null)
    const [page, setPage] = useState(1)



    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: category ? category.name : type ? type.title : '',
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

    useEffect(() => {
        category ? getProductsByCategory() :
            type ? getProductsByType() : null
    }, [])

    //const allProducts = [...DummyData.products, ...DummyData.products]

    const getProductsByCategory = async () => {
        await Backend.getProductsByCategory(category.name).
            then(res => {
                if (res) {
                    setProducts(res.products)
                }
            })
    }
    const getProductsByType = async () => {
        if (type.title === 'Featured') {
            await Backend.getFeaturedProducts().
                then(res => {
                    if (res) {
                        setProducts(res.products)
                    }
                })
        } else if (type.title === 'Popular') {
            await Backend.getPoluparProducts().
                then(res => {
                    if (res) {
                        setProducts(res.products)
                    }
                })
        } else if (type.title === 'Near You') {
            await Backend.getNearByProducts().
                then(res => {
                    if (res) {
                        setProducts(res.nearbyProducts)
                    }
                })
        } else if (type.title === 'Top Rated') {
            await Backend.getTopRatedProducts().
                then(res => {
                    if (res) {
                        setProducts(res.products)
                    }
                })
        }
    }

    if (!products) {
        return (
            <Skeleton />
        )
    }
    return (
        <MainWrapper>
            {
                products.length ?
                    <Products
                        data={products}
                        onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                        viewType={'grid'}
                        ListHeaderComponent={() => {
                            return <Spacer height={sizes.baseMargin} />
                        }}
                        ListFooterComponent={() => {
                            return <Spacer height={sizes.baseMargin} />
                        }}
                    />
                    :
                    <NoDataViewPrimary
                        title="Products"
                    />
            }

        </MainWrapper>
    );
}

export default CategoryDetail;
