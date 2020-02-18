import React, { useEffect, useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { initialState, reducer, GlobalState } from './store';

import Login from './pages/Login';
import Register from './pages/Register';
import App from './App';

const Reducer = () => {

  const [ state, dispatch ] = useReducer(reducer, initialState);

  return <>
      <GlobalState.Provider value={{state, dispatch}}>
          <Routing />
      </GlobalState.Provider>
          
  </>
}

function Routing() {

  const { dispatch, state: { isLogged } } = useContext(GlobalState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token) {
      dispatch({
        type: 'setIsLogged',
        payload: { isLogged: true },
      });
      dispatch({
        type: 'setToken',
        payload: { token: token },
      });
      fetch('http://localhost:3800/api/user/', {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then(function(user) {
              dispatch({
                type: 'setUser',
                payload: { user: user },
              });
                
            })

    } else {
      dispatch({
        type: 'setIsLogged',
        payload: { isLogged: false },
      });
      dispatch({
        type: 'setToken',
        payload: { token: '' },
      });
    }
        
  }, [])

  // console.log(isLogged);
  

    return <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/" component={App}/>
          {/* <Route path="/fridge/:fridgeParam" component={FridgeDetails} />
          <Route path="/fridge-users" component={FridgeUsers} />
          <Route path="/addfood" component={FormFood} />
          <Route component={NotFound} /> */}
        </Switch>
        {isLogged ? 
          <Redirect to='/' />
          :
          <Redirect to='/login' />
        }
    
      </Router>
}

ReactDOM.render(<Reducer />, document.getElementById('root'))