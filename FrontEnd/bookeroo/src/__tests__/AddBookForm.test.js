import {
    act,
    fireEvent,
    render,
    screen,
    cleanup,
    waitFor,
    getByTestId,
} from '@testing-library/react';
import AddBookForm from '../components/AddBookForm';
import FilePicker from '../components/FilePicker.js';
import {createBook} from '../api.js';

//The contents of this object do not matter, just the identity of it.
const SAMPLE_BOOK_CREATE_RESPONSE = {data: true, value: 'foo', bar: 1};

jest.mock('../components/FilePicker.js');
jest.mock('../api.js', () => ({
    __esModule: true,
    createBook: jest.fn(),
}));

describe('AddBookForm()', () => {
    beforeEach(() => {
        FilePicker.mockImplementation(() => null);
        createBook.mockResolvedValue(SAMPLE_BOOK_CREATE_RESPONSE);
    });

    test('should provide all required inputs', () => {
        act(() => {
            render(<AddBookForm />);
        });
        expect(screen.getByLabelText('Book Title')).toBeDefined();
        expect(screen.getByLabelText('Author')).toBeDefined();
        expect(screen.getByLabelText('Publisher')).toBeDefined();
        expect(screen.getByLabelText('Publish Date')).toBeDefined();
        expect(screen.getByLabelText('ISBN')).toBeDefined();
        expect(screen.getByLabelText('Table of Contents')).toBeDefined();
    });
    // TODO: Replace findByLabelText with something else as MUI soesnt label things properly
    test('should use default values', () => {
        const defaultValue = {
            bookTitle: 'title',
            author: 'author',
            publisher: 'publisher',
            publishDate: '2021-03-03',
            isbn: 'isbn',
            tableOfContents: 'tableofcontents',
        };
        act(() => {
            render(<AddBookForm defaultValue={defaultValue} />);
        });
        expect(screen.getByLabelText('Book Title').value).toBe(
            defaultValue.bookTitle
        );
        expect(screen.getByLabelText('Author').value).toBe(defaultValue.author);
        expect(screen.getByLabelText('Publisher').value).toBe(
            defaultValue.publisher
        );
        expect(screen.getByLabelText('Publish Date').value).toBe(
            defaultValue.publishDate
        );
        expect(screen.getByLabelText('ISBN').value).toBe(defaultValue.isbn);
        expect(screen.getByLabelText('Table of Contents').value).toBe(
            defaultValue.tableOfContents
        );
    });

    test('should use provided components', () => {
        const componentA = jest.fn(({children}) => <div>{children}</div>);
        const componentB = jest.fn(({children}) => <div>{children}</div>);
        act(() => {
            render(
                <AddBookForm
                    ContentComponent={componentA}
                    ActionComponent={componentB}
                />
            );
        });
        expect(componentA).toHaveBeenCalled();
        expect(componentB).toHaveBeenCalled();
    });

    test('should create the book and call submit handler when submitting', async () => {
        const promise = Promise.resolve();
        const submitMock = jest.fn();
        act(() => {
            render(<AddBookForm onSubmit={submitMock} />);
        });
        await act(async () => {
            fireEvent.submit(screen.getByTestId('add-book-form'));
            await promise;
        });
        expect(createBook).toHaveBeenCalled();
        expect(submitMock).toHaveBeenCalledWith(SAMPLE_BOOK_CREATE_RESPONSE);
    });

    test('should call cancel handler on cancel', () => {
        const cancelMock = jest.fn();
        act(() => {
            render(<AddBookForm onCancel={cancelMock} />);
        });
        act(() => {
            fireEvent.click(screen.getByText('Cancel'));
        });
        expect(cancelMock).toHaveBeenCalled();
    });
});
