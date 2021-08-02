import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { AbsoluteWrapper, ButtonColoredSmall, ButtonGradient, ComponentWrapper, CustomIcon, IconButton, ImageRound, KeyboardAvoidingScrollView, MainWrapper, MediumText, PopupPrimary, RowWrapper, SearchTextinput, Spacer, TextInputUnderlined, TinyTitle, UserCardPrimary, Wrapper } from '../../../components';
import { appIcons, appStyles, colors, DummyData, mapStyles, routes, sizes } from '../../../services';
import styles from './styles';
import Slider from '@react-native-community/slider';
import { ScrollView } from 'react-native';
import { navigate } from '../../../services/navigation/rootNavigation';


const defaultLocation = {
    latitude: 51.5359,
    longitude: 0.1236,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}
const defaultMarker = {
    cooards: {
        latitude: 51.5359,
        longitude: 0.1236
    }
}
function FflDealers(props) {
    const { navigate } = props

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDealerIndex, selectDealerIndex] = useState(1)
    

    const getSetDealers = () => {
        let tempDealers = []
        let index = 0
        for (const item of DummyData.users) {
            const tempObj = {
                ...item,
                cooards: {
                    latitude: 51.5359 + (index + 0.0020),
                    longitude: 0.1236 + (index + 0.0020)
                }
            }
            tempDealers.push(tempObj)
            index = index + 1
        }
        return tempDealers
    }

    const dealers = searchQuery ? getSetDealers() : getSetDealers().reverse()
    return (
        <MainWrapper>
            <ScrollView
            >
                <Spacer height={sizes.baseMargin} />
                <Wrapper >
                    <MapView
                        style={{
                            height: height(45)
                        }}
                        clusterColor={colors.appColor1}
                        // provider = { MapView.PROVIDER_GOOGLE }
                        customMapStyle={mapStyles.light}
                        initialRegion={defaultLocation}
                    // showsUserLocation={true}
                    >
                        {
                            dealers.map((item, index) => {
                                return (
                                    <Marker
                                        coordinate={item.cooards}
                                        onPress={() => selectDealerIndex(index)}

                                    >
                                        {/* <CustomIcon
                                    icon={appIcons.map_pin}
                                    size={totalSize(6)}
                                /> */}
                                        <Wrapper
                                            style={[{ borderRadius: 100, borderWidth: 2, borderColor: selectedDealerIndex === index ? colors.appColor1 : colors.appBgColor1 }, appStyles.shadowColored]}
                                        >
                                            <ImageRound
                                                source={{ uri: item.image }}

                                            />
                                        </Wrapper>
                                    </Marker>
                                )
                            })
                        }

                    </MapView>
                    <AbsoluteWrapper style={{ top: 0, right: 0, left: 0 }}>
                        <Spacer height={sizes.baseMargin} />
                        <SearchTextinput
                            value={searchQuery}
                            onChangeText={t => setSearchQuery(t)}
                            placeholder={'Search for dealers'}
                            inputContainerStyle={[{ backgroundColor: colors.appBgColor1 }, appStyles.shadow]}
                        />
                        <Spacer height={sizes.baseMargin} />
                    </AbsoluteWrapper>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <Wrapper>
                    <ComponentWrapper>
                        <TinyTitle>{searchQuery ? dealers.length + ' results found' : 'Your Nearest FFL Dealers'}</TinyTitle>
                    </ComponentWrapper>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                {
                    dealers.map((item, index) => {
                        const isSelected = index === selectedDealerIndex
                        return (
                            <UserCardPrimary
                                onPress={() => selectDealerIndex(index)}
                                containerStyle={{ marginBottom: sizes.marginVertical / 2, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.appBgColor3 }}
                                title={item.name}
                                imageUri={item.image}
                                subTitle={7 * (index + 1) + ' miles away'}
                                right={
                                    <ButtonColoredSmall
                                        text="View Profile"
                                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.appColor2 }}
                                    />
                                }
                                left={
                                    <IconButton
                                        iconName="circle"
                                        iconColor={isSelected ? colors.appColor1 : colors.appBgColor1}
                                        buttonSize={totalSize(2.75)}
                                        iconSize={totalSize(2.5)}
                                        //buttonColor={colors.appBgColor3}
                                        buttonStyle={{ borderWidth: 1, borderColor: isSelected ? colors.appColor1 : colors.appBgColor3, marginRight: sizes.marginHorizontalSmall }}
                                    />
                                }
                            />
                        )
                    })
                }
                <Spacer height={sizes.doubleBaseMargin} />
            </ScrollView>
           
        </MainWrapper>
    );
}

export default FflDealers;
