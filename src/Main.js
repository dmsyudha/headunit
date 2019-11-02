import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
// import BluetoothSerial from 'react-native-bluetooth-serial';
import { BleManager } from 'react-native-ble-plx';
import Orientation from 'react-native-orientation';
import { fonts, colors } from './styles';

const width = Dimensions.get('window').width;
const sideLength = ((width) / 6) - 10;
const radius = sideLength / 2;

const upIcon = require('../assets/img/up.png');
const ecoIcon = require('../assets/img/eco.png');

export default class Main extends React.Component {
  static navigationOptions = { header: null };
  state = { currentUser: null };
  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }

  componentWillMount() {
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
    const { currentUser } = this.state;
    return (
      // <View style={styles.container}>
      //   <Image
      //     style={{width: 112, height: 80, marginBottom: 20}}
      //     source={require('./logo_toyota.png')}
      //   />
      //   <Text>Hi!</Text>
      //   <Button title="Logout" onPress={this.handleLogout} />
      // </View>
      <View style={styles.card}>
        <Text style={styles.menuTitle}>All-in One Control</Text>
        <View style={styles.rowHeader}>
          <Text style={styles.itemHeader}>Hello Damar</Text>
          <Text style={styles.itemHeaderCenter}>01:45</Text>
          <Text style={styles.itemHeader}>03 Nov 2019</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}>
            <Text style={styles.itemTextLeft}>Temperatur Dalam</Text>
            <Text style={styles.itemTextTemp}>22 C</Text>
            <Text style={styles.itemTextLeft}>Temperatur Luar</Text>
            <Text style={styles.itemTextTemp}>30 C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemKiriAtas}
          >
            <Text style={styles.itemText}>Kecepatan</Text>
            <Text style={styles.itemTextKecepatan}>60 Km/h</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemKananAtas}
          >
            <Text style={styles.itemText}>Transmisi</Text>
            <Text style={styles.itemTextTransmisi}>D</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Text style={styles.itemText}>Voltase</Text>
            <Text style={styles.itemTextTemp}>12.4</Text>
            <Text style={styles.itemText}>Temperatur Mesin</Text>
            <Text style={styles.itemTextTemp}>85 C</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
            >
              <Image
                source={upIcon}
                resizeMode="contain"
                style={styles.itemImageUp}
              />

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
            >
              <Image
                source={upIcon}
                resizeMode="contain"
                style={styles.itemImageDown}
              />
            </TouchableOpacity>

          </View>
          <TouchableOpacity
            style={styles.itemKiriBawah}
          >
            <Image
              resizeMode="contain"
              style={styles.itemImage}
            />
            <Text style={styles.itemTextKecepatan}>1.500</Text>
            <Text style={styles.itemText}>RPM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemKananBawah}
          >
            <Image
              source = {ecoIcon}
              resizeMode="contain"
              style={styles.itemImageEco}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Text style={styles.itemText}>Odometer    Per Liter</Text>
            <Text style={styles.itemTextOdoKilo}>  12.000  14.5 Km</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
          >
            <Image
              source = {ecoIcon}
              resizeMode="contain"
              style={styles.itemImageEco}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image
              source = {ecoIcon}
              resizeMode="contain"
              style={styles.itemImageEco}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image
              source = {ecoIcon}
              resizeMode="contain"
              style={styles.itemImageEco}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image
              source = {ecoIcon}
              resizeMode="contain"
              style={styles.itemImageEco}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image
              source = {ecoIcon}
              resizeMode="contain"
              style={styles.itemImageEco}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image
              source = {ecoIcon}
              resizeMode="contain"
              style={styles.itemImageEco}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white,

  },
  dinas: {
    fontSize: 11,
    color: '#454545'
  },
  title: {
    color: '#000000',
    fontSize: 24,
    fontFamily: fonts.primaryBold
  },
  menuTitle: {
    backgroundColor: colors.yellow,
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    // marginBottom: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  infoDashboard: {
    backgroundColor: colors.yellow,
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  card: {
    // margin: 10,
    // paddingTop:10,
    // paddingHorizontal:10,
    // paddingBottom: 15,
    backgroundColor: colors.transparent,
    borderRadius: 5,
  },
  info: {
    margin: 10,
    // paddingTop:10,
    // paddingHorizontal:10,
    // paddingBottom: 15,
    backgroundColor: colors.transparent,
    borderRadius: 5,
  },
  rowHeader: {
    // height: 20,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    paddingHorizontal: 0,
    // marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    paddingHorizontal: 5,
    // marginBottom: 10,
  },
  rupiahDashboard: {
    // lineHeight:13,
    fontSize: 28,
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 5,
    // marginBottom: 10,
  },
  itemHeaderCenter: {
    textAlign: 'center',
    width: sideLength,
    alignItems: 'center',
    justifyContent: 'space-around',
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemHeader: {
    height: 25,
    flex: 1,
    textAlign: 'center',
    width: sideLength,
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    width: sideLength,
    paddingVertical: 10,
    // borderColor: colors.profileGradientEnd,
    // borderWidth: 2,
    // borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginHorizontal: 5,
    // backgroundColor: colors.white
  },
  itemKiriAtas: {
    flex: 1,
    width: sideLength,
    paddingVertical: 10,
    // borderColor: colors.profileGradientEnd,
    borderWidth: 2,
    borderRightWidth : 0,
    borderBottomWidth : 0,
    borderTopLeftRadius : 20,
    // borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginHorizontal: 5,
    // backgroundColor: colors.white
  },
  itemKananAtas: {
    flex: 1,
    width: sideLength,
    paddingVertical: 10,
    // borderColor: colors.profileGradientEnd,
    borderWidth: 2,
    borderLeftWidth : 0,
    borderBottomWidth : 0,
    borderTopRightRadius : 20,
    // borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginHorizontal: 5,
    // backgroundColor: colors.white
  },
  itemKiriBawah: {
    flex: 1,
    width: sideLength,
    paddingVertical: 10,
    // borderColor: colors.profileGradientEnd,
    borderWidth: 2,
    borderRightWidth : 0,
    borderTopWidth : 0,
    borderBottomLeftRadius : 20,
    // borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginHorizontal: 5,
    // backgroundColor: colors.white
  },
  itemKananBawah: {
    flex: 1,
    width: sideLength,
    paddingVertical: 10,
    // borderColor: colors.profileGradientEnd,
    borderWidth: 2,
    borderLeftWidth : 0,
    borderTopWidth : 0,
    borderBottomRightRadius : 20,
    // borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginHorizontal: 5,
    // backgroundColor: colors.white
  },
  viewTemp: {
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  itemText: {
    // color: colors.primary,
    fontSize: 11,
    // fontFamily: fonts.primary,
  },
  itemTextLeft: {
    // color: colors.primary,
    fontSize: 11,
    // fontFamily: fonts.primary,
  },
  itemTextTemp: {
    // color: colors.primary,
    fontSize: 22,
    // fontFamily: fonts.primary,
  },
  itemTextKecepatan: {
    // color: colors.primary,
    fontSize: 24,
    // fontFamily: fonts.primary,
  },
  itemTextTransmisi: {
    // color: colors.primary,
    fontSize: 48,
    // fontFamily: fonts.primary,
  },
  itemTextOdoKilo: {
    // color: colors.primary,
    fontSize: 16,
    // fontFamily: fonts.primary,
  },
  itemImage: {
    // height: sideLength - 100,
    marginBottom: 5
  },
  itemImageEco: {
    // height: sideLength - 100,
    height: 45,
    width: 45,
    marginBottom: 5
  },
  itemImageUp: {
    // height: sideLength - 100,
    height: 50,
    width: 50,
    marginBottom: 5
  },
  itemImageDown: {
    // height: sideLength - 100,
    height: 50,
    width: 50,
    transform: [
      {rotate: '180deg'},
    ] /* change the deg (degree of rotation) between 0deg, 360deg*/,
  },
});