import {fireEvent, render, screen} from '@testing-library/react';
import Home from '../Home';
import Register from '../../components/UserManagement/Register';
import {BrowserRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import App from '../../App';

const MockRegister = () => {
    <BrowserRouter>
        <Register />
    </BrowserRouter>;
};

const renderWithRouter = (ui, {route = '/'} = {}) => {
	window.history.pushState({}, 'Test page', route)
  
	return render(ui, {wrapper: BrowserRouter})
};

const mockedProps = jest.fn();

describe('Home', () => {
    describe('Buttons', () => {
        it('should render 2 buttons', async () => {
            render(<Home props={[]} />);
            const buttons = await screen.findAllByRole('button');
            expect(buttons).toHaveLength(2);
        });

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

        it('Button "Register as a Customer" should redirect to /register', async () => {
			const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);	
            const button = screen.getByRole('button', {
                name: /Register as a Customer/i,
            });

            fireEvent.click(button);

			expect(screen.getByText(/Registration/i)).toBeInTheDocument()
        });

		it('Button "Register as a business" should redirect to /register', async () => {
			const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);	
            const button = screen.getByRole('button', {
                name: /Register as a business/i,
            });

            fireEvent.click(button);

			expect(screen.getByText(/Registration/i)).toBeInTheDocument()
        });
    });

    describe('Text', () => {
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
