import React, {useEffect} from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Header from './components/Layout/Header';
import ViewBook from './components/BookManagement/ViewBook';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Register from './components/UserManagement/Register';
import AddBookForSaleForm from './components/BookManagement/AddBookForSaleForm';
import NoMatch from './components/Layout/NoMatch';
import ViewBookForSalePage from './components/BookManagement/ViewBookForSale';
import ViewAllBooksPage from './components/BookManagement/ViewAllBooks';
import AddToOrderForm from './components/OrderManagement/AddToOrderForm';
import Login from './components/UserManagement/Login';
import {useResetRecoilState} from 'recoil';
import {userAtom} from './state/user/authentication';
import OrderList from './components/OrderManagement/OrderList';
import OrderView from './components/OrderManagement/OrderView';

function Logout({history}) {
    const resetUser = useResetRecoilState(userAtom);
    useEffect(() => {
        resetUser();
        // wait for userAtom state to reset
        requestAnimationFrame(() => history.push('/login'));
    }, [history, resetUser]);
    return null;
}

function App() {
    return (
        <div className="App">
            <Header />
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/order" component={AddToOrderForm} />
                    <Route exact path="/orders" component={OrderList} />
                    <Route
                        exact
                        path="/orders/:orderId"
                        component={OrderView}
                    />
                    <Route
                        exact
                        path="/book/new"
                        component={AddBookForSaleForm}
                    />
                    <Route exact path="/books" component={ViewAllBooksPage} />
                    <Route path="/book/:bookId" component={ViewBook} />
                    <Route
                        path="/account/:sellerId/book/:bookId"
                        component={ViewBookForSalePage}
                    />
                    {/* THIS MUST GO AFTER EVERYTHING ELSE */}
                    <Route
                        path="/:sellerId/book/:bookId"
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
