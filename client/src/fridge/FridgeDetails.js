import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodRow from '../food/FoodRow';

const styleSheet = {
    header: {
      width: '100%',
      height: '20%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
        margin: '0 0 0 20px',
        width: '80%',
        height: '100%',
        fontSize: '2em',
    },
    icon: {
        width: '20%',
        height: '100%',
    },
    img: {
        width: '50%',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)'
    }
};

function FridgeDetails(props) {

    const { fridge, token } = props.location.state;
    
    const [ foods, setFoods ] = useState([]);
    const [ filter, setFilter ] = useState('expiryDate')
    
    useEffect(() => {
        fetch(`http://localhost:3800/api/food/${filter}/${fridge._id}`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((foods) => {
            setFoods(foods);
        })
    }, [filter])

    const foodDeleted = foodId => {
        setFoods([...foods].filter(food => food._id !== foodId));
    }
    

    return <div>
        <div style={styleSheet.header}>
            <div 
                className="ui icon"
                onClick={() => props.history.push('/home', {token: token})}    
            ><i className="left arrow icon"></i></div>
            <h1 style={styleSheet.title}>{fridge.name}</h1>
            <div 
                style={styleSheet.icon}
                onClick={() => props.history.push('/fridge-users', {token: token, fridge: fridge})}
            >
                <img style={styleSheet.img} src='../svg/group-linear.svg'></img>
            </div>
        </div>
        <div className="ui horizontal list">
            <div className="item" onClick={() => setFilter('expiryDate')}><p>Expiry Date</p></div>
            <div className="item" onClick={() => setFilter('openingDate')}><p>Opening Date</p></div>
            <div className="item" onClick={() => setFilter('purchaseDate')}><p>Purchase Date</p></div>
        </div>
        {foods.length > 0 && 
        <div className="ui list">

            {foods.map(data => (
                <FoodRow key={data._id} token={token} fridgeId={fridge._id} food={data} onDelete={foodDeleted} filter={filter}/>
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