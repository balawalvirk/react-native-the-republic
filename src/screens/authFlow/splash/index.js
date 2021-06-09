import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, XXLTitle } from '../../../components';
import { appStyles } from '../../../services';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MainWrapper style={[appStyles.center]}>
        <XXLTitle>Splash</XXLTitle>
      </MainWrapper>
    );
  }
}

export default Splash;
