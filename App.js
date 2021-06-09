import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { appStyles, Navigation } from './src/services';
import { MainWrapper, ButtonColored, ButtonBordered, RowWrapper, ButtonColoredSmall, ButtonBorderedSmall, Wrapper } from './src/components';
import { StatusBar } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Wrapper flex={1}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <Navigation />
      </Wrapper>
    );
  }
}

export default App;
