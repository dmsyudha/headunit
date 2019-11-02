import React from 'react';
import {StyleSheet, Platform, Image, Text, View, Button} from 'react-native';
// import BluetoothSerial from 'react-native-bluetooth-serial';
import {BleManager} from 'react-native-ble-plx';
import Orientation from 'react-native-orientation';

export default class Main extends React.Component {
  static navigationOptions = {header: null};
  state = {currentUser: null};
  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }

  componentWillMount(): void {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
      Orientation.lockToLandscape();
    } else {
      // do something else
    }
  }

  componentDidMount() {
    const subscription = this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect() {
    this.manager
      .isDeviceConnected('C4:F3:12:18:4F:D5')
      .then(result => {

      });
  }
  handleLogout = async () => {
    try {
      // await firebase.auth().signOut();
      this.props.navigation.navigate('Loading');
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={{width: 112, height: 80, marginBottom: 20}}
          source={require('./logo_toyota.png')}
        />
        <Text>Hi!</Text>
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
