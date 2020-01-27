import React, { useState, useEffect } from 'react';

function UserInfo(props) {

    const { token, userKey, userInfo, onChange } = props;
    const [ update, setUpdate ] = useState(false);
    const [ newInfo, setNewInfo ] = useState(props.userInfo);
    console.log(props);
    
    function handleChange(value) {
        setNewInfo(value)
    }

    function handleSubmit() {
        fetch(`http://localhost:3800/api/user/${userKey}`, {
            method: 'PATCH',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({[userKey]: newInfo})
        })
            .then((res) => res.json())
            .then(function() {
                onChange(userKey, newInfo);
                setUpdate(false);
            })
    }
    

    return <div className="ui form" onClick={() => setUpdate(true)}>
        <div className='field'>
            <label>{userKey.charAt(0).toUpperCase() + userKey.slice(1)}</label>
            {update ?
            <>
                <input 
                type="text" 
                placeholder="Name"
                value={newInfo}
                onChange={e => handleChange(e.target.value)} 
                />
                <div 
                className="ui inverted green submit button"
                onClick={handleSubmit}
                >Send</div>
                <div 
                className="ui inverted red submit button"
                onClick={() => setUpdate(false)}
                >Cancel</div>
            </>
                :
                <p>{userInfo}</p>
            }
        </div>
    </div>
}

export default UserInfo;