import React, { useState, useContext } from 'react';
import { GlobalState } from '../store';

import { ListItem, ListItemIcon, ListItemText, TextField, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import ValidateIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Close';

import InputPassword from '../atoms/InputPassword';

function UserPassword(props) {

    const { state: { token } } = useContext(GlobalState);

    const [ update, setUpdate ] = useState(false);
    const [ isUser, setIsUser ] = useState(false);
    const [ password, setPassword ] = useState({password: ''});
    const [ samePassword, setSamePassword ] = useState(false);

    function handleChange(key, value) {
        setPassword({[key]: value})
    }

    function checkPassword() {
        fetch(`http://localhost:3800/api/user/checkpassword`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(password)
        })
            .then((res) => res.json())
            .then(function() {
                setIsUser(true);
                setPassword({password: ''});                
            })
    }

    function confirmPassword(value) {
        if(password.password === value) {
            setSamePassword(true);
        } else {
            setSamePassword(false);
        }
    }

    function updatePassword() {
        fetch(`http://localhost:3800/api/user/password`, {
            method: 'PATCH',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(password)
        })
            .then((res) => res.json())
            .then(function() {
                cancel();
            })
    }

    function cancel() {
        setUpdate(false);
        setPassword('');
        setIsUser(false);
    }


    return !isUser ? <ListItem >
        <ListItemIcon>
            <LockIcon />
        </ListItemIcon>
            
            {update ? 
           <>
           <InputPassword type='standard' text='To change your password, enter your actual password' fullWidth={false} handleChange={handleChange} />
            {/* <TextField 
                fullWidth
                autoFocus={true}
                id="standard-basic" 
                label='To change your password, enter your actual password' 
                type='password'
                onChange={e => handleChange(e.target.value)} 
            /> */}
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={checkPassword}>
                    <ValidateIcon  color='primary'/>
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={cancel}>
                    <CancelIcon color='error'/>
                </IconButton>
            </ListItemSecondaryAction>
            </>
        : 
        
            <ListItemText
                primary='Password'
                onClick={() => setUpdate(true)}
            />
        }
        </ListItem> 
        :
        <>
        <ListItem>
            <ListItemIcon>
                <LockIcon />
            </ListItemIcon>
            <InputPassword type='standard' text='Enter your new password' fullWidth={false} handleChange={handleChange} />
            {/* <TextField 
                fullWidth
                autoFocus={true}
                id="standard-basic" 
                label='Enter your new password' 
                type='password'
                value={password.password}
                onChange={e => handleChange(e.target.value)}  */}
            {/* /> */}
        </ListItem>
        <ListItem>
            <ListItemIcon>
            </ListItemIcon>
            <InputPassword type='standard' text='Confirm your new password' fullWidth={false} handleChange={handleChange} />
            {/* <TextField 
                fullWidth
                id="standard-basic" 
                label='Confirm your new password' 
                type='password'
                onChange={e => confirmPassword(e.target.value)} 
            /> */}
            <ListItemSecondaryAction>
                <IconButton 
                    disabled={!samePassword}
                    edge="end" 
                    aria-label="edit" 
                    onClick={updatePassword}
                    >
                    <ValidateIcon  color={samePassword ? 'primary' : 'disabled'}/>
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={cancel}>
                    <CancelIcon color='error'/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        </>

}

export default UserPassword;       
