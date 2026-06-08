import React, { useState } from "react";

const HomeViewModel = () => {
    const [values, setValues] = useState({
        userEmail: '',
        userPassword: '',
    });
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }
    const login = () => {
        console.log(JSON.stringify(values));
    }
    return {
        ...values,
        onChange,
        login,
    }
}

export default HomeViewModel;