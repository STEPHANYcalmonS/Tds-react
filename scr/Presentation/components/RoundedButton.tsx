//Cria um arquivo para componente de Botões
// ./scr/components/RoundedButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/Apptheme";

interface Props {
    text: string,
    //1. Adicionamos a tipagem do onPress com retorno VOID(Vazio)
    onPress: () => void;
}

// 2.Extraimos o onPress das propriedades (Props)
export const RoundedButton = ({ text, onPress }: Props) => {
    return (
        <TouchableOpacity
            //3. Passamos a função recebida para o botão nativo
            onPress={() => onPress()}
            style={styles.bnt} 
        >

            <Text style={styles.txtBnt}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    bnt: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    txtBnt: {
        color: COLORS.bgColor,
        fontWeight: 'bold',
        fontSize: 16
    }
})
