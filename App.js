import React, { Component, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { appStyles, google_places_api_key, Navigation } from './src/services';
import { MainWrapper, ButtonColored, ButtonBordered, RowWrapper, ButtonColoredSmall, ButtonBorderedSmall, Wrapper } from './src/components';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/services/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import Geocoder from 'react-native-geocoding';

function App() {

  useEffect(() => {
    Geocoder.init(google_places_api_key, { language: "en" });
    // HelpingMethods.RequestLocationAccess()
    // Backend.getAllServices()
  }, [])

  return (
    <Provider store={Store}>
      <RootSiblingParent>
        <Wrapper flex={1}>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <Navigation />
        </Wrapper>
      </RootSiblingParent>
    </Provider>
  );
}

export default App;
