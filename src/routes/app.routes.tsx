import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "native-base"

import { Home } from "@screens/Home"
import { Profile } from "@screens/Profile"

import HomeSvg from '@assets/home.svg'
import ProfileSvg from '@assets/profile.svg'
import { Platform } from "react-native"
import { CardDetails } from "@screens/CardDetails"

type AppRoutesProps = {
  home: undefined
  profile: undefined
  cardDetails: { apolice: string }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>

export const AppRoutes = () => {
  const { sizes, colors } = useTheme()
  const iconSize = sizes[7]

  const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.blue[700],
        height: Platform.OS === "android" ? 'auto' : 96,
        paddingBottom: sizes[8],
        paddingTop: sizes[8]
      }
    }}

    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="cardDetails"
        component={CardDetails}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}