
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Register from '../components/UserManagement/Register'
import { act, Simulate } from 'react-dom/test-utils';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';


// mock responses
const createdResponse = {
    "id": 1,
    "username": "test@gmail.com",
    "fullName": "test",
    "userType": "PUBLIC"
}
const passwordError = { "password": "Password must be at least 6 characters" };
const userNameAlreadyExistsError = { "username": "Username 'test@gmail.com' already exists" };
const emptyFormErrors = {
    "username": "username is required",
    "fullName": "Please enter your full name",
    "password": "Password must be at least 6 characters"
}

enableFetchMocks();


// GIVEN new user wants to register on bookeroo,
// WHEN they go to the register page and fill required details
// THEN a “user - created “ message shows up.
test('sep-15: new user wants to register as a public user', async () => {

    fetch.mockResponseOnce(JSON.stringify(createdResponse));
    render(<Register />);
    await act(async () => {
        fireEvent.change(screen.getByLabelText("User Name"), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.change(screen.getByLabelText("Full Name"), {
            target: { value: "test" }
        });
        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "123456" }
        });
        fireEvent.change(screen.getByLabelText("Confirm Password"), {
            target: { value: "123456" }
        });
        fireEvent.click(screen.getByText('Sign Up'));
    })

    expect(screen.getByText('User Created'))
})


// GIVEN user inputs all fields in the form
// WHEN user clicks to sign up to submit the form
// THEN a “User name already exists” displays to the user.
test('sep-15: user enters the username that already exists in the database', async () => {

    fetch.mockResponseOnce(JSON.stringify(userNameAlreadyExistsError));
    render(<Register />);
    await act(async () => {
        fireEvent.change(screen.getByLabelText("User Name"), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.change(screen.getByLabelText("Full Name"), {
            target: { value: "test" }
        });
        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "123456" }
        });
        fireEvent.change(screen.getByLabelText("Confirm Password"), {
            target: { value: "123456" }
        });
        fireEvent.click(screen.getByText('Sign Up'));
    })

    expect(screen.getByText("Errors in Form"));
    expect(screen.getByText("Username 'test@gmail.com' already exists"));
})


// Scenario 3: password is less than 6 characters
// GIVEN user filled all required details for registration
// WHEN user clicks the button to submit the form
// THEN an error message shows up, notifying the user that the password is less than 6 characters.
test('sep-15: new user wants to register as a public user', async () => {

    fetch.mockResponseOnce(JSON.stringify(passwordError));
    render(<Register />);
    await act(async () => {
        fireEvent.change(screen.getByLabelText("User Name"), {
            target: { value: "test2@gmail.com" }
        });
        fireEvent.change(screen.getByLabelText("Full Name"), {
            target: { value: "test" }
        });
        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "12345" }
        });
        fireEvent.change(screen.getByLabelText("Confirm Password"), {
            target: { value: "12345" }
        });
        fireEvent.click(screen.getByText('Sign Up'));
    })

    expect(screen.getByText("Errors in Form"));
    expect(screen.getByText('Password must be at least 6 characters'));
})


// GIVNE user did not fill in information for all fields
// WHEN user clicks the button to submit the form
// THEN all error messages are displayed to the user.
test('sep-15: User submits an empty form', async () => {

    fetch.mockResponseOnce(JSON.stringify(emptyFormErrors));
    render(<Register />);
    await act(async () => {
        fireEvent.click(screen.getByText('Sign Up'));
    })

    expect(screen.getByText("Errors in Form"));

    expect(screen.getByText('username is required'));
    expect(screen.getByText('Please enter your full name'));
    expect(screen.getByText('Password must be at least 6 characters'));
})

