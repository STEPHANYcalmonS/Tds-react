import React from 'react';
import { StyleSheet, View, Image, TextInput, KeyboardType } from 'react-native';

interface Props {
    image: any,
    placeholder: string,
    value: string,
    keyboardType: KeyboardType,
    secureTextEntry: boolean,
    property: string,
    onChangeText: (property: string, value: any) => void,
}

export const CustomTextInput = ({ 
    image, placeholder, value, keyboardType, secureTextEntry = false, property, onChangeText 
}: Props) => {
        return (
            <View style={ styles.frmInput }>
                <Image
                    source={ image }
                    style={ styles.frmIco }
                />
                <TextInput
                    placeholder= { placeholder }
                    keyboardType= { keyboardType }
                    secureTextEntry= { secureTextEntry }
                    value= { value }
                    onChangeText= { text => onChangeText(property, text) }
                    style={ styles.txtInput }
                />
            </View>
        )
}
const styles = StyleSheet.create({
    frmInput: {
        flexDirection: 'row',
        marginTop: 30,
    },
    frmIco: {
        width: 25,
        height: 25,
        marginTop: 10,
    },
    txtInput: {        
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginLeft: 15,
        color: '#949494ff',
    }
})