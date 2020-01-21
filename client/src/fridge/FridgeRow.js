import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FridgeRow(props) {

    const { onDelete, token } = props;
    
    const [ fridge, setFridge ] = useState(props.fridge);
    const [ editFridge, setEditFridge ] = useState(false);
    const input = React.createRef();

    useEffect(() => {
        if(input.current) {
            input.current.focus()
        }
    }, [editFridge])


    function handleChange(value) {
        setFridge(prevState => ({
            ...prevState,
            name : value
        }));
    }

    function Update() {
        fetch(`http://localhost:3800/api/fridge/${fridge._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: fridge.name})
        })
            .then(() => {
                // setFridge(fridge);
                
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
            .then(() => {
                onDelete(fridge._id);
            })
    }

    return <div>
      {editFridge ?
        <input 
            ref={input}
            type="text" 
            placeholder="Fridge Name"
            value={fridge.name}
            onChange={e => handleChange(e.target.value)} 
            onBlur={Update}
        />
        : 
        <Link to={
            {
                pathname: `/fridge/${fridge._id}`, 
                fridge: fridge,
                token: token
            }
        }><p>{fridge.name}</p></Link>
        }
        <div onClick={() => setEditFridge(true)}><p>Edit</p></div>
        <div onClick={Delete}><p>Delete</p></div>
        <br></br>

        </div> 
}

export default FridgeRow;