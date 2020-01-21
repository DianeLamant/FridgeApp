import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodRow from '../food/FoodRow'

function FridgeDetails(props) {

    console.log(props);
    if(props.location.fridge === undefined) {
        var { fridge } = props.location.state;
    } else {
        var { fridge, token } = props.location;
    }
    
    const [ foods, setFoods ] = useState([]);
    const [ filter, setFilter ] = useState('expiryDate')
    
    useEffect(() => {
        fetch(`http://localhost:3800/api/food/${filter}/${fridge._id}`, {
            method: 'GET',
            headers: {
                // 'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((foods) => {
            setFoods(foods);
            console.log('foods', foods);
        })
        .then(() => {
            console.log(foods);
            
        })
    }, [filter])

    const foodDeleted = foodId => {
        console.log(`I delete: ${foodId}`);
        setFoods([...foods].filter(food => food._id !== foodId));
    
        console.log([...foods].filter(food => food._id !== foodId));
        console.log(foods);
    }
    

    return <div>
        <h1>{fridge.name}</h1>
        <div className="ui horizontal list">
            <div className="item" onClick={() => setFilter('expiryDate')}><p>Expiry Date</p></div>
            <div className="item" onClick={() => setFilter('openingDate')}><p>Opening Date</p></div>
            <div className="item" onClick={() => setFilter('purchaseDate')}><p>Purchase Date</p></div>
        </div>
        {foods.length > 0 && 
        <div className="ui list">

            {foods.map(data => (
                <FoodRow key={data._id} food={data} onDelete={foodDeleted} filter={filter}/>
            ))}
        </div>
        }
        <Link to={
            {
                pathname: '/addfood', 
                fridge: fridge,
                foods: foods,
                token: token
            }
        } 
        className="ui inverted green button"
        >Add Food</Link>
    </div> 
}

export default FridgeDetails;