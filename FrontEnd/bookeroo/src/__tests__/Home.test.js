import {fireEvent, render, screen} from '@testing-library/react';
import Home from '../pages/Home';
import {createMemoryHistory} from 'history';
import App from '../App';
import MockRoot from '../testing_utils/MockRoot';

const renderApp = () => {
    const history = createMemoryHistory();
    history.push('/');
    render(
        <MockRoot history={history}>
            <App />
        </MockRoot>
    );
};

describe('Home', () => {
    // Testing registration buttons for both business and regular users
    describe('Buttons', () => {
        // Testing if buttons are rendered
        it('should render "Register as a Customer" button', async () => {
            render(<Home props={[]} />);
            const button = screen.getByRole('button', {
                name: /Register as a Customer/i,
            });

            expect(button).toBeInTheDocument();
        });

        it('should render "Register as a business" button', async () => {
            render(<Home props={[]} />);
            const button = screen.getByRole('button', {
                name: /Register as a business/i,
            });

            expect(button).toBeInTheDocument();
        });

        // Testing if buttons are clickable and redirect to Register page
        it('Button "Register as a Customer" should redirect to /register', async () => {
            renderApp();
            const button = screen.getByRole('button', {
                name: /Register as a Customer/i,
            });

            fireEvent.click(button);

            expect(screen.getByText(/Registration/i)).toBeInTheDocument();
        });

        it('Button "Register as a business" should redirect to /register', async () => {
            renderApp();
            const button = screen.getByRole('button', {
                name: /Register as a business/i,
            });

            fireEvent.click(button);

            expect(screen.getByText(/Registration/i)).toBeInTheDocument();
        });
    });

    describe('Text', () => {
        // Testing if Headlines are in document home page
        it('should have rendered "Find your favourite books"', async () => {
            render(<Home props={[]} />);
            const text = await screen.findByText(/Find your favourite books/i);
            expect(text).toBeInTheDocument();
        });

        it('should have rendered "Grow your business"', async () => {
            render(<Home props={[]} />);
            const text = await screen.findByText(/Grow your business/i);
            expect(text).toBeInTheDocument();
        });
    });
});
