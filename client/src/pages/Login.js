import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, FormHelperText } from '@material-ui/core';
import UserIcon from '@material-ui/icons/AccountCircle';

import InputPassword from '../atoms/InputPassword';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const useStyles = makeStyles(theme => ({
    card: {
        width: '90%',
        maxWidth: '500px',
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
    },
}));

function Login() {

    const classes = useStyles();

    const [ user, setUser ] = useState({});
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ emailErr, setEmailErr ] = useState(false);
    const [ passwordErr, setPasswordErr ] = useState(false);

    function handleChange(key, value) {
        setUser(prevState=> ({
            ...prevState,
            [key] : value
        }))
    }

    function handleSubmit() {
        fetch(`http://localhost:3800/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then( async (res) => {
                
                const msg = await res.text();
                console.log(msg);
                
                if(msg.toLowerCase().includes('email')) {
                    setEmailErr(true);
                    setPasswordErr(false);
                    setErrorMsg(msg);

                } else if (msg.toLowerCase().includes('password')) {
                    setEmailErr(false);
                    setPasswordErr(true);
                    setErrorMsg(msg);

                } else {
                    setErrorMsg('');
                    localStorage.setItem('token', msg);
                    window.location.pathname = '/';

                }
                
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
    }

    return <Card className={classes.card}>
        <CardContent>
            <Grid 
                container 
                spacing={3}
                direction="column"
                >
                <Grid item xs={12} align='center'>
                    <UserIcon  style={{ fontSize: 60 }} />
                </Grid>
                <Grid item xs={12}>
                    <Input style='outlined' type='email' text='Email' value='email' handleChange={handleChange} error={emailErr} errorMsg={errorMsg} />
                </Grid>
                <Grid item xs={12}>
                    <InputPassword type='outlined' text='Password' fullWidth={true} handleChange={handleChange} error={passwordErr}/>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button value='Sign In' handleSubmit={handleSubmit} />
                </Grid>
                <Grid item xs={12} >
                    <FormHelperText >New ? &nbsp;
                        <Link to={'/register'}>
                            Sign up
                        </Link>
                    </FormHelperText>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    
}

export default Login;