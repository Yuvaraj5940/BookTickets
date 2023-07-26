import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/Theme';

const CaragoryHeadder = (props) => {
  return (
      <Text style={styles.title}>{props.title}</Text>
  )
}

export default CaragoryHeadder;
const styles = StyleSheet.create({
    title:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_20,
        color:COLORS.White,
        paddingHorizontal:SPACING.space_36,
        paddingVertical:SPACING.space_28,
    }
})