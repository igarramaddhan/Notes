
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Alert
} from 'react-native';

import Main from './screens/Main'

import FloatingLabelInput from './components/FloatingLabelInput';
import Icon from './components/Icon';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  handleTextChange = (newText) => {
    this.setState({ value: newText });
  }
  onPressHandle() {
    Alert.alert('test')
  }
  render() {
    return (
<Main/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Notes', () => Notes);
