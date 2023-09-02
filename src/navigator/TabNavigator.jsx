/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, FONTSIZE, SPACING} from '../theme/Theme';
import CustomIcons from '../components/CustomIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TickateScreen from '../screens/TickateScreen';
import UserAccountScreen from '../screens/UserAccountScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: 80,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeBackground,
                  focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <CustomIcons
                  name="video"
                  size={FONTSIZE.size_24}
                  color={COLORS.White}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeBackground,
                  focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <CustomIcons
                  name="search"
                  size={FONTSIZE.size_24}
                  color={COLORS.White}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Tickate"
        component={TickateScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeBackground,
                  focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <CustomIcons
                  name="ticket"
                  size={FONTSIZE.size_24}
                  color={COLORS.White}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeBackground,
                  focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <CustomIcons
                  name="user"
                  size={FONTSIZE.size_24}
                  color={COLORS.White}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
const styles = StyleSheet.create({
  activeBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_12,
    borderRadius: SPACING.space_10 * 10,
  },
});
