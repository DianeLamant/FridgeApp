import React, { useState } from 'react';

function FormFood(props) {

    console.log(props);
    const { dates, fridge, formprops, token } = props
    const types = ['Fruits/Légumes', 'Produits laitiers', 'Viandes/Poissons', 'Epicerie' ,'Conserves', 'Boisson']
    const [ foods, setFoods ] = useState(props.foods);
    console.log(fridge);
    const [ food, setFood ] = useState({type: types[0], fridgeId: props.fridge._id});
    console.log(foods);
    
    function handleChange(key, value) {
        setFood(prevState=> ({
            ...prevState,
            [key] : value
        }))
    }

    function addFood() {
        console.log(food);
        
        fetch('http://localhost:3800/api/food/', {
            method: 'POST',
            headers: {
                // 'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food)
        })
            .then((res) => res.json())
            .then(function(data) {
                console.log(data);
                
                setFoods(prevState=> ({
                    ...prevState,
                    food
                }))
                formprops.history.push(`/fridge/${fridge.name}`, {fridge: fridge, token: token});
            })
    }
    
    return <div>
        <div className="ui form">
            <div className="three fields">
                <div className="field">
                    <label>Name</label>
                    <input 
                        type="text" 
                        placeholder="ex: Lait"
                        onChange={e => handleChange('name', e.target.value)}    
                    />
                </div>
                <div className="field">
                    <label>Type</label>
                    <select
                        onChange={e => handleChange('type', e.target.value)}
                    >
                        {types.map((data, i) => (
                            <option key={i} >{data}</option>
                        ))}
                    </select>
                </div>
                {dates.map((data, i) => (
                    <div key={i} className="field">
                        <label>{data}</label>
                        <input type="text" 
                            placeholder='ex: 12/21/2021'
                            onChange={e => handleChange(data, e.target.value)}
                        />
                    </div>

                ))}
            </div>
            <button 
                className="ui inverted green button"
                onClick={addFood}    
            >Send</button>
        </div>
    </div> 
}

export default FormFood;