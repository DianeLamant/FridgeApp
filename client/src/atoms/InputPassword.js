import React, { useState } from 'react';

import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function InputPassword(props) {

    const { type, text, fullWidth, handleChange, error } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };

    return <FormControl fullWidth={fullWidth} variant={type}>
        <InputLabel htmlFor={type + "-adornment-password"}>{text}</InputLabel>
        <Input
            error={error}
            fullWidth={fullWidth}
            id={type + "-adornment-password"}
            type={showPassword ? 'text' : 'password'}
            onChange={e => handleChange('password', e.target.value)}
            required={true}
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
            }
        />
    </FormControl>
    
}

export default InputPassword;