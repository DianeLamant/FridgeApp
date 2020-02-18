import React, { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../store';

import { Grid, ListItem, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton, Typography, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ValidateIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import InputCalendar from '../atoms/InputCalendar';

function FoodRow(props) {

    const { state : { token, fridge }} = useContext(GlobalState);
  
    const { onDelete, filter } = props;
    
    const [ food, setFood ] = useState(props.food);
    const foodDate = new Date(food[filter]).toLocaleDateString('en-GB');
    const [ oldFood, setOldFood ] = useState(false);
    const [ editFood, setEditFood ] = useState(false);
   
    useEffect(() => {
        let alertDate = new Date();
       
        if(filter == 'expiryDate') {
            alertDate.setDate(alertDate.getDate() + 7);

            if(food[filter] < alertDate.toISOString()) {                
                setOldFood(true);
            }
        } else {
            alertDate.setDate(alertDate.getDate() - 7);
            
            if(food[filter] < alertDate.toISOString()) {
                setOldFood(true);
            }
        }
    }, [food])

    function handleChange(key, value) {
        setFood(prevState=> ({
            ...prevState,
            [key] : value
        }))
    }

    function Update() {
        fetch(`http://localhost:3800/api/food/${food._id}`, {
            method: 'PATCH',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food)
        })
            .then(() => {
                // setFood(food);
                
            })
        setEditFood(false);
    }

    function Delete() {
        fetch(`http://localhost:3800/api/food/${food._id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fridgeId: fridge._id})
        })
            .then(() => {
                onDelete(food._id);
            })
    }


    return <ListItem style={{
        backgroundColor: oldFood ? '#fdecea' : '#fff'
    }}>
        <ListItemIcon>
            <Checkbox
                edge="start"
                onChange={Delete}
                tabIndex={-1}
                disableRipple
            />
        </ListItemIcon>
        <Grid
            container
            direction="row"
            // justify="center"
            alignItems="center"
            style={{
                color: oldFood ? '#611a15' : 'black'
            }}
            >
            {editFood ? 
            <>
            {filter === 'expiryDate' &&
            <>
            <Grid item xs={12} >
                <TextField 
                    fullWidth
                    autoFocus={true}
                    id="standard-basic" 
                    label={food.name} 
                    onChange={e => handleChange(e.target.value)} 
                />
            </Grid>
            <Grid item xs={12} >
                <InputCalendar text={'expiryDate'} value={food['expiryDate']} handleChange={handleChange} />
            </Grid>
            <Grid item xs={12} >
                <InputCalendar text={'openingDate'} value={food['openingDate']} handleChange={handleChange} />
            </Grid>
            </>
            }
            {filter !== 'expiryDate'&&
            <>
            <Grid item xs={12} >
                <TextField 
                    fullWidth
                    autoFocus={true}
                    id="standard-basic" 
                    label={food.name} 
                    onChange={e => handleChange(e.target.value)} 
                />
            </Grid>
            <Grid item xs={12} >
                <InputCalendar text={filter} value={food[filter]} handleChange={handleChange} />
            </Grid>
            </>
            }
            </>
            : 
            <>
            <Grid item xs={6} >
                <Typography>{food.name}</Typography>
            </Grid>
            <Grid item xs={4} >
                <Typography>{foodDate}</Typography>
            </Grid>
            </>
            }

        </Grid>
        {editFood ?
        <Grid item xs={12} >
            <ListItemSecondaryAction>
                <IconButton 
                    edge="end" 
                    aria-label="edit"
                    onClick={() => Update}
                    >
                    <ValidateIcon />
                </IconButton>
                <IconButton 
                    edge="end" 
                    aria-label="edit"
                    onClick={() => setEditFood(false)}
                    >
                    <CloseIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </Grid>
        :
        <ListItemSecondaryAction>
            <IconButton 
                edge="end" 
                aria-label="edit"
                onClick={() => setEditFood(true)}
                >
            <EditIcon />
            </IconButton>
        </ListItemSecondaryAction>
        }
    </ListItem>
    
    // <div className="item">
    //     <div className="ui horizontal list">
    //         <div className="item">
    //             <div className="ui checkbox">
    //                 <input 
    //                     type="checkbox"
    //                     onChange={Delete}    
    //                 />
    //                 <label></label>
    //             </div>
    //         </div>
    //         {editFood ?
    //         <input 
    //             className='item'
    //             type="text" 
    //             placeholder="Food Name"
    //             value={food.name}
    //             onChange={e => handleChange('name', e.target.value)} 
    //             onBlur={Update}
    //         />
    //         : 
    //         <p className='item'>{food.name}</p>
    //         }
    //         <p className='item'>{(new Date (food[filter])).toLocaleDateString()}</p>
    //         <div className='item' onClick={() => setEditFood(true)}><p>Edit</p></div>
    //     </div>
    // </div> 
}

export default FoodRow;