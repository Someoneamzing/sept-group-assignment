import React from 'react';
import Header from './components/Layout/Header';
import Contact from './components/Layout/Contact';
import ViewBook from './components/BookManagement/ViewBook';
import {Route, Switch, useLocation} from 'react-router-dom';
import './App.css';
import Register from './components/UserManagement/Register';

function NoMatch() {
    let location = useLocation();

    return (
        <div>
            <h1>404</h1>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Header />
            <div>
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/contact" component={Contact} />
                    <Route path="/books/:bookId" component={ViewBook} />
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
