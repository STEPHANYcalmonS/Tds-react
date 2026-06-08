import {StyleSheet ,View, Text, Platform, ToastAndroid, Alert } from 'react-native';

// Componentes

import { RoundedButton } from '../../components/RoundedButton';
import { CustomTextInput } from '../../components/CustomTextInput';

export const EsqueceuSenhaScreen = () => {

        const testOS = () => {
            if (Platform.OS === 'android') {
                //Android: mostra o Toast nativo
                ToastAndroid.show('Teste de Login! - Android', ToastAndroid.SHORT);
            } else if (Platform.OS === 'web') {
                //Navegar: usa o alert do JS classico
                alert('Teste de Login! - WEB');
            } else {//IOS: usa o alert nativo do IPhone
                Alert.alert('Aviso', 'Teste de Login! - iPhone');
            }
        };

    return (
        <View>
            <Text>
                Redefinir senha
            </Text>
        </View>
    )
}


