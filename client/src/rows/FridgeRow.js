import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalState } from '../store';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import ValidateIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import RowButtons from '../molecules/RowButtons';

const useStyles = makeStyles(theme => ({
    
    validateIcon: {
      color: '#33cc44',
    },
  }));

function FridgeRow(props) {

    const classes = makeStyles(useStyles)();
    const { dispatch, state: { token } } = useContext(GlobalState);
    
    const { onDelete } = props;
    
    const [ fridge, setFridge ] = useState(props.fridge);
    const [ editFridge, setEditFridge ] = useState(false);
    
    function handleChange(value) {
        setFridge(prevState => ({
            ...prevState,
            name : value
        }));
    }

    function Update() {
        fetch(`http://localhost:3800/api/fridge/${fridge._id}`, {
            method: 'PATCH',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: fridge.name})
        })
            .then(() => {
                // setFridge(fridge);
                
            })
        setEditFridge(false);
    }

    function Delete() {
        fetch(`http://localhost:3800/api/fridge/${fridge._id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                onDelete(fridge._id);
            })
    }

    return <>
    
    {editFridge ?
    <ListItem>
        <TextField 
            autoFocus={true}
            id="standard-basic" 
            label={fridge.name} 
            onChange={e => handleChange(e.target.value)} 
        />
        <RowButtons icons={[
            {
                action: Update, 
                icon: <ValidateIcon  color='primary'/>
            }, {
                action: (() => setEditFridge(false)), 
                icon: <CloseIcon color='error'/>
            }]} />
        {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={Update}>
                    <ValidateIcon  color='primary'/>
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={Delete}>
                    <DeleteIcon color='error'/>
                </IconButton>
        </ListItemSecondaryAction> */}
    </ListItem>
    :
    <ListItem 
        button
        component={NavLink} to={{
            pathname: `fridge/${fridge.name}`,
        }}
        onClick={() => dispatch({
            type: 'setFridge',
            payload: { fridge: fridge},
          })}
        >
        <ListItemText
        primary={fridge.name}
        />
        
        {/* <RowButtons icons={[
            { 
                action: (() => setEditFridge(true)), 
                icon: <EditIcon className={classes.validateIcon} color='primary'/>
            }, {
                action: Delete, 
                icon: <DeleteIcon color='error'/>
            }]} 
        /> */}

        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => setEditFridge(true)}>
                <EditIcon className={classes.validateIcon} color='primary'/>
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={Delete}>
                <DeleteIcon color='error'/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
    
    }
    </>
    
}

export default FridgeRow;