import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';

const CastCard = props => {
  return (
    <View
      style={[
        styles.conatiner,
        props.shoudlMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: SPACING.space_24}
            : props.isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
        {maxWidth: props.cardWidth},
      ]}>
      <Image
        source={{uri: props.imagePath}}
        style={[styles.cardImag, {width: props.cardWidth}]}
      />
      <Text style={styles.titleText} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.subtitleText} numberOfLines={1}>
        {props.subTitle}
      </Text>
    </View>
  );
};

export default CastCard;
const styles = StyleSheet.create({
  conatiner: {
    alignItems: 'center',
  },
  cardImag: {
    aspectRatio: 2000 / 2400,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  titleText: {
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
  subtitleText: {
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
});
