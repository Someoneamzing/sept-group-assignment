import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Root from '../Root';
import MockRoot from '../testing_utils/MockRoot';
// mock api server for loginmicroservices endpoint
import '../testing_utils/login_microservice/mockServer';
import {createMemoryHistory} from 'history';
import App from '../App';
import Login from '../components/UserManagement/Login';

/**
GIVEN I am on the bookeroo website,
WHEN I click “Log In“
THEN the system displays the Login form
*/
test('Scenario 0: I want to access the login form', async () => {
    render(<Root />);
    fireEvent.click(screen.getAllByText('Login')[0]);
    const username = () => document.getElementById('username');
    const password = () => document.getElementById('password');
    await waitFor(username);
    expect(username().nodeName).toEqual('INPUT');
    expect(password().nodeName).toEqual('INPUT');
});
/**
GIVEN I am on the Login page AND I am a registered regular user AND I have provided my correct username and password,
WHEN I click “Login”
THEN the system will log me in and display my dashboard.
*/
test('Scenario 1: I want to log in as a public user with my credentials', async () => {
    render(<Root />);
    fireEvent.click(screen.getAllByText('Login')[0]);
    await waitFor(() => screen.getByLabelText('User Name'));
    const username = screen.getByLabelText('User Name');
    const password = screen.getByLabelText('Password');
    const signIn = screen.getByText('Sign In');
    fireEvent.change(username, {target: {value: 'a@b.c'}});
    fireEvent.change(password, {target: {value: 'abc123'}});
    fireEvent.click(signIn);
    await waitFor(() => screen.getByText('HomePage'));
    expect(screen.queryAllByText('Admin').length).toEqual(0);
    expect(screen.queryAllByText('Store').length).toEqual(0);
    expect(screen.queryAllByText('Logout').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Books').length).toBeGreaterThan(0);
});

/**
GIVEN: I am on the login page AND I am a registered business user AND I have entered my credentials correctly
WHEN I click login
THEN The system logs me in.
*/
test('Scenario 2: I want to log in as a business owner with my credentials', async () => {
    const history = createMemoryHistory();
    history.push('/login/');
    render(
        <MockRoot history={history}>
            <App />
        </MockRoot>
    );
    const username = screen.getByLabelText('User Name');
    const password = screen.getByLabelText('Password');
    const signIn = screen.getByText('Sign In');
    fireEvent.change(username, {target: {value: 'business@b.c'}});
    fireEvent.change(password, {target: {value: 'abc123'}});
    fireEvent.click(signIn);
    await waitFor(() => screen.getByText('HomePage'));
    expect(screen.queryAllByText('Admin').length).toEqual(0);
    expect(screen.queryAllByText('Logout').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Store').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Books').length).toBeGreaterThan(0);
});

/**
GIVEN: I am on the login page AND I am a registered admin user AND I have entered my credentials correctly
WHEN I click login
THEN The system logs me in.
*/
test('Scenario 3: I want to log in as an admin with my credentials', async () => {
    const history = createMemoryHistory();
    history.push('/login/');
    render(
        <MockRoot history={history}>
            <App />
        </MockRoot>
    );
    const username = screen.getByLabelText('User Name');
    const password = screen.getByLabelText('Password');
    const signIn = screen.getByText('Sign In');
    fireEvent.change(username, {target: {value: 'admin@b.c'}});
    fireEvent.change(password, {target: {value: 'abc123'}});
    fireEvent.click(signIn);
    await waitFor(() => screen.getByText('HomePage'));
    expect(screen.queryAllByText('Admin').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Logout').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Store').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Books').length).toBeGreaterThan(0);
});

/**
GIVEN I am on the Login page AND I am a registered regular user AND I have provided an incorrect username or password,
WHEN I click “Login”
THEN the system will display an error message quoting the failed login.
*/
test('Scenario 4: I want to log in as a public user with invalid credentials', async () => {
    render(
        <MockRoot>
            <Login />
        </MockRoot>
    );
    const username = screen.getByLabelText('User Name');
    const password = screen.getByLabelText('Password');
    const signIn = screen.getByText('Sign In');
    fireEvent.change(username, {target: {value: 'b@b.c'}});
    fireEvent.change(password, {target: {value: 'abc123'}});
    fireEvent.click(signIn);
    await waitFor(() => screen.getByText('Bad credentials'));
    expect(screen.getAllByLabelText('User Name').length).toBeGreaterThan(0);
});

/**
GIVEN I am on the Login page AND I am a registered regular user AND I am missing login information,
WHEN I click “Login”
THEN the system will display an error message quoting the missing field.
*/
test('Scenario 5: I want to log in as a public user with a malformed request', async () => {
    render(
        <MockRoot>
            <Login />
        </MockRoot>
    );
    const username = screen.getByLabelText('User Name');
    const signIn = screen.getByText('Sign In');
    fireEvent.change(username, {target: {value: 'b@b.c'}});
    fireEvent.click(signIn);
    await waitFor(() => screen.getByText('Password cannot be blank'));
    expect(screen.getAllByLabelText('User Name').length).toBeGreaterThan(0);
    fireEvent.change(username, {target: {value: ''}});
    fireEvent.click(signIn);
    await waitFor(() => screen.getByText('Username cannot be blank'));
});
