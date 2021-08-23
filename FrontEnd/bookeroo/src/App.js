// import logo from './logo.svg';
import './App.css';
// import { Router } from 'react-router-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/UserManagement/Register';

function App() {
    return (
        <div className="App">
            <Router>
                <Route exact path="/register" component={Register} />
            </Router>
        </div>
    );
}

export default App;
