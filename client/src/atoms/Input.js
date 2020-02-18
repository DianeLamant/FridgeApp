import React from 'react';
import { TextField } from "@material-ui/core";

function Input(props) {

    const { style, type, text, value, handleChange, error, errorMsg } = props;

    return <TextField 
        fullWidth
        error={error}
        id={`${style}-basic`} 
        type={type}
        label={text} 
        variant={style} 
        onChange={e => handleChange(value, e.target.value)}
        helperText={error && errorMsg}
    />
}

export default Input;