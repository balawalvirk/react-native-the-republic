import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { MainWrapper, Products, RowWrapper, Wrapper, ButtonGroupAnimated, CustomIcon, AbsoluteWrapper, ButtonColoredSmall, Spacer, ProductCardPrimary, TitleInfoPrimary, ButtonGradient, ArmerInfo, Toasts, MediumText, FilterButton, SkeletonPrimary, TinyTitle } from '../../../components';
import { appIcons, appImages, appStyles, Backend, colors, DummyData, HelpingMethods, mapStyles, routes, sizes, sortingOptions } from '../../../services';
import MapView, { Marker } from "react-native-maps";
//import MapView from "react-native-map-clustering";
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles'
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
const delta = 0.9
const ASPECT_RATIO = width(100) / height(100)
const defaultLocation = {
    latitude: 51.5359,
    longitude: 0.1236,
}
const locationDelta = {
    latitudeDelta: delta,
    longitudeDelta: delta * ASPECT_RATIO,
}
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

function Find({ navigation, route }) {
    const { navigate, setParams } = navigation
    const filterData = route.params?.filterData || null
    const sortBy = route.params?.sortBy || sortingOptions.topRated


    //Refs
    const mapRef = useRef(null)
    const sheetRef = useRef(null);

    //Redux states
    const user = useSelector(state => state.user)
    const { coords } = user.currentLocation
    const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
    }
    //local states
    const [myLocation, setMyLocation] = useState(null)
    const [allProducts, setAllProducts] = useState([])
    //const [sortBy, setSortBy] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredProductsCurrentPage, setFilteredProductsCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [filteredProductsLoadingMore, setFilteredProductsLoadingMore] = useState(false)
    const [allItemsLoaded, setAllItemsLoaded] = useState(false)
    const [allFilteredProductsLoaded, setAllFilteredProductsLoaded] = useState(false)

    const [mapProducts, setMapProducts] = useState(null)
    const [selectedViewIndex, setViewIndex] = useState(0)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    // const [currentlocation, setCurrentLocation] = useState(defaultLocation)
    const [markers, setMarkers] = useState(DummyData.products)
    const [selectedProduct, setProduct] = useState(null)


    useEffect(() => {
        getSetProductsData()
    }, [sortBy])

    useEffect(() => {
        getInitialData()
    }, [])


    const getSetProductsData = async () => {
        console.log('sortBy: ', sortBy)
        !loading && setLoading(true)
        currentPage > 1 && setCurrentPage(1)
        allItemsLoaded && setAllItemsLoaded(false)
       await getSetAllProducts({ initialData: true, page: 1 })
        setLoading(false)
    }
    const getInitialData = async () => {
        //await getSetAllProducts(true)
        getSetMyLocation()
        getSetMapProducts()
        //setLoading(false)
    }
    const getSetMyLocation = () => {
        const tempMyLocation = HelpingMethods.getMyLocation()
        console.log('tempMyLocation -->', tempMyLocation)
        if (tempMyLocation) {
            console.log('setMyLocation -->', { ...tempMyLocation, ...locationDelta })
            setMyLocation({ ...tempMyLocation, ...locationDelta })
        }
    }
    const handleLoadingMore = async () => {
        if (!allItemsLoaded) {
            setLoadingMore(true)
            await getSetAllProducts()
            // setCurrentPage(currentPage + 1)
            setLoadingMore(false)
        }
    }
    const handleLoadingMoreFilteredProducts = async () => {
        if (!allFilteredProductsLoaded) {
            setFilteredProductsLoadingMore(true)
            await getSetFilteredProducts()
            // setFilteredProductsCurrentPage(filteredProductsCurrentPage + 1)
            setFilteredProductsLoadingMore(false)
        }
    }
    const getSetAllProducts = async (data) => {
        // const { isinitialData, page } = data
        const tempPage = data?.page || currentPage
        const tempInitialData = data?.initialData || null
        await Backend.getAllProducts({ sort_by: sortBy, page: tempPage }).
            then(res => {
                if (res) {
                    const pre_data = !tempInitialData ? allProducts : []
                    setAllProducts([...pre_data, ...res.data.data,])
                    !res.data.next_page_url ?
                        setAllItemsLoaded(true) :
                        setCurrentPage(tempPage + 1)
                }
            })
    }
    const getSetFilteredProducts = async (initialData) => {

        await Backend.filterProducts({ ...filterData, page: filteredProductsCurrentPage }).
            then(res => {
                if (res) {
                    const pre_data = !initialData ? filteredProducts : []
                    setFilteredProducts([...pre_data, ...res.data.data])
                    !res.data.next_page_url ?
                        setAllFilteredProductsLoaded(true) :
                        setFilteredProductsCurrentPage(filteredProductsCurrentPage + 1)
                }
            })
    }
    const getSetMapProducts = async () => {
        await Backend.getMapProducts().
            then(res => {
                if (res) {
                    setMapProducts(res.data)
                }
            })
    }

    const getMarkers = () => {
        let tempMarkers = []
        tempMarkers = mapProducts.filter(item => item.latitude && item.longitude && item.user)
        return tempMarkers
    }

    const handleClearFilter = () => {
        setFilteredProducts(null)
        setAllFilteredProductsLoaded(false)
        setFilteredProductsCurrentPage(1)
        setParams({ filterData: null })

        // Toasts.success('Filter cleared')
    }

    const renderContent = () => {
        let productInfo = {}

        if (selectedProduct) {
            const { item, type, manufacturer, caliber, action, condition, images, reviews } = selectedProduct
            const tempProdInfo = {
                item, type, manufacturer, caliber, action, condition
            }
            productInfo = tempProdInfo
        }
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    paddingTop: sizes.baseMargin,
                    height: height(80),
                    // borderWidth:2,
                    //...appStyles.shadow
                }}
            >
                <Wrapper flex={1} style={{ backgroundColor: 'white', borderTopRightRadius: sizes.cardRadius * 2, borderTopLeftRadius: sizes.cardRadius * 2, ...appStyles.shadowExtraDark }}>
                    <Spacer height={sizes.baseMargin} />
                    {
                        selectedProduct ?
                            <>
                                <ProductCardPrimary
                                    isFavourite={HelpingMethods.checkIsProductFavourite(selectedProduct.id)}
                                    viewType={'list'}
                                    image={
                                        selectedProduct.images ?
                                            JSON.parse(selectedProduct.images).length ?
                                                JSON.parse(selectedProduct.images)[0] :
                                                appImages.noImageAvailable :
                                            appImages.noImageAvailable
                                    }
                                    description={selectedProduct.title}
                                    price={selectedProduct.price}
                                    discountedPrice={selectedProduct.discounted_price}
                                    location={selectedProduct.address}
                                    rating={selectedProduct.avg_rating}
                                    reviewCount={selectedProduct.reviews_count}
                                    userImage={selectedProduct.user.profile_image}
                                    userName={selectedProduct.user.first_name}
                                    onPress={(item, index) => {
                                        sheetRef.current.snapTo(0);
                                        navigate(routes.productDetail, { product: selectedProduct })
                                    }}
                                />
                                <Spacer height={sizes.baseMargin} />
                                <ArmerInfo
                                    info={productInfo}
                                />
                            </>
                            :
                            null
                    }
                    <Spacer height={sizes.smallMargin} />
                    <ButtonGradient
                        text="View All Info"
                        onPress={(item, index) => {
                            sheetRef.current.snapTo(0);
                            navigate(routes.productDetail, { product: selectedProduct })
                        }}
                    />
                </Wrapper>

            </View>
        );
    }

    const showProducts = filteredProducts ? filteredProducts : allProducts
    return (
        <MainWrapper>
            {
                selectedTabIndex === 0 ?
                    < Products
                        data={showProducts}
                        onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                        viewType={selectedViewIndex === 0 ? 'grid' : 'list'}
                        ListHeaderComponent={() => {
                            return <>
                                {
                                    !filteredProducts ?
                                        <Spacer height={sizes.baseMargin * 4} />
                                        :
                                        <>
                                            <Spacer height={sizes.baseMargin * 3} />
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
                            !filteredProducts ?
                                handleLoadingMore()
                                :
                                handleLoadingMoreFilteredProducts()
                        }}
                    />
                    :
                    mapProducts && myLocation ?
                        <MapView
                            ref={mapRef}
                            style={styles.map}
                            clusterColor={colors.appColor1}
                            customMapStyle={mapStyles.light}
                            initialRegion={
                                // {
                                //     ...currentLocation,
                                //     ...locationDelta
                                // }
                                myLocation
                            }
                            showsUserLocation={true}
                            animationEnabled={false}
                        >
                            {
                                getMarkers().map((item, key) => {
                                    const markerCoords = {
                                        latitude: item.latitude,
                                        longitude: item.longitude
                                    }
                                    return (
                                        <Marker
                                            coordinate={markerCoords}
                                            onPress={() => {
                                                setProduct(item)
                                                sheetRef.current.snapTo(1)
                                            }}
                                        >
                                            <CustomIcon
                                                icon={appIcons.map_pin}
                                                size={totalSize(5)}
                                            />
                                        </Marker>
                                    )
                                })
                            }
                        </MapView>
                        :
                        <SkeletonPrimary itemStyle={{ height: height(100), marginHorizontal: 0 }} />
            }
            <AbsoluteWrapper style={{ top: 0, right: 0, left: 0 }}>
                <Spacer height={sizes.smallMargin} />
                <RowWrapper>
                    <Wrapper>
                        <ButtonGroupAnimated
                            data={topTabs}
                            initalIndex={selectedViewIndex}
                            text='title'
                            onPressButton={(item, index) => setViewIndex(index)}
                            containerStyle={[{ backgroundColor: 'white', borderRadius: 100, opacity: selectedTabIndex === 0 ? 1 : 0, borderWidth: 1, borderColor: colors.appBgColor3 }]}
                            inActiveButtonStyle={{ backgroundColor: 'transparent', marginRight: 0, marginLeft: 0, paddingHorizontal: sizes.marginHorizontal / 1.5, paddingVertical: sizes.smallMargin, }}
                            iconSize={totalSize(2)}
                        />

                    </Wrapper>
                    <FilterButton
                        onPress={
                            () => navigate(routes.sortFilter, {
                                clearFilter: handleClearFilter,
                                applyFilter: (data, filterData) => {
                                    setFilteredProducts(data)
                                    setParams({ filterData })
                                },
                                filterData,
                                sortBy,
                            })}
                        buttonStyle={{ marginHorizontal: 0 }}
                    />
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
            </AbsoluteWrapper>
            <AbsoluteWrapper style={{ bottom: sizes.marginVertical, right: 0, left: 0 }}>
                <Wrapper style={[{ height: height(5), alignSelf: 'center', }, appStyles.center]}>
                    <ButtonGroupAnimated
                        data={bottomTabs}
                        initalIndex={selectedTabIndex}
                        text='title'
                        onPressButton={(item, index) => setSelectedTabIndex(index)}
                        containerStyle={[{ backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: colors.appBgColor1 }, appStyles.shadow]}
                        inActiveButtonStyle={{ backgroundColor: 'transparent', marginRight: 0, marginLeft: 0, paddingHorizontal: sizes.marginHorizontal * 2, paddingVertical: 0 }}
                        activeButtonStyle={{ backgroundColor: colors.appColor2 }}
                    />
                </Wrapper>
            </AbsoluteWrapper>
            <BottomSheet
                ref={sheetRef}
                initialSnap={0}
                snapPoints={[0, height(35), height(80)]}
                // borderRadius={sizes.cardRadius*2}
                renderContent={renderContent}
            />
        </MainWrapper >
    );
}

export default Find;
