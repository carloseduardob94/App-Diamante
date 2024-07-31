import { Center, Heading } from "native-base"

type ScreenHeaderProps = {
  title: string
}

export const ScreenHeader = ({ title }: ScreenHeaderProps) => {
  return (
    <Center bg="blue.700" pb={6} pt={16}>
      <Heading color="gray.100" fontSize="xl">{title}</Heading>
    </Center>
  )
}