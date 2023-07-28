import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomIcons from './CustomIcons';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';

const AppHeaxder = props => {
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity style={styles.iconBack} onPress={() => props.action()}>
        <CustomIcons name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headertext}>{props.header}</Text>
      <View style={styles.emptyContainer} />
    </View>
  );
};

export default AppHeaxder;
const styles = StyleSheet.create({
  conatiner: {
    // display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
  headertext: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_regular,
    textAlign: 'center',
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  emptyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
  },
  iconBack: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.Orange,
  },
});
