import React, { useState, useEffect } from 'react';
import FridgeRow from './FridgeRow';

function FridgesList(props) {

    const { token } = props;

    const [ fridges, setFridges ] = useState([]);
    const [ addFridge, setAddFridge ] = useState(false);
    const [ fridgeName, setFridgeName ] = useState({name: ''});

    const input = React.createRef();

    useEffect(() => {
        if(input.current) {
            input.current.focus()
        }
    }, [addFridge])

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

    return <div>
        {fridges.length > 0 &&
            <div>
            {fridges.map((data, i) => (
                <FridgeRow key={data._id} fridge={data} onDelete={fridgeDeleted} token={token}/>
            ))}    
            </div>}
        {addFridge ? 
        <>
            <input 
                ref={input}
                type="text" 
                placeholder="Fridge Name"
                onChange={e => handleChange(e.target.value)} 
                // onBlur={() => setAddFridge(false)}
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