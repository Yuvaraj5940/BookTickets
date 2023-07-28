import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BaseIamgepath, MOviecastDetails, MovieId} from '../api/apiCalls';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
import AppHeaxder from '../components/AppHeaxder';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcons from '../components/CustomIcons';
import CaragoryHeadder from '../components/caragoryHeadder';
import CastCard from '../components/CastCard';

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

const getMovieDetails = async movieid => {
  try {
    let res = await fetch(MovieId(movieid));
    let newres = await res.json();
    return newres;
  } catch (error) {
    console.log('somthing went wrong in getMovieDetails', error);
  }
};
const getMovieCastDetails = async movieid => {
  try {
    let res = await fetch(MOviecastDetails(movieid));
    let newres = await res.json();
    return newres;
  } catch (error) {
    console.log('somthing went wrong in getMovieCastDetails', error);
  }
};

const MovieDetailsScreen = ({navigation, route}) => {
  const [movieData, setMovieData] = useState(undefined);
  const [movieCastData, setMovieCastData] = useState(undefined);

  // console.log(movieData);
  // console.log(movieCastData);
  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();
    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData.cast);
    })();
  }, []);

  if (
    movieData === undefined &&
    movieData === null &&
    movieCastData === undefined &&
    movieCastData === null
  ) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollviveContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderCont}>
          <AppHeaxder
            name="close"
            header={'Movie details'}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View>
        <ImageBackground
          style={styles.imgBg}
          source={{uri: BaseIamgepath('w780', movieData?.backdrop_path)}}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderCont}>
              <AppHeaxder
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imgBg} />
        <Image
          source={{uri: BaseIamgepath('w342', movieData?.poster_path)}}
          style={styles.cardimg}
        />
      </View>
      <View style={styles.timeContainer}>
        <CustomIcons name="clock" style={styles.clockicn} />
        <Text style={styles.runtimeText}>
          {Math.floor(movieData?.runtime / 60)}h{' '}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>
      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map(x => {
            return (
              <View key={x.id} style={styles.genreBox}>
                <Text style={styles.genreText}>{x.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagLine}>{movieData?.tagline}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.ratecontainer}>
          <CustomIcons name="star" style={styles.starIcon} />
          <Text style={styles.runtimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count}){'  '}
          </Text>
          <Text style={styles.runtimeText}>
            {/* {movieData?.release_date.substring(8, 10)}{' '} */}
            {new Date(movieData?.release_date).toLocaleString('defoult', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
            {/* {movieData?.release_date.substring(0, 4)}{' '} */}
          </Text>
        </View>
        <Text style={styles.deceText}>{movieData?.overview}</Text>
      </View>
      <View>
        <CaragoryHeadder title="Top Cast" />
        <FlatList
          data={movieCastData}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={styles.containerGap}
          renderItem={({item, index}) => (
            <CastCard
              shoudlMarginatedAtEnd={true}
              cardWidth={80}
              isFirst={index === 0 ? true : false}
              isLast={index === movieCastData?.length - 1 ? true : false}
              imagePath={BaseIamgepath('w185', item.profile_path)}
              title={item.original_name}
              subTitle={item.character}
            />
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonBg}
          onPress={() => {
            navigation.push('SeatBooking', {
              bgImage: BaseIamgepath('w780', movieData.backdrop_path),
              posterImage: BaseIamgepath('original', movieData.poster_path),
            });
          }}>
          <Text style={styles.btnText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollviveContainer: {
    flex: 1,
  },
  appHeaderCont: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imgBg: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardimg: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockicn: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    marginHorizontal: SPACING.space_32,
    marginVertical: SPACING.space_15,
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
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tagLine: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    textAlign: 'center',
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_15,
  },
  infoContainer: {
    marginHorizontal: SPACING.space_36,
  },
  ratecontainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  deceText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  containerGap: {
    gap: SPACING.space_24,
  },
  buttonBg: {
    marginVertical: SPACING.space_24,
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.White,
    borderRadius: BORDERRADIUS.radius_25 * 5,
    backgroundColor: COLORS.Orange,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
});
