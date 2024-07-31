import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { HStack, Heading, Image, Text, VStack } from "native-base"

import LogoGeorgeSeguros from '@assets/logo-george-seguros.png'
import { UserDTO } from "../dtos/UserDTO"
import { formatDate } from "../utils/formatDate"


type SecurityCardsProps = TouchableOpacityProps & {
  data: UserDTO
}

export const SecurityCards = ({ data, ...rest }: SecurityCardsProps) => {
  const startDateFormatted = formatDate(data.inicio_vigencia)
  const finishDateFormatted = formatDate(data.fim_vigencia)


  return (
    <TouchableOpacity {...rest}>
      <HStack borderRadius={8} bg="white" borderWidth={1} borderColor="blue.700" p={2} position="relative" mb={6}>
        <Image
          source={{ uri: data.urlLogo }}
          w={14}
          resizeMode="contain"
          alt=" "
          position="absolute"
          top={-80}
          left={-25}
        />

        <VStack>
          <Heading fontSize="lg" fontFamily="heading" color="blue.500" textTransform="uppercase" pl={8}>{data.customerName}</Heading>
          <Heading fontSize="lg" fontFamily="heading" color="gray.800" mt={4}>Apólice: {data.apolice}</Heading>

          <Text>Seguradora: {data.seguradora}</Text>
          <Text>Vigência: {startDateFormatted} - {finishDateFormatted}</Text>
          <Text flex={1}>Objeto Segurado: {data.objeto_segurado}</Text>
          <Text>Ramo: {data.ramo}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}