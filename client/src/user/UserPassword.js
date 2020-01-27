import React, { useState, useEffect } from 'react';

function UserPassword(props) {

    const { token } = props;
    const [ update, setUpdate ] = useState(false);
    const [ isUser, setIsUser ] = useState(false);
    const [ password, setPassword ] = useState({password: ''});
    const [ samePassword, setSamePassword ] = useState(true);

    function handleChange(value) {
        setPassword({password: value})
    }

    function checkPassword() {
        fetch(`http://localhost:3800/api/user/checkpassword`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(password)
        })
            .then((res) => res.json())
            .then(function() {
                setIsUser(true);
            })
    }

    function confirmPassword(value) {
        if(password.password === value) {
            setSamePassword(true);
        } else {
            setSamePassword(false);
        }
    }

    function updatePassword() {
        fetch(`http://localhost:3800/api/user/password`, {
            method: 'PATCH',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(password)
        })
            .then((res) => res.json())
            .then(function() {
                setUpdate(false);
            })
    }


    return <>
    {update ? 
    <div className="ui form">
        {!isUser ?
        <>
        <p>You want to change your password ?</p>
        <div className="required field">
            <label>Enter your actual password</label>
            <input 
                type="password" 
                placeholder="Password"
                onChange={e => handleChange(e.target.value)} 
                />
        </div>
        <div 
        className="ui inverted green submit button"
        onClick={checkPassword}
        >Send</div>
        
        </>
        :
        <>
        <div className="two fields">
            <div className="required field">
                <label>Enter your new password</label>
                <input 
                    type="password" 
                    placeholder="Password"
                    onChange={e => handleChange(e.target.value)} 
                />
            </div>
            <div className={samePassword ? "required field" : "error required field"}>
                <label>Confirm your new password</label>
                <input 
                    type="password" 
                    placeholder="Password"
                    onChange={e => confirmPassword(e.target.value)} 
                />
            </div>
        </div>
        <div 
        className="ui inverted green submit button"
        onClick={updatePassword}
        >Send</div>
        </>
        }
        <div 
        className="ui inverted red submit button"
        onClick={() => setUpdate(false)}
        >Cancel</div>

    </div>
    :

    <div onClick={() => setUpdate(true)}>
        <p>Password</p>
    </div>
    }
    </>
}

export default UserPassword;       
