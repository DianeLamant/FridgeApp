import React, { useState, useEffect } from 'react';

const styleSheet = {
    header: {
      width: '100%',
      height: '20%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
        margin: '0 0 0 20px',
        width: '80%',
        height: '100%',
        fontSize: '2em',
    },
    icon: {
        width: '20%',
        height: '100%',
    },
    img: {
        width: '50%',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)'
    }
};


function FridgeUsers(props) {

    console.log(props);
    const { token, fridge } = props.location.state;

    const [ addUser, setAddUser ] = useState(false);
    const [ email, setEmail ] = useState({email: '', fridgeId: fridge._id});

    const input = React.createRef();

    useEffect(() => {
        if(input.current) {
            input.current.focus()
        }
    }, [addUser])

    function handleSubmit() {
        fetch('http://localhost:3800/fridge/addUser', {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email)
        })
            .then((res) => res.json())
            .then(function(res) {
                console.log(res);
                
                setAddUser(false);
            })
    }

    function handleChange(value) {
        setEmail({userEmail: value})
    }

    return <div>
        <div style={styleSheet.header}>
            <div 
                className="ui icon"
                onClick={() => props.history.push('/home', {token: token, fridge: fridge})}    
            ><i className="left arrow icon"></i></div>
            <h1 style={styleSheet.title}>{fridge.name}</h1>
            <div 
                style={styleSheet.icon}
                onClick={() => props.history.goBack()}
            >
                <img style={styleSheet.img} src='../svg/group-fill.svg'></img>
            </div>
        </div>

        {addUser ?
        <>
        <input 
            ref={input}
            type="email" 
            placeholder="Email"
            onChange={e => handleChange(e.target.value)} 
            // onBlur={() => setAddFridge(false)}
        />
        <button 
            className="ui inverted green button"
            onClick={handleSubmit}
        >Add</button>
        <button 
            className="ui inverted red button"
            onClick={() => setAddUser(false)}
        >Cancel</button>
    </>
        :
        <div 
        className="ui inverted green button"
        onClick={() => setAddUser(true)}
        >Add User</div>
        }
    </div>
}

export default FridgeUsers;