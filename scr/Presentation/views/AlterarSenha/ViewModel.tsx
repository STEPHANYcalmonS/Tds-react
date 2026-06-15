import { useState } from "react";

const AlterarSenhaViewModel = () => {

    
    // Estado que armazena os valores dos campos do formulário

    const [values, setValues] = useState({
        token: '',
        usuario: '',
        novaSenha: '',
        confirmarSenha: '',
    });

    // Função para atualizar qualquer campo do formulário

    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        });
    };

    // Função chamada ao clicar no botão "Alterar Senha"

    const alterarSenha = () => {
        console.log(JSON.stringify(values));
    };

    // Retorna os dados e funções para serem usados na View

    return {
        ...values,
        onChange,
        alterarSenha,
    };
};

// Os inputs utilizam uma função genérica de update (onChange) para controlar o estado.
//Quando o usuário pressiona o botão, os dados são enviados para a função alterarSenha, que centraliza a ação principal da tela.

export default AlterarSenhaViewModel;