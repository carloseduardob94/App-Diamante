import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'
import { useState } from 'react'
import { Mask, MaskInputProps, useMaskedInputProps } from 'react-native-mask-input'

type Props = IInputProps & MaskInputProps & {
  errorMessage?: string | null
  mask?: Mask
  onChangeText: any
  value?: any
}

export const Input = ({ errorMessage = null, isInvalid, mask, onChangeText, value, ...rest }: Props) => {
  const invalid = !!errorMessage || isInvalid
  // const [stateOnChangeText, setStateOnChangeText] = useState('')

  const maskedInputProps = useMaskedInputProps({
    mask: mask,
    onChangeText: onChangeText,
    value: value
  });


  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        w="full"
        bg="gray.300"
        borderColor="blue.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="lg"
        color="black"
        fontFamily="body"
        borderRadius="lg"
        placeholderTextColor="gray.500"
        mask={mask}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 2,
          borderColor: 'red.700'
        }}
        _focus={{
          bg: "gray.300",
          borderWidth: 2,
          borderColor: "blue.700"
        }}

        {...maskedInputProps}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: "black", fontSize: "md", fontWeight: "bold" }}>
        {errorMessage}
      </FormControl.ErrorMessage>

    </FormControl>
  )
}