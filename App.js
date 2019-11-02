import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial';
import {BleManager} from 'react-native-ble-plx';

export default class App extends Component<{}> {
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

  scanAndConnect() {
    // this.manager.isDeviceConnected('40:55:60:72')
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
        // Proceed with connection.
        device
          .connect()
          .then(device => {

            this.props.navigation.navigate('Main');
            // console.log(
            //   'Discover All',
            //   device.discoverAllServicesAndCharacteristics(),
            // );
            // return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {

            // Do work on device with services and characteristics
          })
          .catch(error => {
            // Handle errors
          });
      }
    });
  }
  componentWillMount() {
    const subscription = this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);

    // Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
    //   values => {
    //     const [isEnabled, devices] = values;
    //
    //     this.setState({isEnabled, devices});
    //   },
    // );
    //
    // BluetoothSerial.on('bluetoothEnabled', () => {
    //   Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
    //     values => {
    //       const [isEnabled, devices] = values;
    //       this.setState({devices});
    //     },
    //   );
    //
    //   BluetoothSerial.on('bluetoothDisabled', () => {
    //     this.setState({devices: []});
    //   });
    //   BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
    // });
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
  // discoverAvailableDevices() {
  //   if (this.state.discovering) {
  //     return false;
  //   } else {
  //     this.setState({discovering: true});
  //     BluetoothSerial.discoverUnpairedDevices()
  //       .then(unpairedDevices => {
  //         const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
  //         console.log(uniqueDevices);
  //         console.log('ga ada');
  //         this.setState({unpairedDevices: uniqueDevices, discovering: false});
  //       })
  //       .catch(err => console.log(err.message));
  //   }
  // }
  // toggleSwitch() {
  //   BluetoothSerial.write('1')
  //     .then(res => {
  //       console.log(res);
  //       console.log('Successfuly wrote to device');
  //       this.setState({connected: true});
  //     })
  //     .catch(err => console.log(err.message));
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
        <Button
          onPress={this.scanAndConnect.bind(this)}
          title="Scan for Devices"
          color="#841584"
        />

        <FlatList
          style={{flex: 1}}
          data={this.state.unpairedDevices}
          keyExtractor={item => item.id}
          renderItem={item => this._renderUnpaired(item)}
        />
        <Button
          onPress={this.scanAndConnect.bind(this)}
          title="Switch(On/Off)"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row',
  },
  toolbarButton: {
    width: 50,
    marginTop: 8,
  },
  toolbarTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    marginTop: 6,
  },
  deviceName: {
    fontSize: 17,
    color: 'black',
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth: 1,
  },
});
