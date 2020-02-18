import React, { useState, useContext, useEffect } from 'react';
import { GlobalState } from '../store';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Input from '../atoms/Input';
import Button from '../atoms/Button';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

function FormFood(props) {

    const { state: { token, fridge } } = useContext(GlobalState);
    const classes = useStyles(); 

    const { dates } = props;
 
    const types = ['Fruits/Légumes', 'Produits laitiers', 'Viandes/Poissons', 'Epicerie' ,'Conserves', 'Boisson']
    const [ food, setFood ] = useState({type: types[0], fridgeId: fridge._id});
    
    useEffect(() => {
        for(let date of dates) {
            setFood(prevState=> ({
                ...prevState,
                [date]: Date.now()
            }))
        }
    }, [])

    function handleChange(key, value) {
        setFood(prevState=> ({
            ...prevState,
            [key] : value
        }))
    }

    function addFood() {
        fetch('http://localhost:3800/api/food/', {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food)
        })
            .then((res) => res.json())
            .then(function(data) {
                if(data.message) {
                    alert(data.message)
                } else {
                    // setFoods(prevState=> ({
                    //     ...prevState,
                    //     food
                    // }))
                    window.location.pathname = `/fridge/${fridge.name}`;
                }            
            })
    }
    
    return <Card>
        <CardContent>
            <Grid 
                container 
                spacing={3}
                direction="column"
                >
                <Grid item xs={12}>
                    <Input style='standard' type='text' text='Name' value='name' handleChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        onChange={e => handleChange('type', e.target.value)}
                        >
                        {types.map((data, i) => (
                            <MenuItem key={i} value={data}>{data}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                {dates.map((data, i) => (
                    <Grid key={i} item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    fullWidth
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={food[data.date]}
                                    label={data.name}
                                    onChange={e => handleChange(data.date, e)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>

                        </MuiPickersUtilsProvider>
                    </Grid>
                ))}
                <Grid item xs={12} align='center'>
                    <Button value='Add' handleSubmit={addFood} />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    
}

export default FormFood;