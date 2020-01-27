import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from './UserInfo';
import UserPassword from './UserPassword';

function User(props) {

    const history = useHistory();

    const { token } = props;

    const [ user, setUser ] = useState({});
    const [ password, setPassword ] = useState({});
    const [ askPassword, setAskPassword ] = useState(false);

    const input = React.createRef();

    useEffect(() => {
        if(input.current) {
            input.current.focus();
        }
    }, [askPassword])
    
    useEffect(() => {
        fetch('http://localhost:3800/api/user/', {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then(function(user) {
                setUser(user);
                
            })
    }, [])

    function onChange(key, value) {
        setUser(prevState => ({
            ...prevState,
            [key] : value
        }))
    }

    function handleChange(value) {
        setPassword({password: value});
    }

    function deleteAccount() {
        fetch(`http://localhost:3800/api/user/`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(password)
        })
            .then(() => {
                history.push('/');
            })
    }
    
    return <>
        <p>My account</p>
        {Object.values(user).length > 0 &&
        <>
        <UserInfo token={token} userKey={'name'} userInfo={user.name} onChange={onChange}/>
        <UserInfo token={token} userKey={'email'} userInfo={user.email} onChange={onChange} />
        <UserPassword token={token} />
        </>
        }
        
        <div onClick={()=> history.push('/')}>
            <p>Sign out</p>
        </div>

        {askPassword ?
        <>
        <p>Enter your password if you want to delete your account</p>
        <input 
            ref={input}
            type="password" 
            placeholder="Password"
            onChange={e => handleChange(e.target.value)} 
        />
        <button 
            className="ui inverted green button"
            onClick={deleteAccount}
        >Delete your account</button>
        <button 
            className="ui inverted red button"
            onClick={() => setAskPassword(false)}
        >Cancel</button>
        </>
        :
        <div onClick={() => setAskPassword(true)}>
            <p>Delete your account</p>
        </div>
        }
        </>
}

export default User;