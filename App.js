import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { appStyles, Navigation } from './src/services';
import { MainWrapper, ButtonColored, ButtonBordered, RowWrapper, ButtonColoredSmall, ButtonBorderedSmall, Wrapper } from './src/components';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/services/store';
import { RootSiblingParent } from 'react-native-root-siblings';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
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
}

export default App;
