import { HStack, Heading, Icon, VStack, Text } from "native-base"
import { TouchableOpacity } from "react-native"

import { FontAwesome5, Entypo, FontAwesome6 } from '@expo/vector-icons'
import { useAuth } from "../hooks/useAuth"


export const HomeHeader = () => {
  const { user, signOut } = useAuth()

  return (
    <VStack bg="blue.700" pt={10} px={5} pb={5} borderBottomLeftRadius={30} borderBottomRightRadius={30}>
      <HStack alignItems="center" borderBottomWidth={1} borderBottomColor="gray.300" pb={4}>
        <Icon
          as={FontAwesome5}
          name="user"
          color="gray.300"
          size={6}
          mr={2}
        />

        <VStack flex={1}>
          <Text color="gray.300" fontSize="lg">Olá,</Text>
          <Heading color="gray.300" fontSize="lg" fontFamily="heading" >{user.segurado}</Heading>
        </VStack>

        <TouchableOpacity onPress={signOut}>
          <Icon
            as={Entypo}
            name="log-out"
            color="gray.300"
            size={7}
          />
        </TouchableOpacity>
      </HStack>

      <HStack alignItems="center" mt={4}>
        <Icon
          as={FontAwesome6}
          name="file-shield"
          color="gray.300"
          size={6}
          mr={2}
        />

        <Text fontSize="xl" color="gray.300" fontFamily="Roboto_400Regular">Meus Seguros</Text>

      </HStack>
    </VStack>
  )
}