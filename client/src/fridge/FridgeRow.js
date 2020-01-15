import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FridgeRow(props) {

    const { fridge } = props;

    const [ fridgeName, setFridgeName ] = useState(fridge.name);
    const [ editFridge, setEditFridge ] = useState(false);
    const input = React.createRef()

    useEffect(() => {
        if(input.current) {
            input.current.focus()
        }
    }, [editFridge])


    function handleChange(value) {
        setFridgeName(value);
    }

    function Update() {
        fetch(`http://localhost:3800/api/fridge/${fridge._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: fridgeName})
        })
            .then((res) => res.json())
            .then(function(fridge) {
                // console.log(fridge);
            })
        setEditFridge(false);
    }

    function Delete() {
        fetch(`http://localhost:3800/api/fridge/${fridge._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(function(fridge) {
                // console.log(fridge);
            })
    }

    return <Link to={
        {
            pathname: `/fridge/${fridgeName}`,
            fridge: fridge
        }
    } >
      {editFridge ?
        <input 
            ref={input}
            type="text" 
            placeholder="Fridge Name"
            value={fridgeName}
            onChange={e => handleChange(e.target.value)} 
            onBlur={Update}
        />
        : 
        <div><p>{fridgeName}</p></div>
        }
        <div onClick={() => setEditFridge(true)}><p>Edit</p></div>
        <div onClick={Delete}><p>Delete</p></div>
        <br></br>

    </Link> 
}

export default FridgeRow;