import {View, Text} from 'react-native';
import React from 'react';
import CustomIcons from './src/components/CustomIcons';

import {
  uppcommingMovies,
  populorMovies,
  nowPlayingMovie,
  searchMovies,
} from './src/api/apiCalls';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigator/TabNavigator';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  console.log('====================================');
  console.log(searchMovies('Avengers'));
  console.log('====================================');
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'default'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
