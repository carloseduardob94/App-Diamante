import { ScreenHeader } from "@components/ScreenHeader"
import { LinearGradient } from "expo-linear-gradient"
import { HStack, VStack, Image, Heading, Text, PresenceTransition, Center } from "native-base"


import LogoSeguro from '@assets/logo-george-seguros.png'
import LogoLiberty from '@assets/liberty-seguros-seeklogo2.png'

import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"

import { Button } from "@components/Button"
import { useAuth } from "../hooks/useAuth"
import { UserDTO } from "../dtos/UserDTO"
import { formatDate } from "../utils/formatDate"


type RouteParamsProps = {
  apolice: string
}

export const CardDetails = () => {
  const { user, listApolices } = useAuth()
  const [cardDetails, setCardDetails] = useState({} as UserDTO)
  const [isOpen, setIsOpen] = useState(false)
  const [startDateFormatted, setStartDateFormatted] = useState('')
  const [finishDateFormatted, setFinishDateFormatted] = useState('')

  const route = useRoute()
  const { apolice } = route.params as RouteParamsProps

  const fetchCardDetails = () => {
    const cardDetailsFiltered = listApolices.filter(apoliceFiltered => apoliceFiltered.apolice === apolice)

    setCardDetails(cardDetailsFiltered[0])
    setStartDateFormatted(formatDate(cardDetailsFiltered[0].inicio_vigencia))
    setFinishDateFormatted(formatDate(cardDetailsFiltered[0].fim_vigencia))
  }

  useFocusEffect(useCallback(() => {
    fetchCardDetails()
  }, [apolice]))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Detalhes Apólice" />
      <HStack w="full" mt={8} bgColor="blue.300" alignItems="center" justifyContent="center" p={1}>
        <Image
          source={LogoSeguro}
          h={10}
          w={10}
          mr={2}
          resizeMode="contain"
          alt="Logo"
        />

        <Heading fontFamily="heading" fontSize="2xl" fontWeight="bold" > - {cardDetails.apolice}</Heading>
      </HStack>

      <LinearGradient
        style={{ marginTop: 40, marginHorizontal: 14, borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
        colors={['#021F59', '#2E6891']}>

        <HStack bgColor="#b8c4d4" alignItems="center" justifyContent="space-between" mt={3} px={4} py={1}>
          <Image
            source={LogoSeguro}
            h={12}
            w={14}
            resizeMode="contain"
            alt="Logo"
          />
          <Image
            source={LogoLiberty}
            h={12}
            resizeMode="contain"
            alt="Logo"
          />
        </HStack>

        <VStack px={4} mt={4}>
          <HStack alignItems="center" justifyContent="space-between">
            <VStack>
              <Heading color="white" fontFamily="heading" fontSize="md">APÓLICE</Heading>
              <Text color="white" fontSize="md">{cardDetails.apolice}</Text>
            </VStack>

            <VStack>
              <Heading color="white" fontFamily="heading" fontSize="md">SITUAÇÃO</Heading>
              <Text color="white" fontSize="md">{user.situacao}</Text>
            </VStack>
          </HStack>

          <HStack alignItems="center" justifyContent="space-between" mt={10} mb={6}>
            <VStack>
              <Heading color="white" fontFamily="heading" fontSize="md">RAMO</Heading>
              <Text color="white" fontSize="md">{cardDetails.ramo}</Text>
            </VStack>
            <VStack>
              <Heading color="white" fontFamily="heading" fontSize="md">INÍCIO VIGÊNCIA</Heading>
              <Text color="white" fontSize="md">{startDateFormatted}</Text>
            </VStack>
            <VStack>
              <Heading color="white" fontFamily="heading" fontSize="md">FIM VIGÊNCIA</Heading>
              <Text color="white" fontSize="md">{finishDateFormatted}</Text>
            </VStack>
          </HStack>

        </VStack>
      </LinearGradient>

      <Center px={4}>
        <Button
          bg={isOpen ? 'warning.900' : 'emerald.900'}
          h={10}
          mt={2}
          title={isOpen ? "Fechar detalhes do Financeiro" : "Abrir detalhes do Financeiro"}
          onPress={() => setIsOpen(!isOpen)}
        />
      </Center>

      <PresenceTransition
        visible={isOpen}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 250
          }
        }}
      >
        <LinearGradient style={{ marginTop: 10, marginHorizontal: 14, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}
          colors={['#2E6891', '#021F59']} >

          <VStack px={4} mt={4}>
            <Heading color="white" fontFamily="heading" fontSize="lg" textDecorationLine="underline" mb={6}>DETALHES DO FINANCEIRO</Heading>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Heading color="white" fontFamily="heading" fontSize="md">PRÊMIO TOTAL</Heading>
                <Text color="white" fontSize="md">R$ {user.premio_total}</Text>
              </VStack>

              <VStack>
                <Heading color="white" fontFamily="heading" fontSize="md">VALOR FRANQUIA</Heading>
                <Text color="white" fontSize="md">R$ {user.vl_franquia}</Text>
              </VStack>
            </HStack>

            <HStack alignItems="center" justifyContent="space-between" mt={10} mb={6}>
              <VStack>
                <Heading color="white" fontFamily="heading" fontSize="md">PREMIO SERVIÇO</Heading>
                <Text color="white" fontSize="md">{user.premioServico}</Text>
              </VStack>
              <VStack>
                <Heading color="white" fontFamily="heading" fontSize="md">VENCIMENTO 1ª PARCELA</Heading>
                <Text color="white" fontSize="md">{user.vencimentoPrimeiraParcela}</Text>
              </VStack>
            </HStack>

          </VStack>
        </LinearGradient>
      </PresenceTransition>

    </VStack>
  )
}