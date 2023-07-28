import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
import AppHeaxder from '../components/AppHeaxder';
import SettingComponent from '../components/settingComponent';

const UserAccountScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View style={styles.appHeaderCont}>
        <AppHeaxder
          name="close"
          header={'MY Profile'}
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.profileCont}>
        <Image
          source={{
            uri: 'https://thumbs.dreamstime.com/b/faceless-anonymous-computer-hacker-laptop-desk-faceless-anonymous-computer-hacker-laptop-114782802.jpg',
          }}
          style={styles.profileImg}
        />
        <Text style={styles.prfileText}>name</Text>
      </View>
      <View style={styles.profileCont}>
        <SettingComponent
          icon="user"
          heading="Account"
          subheading="Edit Profile"
          subTitle="Change Pasword"
        />
        <SettingComponent
          icon="setting"
          heading="Settings"
          subheading="Theme"
          subTitle="Permission"
        />
        <SettingComponent
          icon="dollar"
          heading="Offers and Reference"
          subheading="Offer"
          subTitle="Refferrals"
        />
        <SettingComponent
          icon="info"
          heading="About"
          subheading="About Movies"
          subTitle="more"
        />
      </View>
    </View>
  );
};

export default UserAccountScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  appHeaderCont: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileCont: {
    alignItems: 'center',
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_10,

    // padding: SPACING.space_36,
  },
  prfileText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    marginTop: SPACING.space_20,
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
