import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SPACING} from '../theme/Theme';
import {BaseIamgepath, searchMovies} from '../api/apiCalls';
import InputHeader from '../components/InputHeader';
import SubmovieCard from '../components/SubmovieCard';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {
  const [searchList, setSearchList] = useState([]);
  const searchMovieFunction = async name => {
    try {
      let res = await fetch(searchMovies(name));
      let newres = await res.json();
      setSearchList(newres.results);
      // console.log(newres.results)
    } catch (error) {
      console.log('somthing went wrong in searchMovieFunction', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={searchList}
          keyExtractor={item => item.id}
          bounces={false}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader SearchFunction={searchMovieFunction} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubmovieCard
              shoudlMarginatedAtEnd={false}
              shoudlMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.original_title}
              imagePath={BaseIamgepath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_32,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer: {
    alignItems: 'center',
  },
});
