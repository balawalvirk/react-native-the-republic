import React, {Component, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {appStyles, google_map_api_key} from './src/services';

import {Navigation} from './src/services/navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import Store from './src/services/store';
import {RootSiblingParent} from 'react-native-root-siblings';
import Geocoder from 'react-native-geocoding';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import BottomSheet, {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';

function App() {
  useEffect(() => {
    Geocoder.init(google_map_api_key, {language: 'en'});
    googleConfigure();
  }, []);
  const googleConfigure = async () => {
    //Firebase console
    GoogleSignin.configure({
      webClientId:
        '731737878048-01f00agrvju6u6rtd664g6sm1sm4gbbe.apps.googleusercontent.com',
      //webClientId: "1013721507878-sfdj4lgde0a8lkuo6n6pag5fjd88a0v2.apps.googleusercontent.com",
      offlineAccess: false,
    });
  };
  return (
    <BottomSheetModalProvider>
      <Provider store={Store}>
        <View style={{flex: 1}}>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          {/* <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>App</Text>
          </View> */}
          {/* <RootSiblingParent> */}
            <Navigation />
            <Toast /> 
          {/* </RootSiblingParent> */}
        </View>
      </Provider>
    </BottomSheetModalProvider>
  );
}

export default App;

// import { View, Text } from 'react-native'
// import React from 'react'

// const App = () => {
//   return (
//     <View >
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App
