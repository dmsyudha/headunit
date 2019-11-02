import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Button,
  FlatList,
} from 'react-native';
import Orientation from 'react-native-orientation';
import {BleManager} from 'react-native-ble-plx';
import BluetoothSerial from 'react-native-bluetooth-serial';

export default class Loading extends React.Component {
  static navigationOptions = {header: null};
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
    };
  }

  componentWillMount(){
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }
  }

  // componentDidMount() {
  //
  //   // Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
  //   //   values => {
  //   //     const [isEnabled, devices] = values;
  //   //
  //   //     this.setState({isEnabled, devices});
  //   //   },
  //   // );
  //   //
  //   // BluetoothSerial.on('bluetoothEnabled', () => {
  //   //   Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
  //   //     values => {
  //   //       const [isEnabled, devices] = values;
  //   //       this.setState({devices});
  //   //     },
  //   //   );
  //   //
  //   //   BluetoothSerial.on('bluetoothDisabled', () => {
  //   //     this.setState({devices: []});
  //   //   });
  //   //   BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
  //   // });
  // }
  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'bluino' || device.name === 'SensorTag') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        this.manager.stopDeviceScan();
        device.isConnected().then(result => {
          console.log(result);
        });
        // Proceed with connection.
        device
          .connect()
          .then(device => {
            console.log(
              'Discover Al',
              device.discoverAllServicesAndCharacteristics(),
            );
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            console.log(device.id);
            this.props.navigation.navigate('Main');
            // Do work on device with services and characteristics
          })
          .catch(error => {
            // Handle errors
          });
      }
    });
  }
  connect(device) {
    this.setState({connecting: true});
    // BluetoothSerial.connect(device.id)
    //   .then(res => {
    //     console.log(`Connected to device ${device.name}`);
    //
    //     ToastAndroid.show(
    //       `Connected to device ${device.name}`,
    //       ToastAndroid.SHORT,
    //     );
    //   })
    //   .catch(err => console.log(err.message));
  }
  // _renderItem(item) {
  //   return (
  //     <TouchableOpacity onPress={() => this.connect(item.item)}>
  //       <View style={styles.deviceNameWrap}>
  //         <Text style={styles.deviceName}>
  //           {item.item.name ? item.item.name : item.item.id}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }

  _renderUnpaired(item) {
    return (
      <TouchableOpacity onPress={() => this.connect(item.item)}>
        <View style={styles.deviceNameWrap}>
          <Text style={styles.deviceName}>
            {item.item.name ? item.item.name : item.item.id}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  enable() {
    BluetoothSerial.enable()
      .then(res => this.setState({isEnabled: true}))
      .catch(err => Toast.showShortBottom(err.message));
  }

  disable() {
    BluetoothSerial.disable()
      .then(res => this.setState({isEnabled: false}))
      .catch(err => Toast.showShortBottom(err.message));
  }
  toggleBluetooth(value) {
    if (value === true) {
      this.enable();
    } else {
      this.disable();
    }
  }
  componentDidMount() {
    Orientation.lockToLandscape();
    const subscription = this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        console.log('testing')
        subscription.remove();
      }
    }, true);
  }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading</Text>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>
          <View style={styles.toolbarButton}>
            <Switch
              value={this.state.isEnabled}
              onValueChange={val => this.toggleBluetooth(val)}
            />
          </View>
        </View>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
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
