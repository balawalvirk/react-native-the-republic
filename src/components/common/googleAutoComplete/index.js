import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { appIcons, colors, fontSize, sizes } from '../../../services';
import { IconTitleCrossCard } from '../../cards';
import { Input } from 'react-native-elements';
import { height, totalSize } from 'react-native-dimension';
import { ComponentWrapper, Wrapper } from '../../wrappers';
import { LargeText, MediumText } from '../../text';
const GooglePlacesInput = ({ onPressItem, value, textInputContainer, leftIcon,placeholder }) => {
    const ref = useRef();

    useEffect(() => {
        value && ref.current?.setAddressText(value);
    }, [value]);
    
    return (
        <GooglePlacesAutocomplete
            ref={ref}
            placeholder={placeholder?placeholder:"City, State"}
            onPress={(data, details = {}) => {
                onPressItem(data, details.geometry.location);
            }}
            // ref={this.placesRef}
            fetchDetails={true}
            styles={{
                textInputContainer: [{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.appTextColor5,
                    marginHorizontal: sizes.marginHorizontal,
                   // paddingHorizontal:20
                }, textInputContainer],
                textInput: {
                    margin: 0,
                    padding:0,
                   
                },
            }}
            renderRow={(data, index) => (
                <Wrapper flex={1} style={{ backgroundColor: 'transparent' }}>
                    <IconTitleCrossCard
                        title={data.description}
                        //onPressCross={() => deletingArea(item)}
                        icon={appIcons.map_pin}
                        hideLine
                        containerStyle={{ marginVertical: sizes.marginVertical / 2,marginHorizontal:0 }}
                    // onPress={() => addingArea(item)}
                    />

                </Wrapper>

            )}
            textInputProps={{
                InputComp: Input,
                leftIcon: leftIcon === null ? null : leftIcon ? leftIcon : {
                    type: 'evilicon',
                    name: 'search',
                    size: totalSize(2.5),
                    color: colors.appTextColor4,
                },
                errorStyle: { color: 'red' },
                inputContainerStyle: {
                    borderBottomWidth: 0,
                    margin: 0,
                    padding: 0,
                },
                containerStyle: { height: height(100) < 600 ? height(8) : height(6), borderWidth: 0 ,},
                style: { height: height(100) < 600 ? height(8) : height(6) ,}
            }}
            nearbyPlacesAPI="GoogleReverseGeocoding"
            query={{
                key: 'AIzaSyAyItdXh8Zmxa7iCAyDVPH_UAJ5iUTGtEA',
                language: 'en',
               // type:'geocode'
            }}
        />
    );
};

export default GooglePlacesInput;