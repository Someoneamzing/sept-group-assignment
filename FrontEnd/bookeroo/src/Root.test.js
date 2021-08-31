import {render, screen} from '@testing-library/react';
import Root from './Root';

test('renders HomePage', () => {
    render(<Root />);
    const homePage = screen.getByText(/HomePage/i);
    expect(homePage).toBeInTheDocument();
});
