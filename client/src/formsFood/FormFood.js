import React, { useState, useContext } from 'react';
import { GlobalState } from '../store';

import { Typography } from '@material-ui/core';

import Header from '../molecules/Header';
import Card from '../molecules/FormCard';
import SecondForm from './SecondForm';

function FormFood(props) {

    const { state: { fridge } } = useContext(GlobalState);
    
    const [ isFirstForm, setIsFirstForm ] = useState(true);
    const [ dates, setDates ] = useState([])

    function handleClick(dates) {
        setDates(dates);
        setIsFirstForm(false);
    }

    
    return <>
    <Header title={fridge.name} goBack={`/fridge/${fridge.name}`} path={`${fridge.name}/users`}/>
        {isFirstForm ?
        <>
            <Typography variant="h6" gutterBottom>
                Do you want to add :
            </Typography>

            <Card text='Food with expiry date' handleClick={() => handleClick([{date: 'expiryDate', name: 'Expiry Date'}])} />
            <Card text='Food you just opened' handleClick={() => handleClick([{date: 'expiryDate', name: 'Expiry Date'}, {date: 'openingDate', name: 'Opening Date'}])} />
            <Card text='Food with no expiry date (fruits, vegetables)' handleClick={() => handleClick([{date: 'purchaseDate', name: 'Purchase Date'}])} />
        </>
        :  
        <SecondForm dates={dates} />
        }
        </>
}

export default FormFood;