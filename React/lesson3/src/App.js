import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './pages/PrivateRoute';


function App () {
  return (
    <div className="App">
      <Router
        getUserConfirmation={(message, callback) => {
          // this is the default behavior
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}>
        <Link className="mrg-right-20" to="/">首页</Link>
        <Link className="mrg-right-20" to="/user">用户中心</Link>
        <Link className="mrg-right-20" to="/login">登录</Link>
        <Link className="mrg-right-20" to="/children">children</Link>
        <Link className="mrg-right-20" to="/render">render</Link>

        {/* <Switch> */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user" component={UserPage} />
        <PrivateRoute path="user" component={UserPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/children" children={() => <div>children</div>} />
        <Route path="/render" render={() => <div>render</div>} />
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
