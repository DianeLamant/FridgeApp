import React, { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../store';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, TextField, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import UserIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ValidateIcon from '@material-ui/icons/Check';

import Header from '../molecules/Header';

const useStyles = makeStyles(theme => ({
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
}));

function FridgeUsers(props) {

    const classes = useStyles();
    const { state: {token, fridge} } = useContext(GlobalState);

    const [ errorMsg, setErrorMsg ] = useState('');
    const [ users, setUsers ] = useState([]);
    const [ addUser, setAddUser ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ successMsg, setSuccessMsg ] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3800/api/fridge/${fridge._id}`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(function(users) {
                setUsers(users);
            })
    }, [])

    function handleSubmit() {
        fetch('http://localhost:3800/api/fridge/addUser', {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userEmail: email, fridgeId: fridge._id})
        })
            .then( async (res) => {
                const msg = await res.text();
                
                setErrorMsg('');
                // If email has been send
                if (res.status === 202) {
                    setAddUser(false);
                    setSuccessMsg(msg);
                // If user has been added
                } else if (res.status === 201) {
                    setAddUser(false);
                    setUsers(prevState => {
                        return [...prevState, JSON.parse(msg)];
                    })
                // If error
                } else {
                    setErrorMsg(msg);
                }
                
            })
    }

    function handleChange(value) {
        setEmail(value);
    }

    return <>
        <Header title={fridge.name} goBack={'/'} icon={<PeopleAltIcon style={{ fontSize: 30 }}/>} path={`/fridge/${fridge.name}`}/>
        
        <Grid item xs={12} md={6}>
        {users.length > 0 ?
            <> 
            <Typography variant="h6" className={classes.title}>
            You share your fridge with :
            </Typography>
            <div className={classes.demo}>
            <List>
                {users.map((data, i) => (
                    <ListItem key={i}>
                        <ListItemIcon>
                            <UserIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary={data.name}
                        />
                    </ListItem>
                ))}
            </List>
            </div>
        </>
        :
        <Typography variant="h6" className={classes.title}>
            You don't share your fridge with anyone.
        </Typography>
        }
        </Grid>

        {addUser ?
        <Grid item xs={12} md={6}>
            <List>
                <ListItem>
                    <TextField 
                        error={errorMsg.length > 0}
                        autoFocus={true}
                        id="standard-basic" 
                        label="Email" 
                        onChange={e => handleChange(e.target.value)} 
                        helperText={errorMsg}
                    />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={handleSubmit}>
                        <ValidateIcon  color='primary'/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => setAddUser(false)}>
                        <CloseIcon color='error'/>
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Grid>
        :
        <Button
            color="default"
            className={classes.button}
            onClick={() => setAddUser(true)}
            startIcon={<AddIcon />}
        >
            Add user
        </Button>
        
        }
        {successMsg.length >0 &&
        <Alert severity="info">{successMsg}</Alert>
        }
    </>
}

export default FridgeUsers;