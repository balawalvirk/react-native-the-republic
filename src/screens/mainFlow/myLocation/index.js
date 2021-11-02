import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { AbsoluteWrapper, ButtonGradient, ComponentWrapper, CustomIcon, GoogleAutoComplete, MainWrapper, MediumText, RowWrapper, SearchTextinput, Spacer, TinyTitle, Toasts, Wrapper } from '../../../components';
import { appIcons, appStyles, Backend, colors, mapStyles, sizes } from '../../../services';
import styles from './styles';
import Slider from '@react-native-community/slider';
import { useSelector } from 'react-redux';
const delta = 0.9
const ASPECT_RATIO = width(100) / height(100)
const defaultLocation = {
    latitude: 51.5359,
    longitude: 0.1236,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}
const locationDelta = {
    latitudeDelta: delta,
    longitudeDelta: delta * ASPECT_RATIO,
}
const defaultMarker = {
    title: 'Your Location',
    cooards: {
        latitude: 51.5359,
        longitude: 0.1236
    }
}
function MyLocation(props) {
    const { goBack } = props.navigation

    //refs
    const mapRef = useRef(null)
    //redux states
    const user = useSelector(state => state.user)
    const { userDetail, currentLocation } = user

    //local States
    const [address, setAddress] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [distance, setDistance] = useState(10)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getSetData()
    }, [])

    const getSetData = () => {
        const { latitude, longitude, distance,address } = userDetail
        const { coords } = currentLocation
        console.log('currentLocation', currentLocation)
        latitude ? setLatitude(latitude) : setLatitude(coords.latitude)
        longitude ? setLongitude(longitude) : setLongitude(coords.longitude)
        address && setAddress(address) 
        distance && setDistance(distance)
    }

    const handleSetAddress = (details, location) => {
        console.log('details', details)
        console.log('location', location)
        setAddress(details.description)
        setLatitude(location.lat)
        setLongitude(location.lng)
        mapRef.current.animateToRegion({ // Takes a region object as parameter
            longitude: location.lng,
            latitude: location.lat,
            ...locationDelta
        }, 1000);
    }

    const handleUpdateLocation = async () => {
        setLoading(true)
        await Backend.update_profile({ address,latitude, longitude, distance }).
            then(res => {
                setLoading(true)
                if (res) {
                    goBack()
                    Toasts.success('Location updated.')
                }
            })
    }
    return (
        <MainWrapper>
            {
                latitude && longitude ?
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        clusterColor={colors.appColor1}
                        // provider = { MapView.PROVIDER_GOOGLE }
                        customMapStyle={mapStyles.light}
                        initialRegion={{
                            latitude,
                            longitude,
                            ...locationDelta
                        }}
                    // showsUserLocation={true}
                    >
                        <Marker
                            coordinate={{
                                latitude,
                                longitude,
                            }}
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
                            center={{
                                latitude,
                                longitude,
                                ...locationDelta
                            }}
                            radius={1609.34 * distance}
                            strokeColor={'transparent'}
                            fillColor={colors.appColor1 + '20'}
                        />
                    </MapView>
                    :
                    null
            }
            <AbsoluteWrapper style={{ top: 0, right: 0, left: 0 }}>
                <Spacer height={sizes.marginVertical} />
                {/* <SearchTextinput
                    placeholder="Search by zip code"
                    inputContainerStyle={{ backgroundColor: colors.appBgColor1, ...appStyles.shadow }}
                /> */}
                <GoogleAutoComplete
                    onPressItem={handleSetAddress}
                    //value={address}
                    //leftIcon={null}
                    textInputContainer={{
                        borderWidth: 0,
                        // borderRadius: 0,
                        //borderBottomWidth: 1,
                        // borderColor: colors.appBgColor4,
                        //marginHorizontal: 0,
                        paddingHorizontal: 0,
                        backgroundColor: colors.appBgColor1,
                        ...appStyles.shadow
                        //height:height(10)
                    }}

                    placeholder="Search by zip code"
                />
                <Spacer height={sizes.marginVertical} />
            </AbsoluteWrapper>
            <AbsoluteWrapper style={{ bottom: 0, right: 0, left: 0, backgroundColor: colors.appBgColor1, ...appStyles.shadow }}>
                <Spacer height={sizes.marginVertical} />
                <RowWrapper>
                    <TinyTitle>Distance</TinyTitle>
                    <MediumText style={[appStyles.textPrimaryColor]}>{distance} Miles</MediumText>
                </RowWrapper>
                <Spacer height={sizes.marginVertical} />
                <Wrapper style={[appStyles.center]}>
                    <Slider
                        style={{ width: width(90), height: height(2.5) }}
                        value={distance}
                        onValueChange={value => setDistance(value)}
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
                    loading={loading}
                    onPress={handleUpdateLocation}
                />
                <Spacer height={sizes.marginVertical} />
            </AbsoluteWrapper>
        </MainWrapper>
    );
}

export default MyLocation;
