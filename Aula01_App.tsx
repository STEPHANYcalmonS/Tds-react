import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./scr/Presentation/views/home/Home";
import { RegisterScreen } from "./scr/Presentation/views/register/Regiser";
import AlterarSenhaScreen from './scr/Presentation/views/AlterarSenha/AlterarSenha';
import PassagemEmail from './scr/Presentation/views/PassagemEmail/PassagemEmail';

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  PassagemEmail: undefined;
  AlterarSenha: undefined;
}

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: 'Novo usuário',
          }}
        />
        <Stack.Screen
          name='PassagemEmail'
          component={PassagemEmail}
          options={{
            headerShown: true,
            title: 'Recuperar Senha',
          }}
        />
        <Stack.Screen
          name='AlterarSenha'
          component={AlterarSenhaScreen}
           options={{
            headerShown: true,
            title: 'Alterar Senha',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App