import React, { useState } from 'react';

function App(props) {

    const [ user, setUser ] = useState({});

    function handleChange(key, value) {
        setUser(prevState=> ({
            ...prevState,
            [key] : value
        }))
    }

    function handleSubmit() {
        fetch(`http://localhost:3800/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then( async (res) => {
                
                const msg = await res.text();
                // alert(msg);

                if(msg.toLowerCase().includes('email')) {
                    console.log('maaail');
                } else if (msg.toLowerCase().includes('password')) {
                    console.log('passssword');
                } else {
                    console.log(msg)
                    props.history.push('/home', {token: msg})
                }
                
            })
            .catch((error) => {
                console.error(JSON.stringify(error));
            })
    }

    return <div>
        <h3>Sign in to Fridge App</h3>
        <div className="ui form">
            <div className="three fields">
                <div className="required field">
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={e => handleChange('email', e.target.value)} 
                    />
                </div>
                <div className="required field">
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        onChange={e => handleChange('password', e.target.value)} 
                    />
                </div>
            </div>
            <div 
                className="ui inverted green submit button"
                onClick={handleSubmit}
            >Sign in</div>
        </div>

        <h3>New to Fridge App ?</h3>
        <button 
            className="ui inverted blue button"
            onClick={() => props.history.push('/register')}
        >Sign Up</button>

    </div> 
}

export default App;