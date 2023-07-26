import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import {COLORS, SPACING} from '../theme/Theme';
import {
  uppcommingMovies,
  nowPlayingMovie,
  populorMovies,
  searchMovies,
  BaseIamgepath,
} from '../api/apiCalls';
import InputHeader from '../components/InputHeader';
import CaragoryHeadder from '../components/caragoryHeadder';
import SubmovieCard from '../components/SubmovieCard';
import MovieCard from '../components/MovieCard';

const {width, heigt} = Dimensions.get('window');
// console.log(width/3);

const GetNowPlayingMovieList = async () => {
  try {
    let res = await fetch(nowPlayingMovie);
    let json = await res.json();
    return json;
  } catch (error) {
    console.log('====================================');
    console.log(
      'Something went wrong in GetNowPlayingMovieList function ',
      error,
    );
    console.log('====================================');
  }
};
const GetUpcommingMovieList = async () => {
  try {
    let res = await fetch(uppcommingMovies);
    let json = await res.json();
    return json;
  } catch (error) {
    console.log('====================================');
    console.log(
      'Something went wrong in GetUpcommingMovieList function',
      error,
    );
    console.log('====================================');
  }
};
const GetPopularMovieList = async () => {
  try {
    let res = await fetch(populorMovies);
    let json = await res.json();
    return json;
  } catch (error) {
    console.log('====================================');
    console.log('Something went wrong in GetPopularMovieList function', error);
    console.log('====================================');
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState(undefined);
  const [populorMovieList, setPopulorMovieList] = useState(undefined);
  const [upcomminMovies, setUpcomminMovies] = useState(undefined);
  // console.log('====================================');
  // console.log(nowPlayingMovies);
  // console.log('====================================');
  // console.log(upcomminMovies.length);
  // console.log('====================================');
  // console.log(populorMovieList.length);

  useEffect(() => {
    (async () => {
      // console.log(GetNowPlayingMovieList);
      let tempNowplaying = await GetNowPlayingMovieList();
      setNowPlayingMovies(tempNowplaying.results);
      let tempPopularPlaying = await GetPopularMovieList();
      setPopulorMovieList(tempPopularPlaying.results);
      let tempUpcomming = await GetUpcommingMovieList();
      setUpcomminMovies(tempUpcomming.results);
    })();
  }, []);

  const SearchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMovies == undefined &&
    nowPlayingMovies == null &&
    populorMovieList == undefined &&
    populorMovieList == null &&
    upcomminMovies == undefined &&
    upcomminMovies == null
  ) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.InputHeaderContainer}>
          <InputHeader SearchFunction={SearchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.InputHeaderContainer}>
        <InputHeader SearchFunction={SearchMoviesFunction} />
      </View>
      <CaragoryHeadder title={'Now Playing'} />
      <FlatList
        data={nowPlayingMovies}
        keyExtractor={item => item.id}
        bounces={false}
        snapToInterval={width*0.7+ SPACING.space_32}
        horizontal
        contentContainerStyle={styles.containergap}
        renderItem={({item, index}) => (
          <MovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width *0.7}
            isFirst={index === 0 ? true : false}
            isLast={index === nowPlayingMovies?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={BaseIamgepath('w780', item.poster_path)}
            genre={item.genre_ids.slice(1,4)}
            vote_average={item.vote_average}
            vote_count={item.vote_count}
          />
        )}
      />
      <CaragoryHeadder title={'Popular'} />
      <FlatList
        data={populorMovieList}
        keyExtractor={item => item.id}
        bounces={false}
        horizontal
        contentContainerStyle={styles.containergap}
        renderItem={({item, index}) => (
          <SubmovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === populorMovieList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={BaseIamgepath('w342', item.poster_path)}
          />
        )}
      />
      <CaragoryHeadder title={'Upcoming'} />
      <FlatList
        data={upcomminMovies}
        keyExtractor={item => item.id}
        bounces={false}
        horizontal 
        contentContainerStyle={styles.containergap}
        renderItem={({item, index}) => (
          <SubmovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === upcomminMovies?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={BaseIamgepath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    display: 'flex',
    flex: 1,
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_32,
    marginTop: SPACING.space_28,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containergap: {
    gap: SPACING.space_36,
  },
});
