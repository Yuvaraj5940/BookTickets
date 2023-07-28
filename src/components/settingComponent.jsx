import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/Theme';
import CustomIcons from './CustomIcons';

const SettingComponent = props => {
  return (
    <View style={styles.container}>
      <View>
        <CustomIcons name={props.icon} style={styles.iconTmag} />
      </View>
      <View style={styles.settConatiner}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subTitle}>{props.subheading}</Text>
        <Text style={styles.subTitle}>{props.subTitle}</Text>
      </View>
      <View style={styles.icnBg}>
        <CustomIcons name="arrow-right" style={styles.iconTmag} />
      </View>
    </View>
  );
};

export default SettingComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },
  iconTmag: {
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20,
    color: COLORS.White,
  },
  settConatiner: {
    flex: 1,
  },
  title: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
  },
  subTitle: {
    color: COLORS.WhiteRGBA32,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  icnBg: {
    justifyContent: 'center',
  },
});
