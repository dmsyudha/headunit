import React from 'react';
// import {StyleSheet, Platform, Image, Text, View} from 'react-native';

// import the different screens
import Loading from './Loading';
import Main from './Main';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const RootStack = createStackNavigator({
  Main: {
    screen: Main,
  },
  Loading: {
    screen: Loading,
  },
  initialRouteName: Main,
});

const App = createAppContainer(RootStack);

export default App;
