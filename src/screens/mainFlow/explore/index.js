import React, { Component, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { MainWrapper, Products, RowWrapper, Wrapper, ButtonGroupAnimated, CustomIcon, AbsoluteWrapper, ButtonColoredSmall, Spacer, ProductCardPrimary, TitleInfoPrimary, ButtonGradient, ArmerInfo, Toasts, MediumText, FilterButton } from '../../../components';
import { appIcons, appStyles, colors, DummyData, HelpingMethods, mapStyles, routes, sizes } from '../../../services';
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import BottomSheet from 'reanimated-bottom-sheet';
import styles from './styles'
const defaultLocation = {
    latitude: 51.5159,
    longitude: 0.1136,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
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
    const [selectedViewIndex, setViewIndex] = useState(0)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [currentlocation, setCurrentLocation] = useState(defaultLocation)
    const [markers, setMarkers] = useState(DummyData.products)
    const [selectedProduct, setProduct] = useState(DummyData.products[0])

    //Refs
    const mapRef = useRef(null)
    const sheetRef = useRef(null);

    const allProducts = DummyData.products

    const renderContent = () => (

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
                <ProductCardPrimary
                    isFavourite={HelpingMethods.checkIsProductFavourite(selectedProduct.id)}
                    viewType={'list'}
                    image={selectedProduct.image}
                    description={selectedProduct.description}
                    discountedPrice={selectedProduct.new_price}
                    price={selectedProduct.old_price}
                    location={selectedProduct.location}
                    rating={selectedProduct.rating}
                    reviewCount={selectedProduct.review_count}
                    userImage={selectedProduct.user.image}
                    userName={selectedProduct.user.name}
                    onPress={(item, index) => {
                        sheetRef.current.snapTo(0);
                        navigate(routes.productDetail, { product: selectedProduct })
                    }}
                />
                <Spacer height={sizes.baseMargin} />
                <ArmerInfo
                    info={selectedProduct.info}
                />
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

    return (
        <MainWrapper>
            {
                selectedTabIndex === 0 ?
                    <Products
                        data={allProducts}
                        onPressProduct={(item, index) => navigate(routes.productDetail, { product: item })}
                        viewType={selectedViewIndex === 0 ? 'grid' : 'list'}
                        ListHeaderComponent={() => {
                            return <Spacer height={sizes.baseMargin * 4} />
                        }}
                        ListFooterComponent={() => {
                            return <Spacer height={sizes.baseMargin * 4} />
                        }}
                    />
                    :
                    // <Map
                    //     data={allProducts}
                    // />
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        clusterColor={colors.appColor1}
                        customMapStyle={mapStyles.light}
                        initialRegion={currentlocation}
                        showsUserLocation={true}
                    >
                        {
                            markers.map((selectedProduct, key) => {
                                return (
                                    <Marker
                                        coordinate={selectedProduct.cooards}

                                        onPress={() => {
                                            setProduct(selectedProduct)
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
                            containerStyle={[{ backgroundColor: 'white', borderRadius: 100, opacity: selectedTabIndex === 0 ? 1 : 0,borderWidth:1,borderColor:colors.appBgColor3 }]}
                            inActiveButtonStyle={{ backgroundColor: 'transparent', marginRight: 0, marginLeft: 0, paddingHorizontal: sizes.marginHorizontal / 1.5, paddingVertical: sizes.smallMargin, }}
                            iconSize={totalSize(2)}
                        />

                    </Wrapper>
                    <FilterButton
                    onPress={() => navigate(routes.sortFilter, {
                        clearFilter: () => { Toasts.success('Filter cleared') },
                        applyFilter: () => { Toasts.success('Filter applied') }
                    })}
                    buttonStyle={{marginHorizontal:0}}
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
                        containerStyle={[{ backgroundColor: 'white', borderRadius: 100,borderWidth:1,borderColor:colors.appBgColor1 }, appStyles.shadow]}
                        inActiveButtonStyle={{ backgroundColor: 'transparent', marginRight: 0, marginLeft: 0, paddingHorizontal: sizes.marginHorizontal * 2,paddingVertical:0 }}
                        activeButtonStyle={{backgroundColor:colors.appColor2}}
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
        </MainWrapper>
    );
}

export default Explore;
