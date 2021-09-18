import {
    act,
    fireEvent,
    render,
    screen,
    cleanup,
    waitFor,
    getByTestId,
} from '@testing-library/react';
import BookField from '../components/BookManagement/BookField.js';
import AddBookForSaleForm from '../components/BookManagement/AddBookForSaleForm.js';
import {createBookForSale} from '../api.js';

jest.mock('../components/BookManagement/BookField.js');
jest.mock('../api.js');

// Simple test data. The actual data does not matter, just the identity.
const SAMPLE_BOOK_FOR_SALE_RESPONSE = {data: 1, foo: 'bar', value: false};

describe('AddBookForSaleForm()', () => {
    beforeEach(() => {
        BookField.mockReturnValue(null);
        createBookForSale.mockResolvedValue(SAMPLE_BOOK_FOR_SALE_RESPONSE);
    });
    test('should provide the neccesary inputs', () => {
        act(() => {
            render(<AddBookForSaleForm />);
        });

        expect(screen.getByLabelText('Sale Price')).toBeDefined();
        expect(screen.getByLabelText('Available Stock')).toBeDefined();
        expect(BookField).toHaveBeenCalled();
    });
    test('should call onSubmit when the form is submitted', async () => {
        const mockSubmit = jest.fn();
        act(() => {
            render(<AddBookForSaleForm onSubmit={mockSubmit} />);
        });
        await act(async () => {
            fireEvent.submit(screen.getByTestId('add-book-for-sale-form'));
            await Promise.resolve();
        });
        expect(mockSubmit).toHaveBeenCalledWith(SAMPLE_BOOK_FOR_SALE_RESPONSE);
    });
});
