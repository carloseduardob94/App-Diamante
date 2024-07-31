import { HomeHeader } from "@components/HomeHeader"
import { Loading } from "@components/Loading"
import { SecurityCards } from "@components/SecurityCards"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { FlatList, VStack, useToast } from "native-base"
import { useCallback, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { AppError } from "../utils/AppError"


export const Home = () => {
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { user, listApolices } = useAuth()
  const toast = useToast()

  const handleOpenApoliceDetails = (apolice: string) => {
    navigation.navigate('cardDetails', { apolice })
  }

  const fetchSecurityCards = async () => {
    try {
      setLoading(true)

      // const { data } = await api.post('/documents-multi-tenant', { cpf: '02457732000130', nascimento: "1997-10-23T00:00:00" }, {
      //   headers: {
      //     'Authorization': 'Bearer 5-e6SF7VWTJ_AxK3r3wT6gYy_w_rBg1i'
      //   }
      // })

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar as apólices. Tente novamente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchSecurityCards()
  }, []))

  return (
    <VStack>
      <HomeHeader />
      {loading ? <Loading /> :
        <VStack px={8} mt={8}>
          <FlatList
            data={listApolices}
            keyExtractor={item => item.apolice}
            renderItem={({ item }) => (
              <SecurityCards data={item} onPress={() => handleOpenApoliceDetails(item.apolice)} />

            )}
            showsVerticalScrollIndicator={false}
          />


        </VStack>
      }
    </VStack>
  )
}