import App from '../App';
import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const renderWithRouter = (ui, {route = '/'} = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(ui, {wrapper: BrowserRouter});
};

describe('Header', () => {
    // Testing all nav-links
    describe('Nav-Links', () => {
        /*
            GIVEN I am on any page,
            WHEN I click on the “Home” link OR I click on the Bookeroo branding
            THEN the system will display the Home page.
        */
        it('Navlink to Home redirects to home page', async () => {
            const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);

            // redirecting to register first
            const registerButton = screen.getAllByRole('button', {
                name: /Register/i,
            });

            fireEvent.click(registerButton[0]);
            expect(screen.getByText(/Registration/i)).toBeInTheDocument();

            // redirecting to home
            const HomeButton = screen.getByRole('button', {
                name: /Home/i,
            });

            fireEvent.click(HomeButton);
            expect(
                screen.getByText(/Find your favourite books/i)
            ).toBeInTheDocument();
        });

        it('click on Bookeroo redirects to home page', async () => {
            const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);

            // redirecting to register first
            const button = screen.getAllByRole('button', {
                name: /Register/i,
            });

            fireEvent.click(button[0]);
            expect(screen.getByText(/Registration/i)).toBeInTheDocument();

            // redirecting to home
            const title = screen.getByRole('link', {
                name: /Bookeroo/i,
            });

            fireEvent.click(title);
            expect(
                screen.getByText(/Find your favourite books/i)
            ).toBeInTheDocument();
        });

        it('Navlink to Register redirects to register page', async () => {
            const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);
            const button = screen.getAllByRole('button', {
                name: /Register/i,
            });

            fireEvent.click(button[0]);

            expect(screen.getByText(/Registration/i)).toBeInTheDocument();
        });

        /*
            GIVEN I am on any page,
            WHEN I click “Contact Us“,
            THEN the system will display the business contact details.
        */
        it('Navlink to Contact redirects to contact us page', async () => {
            const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);
            const button = screen.getByRole('button', {
                name: /Contact/i,
            });

            fireEvent.click(button);

            expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
        });
    });
});