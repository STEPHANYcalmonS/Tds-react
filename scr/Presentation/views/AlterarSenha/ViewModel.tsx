import { useState } from "react";

const AlterarSenhaViewModel = () => {

    const [values, setValues] = useState({
        token: '',
        usuario: '',
        novaSenha: '',
        confirmarSenha: '',
    });

    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        });
    };

    const alterarSenha = () => {
        console.log(JSON.stringify(values));
    };

    return {
        ...values,
        onChange,
        alterarSenha,
    };
};

export default AlterarSenhaViewModel;