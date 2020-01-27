import React, { useState } from 'react';
import User from './user/User';
import FridgesList from './fridge/FridgesList';

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

function App(props) {

    const token = props.location.state.token;
    const [ displayUser, setDisplayUser ] = useState(false);
    
    return <>
        <div style={styleSheet.header}>
            <p style={styleSheet.title}>Fridge App</p>
            <div 
                style={styleSheet.icon}
                onClick={() => setDisplayUser(!displayUser)}
            >
                <img style={styleSheet.img} src={displayUser ? 'svg/user-fill.svg' : 'svg/user-linear.svg'}></img>
            </div>
        </div>
        {displayUser ? 
            <User token={token}/> 
            :
            <FridgesList token={token} />
        }
        </>
}

export default App;