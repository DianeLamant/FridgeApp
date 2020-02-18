import React, { useState, useContext } from 'react';
import { GlobalState } from '../store';

import { ListItem, ListItemIcon, ListItemText, TextField, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ValidateIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Close';

function UserInfo(props) {

    const { state: { token } } = useContext(GlobalState);

    const { userKey, userInfo, type, icon, onChange } = props;
    const [ update, setUpdate ] = useState(false);
    const [ newInfo, setNewInfo ] = useState(props.userInfo);
    
    function handleChange(value) {
        setNewInfo(value)
    }

    function handleSubmit() {
        fetch(`http://localhost:3800/api/user/${userKey}`, {
            method: 'PATCH',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({[userKey]: newInfo})
        })
            .then((res) => res.json())
            .then(function() {
                onChange(userKey, newInfo);
                setUpdate(false);
            })
    }
    

    return update ? 
        <ListItem>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <TextField 
                autoFocus={true}
                id="standard-basic" 
                label={userKey} 
                value={newInfo}
                type={type}
                onChange={e => handleChange(e.target.value)} 
            />
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={handleSubmit}>
                <ValidateIcon  color='primary'/>
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => setUpdate(false)}>
                <CancelIcon color='error'/>
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        : 
        <ListItem onClick={() => setUpdate(true)}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText
            primary={userInfo}
            />
        </ListItem>
    
}

export default UserInfo;