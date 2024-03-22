import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { SvgUri } from "react-native-svg"

interface Props {
  // The svg component will always be of <import svg from 'path-to-svg-file'> 
  svgComponent: any
  onPress: any
}

const SvgButton = (props: Props) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={style.view}>
        <props.svgComponent height={20} width={20} fill="white" />
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  view: {
    backgroundColor: 'dodgerblue',
    margin: 4,
    padding: 8,
    borderRadius: 50
  }
})

export default SvgButton;
