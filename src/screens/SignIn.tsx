import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { useForm, Controller } from "react-hook-form"
import { Center, Heading, Image, ScrollView, VStack, useToast, Text } from "native-base"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import BackgroundImg from '@assets/background.png'
import LusatiLogoImg from '@assets/lusati-logo-branco.png'

import { Input } from "@components/Input"
import { Button } from "@components/Button"

import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import { Masks, formatWithMask } from "react-native-mask-input"
import { useAuth } from "../hooks/useAuth"
import { AppError } from "../utils/AppError"


type FormDataProps = {
  cpf: string
  nascimento: string
}

// const signInSchema = yup.object({
//   cpf: yup.string().required('Informe o CPF ou CNPJ'),
//   nascimento: yup.string().required('Informe o dia de seu nascimento')
// })

export const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [cpf, setCpf] = useState('')
  const [nascimento, setNascimento] = useState('')

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    // resolver: yupResolver(signInSchema)
  })
  const { signIn } = useAuth()

  const toast = useToast()


  const handleSignIn = async () => {
    try {
      setLoading(true)

      const cpfMasked = formatWithMask({
        text: cpf,
        mask: Masks.BRL_CPF_CNPJ,
      });

      const nascimentoMasked = formatWithMask({
        text: nascimento,
        mask: Masks.DATE_DDMMYYYY,
      });

      // const { masked, unmasked, obfuscated } = formatWithMask({
      //   text: cpf,
      //   mask: Masks.BRL_CPF_CNPJ,
      //   // obfuscationCharacter: '-',
      // });

      await signIn(cpfMasked.unmasked, nascimento)

    } catch (error) {
      console.error(error)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível conectar. Tente novamente mais tarde.'

      setLoading(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600'
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="dark" />
      <VStack flex={1} bg="gray.400">
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="diamante background"
          resizeMode="contain"
          position="absolute"
        />

        <Center flex={1} px={3} mt={24}>
          <Heading mt={40} mb={8} fontFamily="heading">Acesse sua conta</Heading>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input
                // placeholder="CPF/CNPJ"
                keyboardType="numeric"
                onChangeText={setCpf}
                value={cpf}
                errorMessage={errors.cpf?.message}
                mask={Masks.BRL_CPF_CNPJ}
              />
            )}
          />
          {!cpf ? <Text color="black" fontWeight="bold" mt={-4} mb={3}> Informe o CPF/CNPJ.</Text> : cpf.length < 13 && <Text color="black" fontWeight="bold" mt={-4} mb={3}>CPF/CNPJ mínimo de 14 dígitos.</Text>}

          <Controller
            control={control}
            name="nascimento"
            render={({ field: { onChange, value } }) => (
              <Input
                // placeholder="Data de nascimento"
                onChangeText={setNascimento}
                value={nascimento}
                errorMessage={errors.nascimento?.message}
              // mask={Masks.DATE_DDMMYYYY}
              />
            )}
          />
          {!nascimento && <Text color="black" fontWeight="bold" mt={-4} mb={3}> Informe a data de nascimento.</Text>}

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            _loading={{
              bgColor: 'blue.600'
            }}
            isLoading={loading}
          />
        </Center>

        <Center >
          <Image
            source={LusatiLogoImg}
            h={12}
            resizeMode="contain"
            alt="Logo Lusati"
            mt={8}
            mb={12}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}