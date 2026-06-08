import React, { useState } from "react";

const RegiserViewModel = () => {
    const [values, setValues] = useState({
        userEmail: '',
        userPassword: '',
        userName: '',
        userPhone: '',
        userConfirmPassword: '',
    });
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }
    const cadastro = () => {
        console.log(JSON.stringify(values));
    }
    return {
        ...values,
        onChange,
        cadastro,
    }
}

export default RegiserViewModel;