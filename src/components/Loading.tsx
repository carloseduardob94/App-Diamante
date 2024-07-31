import { Center, Spinner } from "native-base"

export const Loading = () => {
  return (
    <Center flex={1} bg="blue.700" width="full">
      <Spinner size="lg" color="gray.300" />
    </Center>
  )
}