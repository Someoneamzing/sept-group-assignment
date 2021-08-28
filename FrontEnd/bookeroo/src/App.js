import React from 'react';
import Header from './components/Layout/Header';
import Contact from './components/Layout/Contact';
import ViewBook from './components/BookManagement/ViewBook';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Register from './components/UserManagement/Register';

function App() {
    return (
        <div className="App">
            <Header />
            <div>
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/contact" component={Contact} />
                    <Route path="/books/:bookId" component={ViewBook} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
