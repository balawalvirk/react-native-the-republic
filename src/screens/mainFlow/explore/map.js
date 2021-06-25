import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, CustomIcon, Wrapper, ButtonColoredSmall, Spacer, ComponentWrapper, ProductCardPrimary, TitleInfoPrimary, AbsoluteWrapper } from '../../../components';
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import styles from './styles'
import { appIcons, appStyles, colors, HelpingMethods, mapStyles, sizes } from '../../../services';
import { height, totalSize } from 'react-native-dimension';
import BottomSheet from 'reanimated-bottom-sheet';
const defaultLocation = {
    latitude: 51.5159,
    longitude: 0.1136,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}
function Map({ data }) {
    const [currentlocation, setCurrentLocation] = useState(defaultLocation)
    const [markers, setMarkers] = useState(data)
    const [selectedProduct, setProduct] = useState(data[0])

    //Refs
    const mapRef = useRef(null)
    const sheetRef = useRef(null);

    useEffect(() => {
        mapRef.current.animateToRegion(currentlocation)
    }, [])


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
                    newPrice={selectedProduct.new_price}
                    oldPrice={selectedProduct.old_price}
                    location={selectedProduct.location}
                    rating={selectedProduct.rating}
                    reviewCount={selectedProduct.review_count}
                    userImage={selectedProduct.user.image}
                    userName={selectedProduct.user.name}
                />
                <Spacer height={sizes.baseMargin} />
                <TitleInfoPrimary
                    title="Make"
                    info="Browning"
                    grayBg
                />
                <TitleInfoPrimary
                    title="Modal"
                    info="Buck Mark Plus Vision Black/Gold Suppressor Ready"
                />
                <TitleInfoPrimary
                    title="Calibre / Gauge"
                    info="22 LR"
                    grayBg
                />
                <TitleInfoPrimary
                    title="Action Type"
                    info="Semi Auto"
                />
                <TitleInfoPrimary
                    title="Calibre / Gauge"
                    info="22 LR"
                    grayBg
                />
                <TitleInfoPrimary
                    title="Shooting Type"
                    info="N/A"
                />
                <TitleInfoPrimary
                    title="Handedness"
                    info="Right-Handed"
                    grayBg
                />
                <TitleInfoPrimary
                    title="Action Type"
                    info="Semi Auto"
                />
                <TitleInfoPrimary
                    title="Barrel Length"
                    info="5.857''"
                    grayBg
                />
                <TitleInfoPrimary
                    title="Manufacturer Number"
                    info="0656656577"
                />
                <TitleInfoPrimary
                    title="Firearms Class"
                    info="Non Restricted"
                    grayBg
                />
            </Wrapper>

        </View>
    );

    return (
        <MainWrapper>
            <MapView
                ref={mapRef}
                style={styles.map}
                clusterColor={colors.appColor1}
                // provider = { MapView.PROVIDER_GOOGLE }
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
                                // onPress={() => {
                                //   setServiceRequestItem(selectedProduct);
                                //   toggleRequestOverview()
                                // }}
                                />
                            </Marker>
                        )
                    })
                }
            </MapView>

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

export default Map;
