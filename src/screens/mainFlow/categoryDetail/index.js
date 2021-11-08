import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ButtonColoredSmall, ComponentWrapper, FilterButton, MainWrapper, NoDataViewPrimary, Products, Spacer, Toasts } from '../../../components';
import { appStyles, Backend, DummyData, routes, sizes } from '../../../services';


function CategoryDetail(props) {
    const { navigation, route } = props
    const { navigate } = navigation
    const { params } = route
    const category = params.category ? params.category : null
    const type = params.type ? params.type : null
    console.log('category-->', category)
    console.log('type-->', type)

    //local states
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [allItemsLoaded, setAllItemsLoaded] = useState(false)



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
        getInitialData()
    }, [])

    const getInitialData = async () => {
        await getSetData()
        setLoading(false)
    }
    const handleLoadingMore = async () => {
        if (!allItemsLoaded) {
            setLoadingMore(true)
            await getSetData()
            setCurrentPage(currentPage + 1)
            setLoadingMore(false)
        }
    }
    const getSetData = async () => {
        category ? await getProductsByCategory() :
            type ? await getProductsByType() : null
    }
    //const allProducts = [...DummyData.products, ...DummyData.products]

    const getProductsByCategory = async () => {
        await Backend.getProductsByCategory({ category: category.name, page: currentPage }).
            then(res => {
                if (res) {
                    setProducts([...products, ...res.data.data])
                    !res.data.next_page_url && setAllItemsLoaded(true)
                }
            })
    }
    const getProductsByType = async () => {
        const { title } = type
        if (title === 'Featured') {
            await Backend.getFeaturedProducts(currentPage).
                then(res => {
                    if (res) {
                        setProducts([...products, ...res.data.data])
                        !res.data.next_page_url && setAllItemsLoaded(true)
                    }
                })
        } else if (title === 'Popular') {
            await Backend.getPoluparProducts(currentPage).
                then(res => {
                    if (res) {
                        setProducts([...products, ...res.data.data])
                        !res.data.next_page_url && setAllItemsLoaded(true)

                    }
                })
        } else if (title === 'Near You') {
            await Backend.getNearByProducts(currentPage).
                then(res => {
                    if (res) {
                        setProducts([...products, ...res.data.data])
                        !res.data.next_page_url && setAllItemsLoaded(true)

                    }
                })
        } else if (title === 'Top Rated') {
            await Backend.getTopRatedProducts(currentPage).
                then(res => {
                    if (res) {
                        setProducts([...products, ...res.data.data])

                        !res.data.next_page_url && setAllItemsLoaded(true)

                    }
                })
        }
    }


    return (
        <MainWrapper>
            <Products
                data={products}
                onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                viewType={'grid'}
                ListHeaderComponent={() => {
                    return <Spacer height={sizes.baseMargin} />
                }}
                isLoading={loading}
                isLoadingMore={loadingMore}
                onEndReached={(data) => {
                    console.log('onEndReached Data --->', data)
                    handleLoadingMore()
                }}
            />
        </MainWrapper>
    );
}

export default CategoryDetail;
