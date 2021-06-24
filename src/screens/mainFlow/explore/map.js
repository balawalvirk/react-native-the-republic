import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, CustomIcon, Wrapper, ButtonColoredSmall, Spacer, ComponentWrapper } from '../../../components';
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import styles from './styles'
import { appIcons, colors, mapStyles, sizes } from '../../../services';
import { totalSize } from 'react-native-dimension';

const defaultLocation = {
    latitude: 51.5359,
    longitude: 0.1236,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}
const defaultMarkers = [
    {
        id: 12443,
        title: 'Repair Dishwasher',
        status: 'active',
        runtime: '22 hours',
        operator: 'Jack will',
        material_load: '18',
        load_limit: '20',
        material_left: '5',
        product: 'strawberry yoghurt',
        maintenance_date: '12 April, 2021',
        cooards: {
            latitude: 51.5759,
            longitude: 0.1736
        }
    },
    {
        id: 3234,
        title: 'install New Basin',
        status: 'inactive',
        runtime: '08 hours',
        operator: 'Sam Andreo',
        material_load: '23',
        load_limit: '20',
        material_left: '8',
        product: 'mango yoghurt',
        maintenance_date: '31 August, 2022',
        cooards: {
            latitude: 51.5359,
            longitude: 0.1236
        }
    },
    {
        id: 23453,
        title: 'Replace a kitchen pipe',
        status: 'active',
        runtime: '32 hours',
        operator: 'Barber Michalle',
        material_load: '25',
        load_limit: '30',
        material_left: '14',
        product: 'blueberry',
        maintenance_date: '23 September, 2022',
        cooards: {
            latitude: 51.5859,
            longitude: 0.1536
        }
    },
]
function Map() {
    const [currentlocation, setCurrentLocation] = useState(defaultLocation)
    const [markers, setMarkers] = useState(defaultMarkers)

    //Refs
    const mapRef = useRef(null)
    const sheetRef = useRef(null);

    useEffect(() => {
        mapRef.current.animateToRegion(currentlocation)
    })

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
                    markers.map((item, key) => {
                        return (
                            <Marker
                                coordinate={item.cooards}
                                // coordinate={tempCooards}
                                //coordinate={dummyCooards}
                                //title={item.name}
                                // description={item.address}
                                // calloutAnchor={78}
                                //calloutOffset={10}
                                // onPress={() => this.UsersFlatListRef.scrollToIndex({ animated: true, index: key })}
                                onPress={() => {
                                    // setServiceRequestItem(item);
                                    //toggleRequestOverview()
                                }}
                            >
                                <CustomIcon
                                    icon={appIcons.map_pin}
                                    size={totalSize(5)}
                                // onPress={() => {
                                //   setServiceRequestItem(item);
                                //   toggleRequestOverview()
                                // }}
                                />
                            </Marker>
                        )
                    })
                }
            </MapView>
        </MainWrapper>
    );
}

export default Map;
