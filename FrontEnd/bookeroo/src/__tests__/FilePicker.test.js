import React from 'react';
import {act, fireEvent, render, screen, cleanup} from '@testing-library/react';
import FilePicker, {
    getDataURIMimeType,
    getFileDataURL,
} from '../components/FilePicker';

describe('getFileDataURL()', () => {
    const file = new File([new ArrayBuffer(1)], 'image.png');
    const fileReader = new (class MockFileReader {
        constructor() {
            this.addEventListener = jest.fn();
        }
    })();

    beforeEach(() => {
        jest.clearAllMocks();
        window.FileReader = jest.fn();
        window.FileReader.mockImplementation(() => {
            return fileReader;
        });
    });

    test('should convert a file to its base64 representation', async () => {
        fileReader.result = 'some base 64 URL';
        fileReader.addEventListener.mockImplementation((event, fn) =>
            event === 'load' ? fn() : null
        );

        const content = await getFileDataURL(file);

        expect(content).toBe('some base 64 URL');
    });

    test('should throw an error when conversion fails', async () => {
        fileReader.result = '';
        fileReader.addEventListener.mockImplementation((event, fn) =>
            event === 'error' ? fn('Failed to load file') : null
        );

        await expect(async () => await getFileDataURL(file)).rejects.toMatch(
            'Failed to load file'
        );
    });

    test('should throw TypeError when given null file', async () => {
        const result = await expect(async () => await getFileDataURL(null));
        result.rejects.toThrow('file must be provided.');
        result.rejects.toBeInstanceOf(TypeError);
    });

    test('should throw TypeError when given undefined file', async () => {
        const result = await expect(
            async () => await getFileDataURL(undefined)
        );
        result.rejects.toThrow('file must be provided.');
        result.rejects.toBeInstanceOf(TypeError);
    });

    test('should throw TypeError when given false file', async () => {
        const result = await expect(async () => await getFileDataURL(false));
        result.rejects.toThrow('file must be provided.');
        result.rejects.toBeInstanceOf(TypeError);
    });

    test('should throw TypeError when given no file', async () => {
        const result = await expect(async () => await getFileDataURL());
        result.rejects.toThrow('file must be provided.');
        result.rejects.toBeInstanceOf(TypeError);
    });
});

describe('getDataURIMimeType()', () => {
    test('should return correct MIME type of data uri with textual data', () => {
        expect(getDataURIMimeType('data:application/json,{"data":1}')).toBe(
            'application/json'
        );
    });

    test('should return correct MIME type of data uri with base64 data', () => {
        expect(
            getDataURIMimeType('data:image/png;base64,askdjfhJGFDd56734')
        ).toBe('image/png');
    });

    test('should return text/plain on missing mime type', () => {
        expect(getDataURIMimeType('data:,This is some text data')).toBe(
            'text/plain'
        );
    });

    test('should throw TypeError on null URI', () => {
        expect(() => getDataURIMimeType(null)).toThrow(TypeError);
    });

    test('should throw TypeError on undefined URI', () => {
        expect(() => getDataURIMimeType(undefined)).toThrow(TypeError);
    });

    test('should throw TypeError on false URI', () => {
        expect(() => getDataURIMimeType(false)).toThrow(TypeError);
    });

    test('should throw TypeError on no URI', () => {
        expect(() => getDataURIMimeType()).toThrow(TypeError);
    });
});

describe('FilePicker', () => {
    const promise = Promise.resolve();
    const changeHandler = jest.fn(() => promise);
    const file = new File(['Hello'], 'test.txt', {type: 'text/plain'});
    const fileReader = new (class MockFileReader {
        constructor() {
            this.addEventListener = jest.fn();
        }
    })();
    beforeEach(() => {
        jest.clearAllMocks();
        window.FileReader = jest.fn();
        window.FileReader.mockImplementation(() => {
            return fileReader;
        });
    });
    test('should fire change handler with appropriate data URLs when file input changes', async () => {
        fileReader.result = 'data:text/plain,Hello';
        fileReader.addEventListener.mockImplementation((event, fn) =>
            event === 'load' ? fn() : null
        );

        render(<FilePicker onChange={changeHandler} />);
        await act(async () => {
            const fileInput = screen.getByTestId('file-input');
            fireEvent.change(fileInput, {target: {files: [file]}});
            await promise;
        });
        expect(changeHandler).toHaveBeenCalled();
        expect(changeHandler).toHaveBeenCalledWith(['data:text/plain,Hello']);
        cleanup();
    });
    test('should show a preview of the selected files', async () => {
        fileReader.result =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        fileReader.addEventListener.mockImplementation((event, fn) =>
            event === 'load' ? fn() : null
        );

        render(<FilePicker onChange={changeHandler} />);
        await act(async () => {
            const fileInput = screen.getByTestId('file-input');
            fireEvent.change(fileInput, {target: {files: [file]}});
            await promise;
        });
        const image = screen.getByRole('img');
        expect(image).toBeInstanceOf(HTMLImageElement);
        expect(image.src).toBe(fileReader.result);
    });
});
