import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { AbsoluteWrapper, ButtonGradient, CustomIcon, MainWrapper, MediumText, RowWrapper, SearchTextinput, Spacer, TinyTitle, Wrapper } from '../../../components';
import { appIcons, appStyles, colors, mapStyles, sizes } from '../../../services';
import styles from './styles';
import Slider from '@react-native-community/slider';

const defaultLocation = {
    latitude: 51.5359,
    longitude: 0.1236,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}
const defaultMarker = {
    title: 'Your Location',
    cooards: {
        latitude: 51.5359,
        longitude: 0.1236
    }
}
function MyLocation() {
    const [radius, setRadius] = useState(10)
    return (
        <MainWrapper>
            <MapView
                style={styles.map}
                clusterColor={colors.appColor1}
                // provider = { MapView.PROVIDER_GOOGLE }
                customMapStyle={mapStyles.light}
                initialRegion={defaultLocation}
            // showsUserLocation={true}
            >
                <Marker
                    coordinate={defaultMarker.cooards}
                // coordinate={tempCooards}
                //coordinate={dummyCooards}
                //title={item.name}
                // description={item.address}
                // calloutAnchor={78}
                //calloutOffset={10}
                // onPress={() => this.UsersFlatListRef.scrollToIndex({ animated: true, index: key })}
                // onPress={() => {
                //   setServiceRequestItem(item);
                //   toggleRequestOverview()
                // }}
                >
                    <CustomIcon
                        icon={appIcons.map_pin}
                        size={totalSize(6)}
                    //color={waterDamage && colors.error}
                    // onPress={() => {
                    //   setServiceRequestItem(item);
                    //   toggleRequestOverview()
                    // }}
                    />
                </Marker>
                <Circle
                    center={defaultLocation}
                    radius={50*radius}
                    strokeColor={'transparent'}
                    fillColor={colors.appColor1 + '20'}
                />
            </MapView>
            <View >
                <Spacer height={sizes.marginVertical} />
                <SearchTextinput
                    placeholder="Search by zip code"
                    inputContainerStyle={{ backgroundColor: colors.appBgColor1, ...appStyles.shadow }}
                />
                <Spacer height={sizes.marginVertical} />
            </View>
            <AbsoluteWrapper style={{ bottom: 0, right: 0, left: 0, backgroundColor: colors.appBgColor1, ...appStyles.shadow }}>
                <Spacer height={sizes.marginVertical} />
                <RowWrapper>
                    <TinyTitle>Distance</TinyTitle>
                    <MediumText style={[appStyles.textPrimaryColor]}>{radius} Miles</MediumText>
                </RowWrapper>
                <Spacer height={sizes.marginVertical} />
                <Wrapper style={[appStyles.center]}>
                    <Slider
                        style={{ width: width(90), height: height(2.5) }}
                        value={radius}
                        onValueChange={value=>setRadius(value)}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor={colors.appColor1}
                        maximumTrackTintColor={colors.appBgColor3}
                    />
                </Wrapper>
                <Spacer height={sizes.marginVertical} />
                <ButtonGradient
                    text="Update Location"
                />
                <Spacer height={sizes.marginVertical} />
            </AbsoluteWrapper>
        </MainWrapper>
    );
}

export default MyLocation;
