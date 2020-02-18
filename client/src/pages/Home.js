import React, { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../store';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List, ListItem, TextField, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ValidateIcon from '@material-ui/icons/Check';

import Header from '../molecules/Header';
import FridgeRow from '../rows/FridgeRow';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    button: {
        margin: theme.spacing(1),
        color: '#757575',
        textTransform: 'capitalize'
    },
  }));

function Home(props) {

    const classes = useStyles();

    const { state: { token } } = useContext(GlobalState);

    const [ fridges, setFridges ] = useState([]);
    const [ addFridge, setAddFridge ] = useState(false);
    const [ fridgeName, setFridgeName ] = useState({name: ''});

    useEffect(() => {
        fetch('http://localhost:3800/api/fridge/', {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(function(data) {
                setFridges(data);
            })
    }, [])

    function handleSubmit() {
        fetch('http://localhost:3800/api/fridge/', {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fridgeName)
        })
            .then((res) => res.json())
            .then(function(fridge) {
                setAddFridge(false);
                setFridges(prevState => {
                    return [...prevState, fridge];
                })
                // props.history.push(`/fridge/${fridge.name}`, {token: token, fridge: fridge});
            })
    }

    function handleChange(value) {
        setFridgeName({name: value})
    }

    const fridgeDeleted = fridgeId => {
        setFridges([...fridges].filter(fridge => fridge._id !== fridgeId));
    }

    return <>
        <Header title='Fridge App' goBack={false} icon={<PersonOutlineIcon style={{ fontSize: 32 }}/>} path={'/profile'}/>
        <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
            My list :
            </Typography>

        {fridges.length > 0 &&
            // <div className={classes.demo}>
            <List dense={false}>
            {fridges.map((data, i) => (
                <FridgeRow key={data._id} fridge={data} onDelete={fridgeDeleted} />
            ))}    
                
            {addFridge ? 
            <>
                <ListItem>
                    <TextField 
                        autoFocus={true}
                        id="standard-basic" 
                        label="Name" 
                        onChange={e => handleChange(e.target.value)} 
                    />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={handleSubmit}>
                        <ValidateIcon  color='primary'/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => setAddFridge(false)}>
                        <CloseIcon color='error'/>
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                
            </>
            :
            <Button
                color="default"
                className={classes.button}
                onClick={() => setAddFridge(true)}
                startIcon={<AddIcon />}
            >
                Add fridge
            </Button>
          
            }
            </List>
            // </div>
        }
        </Grid>



    </> 
}

export default Home;