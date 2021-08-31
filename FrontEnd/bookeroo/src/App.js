import React from 'react';
import Header from './components/Layout/Header';
import Contact from './components/Layout/Contact';
import ViewBook from './components/BookManagement/ViewBook';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Register from './components/UserManagement/Register';
import {Container} from '@material-ui/core';
import AddBookForSaleForm from './components/AddBookForSaleForm';
import NoMatch from './components/Layout/NoMatch';
import ViewBookForSalePage from './components/BookManagement/ViewBookForSale';
import ViewAllBooksPage from './components/BookManagement/ViewAllBooks';

function App() {
    return (
        <div className="App">
            <Header />
            <div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        children={<Container>HomePage</Container>}
                    />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/contact" component={Contact} />
                    <Route
                        exact
                        path="/book/new"
                        component={AddBookForSaleForm}
                    />
                    <Route exact path="/books" component={ViewAllBooksPage} />
                    <Route path="/book/:bookId" component={ViewBook} />
                    <Route
                        path="/s/:sellerId/book/:bookId"
                        component={ViewBookForSalePage}
                    />
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
