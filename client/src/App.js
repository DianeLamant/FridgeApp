import React from 'react';
import { Route, BrowserRouter as Switch } from 'react-router-dom';
import Home from './pages/Home'; 
import Profile from './pages/Profile';
import FridgeDetails from './pages/FridgeDetails';
import FormFood from './formsFood/FormFood'; 
import FridgeUsers from './pages/FridgeUsers';

function App(props) {

    return <>
        <Switch>
            <Route exact path='/' >
                <Home {...props} />
            </Route>
            <Route exact path='/profile' >
                <Profile {...props} />
            </Route>
            <Route exact path='/fridge/:fridgeName' >
                <FridgeDetails {...props} />
            </Route>
            <Route path='/fridge/:fridgeName/addFood' >
                <FormFood {...props} />
            </Route>
            <Route path='/fridge/:fridgeName/users' >
                <FridgeUsers {...props} />
            </Route>
        </Switch>
        
        </>
}

export default App;