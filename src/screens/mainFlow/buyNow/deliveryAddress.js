import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { AbsoluteWrapper, ButtonGradient, ComponentWrapper, CustomIcon, KeyboardAvoidingScrollView, MainWrapper, MediumText, RowWrapper, SearchTextinput, Spacer, TextInputUnderlined, TinyTitle, Wrapper } from '../../../components';
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
function DeliveryAddress() {
    const [house, setHouse] = useState('14')
    const [street, setStreet] = useState('Wall Street')
    const [city, setCity] = useState('New York City')
    const [state, setState] = useState('NY')
    const [zip, setZip] = useState('98765')
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper >
                    <MapView
                        style={{
                            height: height(30)
                        }}
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

                    </MapView>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <View >
                    <Spacer height={sizes.marginVertical} />
                    <TextInputUnderlined
                        title="House/Apartment"
                        value={house}
                        onChangeText={t => setHouse(t)}

                    />
                    <Spacer height={sizes.marginVertical} />
                    <TextInputUnderlined
                        title="Street"
                        value={street}
                        onChangeText={t => setStreet(t)}

                    />
                    <Spacer height={sizes.marginVertical} />
                    <TextInputUnderlined
                        title="City"
                        value={city}
                        onChangeText={t =>setCity(t)}

                    />
                    <Spacer height={sizes.marginVertical} />
                    <TextInputUnderlined
                        title="State"
                        value={state}
                        onChangeText={t => setState(t)}

                    />
                    <Spacer height={sizes.marginVertical} />
                    <TextInputUnderlined
                        title="Zipcode"
                        value={zip}
                        onChangeText={t => setZip(t)}

                    />
                    <Spacer height={sizes.doubleBaseMargin * 3} />
                </View>
            </KeyboardAvoidingScrollView>
            <AbsoluteWrapper style={{ bottom: 0, right: 0, left: 0, }}>
                <Spacer height={sizes.marginVertical} />
                <ButtonGradient
                    text="Save Changes"
                />
                <Spacer height={sizes.marginVertical} />
            </AbsoluteWrapper>
        </MainWrapper>
    );
}

export default DeliveryAddress;
