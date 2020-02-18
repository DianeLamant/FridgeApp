import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, TextField, FormHelperText } from '@material-ui/core';
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

function App(props) {

    const classes = useStyles();

    const [ user, setUser ] = useState({});
    const [ password, setPassword ] = useState('');
    const [ samePassword, setSamePassword ] = useState(true);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ nameErr, setNameErr ] = useState(false);
    const [ emailErr, setEmailErr ] = useState(false);
    const [ passwordErr, setPasswordErr ] = useState(false);

    function handleChange(key, value) {
        setUser(prevState=> ({
            ...prevState,
            [key] : value
        }))
    }

    function handleSubmit() {
        fetch(`http://localhost:3800/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then( async (res) => {
                
                const msg = await res.text();
                
                setNameErr(false);
                setEmailErr(false);
                setPasswordErr(false);
                setErrorMsg(msg);

                if(msg.toLowerCase().includes('name')) {
                    setNameErr(true);
                } else if(msg.toLowerCase().includes('email')) {
                    setEmailErr(true);
                } else if (msg.toLowerCase().includes('password')) {
                    setPasswordErr(true);
                } else {
                    setErrorMsg('');
                    props.history.push('/login');
                }
                
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
    }

    function confirmPassword(text, confirmedPassword) {
        if(confirmedPassword === password) {
            setSamePassword(true);
            handleChange(text, confirmedPassword);
        } else {
            setSamePassword(false);
        }
    }

    return <Card className={classes.card}>
        <CardContent>
            <Grid 
                container 
                spacing={3}
                direction="column"
                >
                <Grid item xs={12} align='center'>
                    <UserIcon style={{ fontSize: 60 }} />
                </Grid>
                <Grid item xs={12}>
                    <Input style='outlined' type='text' text='Name' value='name' handleChange={handleChange} error={nameErr} errorMsg={errorMsg} />
                </Grid>
                <Grid item xs={12}>
                    <Input style='outlined' type='email' text='Email' value='email' handleChange={handleChange} error={emailErr} errorMsg={errorMsg} />
                </Grid>
                <Grid item xs={12}>
                    <InputPassword type='outlined' text='Password' fullWidth={true} handleChange={handleChange} error={passwordErr} />
                </Grid>
                <Grid item xs={12}>
                    <InputPassword type='outlined' text='Confirm Password' fullWidth={true} handleChange={confirmPassword} error={!samePassword} />
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button value='Sign up' handleSubmit={handleSubmit} />
                </Grid>
                <FormHelperText>Already have an account ? &nbsp;
                    <Link to={'/login'}>
                        Sign in
                    </Link>
                </FormHelperText>
            </Grid>
        </CardContent>
    </Card>

}

export default App;