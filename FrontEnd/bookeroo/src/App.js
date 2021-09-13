import React from 'react';
import Home from './pages/Home';
import Header from './components/Layout/Header';
// import Contact from './components/Layout/Contact';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './components/UserManagement/Register';
import BusinessRegister from './components/UserManagement/BusinessRegister';

function App() {
    return (
        <div className="App">
            <Header />
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    {/* <Route exact path="/contact" component={Contact} /> */}
                    <Route exact path="/businessRegister" component={BusinessRegister}></Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
