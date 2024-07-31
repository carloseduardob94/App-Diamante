import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
}

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg="blue.700"
      borderRadius="lg"
      {...rest}
    >
      <Text color="white" fontFamily="heading" fontSize="lg">{title}</Text>
    </NativeBaseButton>
  )
}