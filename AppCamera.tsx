import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Image, Dimensions, ActivityIndicator,Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

//pegamos a largura e altura da tela do dispositivo, para garantir o tamanho da foto
const { width, height } = Dimensions.get('window');

//variavel para controlar o ambiente (true= simula no front / false = envia pro servidor real)
const isTestMode = true;

export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isUploading, setUploading] = useState(false);
    const cameraRef = useRef<any>(null);

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.textLight}>Carregando permissoes...</Text>
            </View>
        );
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.textPermissao}>Precisamos da sua permissao para mostrar a camera!.</Text>
                <Button onPress={requestPermission} title="Conceder Permissao" />
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            //skipProcessing garante que o Android processe a imagem antes de entregar o URI
            const option = { quality: 0.8, skipProcessing: false };
            const photo = await cameraRef.current.takePictureAsync(option);

            if (photo && photo.uri) {
                //isso vai aparecer no terminal do vscode
                console.log('Foto tirada com sucesso! caminho:', photo.uri);
                setCapturedImage(photo.uri);
            }
        }
    };


    const uploadImage = async () => {
        if (!capturedImage) return;
        setUploading(true);

        try {
            if (isTestMode) {
                //mode de teste (apenas front)
                console.log('Modo de teste ativo:Simulando o Upload...');

                //simula o tempo de uma requisiçao de rede "2 segundos"
                await new Promise(resolve => setTimeout(resolve, 2000));

               console.log('upload simulado COM SUCESSO!a imagem esta pronta para ser usada no app.');
                Alert.alert('Sucesso', 'Sua foto de perfil foi atualizada (Modo teste)!');

                //a partir daqui pode ser utilizada e atualizada a foto na UI, no context ou Redux

            } else {
                /**
                 * Modo produção (comunicação com backend)
                 */

                //1. Resolve o erro do "Unsupported FormDataPart" transformando o arquivo local em um Blob padrão da Web
                const localImageResponse = await fetch(capturedImage);
                const blob = await localImageResponse.blob();

                //2. cria o FormData e anexa o blob (usando o padrão web que as versões novas do Expo exigem)
                const formData = new FormData();
                formData.append('profilePicture', blob, 'profile.jpg');

                const UPLOAD_URL = 'https://sua-api/upload-endpoint'; //substitua quando Tiver a API
            
                const response = await fetch(UPLOAD_URL, {
                    method: 'POST',
                    //Dica: não coloque 'Content-type: 'mulpipart/form-data' aqui nos headers
                    //o fetch cuida de gerar os 'oundaries' corretamente se voce não forçar manualmente.

                    headers : {
                        //'Authorization' : 'Bearer 'SEU_TOKEN_USUARIO' --- Para usuários autenticados
                    },
                    body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Upload concluído no servidor:", data);
                Alert.alert('Sucesso', 'Sua foto de perfil foi atualizada! - (BackEnd');
            }
            else {
                Alert.alert('ERRO,', 'nao foi possivel salvar a imagem no servidor');
            }
        }

        } catch (error) {
         console.error('Erro no upload: ', error);
         Alert.alert('Erro', 'Falha na conexão com o servidor.');
        } finally {
            setUploading(false); //Esconde o loading, independentemente de dar erro ou sucesso
        }
    };

    return (
        <View style={styles.container}>
            {capturedImage ? (
                //tela de preview da foto
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: capturedImage }}
                        style={styles.preview}
                        resizeMode="cover" //garante que a imagem preencha  o espaço total do smartphone
                    />
                    <View style={styles.previewButtons}>
                        {isUploading ? (
                           <ActivityIndicator size='large' color= '#00ff00' />
                        ) : (
                            <>
                            <Button title="Usar como foto de perfil" onPress={uploadImage} color='#28a745' />
                            <View style={{marginTop:10}}>
                            <Button title="Tirar outra foto" onPress={() => setCapturedImage(null)} color='#dc3545' />
                            </View>
                            </>
                        )}                           
                </View>
                </View>
            ) : (
                //tela da camera
                <View style={styles.cameraContainer}>
                    <CameraView style={styles.camera} facing="front" ref={cameraRef} />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePicture}>
                            <Text style={styles.textBtn}>Tirar Foto</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',

    },
    textLight: {
        color: "#fff",
        textAlign: 'center',
    },
    textPermissao: {},

    cameraContainer: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        elevation: 5,
    },
    textBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    preview: {
        //definindo tamanhos fixos baseado na tela do celular
        width: width * 0.85,
        height: height * 0.70,
        borderRadius: 12,
    },
    previewButtons: {
        marginTop: 20,
        width: '80%',
    },
});