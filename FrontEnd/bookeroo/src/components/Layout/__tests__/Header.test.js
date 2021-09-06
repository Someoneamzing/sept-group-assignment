import App from '../../../App';
import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const renderWithRouter = (ui, {route = '/'} = {}) => {
	window.history.pushState({}, 'Test page', route)
  
	return render(ui, {wrapper: BrowserRouter})
};

describe('Header', () => {
	describe('Nav-Links', () => {
		it('Navlink to Home redirects to home page', async () => {
			const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);	
            const button = screen.getByRole('button', {
                name: /Home/i,
            });

            fireEvent.click(button);

			expect(screen.getByText(/Find your favourite books/i)).toBeInTheDocument()
        });

		it('Navlink to Register redirects to register page', async () => {
			const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);	
            const button = screen.getAllByRole('button', {
                name: /Register/i,
            });
		
            fireEvent.click(button[0]);

			expect(screen.getByText(/Registration/i)).toBeInTheDocument()
        });

		it('Navlink to Contact redirects to contact us page', async () => {
			const history = createMemoryHistory();
            renderWithRouter(<App props={history} />);	
            const button = screen.getByRole('button', {
                name: /Contact/i,
            });
		
            fireEvent.click(button);

			expect(screen.getByText(/Contact us/i)).toBeInTheDocument()
        });
	});
});