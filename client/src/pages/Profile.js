import React, { useState, useContext } from 'react';
import { GlobalState } from '../store';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List, ListItem, TextField, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core';
import UserIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import ExitIcon from '@material-ui/icons/ExitToApp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Close';

import Header from '../molecules/Header';
import InputPassword from '../atoms/InputPassword';
import UserInfo from '../molecules/UserInfo';
import UserPassword from '../molecules/UserPassword';

const useStyles = makeStyles(theme => ({
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

function Profile(props) {

    const classes = useStyles();
    const { dispatch, state: { token, user } } = useContext(GlobalState);

    const [ password, setPassword ] = useState({});
    const [ askPassword, setAskPassword ] = useState(false);
    
    function changeInfos(key, value) {
        dispatch({
            type: 'setUser',
            payload: { user: {...user, [key]: value }},
          });
    }

    function handleChange(key, value) {
        setPassword({[key]: value});
    }

    function SignOut() {
        localStorage.removeItem('token');
        window.location.pathname = '/login';
    }

    function deleteAccount() {
        fetch(`http://localhost:3800/api/user/`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(password)
        })
            .then(() => {
                SignOut();
            })
    }
    
    return <>
    <Header title='Fridge App' goBack={false} icon={<UserIcon style={{ fontSize: 32 }}/>} path={'/'}/>
    <Grid 
        container 
        spacing={3}
        direction="column"
        >
        <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
            My account
            </Typography>
            <div className={classes.demo}>
            <List>
                <UserInfo userKey='name' userInfo={user.name} type='text' icon={<UserIcon />} onChange={changeInfos} /> 
                <UserInfo userKey='email' userInfo={user.email} type='email' icon={<EmailIcon />} onChange={changeInfos} /> 
                <UserPassword />

            </List>
            </div>
        </Grid>
        <Grid item xs={12} md={6}>
            <Button
                color="secondary"
                className={classes.button}
                onClick={SignOut}
                endIcon={<ExitIcon></ExitIcon>}
            >
                Sign out
            </Button>
        </Grid>
        
        <Grid item xs={12} md={6}>
            {askPassword ?
            <>
            <Typography variant="subtitle1" className={classes.title}>
            Enter your password if you want to delete your account
            </Typography>
            <List>
                <ListItem>
                    <InputPassword type='standard' text='Password' fullWidth={false} handleChange={handleChange} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={deleteAccount}>
                        <DeleteForeverIcon  color='primary'/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => setAskPassword(false)}>
                        <DeleteIcon color='error'/>
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            </>
            :
            <Button
                size="small"
                color="default"
                className={classes.button}
                onClick={() => setAskPassword(true)}
                startIcon={<DeleteForeverIcon></DeleteForeverIcon>}
            >
                Delete your account
            </Button>
        
            }
        </Grid>
    </Grid>
    </>
}

export default Profile;