import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonColoredSmall, ComponentWrapper, FilterButton, MainWrapper, NoDataViewPrimary, Products, RowWrapper, Spacer, TinyTitle, Toasts } from '../../../components';
import { appStyles, Backend, DummyData, routes, sizes, sortingOptions } from '../../../services';


function CategoryDetail(props) {
    const { navigation, route } = props
    const { navigate, setParams } = navigation
    const { params } = route
    const category = params?.category || null
    const type = params?.type || null
    const filterData = route.params?.filterData || null
    console.log('category-->', category)
    console.log('type-->', type)
    console.log('filterData-->', filterData)

    //local states

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [allItemsLoaded, setAllItemsLoaded] = useState(false)
    const [loading, setLoading] = useState(true)

    const [sortBy, setSortBy] = useState(sortingOptions.topRated)
    //filter items states
    const [filteredProducts, setFilteredProducts] = useState(null)
    const [filteredProductsCurrentPage, setFilteredProductsCurrentPage] = useState(1)
    const [filteredProductsLoadingMore, setFilteredProductsLoadingMore] = useState(false)
    const [allFilteredProductsLoaded, setAllFilteredProductsLoaded] = useState(false)

    //redux states
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const user = useSelector(state => state.user)
    const { categories } = product
    const { currentLocation, userDetail } = user

    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: category ? category.name : type ? type.title : '',
            headerRight: () => (
                category ?
                    <FilterButton
                        onPress={
                            () => navigate(routes.sortFilter, {
                                clearFilter: handleClearFilter,
                                applyFilter: (data, filterData) => {
                                    //setFilteredProducts(data)
                                    setParams({ filterData })
                                },
                                onPressSortByOption: (sortByOption) => {
                                    setSortBy(sortByOption)
                                },
                                filterData,
                                sortBy,
                            })}
                    />
                    :
                    null
            )
        });
    }, [navigation, filterData, sortBy]);

    useEffect(() => {
        getInitialData()
    }, [sortBy, filterData])

    const getInitialData = async () => {
        !loading && setLoading(true)
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
        if (category) {
            if (!filterData) {
                allItemsLoaded && setAllItemsLoaded(false)
                currentPage > 1 && setCurrentPage(1)
                await getProductsByCategory(true)
            } else {
                allFilteredProductsLoaded && setAllFilteredProductsLoaded(false)
                filteredProductsCurrentPage > 1 && setFilteredProductsCurrentPage(1)
                await getSetFilteredProducts(true)
            }
        } else if (type) {
            await getProductsByType()
        }
        // category ? await getProductsByCategory() :
        //     type ? await getProductsByType() : null
    }
    //const allProducts = [...DummyData.products, ...DummyData.products]

    const getProductsByCategory = async (isInitialData) => {
        const tempPage = isInitialData ? 1 : currentPage
        await Backend.getProductsByCategory({ sort_by: sortBy, category: category.name, page: tempPage }).
            then(res => {
                if (res) {
                    const pre_data = !isInitialData ? products : []
                    setProducts([...pre_data, ...res.data.data])
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
    const getSetFilteredProducts = async (isInitialData) => {
        const tempPage = isInitialData ? 1 : filteredProductsCurrentPage
        await Backend.filterProducts({ ...filterData, sortBy, page: tempPage }).
            then(res => {
                if (res) {
                    const pre_data = !isInitialData ? filteredProducts : []
                    // console.log('pre_data: ', pre_data)
                    // console.log('new Data: ', res.data.data)
                    setFilteredProducts([...pre_data, ...res.data.data])
                    //setFilteredProducts(res.data.data)
                    !res.data.next_page_url ?
                        setAllFilteredProductsLoaded(true) :
                        setFilteredProductsCurrentPage(tempPage + 1)
                }
            })
    }
    const handleLoadingMoreFilteredProducts = async () => {
        if (!allFilteredProductsLoaded) {
            setFilteredProductsLoadingMore(true)
            await getSetFilteredProducts()
            // setFilteredProductsCurrentPage(filteredProductsCurrentPage + 1)
            setFilteredProductsLoadingMore(false)
        }
    }
    const handleClearFilter = () => {
        setFilteredProducts(null)
        setAllFilteredProductsLoaded(false)
        setFilteredProductsCurrentPage(1)
        setParams({ filterData: null })

        // Toasts.success('Filter cleared')
    }
    return (
        <MainWrapper>
            <Products
                data={!filteredProducts ? products : filteredProducts}
                onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                viewType={'grid'}
                ListHeaderComponent={() => {
                    return <>
                        {
                            !filteredProducts ?
                                <Spacer height={sizes.baseMargin} />
                                :
                                <>
                                    <Spacer height={sizes.baseMargin} />
                                    <RowWrapper>
                                        <TinyTitle>Filter Results</TinyTitle>
                                        <Icon
                                            name="close"
                                            type="ionicon"
                                            size={totalSize(3)}
                                            onPress={handleClearFilter}
                                        />
                                    </RowWrapper>
                                    <Spacer height={sizes.smallMargin} />
                                </>
                        }
                    </>
                }}
                isLoading={loading}
                isLoadingMore={!filteredProducts ? loadingMore : filteredProductsLoadingMore}
                onEndReached={(data) => {
                    console.log('onEndReached Data --->', data)
                    !filteredProducts ? handleLoadingMore() : handleLoadingMoreFilteredProducts()
                }}
            />
        </MainWrapper>
    );
}

export default CategoryDetail;
