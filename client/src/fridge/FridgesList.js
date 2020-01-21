import React, { useState, useEffect } from 'react';
import FridgeRow from './FridgeRow';

function FridgesList(props) {

    const token = props.location.state.token;
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
                console.log('les fridges:', data);
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
                // props.history.push(`/fridge/${fridge.name}`, {fridge: fridge});
            })
    }

    function handleChange(value) {
        setFridgeName({name: value})
    }

    const fridgeDeleted = fridgeId => {
        console.log(`I delete: ${fridgeId}`);
        setFridges([...fridges].filter(fridge => fridge._id !== fridgeId));
    
        console.log([...fridges].filter(fridge => fridge._id !== fridgeId));
        console.log(fridges);
    }

    return <div>
        <p>HOLA </p>
        {fridges.length > 0 &&
            <div>
            {fridges.map((data, i) => (
                <FridgeRow key={data._id} fridge={data} onDelete={fridgeDeleted} token={token}/>
            ))}    
            </div>}
        {addFridge ? 
        <>
            <input 
                type="text" 
                placeholder="Fridge Name"
                onChange={e => handleChange(e.target.value)} 
            />
            <button 
                className="ui inverted green button"
                onClick={handleSubmit}    
            >Validate</button>
        </>
        :
        <button 
            className="ui inverted green button"
            onClick={() => setAddFridge(true)}    
        >Add Fridge</button>
        }


    </div> 
}

export default FridgesList;