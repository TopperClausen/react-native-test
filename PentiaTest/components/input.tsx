import { StyleSheet, TextInput } from "react-native"

interface Props {
  placeholder: string
  value: string,
  onChangeText: (text: string) => void,
  width?: number
}

const Input = (props: Props) => {
  return (
    <TextInput 
      value={props.value}
      onChangeText={text => props.onChangeText(text)}
      placeholder={props.placeholder}
      style={{ ...style.input, width: props.width}}
    />
  )
}

const style = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 24
  }
})

export default Input;
