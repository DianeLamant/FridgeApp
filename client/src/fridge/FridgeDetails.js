import React, { useState, useEffect } from 'react';

function FridgeDetails(props) {

    console.log(props.location.fridge);
    

    return <div>
        <button 
            className="ui inverted green button"
            onClick={() => props.history.push('/addfood', {fridge: props.location.fridge})}    
        >Add Food</button>

        </div> 
}

export default FridgeDetails;