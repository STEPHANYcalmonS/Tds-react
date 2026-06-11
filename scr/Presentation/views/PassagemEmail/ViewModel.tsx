import { useState } from "react";

const RecuperarSenhaViewModel = () => {

    const [values, setValues] = useState({
        email: '',
    });

    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        });
    };

    const enviarEmail = () => {
        console.log(JSON.stringify(values));
    };

    return {
        ...values,
        onChange,
        enviarEmail,
    };
};

export default RecuperarSenhaViewModel;