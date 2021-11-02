import Geocoder from 'react-native-geocoding';


export const getPlacesByAddress = async(address) => {
    let response = null
    // Search by address
  await  Geocoder.from(address)
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log('getPlacesByAddress results -->', json.results);
            //console.log('location -->', location);
            response = location
        })
        .catch(error => console.warn(error));
    return response
}

export const getLocationDetailsFromLatLong = async ({ latitude, longitude }) => {
    let response = null
    await Geocoder.from({
        latitude: latitude,
        longitude: longitude
    }).then(res => {
        console.log('Geocoder address ', res)
        console.log('Geocoder res.results. ', res.results[0].address_components)
        let address = "";
        let zipcode = "";
        let city = "";
        let state = "";
        let country = "";

        // Get each component of the address from the place details,
        // and then fill-in the corresponding field on the form.
        // place.address_components are google.maps.GeocoderAddressComponent objects
        // which are documented at http://goo.gle/3l5i5Mr
        for (const component of res.results[0].address_components) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    address = `${component.long_name} ${address}`;
                    break;
                }

                case "route": {
                    address += component.short_name;
                    break;
                }

                case "postal_code": {
                    zipcode = `${component.long_name}${zipcode}`;
                    break;
                }

                case "postal_code_suffix": {
                    zipcode = `${zipcode}-${component.long_name}`;
                    break;
                }
                case "locality":
                    city = component.long_name
                    break;
                case "administrative_area_level_1": {
                    state = component.short_name
                    break;
                }
                case "country":
                    country = component.long_name
                    break;
            }
        }

        response = { address, zipcode, city, state, country }
        console.log('address ', address)
        console.log('zipcode ', zipcode)
        console.log('city ', city)
        console.log('state ', state)
        console.log('country ', country)
    })
    return response
};