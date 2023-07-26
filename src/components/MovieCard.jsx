import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
import CustomIcons from './CustomIcons';

const genres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentory',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystory',
  10749: 'Romance',
  878: 'Scince Fiction',
  10770: 'TV Movies',
  53: 'Triller',
  10752: 'War',
  37: 'Western',
};

const MovieCard = props => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shoudlMarginatedAtEnd
            ? props.isFirst
              ? {marginLeft: SPACING.space_36}
              : props.isLast
              ? {marginRight: SPACING.space_36}
              : {}
            : {},
          props.shoudlMarginatedAround ? {margin: SPACING.space_12} : {},
          {maxWidth: props.cardWidth},
        ]}>
        <Image
          source={{uri: props.imagePath}}
          style={[styles.cardImage, {width: props.cardWidth}]}
        />
        <View>
          <View style={styles.ratecontainer}>
            <CustomIcons name="star" style={styles.starIcon} />
            <Text style={styles.voteText}>
              {props.vote_average}({props.vote_count})
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.textTitle}>
            {props.title}
          </Text>
          <View style={styles.genrecontainer}>
            {props.genre.map(x => {
              return (
                <View key={x} style={styles.genreBox}>
                  <Text style={styles.genreText}>{genres[x]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  ratecontainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  voteText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  genrecontainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_9,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
