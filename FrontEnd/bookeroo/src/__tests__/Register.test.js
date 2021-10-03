import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Register from '../components/UserManagement/Register';
import BusinessRegister from '../components/UserManagement/BusinessRegister';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import MockRoot from '../testing_utils/MockRoot';

// mock responses
const createdResponse = {
    response: {
        id: 3,
        username: 'a@b.c',
        fullName: 'abc efg',
        create_At: '2021-09-15T18:46:36.620+00:00',
        update_At: null,
        authorities: [
            {
                authority: 'PUBLIC',
            },
        ],
    },
    status: 201,
};
const passwordError = {
    response: { password: 'Password must be at least 6 characters' },
    status: 400,
};
const userNameAlreadyExistsError = {
    response: {
        username: 'Username must be unique',
    },
    status: 400,
};
const emptyFormErrors = {
    response: {
        username: 'username is required',
        fullName: 'Please enter your full name',
        password: 'Password must be at least 6 characters',
    },
    status: 400,
};
const emptyABNError = {
    response: {
        "businessInfo.ABN": "ABN field is required",
    },
    status: 400,
}
const acceptedResponse = {
    response: {
        id: 4,
        username: 'test12@b.c',
        fullName: 'test tset',
        create_At: '2021-09-126T17:00:36.620+00:00',
        update_At: null,
        authorities: [
            {
                authority: 'PUBLIC',
            },
        ],
    },
    status: 202,
};

const EP = 'http://localhost:8080/api/users/register';
const EP_2 = 'http://localhost:8080/api/users/businessRegister';

function SetMockResponse({ response, status }, EP) {
    const server = setupServer(
        rest.post(EP, (req, res, ctx) => {
            const result = res(ctx.status(status), ctx.json(response));
            return result;
        })
    );
    server.listen();
    return () => server.close();
}

function mockRootRender(child) {
    return render(<MockRoot>{child}</MockRoot>);
}

// GIVEN new user wants to register on bookeroo,
// WHEN they go to the register page and fill required details
// THEN a the user is redirected to login.
test('sep-15: new user wants to register as a public user', async () => {
    // mock a fetch response with the mocked data.
    const close = SetMockResponse(createdResponse, EP);
    mockRootRender(<Register />);
    fireEvent.change(screen.getByLabelText('User Name'), {
        target: { value: 'test@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Full Name'), {
        target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: '123456' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: '123456' },
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => screen.getByText('Redirecting'));
    close();
});

// GIVEN user inputs all fields in the form
// WHEN user clicks to sign up to submit the form
// THEN a “User name already exists” displays to the user.
test('sep-15: user enters the username that already exists in the database', async () => {
    // mock a fetch response with the mocked data.
    const close = SetMockResponse(userNameAlreadyExistsError, EP);
    render(
        <MockRoot>
            <Register />
        </MockRoot>
    );
    const signUp = screen.getByText('Sign Up');
    fireEvent.change(screen.getByLabelText('User Name'), {
        target: { value: 'test@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Full Name'), {
        target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: '123456' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: '123456' },
    });
    fireEvent.click(signUp);

    await waitFor(() => screen.getByText('Username must be unique'));
    close();
});

// Scenario 3: password is less than 6 characters
// GIVEN user filled all required details for registration
// WHEN user clicks the button to submit the form
// THEN an error message shows up, notifying the user that the password is less than 6 characters.
test('sep-15: password is less than 6 characters', async () => {
    // mock a fetch response with the mocked data.
    const close = SetMockResponse(passwordError, EP);
    mockRootRender(<Register />);
    fireEvent.change(screen.getByLabelText('User Name'), {
        target: { value: 'test2@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Full Name'), {
        target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: '12345' },
    });
    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() =>
        screen.getByText('Password must be at least 6 characters')
    );
    close();
});

// GIVNE user did not fill in information for all fields
// WHEN user clicks the button to submit the form
// THEN all error messages are displayed to the user.
test('sep-15: User submits an empty form', async () => {
    // mock a fetch response with the mocked data.
    const close = SetMockResponse(emptyFormErrors, EP);
    mockRootRender(<Register />);
    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => screen.getByText('username is required'));
    await waitFor(() => screen.getByText('Please enter your full name'));
    await waitFor(() =>
        screen.getByText('Password must be at least 6 characters')
    );
    close();
});


// Given a new user filled up the business registration form.
// When the user inputs an invalid ABN
// and clicks the sign - up button
// Then the page shows the “ABN field is required” message.
test('sep-16: New User inputs empty ABN', async () => {
    // mock a fetch response with the mocked data.
    const close = SetMockResponse(emptyABNError, EP_2);
    mockRootRender(<BusinessRegister />);
    fireEvent.change(screen.getByLabelText('User Name'), {
        target: { value: 'test2@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Full Name'), {
        target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText('ABN'), {
        target: { value: '' },
    });

    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() =>
        screen.getByText('ABN field is required')
    );

    close();
});

// Given a business user filled all the required details on the form
// When they click the sign - up button to submit the form.
// Then the page redirects to the login page.
test('sep-15: Successful registration request', async () => {
    // mock a fetch response with the mocked data.
    const close = SetMockResponse(acceptedResponse, EP_2);
    mockRootRender(<BusinessRegister />);
    fireEvent.change(screen.getByLabelText('User Name'), {
        target: { value: 'test@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Full Name'), {
        target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: '123456' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: '123456' },
    });
    fireEvent.change(screen.getByLabelText('ABN'), {
        target: { value: '123-456' },
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => screen.getByText('Redirecting'));
    close();
});


// Given a new user wants to register a business account
// When the user is on the public registration page.
// and the user clicks the “Business Register” link
// Then the page redirects to the business registration page.
test('sep-15 Navigate to the business register page from the public register.', async () => {
    mockRootRender(<Register />);

    expect(screen.getByText('Business Register')).toHaveAttribute('href', '/businessRegister');
});