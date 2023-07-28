import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeaxder from '../components/AppHeaxder';
import CustomIcons from '../components/CustomIcons';
import EncryptedStorage from 'react-native-encrypted-storage';

const timeArray = ['10:30', '12:30', '14:30', '15:00', '19:30', '21:00'];
const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeat = () => {
  let numRow = 8;
  let numCol = 3;
  let rowArray = [];
  let start = 1;
  let atlast = false;
  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numCol; j++) {
      let seatObj = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObj);
      start++;
    }
    if (i === 3) {
      numCol += 2;
    }
    if (numCol < 9 && !atlast) {
      numCol += 2;
    } else {
      (atlast = true), (numCol -= 2);
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({navigation, route}) => {
  const [dateArray, setDateArray] = useState(generateDate());
  const [selectDateIndicator, setSelectDateIndicator] = useState();
  const [price, setPrice] = useState(0);
  const [twoDSeatArry, setTwoDSeatArry] = useState(generateSeat());
  const [selecetedseatArray, setselecetedseatArray] = useState([]);
  const [selectTimeIndex, setSelectTimeIndex] = useState([]);

  // generateDate();
  console.log(twoDSeatArry);
  const selectedSeat = (index, subindex, num) => {
    if (!twoDSeatArry[index][subindex].taken) {
      let array = [...selecetedseatArray];
      let temp = [...twoDSeatArry];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setselecetedseatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.slice(tempindex, 1);
          setselecetedseatArray(array);
        }
      }
      setPrice(array.length * 150.0);
      setTwoDSeatArry(temp);
    }
  };

  const Bookseat = async () => {
    if (
      selecetedseatArray.length !== 0 &&
      timeArray[selectTimeIndex] !== undefined &&
      dateArray[selectDateIndicator] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selecetedseatArray,
            time: timeArray[selectTimeIndex],
            date: dateArray[selectDateIndicator],
            tickatImage: route.params.posterImage,
          }),
        );
      } catch (error) {
        console.log('somthing went wrong in Bookseat', error);
      }
      navigation.navigate('Tickate', {
        seatArray: selecetedseatArray,
        time: timeArray[selectTimeIndex],
        date: dateArray[selectDateIndicator],
        tickatImage: route.params.posterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please select, seats,Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  return (
    <ScrollView
      // contentContainerStyle={styles.scrollviveContainer}
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View>
        <ImageBackground
          source={{uri: route.params?.bgImage}}
          style={styles.BgImg}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearG}>
            <View style={styles.appHeaderCont}>
              <AppHeaxder
                name="close"
                header={'Movie details'}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.ScreenText}>This side Screen</Text>
      </View>
      <View style={styles.seatContainetr}>
        <View style={styles.conatinerGap20}>
          {twoDSeatArry?.map((item, index) => {
            return (
              <View style={styles.seatRow} key={index}>
                {item?.map((subitem, subindex) => {
                  return (
                    <TouchableOpacity
                      key={subitem.number}
                      onPress={() => {
                        selectedSeat(index, subindex, subitem.number);
                      }}>
                      <CustomIcons
                        name="seat"
                        style={[
                          styles.seatIcon,
                          subitem.taken ? {color: COLORS.Grey} : {},
                          subitem.selected ? {color: COLORS.Orange} : {},
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.seatRadiocont}>
          <View style={styles.radioCont}>
            <CustomIcons name="radio" style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioCont}>
            <CustomIcons
              name="radio"
              style={[styles.radioIcon, {color: COLORS.Grey}]}
            />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioCont}>
            <CustomIcons
              name="radio"
              style={[styles.radioIcon, {color: COLORS.Orange}]}
            />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.date}
          horizontal
          contentContainerStyle={styles.conatinerGap24}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectDateIndicator(index)}>
                <View
                  style={[
                    styles.dateConatainer,
                    index === 0
                      ? {marginLeft: SPACING.space_20}
                      : index === dateArray.length - 1
                      ? {marginRight: SPACING.space_20}
                      : {},
                    index === selectDateIndicator
                      ? {backgroundColor: COLORS.Orange}
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.outletCont}>
        <FlatList
          data={timeArray}
          bounces={false}
          keyExtractor={item => item}
          horizontal
          contentContainerStyle={styles.conatinerGap24}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectTimeIndex(index)}>
                <View
                  style={[
                    styles.timeConatainer,
                    index === 0
                      ? {marginLeft: SPACING.space_20}
                      : index === dateArray.length - 1
                      ? {marginRight: SPACING.space_20}
                      : {},
                    index === selectTimeIndex
                      ? {backgroundColor: COLORS.Orange}
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.priceCnt}>
          <Text style={styles.pricetitle}>Total Price</Text>
          <Text style={styles.priceText}>${price}.00</Text>
        </View>
        <TouchableOpacity onPress={() => Bookseat()}>
          <Text style={styles.btnText}>Buy Tickats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  BgImg: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearG: {
    height: '100%',
  },
  appHeaderCont: {
    marginHorizontal: SPACING.space_24,
    marginTop: SPACING.space_20 * 2,
  },
  ScreenText: {
    color: COLORS.WhiteRGBA32,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    textAlign: 'center',
  },
  seatContainetr: {
    marginVertical: SPACING.space_20,
  },
  conatinerGap20: {
    gap: SPACING.space_18,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_18,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_22,
    color: COLORS.White,
  },
  seatRadiocont: {
    flexDirection: 'row',
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioCont: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
  dateConatainer: {
    width: SPACING.space_10 * 6,
    height: SPACING.space_10 * 8,
    borderRadius: BORDERRADIUS.radius_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
  },
  dayText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  conatinerGap24: {
    gap: SPACING.space_28,
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  timeConatainer: {
    paddingVertical: SPACING.space_8,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outletCont: {
    marginVertical: SPACING.space_10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_16,
  },
  priceCnt: {
    alignItems: 'center',
  },
  pricetitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.WhiteRGBA32,
    fontSize: FONTSIZE.size_12,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
  },
  btnText: {
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_20,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_16,
  },
});
