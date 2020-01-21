import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import FridgesList from './fridge/FridgesList';
import FridgeDetails from './fridge/FridgeDetails';
import FormFood from './food/FormFood'; 

function NotFound() {

  const history = useHistory();
  return <>
    <h1>Not Found</h1>
      <div 
      className="ui inverted blue animated button" 
      onClick={() => history.goBack()}>
        <div className="hidden content">Go back</div>
        <div className="visible content">
        <i className="left arrow icon"></i>
      </div>
    </div>
  </>
}

const routing = (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/home" component={FridgesList}/>
          <Route path="/fridge/:fridgeParam" component={FridgeDetails} />
          <Route path="/addfood" component={FormFood} />
          <Route component={NotFound} />
        </Switch>
      </>
  
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))