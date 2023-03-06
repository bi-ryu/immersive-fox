import React, { useState } from 'react'

export const useCustomForm = (initialFormValues, validate=false) => {


    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validate) {
            validate({ [name]: value })
        } else {
            setErrors({ ...errors, [name]: "" })
        }
    }

    const resetForm = () => {
        setValues(initialFormValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


export const CustomForm = (props) => {
    const { children, ...other } = props;
    return (
        <form {...other}>
            {children}
        </form>
    )
}
