import React, { Component, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { appStyles, google_places_api_key, Navigation } from './src/services';
import { MainWrapper, ButtonColored, ButtonBordered, RowWrapper, ButtonColoredSmall, ButtonBorderedSmall, Wrapper } from './src/components';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/services/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import Geocoder from 'react-native-geocoding';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
function App() {

  useEffect(() => {
    Geocoder.init(google_places_api_key, { language: "en" });
    // HelpingMethods.RequestLocationAccess()
    // Backend.getAllServices()
    googleConfigure()
  }, [])
  const googleConfigure = async () => {
    // GoogleSignin.configure({
    //   iosClientId:'813864579896-ct0qsstppm2meb5nrbekgkcamfdvpeau.apps.googleusercontent.com',
    //   //webClientId: '813864579896-ct0qsstppm2meb5nrbekgkcamfdvpeau.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //   //iosClientId: '268021038833-ag64nk0vpp62jsbm39um00659sbgrdt4.apps.googleusercontent.com',
    //   // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    //   //webClientId: Platform.OS === 'ios' ? 'com.googleusercontent.apps.813864579896-ct0qsstppm2meb5nrbekgkcamfdvpeau' : '813864579896-8cf57887e2ejm497khaqbd8ae530sj9b.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //   // hostedDomain: '', // specifies a hosted domain restriction
    //   // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    //   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //    accountName: 'iamstudent', // [Android] specifies an account name on the device that should be used
    //   //iosClientId: '278218355799-i9hmvuf9u02utp1t2jdqeos45g829rki.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    //   //androidClientId: '31464117544-mnorppdus0n7q50pbu32vs2h06etfkjf.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // });

    //Firebase console
     GoogleSignin.configure({
       webClientId: "1013721507878-sfdj4lgde0a8lkuo6n6pag5fjd88a0v2.apps.googleusercontent.com",
       offlineAccess: false
     });

    // Google developer console
    // GoogleSignin.configure({
    //   iosClientId:"268021038833-ag64nk0vpp62jsbm39um00659sbgrdt4.apps.googleusercontent.com",
    //   webClientId: "268021038833-olcpal4bs4sn0r99emshtassilpu0i7k.apps.googleusercontent.com",
    //   offlineAccess: true,
    //   forceCodeForRefreshToken: true
    // });
  }
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
