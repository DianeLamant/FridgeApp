import React, { useState, useEffect } from 'react';

function FoodRow(props) {
  
    const { onDelete, filter } = props;

    const [ food, setFood ] = useState(props.food);
    const [ editFood, setEditFood ] = useState(false);
    const input = React.createRef();

    useEffect(() => {
        if(input.current) {
            input.current.focus()
        }
    }, [editFood])
    
    function handleChange(key, value) {
        setFood(prevState=> ({
            ...prevState,
            [key] : value
        }))
    }

    function Update() {
        fetch(`http://localhost:3800/api/food/${food._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food)
        })
            .then(() => {
                // setFood(food);
                
            })
        setEditFood(false);
    }

    function Delete() {
        fetch(`http://localhost:3800/api/food/${food._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                onDelete(food._id);
            })
    }


    return <div className="item">
        <div className="ui horizontal list">
            <div className="item">
                <div className="ui checkbox">
                    <input 
                        type="checkbox"
                        onChange={Delete}    
                    />
                    <label></label>
                </div>
            </div>
            {editFood ?
            <input 
                className='item'
                ref={input}
                type="text" 
                placeholder="Food Name"
                value={food.name}
                onChange={e => handleChange('name', e.target.value)} 
                onBlur={Update}
            />
            : 
            <p className='item'>{food.name}</p>
            }
            <p className='item'>{(new Date (food[filter])).toLocaleDateString()}</p>
            <div className='item' onClick={() => setEditFood(true)}><p>Edit</p></div>
        </div>
    </div> 
}

export default FoodRow;