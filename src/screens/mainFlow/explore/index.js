import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { MainWrapper, Products, RowWrapper, Wrapper, ButtonGroupAnimated, CustomIcon, AbsoluteWrapper, ButtonColoredSmall, Spacer, ProductCardPrimary, TitleInfoPrimary, ButtonGradient, ArmerInfo, Toasts, MediumText, FilterButton, SkeletonPrimary } from '../../../components';
import { appIcons, appImages, appStyles, Backend, colors, DummyData, HelpingMethods, mapStyles, routes, sizes } from '../../../services';
import MapView,{ Marker } from "react-native-maps";
//import MapView from "react-native-map-clustering";
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles'
import { useSelector } from 'react-redux';
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
function Explore(props) {
    const { navigate } = props.navigation



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
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [allItemsLoaded, setAllItemsLoaded] = useState(false)

    const [mapProducts, setMapProducts] = useState(null)
    const [selectedViewIndex, setViewIndex] = useState(0)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    // const [currentlocation, setCurrentLocation] = useState(defaultLocation)
    const [markers, setMarkers] = useState(DummyData.products)
    const [selectedProduct, setProduct] = useState(null)

    useEffect(() => {
        getInitialData()
    }, [])


    const getInitialData = async () => {
        await getSetAllProducts()
        getSetMapProducts()
        getSetMyLocation()
        setLoading(false)
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
            setCurrentPage(currentPage + 1)
            setLoadingMore(false)
        }
    }
    const getSetAllProducts = async () => {
        await Backend.getAllProducts(currentPage).
            then(res => {
                if (res) {
                    setAllProducts([...allProducts, ...res.data.data])
                    !res.data.next_page_url && setAllItemsLoaded(true)
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

    return (
        <MainWrapper>
            {
                selectedTabIndex === 0 ?
                    < Products
                        data={allProducts}
                        onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                        viewType={selectedViewIndex === 0 ? 'grid' : 'list'}
                        ListHeaderComponent={() => {
                            return <Spacer height={sizes.baseMargin * 4} />
                        }}
                        isLoading={loading}
                        isLoadingMore={loadingMore}
                        onEndReached={(data) => {
                            console.log('onEndReached Data --->', data)
                            handleLoadingMore()
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
                        onPress={() => navigate(routes.sortFilter, {
                            clearFilter: () => { Toasts.success('Filter cleared') },
                            applyFilter: () => { Toasts.success('Filter applied') }
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

export default Explore;
