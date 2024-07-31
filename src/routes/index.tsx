import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Box, useTheme } from "native-base"
import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"

import { Loading } from "@components/Loading"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

export const Routes = () => {
  const { colors } = useTheme()

  const { user, loadingUserStorageData } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[300]

  if (loadingUserStorageData) return <Loading />

  return (
    <Box flex={1} bg="gray.300">
      <NavigationContainer theme={theme}>
        {user.segurado ? <AppRoutes /> : <AuthRoutes />}

      </NavigationContainer>
    </Box>
  )
}