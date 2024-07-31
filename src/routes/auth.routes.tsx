import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import { SignIn } from '@screens/SignIn'

type AuthRotes = {
  signIn: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRotes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRotes>()

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='signIn'
        component={SignIn}
      />
    </Navigator>
  )
}