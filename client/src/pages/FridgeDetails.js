import React, { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../store';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, List, Button } from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import AddIcon from '@material-ui/icons/Add';

import Header from '../molecules/Header';
import FoodRow from '../rows/FoodRow';

const useStyles = makeStyles(theme => ({
    minWidth: {
      minWidth: 330,
    },
}));

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function FridgeDetails(props) {

    const classes = useStyles(); 
    const { dispatch, state: { token, fridge, filterValue, foods } } = useContext(GlobalState);
    
    const filters = ['expiryDate', 'openingDate', 'purchaseDate'];

    function compare(a, b) {
        const bandA = a[filters[filterValue]].toUpperCase();
        const bandB = b[filters[filterValue]].toUpperCase();
      
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
    }
    
    useEffect(() => {
        fetch(`http://localhost:3800/api/food/${filters[filterValue]}/${fridge._id}`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((foods) => {
            dispatch({
                type: 'setFoods',
                payload: { foods: foods.sort(compare)},
              }); 
            // setFoods(foods.sort(compare));
        })
    }, [filterValue])

    const handleChange = (event, newValue) => {
        dispatch({
            type: 'setFilterValue',
            payload: { filterValue: newValue},
          }); 
    };

    const foodDeleted = foodId => {
        dispatch({
            type: 'setFoods',
            payload: { foods: [...foods].filter(food => food._id !== foodId)},
          }); 
        // setFoods([...foods].filter(food => food._id !== foodId));
    }

    return <>
        <Header title={fridge.name} goBack={'/'} icon={<PeopleAltOutlinedIcon style={{ fontSize: 32 }}/>} path={`${fridge.name}/users`}/>
        <AppBar className={classes.minWidth} position="static" color="default">
            <Tabs 
                value={filterValue} 
                onChange={handleChange} 
                aria-label="full width tabs example"
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                >
                <Tab label="Expiry Date" {...a11yProps(0)} />
                <Tab label="Opening Date" {...a11yProps(1)} />
                <Tab label="Purchase Date" {...a11yProps(2)} />
            </Tabs>
        </AppBar>            

        {foods.length > 0 &&
        <List className={classes.minWidth} dense={false}> 
            {foods.map(data => (
                <FoodRow key={data._id+data[filters[filterValue]]} food={data} onDelete={foodDeleted} filter={filters[filterValue]}/>
            ))}
        </List>
        }

        <Button
            color="default"
            startIcon={<AddIcon />}
            component={Link} to={{
                pathname: fridge.name + '/addFood',
            }}
        >
            Add food
        </Button>

    </> 
}

export default FridgeDetails;