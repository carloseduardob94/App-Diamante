import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { RobotoFlex_400Regular } from '@expo-google-fonts/roboto-flex';

import { Loading } from '@components/Loading';


import { Routes } from './src/routes';
import { THEME } from './src/theme';
import { AuthContextProvider } from './src/contexts/AuthContext';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    RobotoFlex_400Regular
  })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" />

      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}