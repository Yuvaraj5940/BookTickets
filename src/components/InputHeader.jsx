import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
import CustomIcons from './CustomIcons';

const InputHeader = props => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.InputBox}>
      <TextInput
        style={styles.TextInput}
        onChangeText={text => setSearchText(text)}
        value={searchText}
        placeholder="Search movies"
        placeholderTextColor={COLORS.WhiteRGBA32}
      />
      <TouchableOpacity
        style={styles.SearchIcn}
        onPress={() => props.SearchFunction(searchText)}>
        <CustomIcons
          name="search"
          size={FONTSIZE.size_20}
          color={COLORS.Orange}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;
const styles = StyleSheet.create({
  InputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_2,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
  },
  TextInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  SearchIcn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
});
