import React, { useState } from 'react';
import SecondForm from './SecondForm';

function FormFood(props) {

    const { fridge, foods, token } = props.history.location;
    
    const [ isFirstForm, setIsFirstForm ] = useState(true);
    const [ dates, setDates ] = useState([])

    function handleClick(dates) {
        setDates(dates);
        setIsFirstForm(false);
    }
    
    return <>
        {isFirstForm ?
        <div>
            <h2>Vous voulez ajouter :</h2>
            <ul>
                <li onClick={() => handleClick(['expiryDate'])}>Aliment avec date de péremption</li>
                <li onClick={() => handleClick(['expiryDate', 'openingDate'])}>Aliment que vous venez d'ouvrir</li>
                <li onClick={() => handleClick(['purchaseDate'])}>Aliment sans date de péremption</li>
            </ul>
        </div> 
        :  
        <SecondForm token={token} dates={dates} fridge={fridge} foods={foods} />
        }
        </>
}

export default FormFood;