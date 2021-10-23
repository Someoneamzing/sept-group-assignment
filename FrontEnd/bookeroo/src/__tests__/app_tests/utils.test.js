import {inputProps} from '../../utils';

describe('inputProps()', () => {
    const formikMock = {
        handleChange: () => {},
        handleBlur: () => {},
        values: {
            field1: 'value1',
            field2: 'value2',
            field3: 'value3',
            fieldNoId: 'valueNoId',
        },
        errors: {
            field1: 'error1',
            field2: 'error2',
            field3: 'error3',
            fieldNoId: 'errorNoId',
        },
        isSubmitting: true,
    };
    const field1DesiredProps = {
        name: 'field1',
        id: 'field1',
        label: 'Field 1',
        onChange: formikMock.handleChange,
        onBlur: formikMock.handleBlur,
        value: 'value1',
        helperText: 'error1',
        error: true,
        disabled: true,
    };
    const field2DesiredProps = {
        name: 'field2',
        id: 'field2',
        label: 'Field 2',
        onChange: formikMock.handleChange,
        onBlur: formikMock.handleBlur,
        value: 'value2',
        helperText: 'error2',
        error: true,
        disabled: true,
    };
    const field3DesiredProps = {
        name: 'field3',
        id: 'field3',
        label: 'Field 3',
        onChange: formikMock.handleChange,
        onBlur: formikMock.handleBlur,
        value: 'value3',
        helperText: 'error3',
        error: true,
        disabled: true,
    };
    const fieldNoIdDesiredProps = {
        name: 'fieldNoId',
        label: 'Field NoId',
        onChange: formikMock.handleChange,
        onBlur: formikMock.handleBlur,
        value: 'valueNoId',
        helperText: 'errorNoId',
        error: true,
        disabled: true,
    };
    test('should return the correct props for a field', () => {
        expect(inputProps(formikMock, 'Field 1', 'field1')).toEqual(
            field1DesiredProps
        );
        expect(inputProps(formikMock, 'Field 2', 'field2')).toEqual(
            field2DesiredProps
        );
        expect(inputProps(formikMock, 'Field 3', 'field3')).toEqual(
            field3DesiredProps
        );
    });
    test('should return props with no id when given addId false', () => {
        expect(
            inputProps(formikMock, 'Field NoId', 'fieldNoId', false)
        ).toEqual(fieldNoIdDesiredProps);
    });
});
