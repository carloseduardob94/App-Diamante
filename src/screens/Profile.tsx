import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { FontAwesome } from '@expo/vector-icons'
import { Center, Heading, Icon, ScrollView, Skeleton, Text, VStack, useToast } from "native-base"

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

const PHOTO_SIZE = 33

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('')

  const toast = useToast()

  const warningDevelopment = () => {
    toast.show({
      title: 'Funcionalidade em desenvolvimento.',
      placement: 'top',
      bgColor: 'yellow.600',
      duration: 3500
    })
  }

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (photoSelected.canceled) return

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        if (photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            placement: "top",
            bgColor: 'red.600'
          })
        }
      }

      setUserPhoto(photoSelected.assets[0].uri)

      toast.show({
        title: 'Imagem alterada com sucesso',
        placement: 'top',
        bgColor: 'green.600',
      })

    } catch (error) {
      console.log(error)

    } finally {
      setPhotoIsLoading(false)
    }

  }

  useFocusEffect(useCallback(() => {
    warningDevelopment()
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }} >
        <Center mt={6} px={10}>
          {
            photoIsLoading ?
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
              :
              userPhoto !== '' ?
                <UserPhoto
                  source={{ uri: userPhoto }}
                  alt="Foto do usuário"
                  size={PHOTO_SIZE}
                />
                :
                <Icon
                  as={FontAwesome}
                  name="user-circle"
                  size={24}
                  color="blue.700"
                />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect} >
            <Text color="blue.500" fontWeight="bold" fontSize="lg" mt={2} mb={8}>Alterar foto</Text>
          </TouchableOpacity>

          <Input
            placeholder="Nome"
            placeholderTextColor="gray.600"
            bg="blue.300"
          />
          <Input
            placeholder="carlos@lusati.com.br"
            bg="gray.600"
            readOnly
          />
        </Center>

        <VStack px={10} mt={12} mb={12}>
          <Heading color="blue.700" fontSize="lg" mb={2} >
            Alterar senha
          </Heading>

          <Input
            placeholderTextColor="gray.600"
            bg="blue.300"
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input
            placeholderTextColor="gray.600"
            bg="blue.300"
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input
            placeholderTextColor="gray.600"
            bg="blue.300"
            placeholder="Confirme nova senha"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}