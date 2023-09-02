import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeaxder from '../components/AppHeaxder';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcons from '../components/CustomIcons';

const TickateScreen = ({navigation, route}) => {
  const [tickateData, setTickateData] = useState(route.params);
  console.log(tickateData);
  // let n=EncryptedStorage.getItem('ticket');
  // console.log(JSON.parse(n));

  useEffect(() => {
    (async () => {
      try {
        const tickate = await EncryptedStorage.getItem('ticket');
        if (tickate !== undefined && tickate !== null) {
          setTickateData(JSON.parse(tickate));
        }
      } catch (error) {
        console.log('Somthing went wrong while getting Data', error);
      }
    })();
  }, []);
  if (tickateData !== route.params && route.params !== undefined) {
    setTickateData(route.params);
  }

  if (tickateData === undefined || tickateData === null) {
    return (
      <View style={styles.conatiner}>
        <View style={styles.appHeaderCont}>
          <AppHeaxder
            name="close"
            header={'Movie details'}
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.conatiner}>
      <StatusBar hidden />
      <View style={styles.appHeaderCont}>
        <AppHeaxder
          name="close"
          header={''}
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.tikateContainer}>
        <ImageBackground
          source={{uri: tickateData?.tickatImage}}
          style={styles.imgBg}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Orange]}
            style={styles.linearBg}>
            <View
              style={[
                styles.blackColor,
                {position: 'absolute', bottom: -40, left: -40},
              ]}
            />
            <View
              style={[
                styles.blackColor,
                {position: 'absolute', bottom: -40, right: -40},
              ]}
            />
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear} />
        <View style={styles.tickateFotter}>
          <View
            style={[
              styles.blackColor,
              {position: 'absolute', top: -40, right: -40},
            ]}
          />
          <View
            style={[
              styles.blackColor,
              {position: 'absolute', top: -40, left: -40},
            ]}
          />

          <View style={styles.tikateDateContainer}>
            <View style={styles.seatContainer}>
              <Text style={styles.tikatedatetext}>
                {tickateData?.date.date}
              </Text>
              <Text style={styles.tikatedaytext}>{tickateData?.date.day}</Text>
            </View>
            <View style={styles.seatContainer}>
              <CustomIcons name="clock" style={styles.clockIcon} />
              <Text style={styles.seatsubTitle}>{tickateData?.time}</Text>
            </View>
          </View>
          <View style={styles.tikateDateContainer}>
            <View style={styles.seatContainer}>
              <Text style={styles.seattitle}>Screen</Text>
              <Text style={styles.seatsubTitle}>01</Text>
            </View>
            <View style={styles.seatContainer}>
              <Text style={styles.seattitle}>Row</Text>
              <Text style={styles.seatsubTitle}>04</Text>
            </View>
            <View style={styles.seatContainer}>
              <Text style={styles.seattitle}>Seat</Text>
              <Text style={styles.seatsubTitle}>
                {tickateData?.seatArray.slice(0, 3).map((item, index, ar) => {
                  return item + (index === ar.length - 1 ? '' : ', ');
                })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../assets/image/barcode.png')}
            style={styles.barcode}
          />
        </View>
      </View>
    </View>
  );
};

export default TickateScreen;
const styles = StyleSheet.create({
  conatiner: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderCont: {
    marginHorizontal: SPACING.space_32,
    marginTop: SPACING.space_10 * 2,
  },
  tikateContainer: {
    flex: 1,
    zIndex: -1,
  },
  imgBg: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearBg: {
    height: '70%',
  },
  linear: {
    borderColor: COLORS.Black,
    borderTopWidth: 2,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  tickateFotter: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  tikateDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  tikatedatetext: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  tikatedaytext: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingBottom: SPACING.space_10,
  },
  seatContainer: {
    alignItems: 'center',
  },
  seattitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  seatsubTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  barcode: {
    height: 35,
    aspectRatio: 158 / 52,
  },
  blackColor: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: COLORS.Black,
  },
});
