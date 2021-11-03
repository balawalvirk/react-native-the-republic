import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { AbsoluteWrapper, ButtonGradient, ComponentWrapper, CustomIcon, KeyboardAvoidingScrollView, MainWrapper, MediumText, RowWrapper, SearchTextinput, Spacer, TextInputUnderlined, TinyTitle, Toasts, Wrapper } from '../../../components';
import { appIcons, appStyles, Backend, colors, HelpingMethods, mapStyles, sizes } from '../../../services';
import styles from './styles';
import Slider from '@react-native-community/slider';
import { useSelector } from 'react-redux';

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
function DeliveryAddress(props) {

    const { goBack } = props.navigation

    //refs
    const mapRef = useRef(null)
    //redux states
    const user = useSelector(state => state.user)
    const { userDetail, currentLocation, } = user
    const { delivery_address } = userDetail

    //local states
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState('')
    const [house, setHouse] = useState('')
    const [houseError, setHouseError] = useState('')
    const [street, setStreet] = useState('')
    const [streetError, setStreetError] = useState('')
    const [city, setCity] = useState('')
    const [cityError, setCityError] = useState('')
    const [state, setState] = useState('')
    const [stateError, setStateError] = useState('')
    const [zip, setZip] = useState('')
    const [zipError, setZipError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getSetDeliveryAddressData()
    }, [])

    const getSetDeliveryAddressData = () => {
        if (delivery_address) {
            const { address, house, street, city, state, zipcode } = delivery_address
            address && setAddress(address)
            house && setHouse(house)
            street && setStreet(street)
            city && setCity(city)
            state && setState(state)
            zipcode && setZip(zipcode)
        }
    }
    const validations = () => {
        HelpingMethods.handleAnimation()
        !house ? setHouseError('Please add House/Apartment') : setHouseError('')
        !street ? setStreetError('Please add Street') : setStreetError('')
        !city ? setCityError('Please add City') : setCityError('')
        !state ? setStateError('Please add State') : setStateError('')
        !zip ? setZipError('Please add Zipcode') : setZipError('')
        if (house && street && city && state && zip) {
            return true
        }
    }
    const handleUpdateDeliveryAddress = () => {
        if (validations()) {
            setLoading(true)
            Backend.updateDeliveryAddress({ house, street, city, state, zip_code: zip }).
                then(res => {
                    setLoading(false)
                    if (res) {
                        Toasts.success('Delivery Address Updated')
                        goBack()
                    }
                })
        }
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
            >
                <ScrollView>
                    {/*   <Spacer height={sizes.baseMargin} />
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
                </ComponentWrapper> */}
                    <Spacer height={sizes.baseMargin} />
                    <View >
                        <Spacer height={sizes.marginVertical} />
                        <TextInputUnderlined
                            title="House/Apartment"
                            value={house}
                            onChangeText={t => {
                                houseError && setHouseError('')
                                setHouse(t)
                            }}
                            error={houseError}
                        />
                        <Spacer height={sizes.marginVertical} />
                        <TextInputUnderlined
                            title="Street"
                            value={street}
                            onChangeText={t => {
                                streetError && setStreetError('')
                                setStreet(t)
                            }}
                            error={streetError}

                        />
                        <Spacer height={sizes.marginVertical} />
                        <TextInputUnderlined
                            title="City"
                            value={city}
                            onChangeText={t => {
                                cityError && setCityError('')
                                setCity(t)
                            }}
                            error={cityError}

                        />
                        <Spacer height={sizes.marginVertical} />
                        <TextInputUnderlined
                            title="State"
                            value={state}
                            onChangeText={t => {
                                stateError && setStateError('')
                                setState(t)
                            }}
                            error={stateError}

                        />
                        <Spacer height={sizes.marginVertical} />
                        <TextInputUnderlined
                            title="Zipcode"
                            value={zip}
                            onChangeText={t => {
                                zipError && setZipError('')
                                setZip(t)
                            }}
                            error={zipError}

                        />
                        <Spacer height={sizes.baseMargin} />
                    </View>
                </ScrollView>
                <Wrapper>
                    <Spacer height={sizes.marginVertical} />
                    <ButtonGradient
                        text="Save Changes"
                        loading={loading}
                        onPress={handleUpdateDeliveryAddress}
                    />
                    <Spacer height={sizes.marginVertical} />
                </Wrapper>
            </KeyboardAvoidingView>
        </MainWrapper>
    );
}

export default DeliveryAddress;
