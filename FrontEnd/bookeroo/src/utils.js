/**
 * A function for splitting out the required props for a field from useFormik.
 * @param {import('formik').FormikProps<{}>} formik The formik data from useFormik.
 * @param {string} label The label of the field
 * @param {string} name The name of the field. Used to get the value and error data
 * @returns An object containing the required props for rendering an input field with formik.
 */
export function inputProps(formik, label, name) {
    return {
        label,
        name,
        onChange: formik.handleChange,
        value: formik.values[name],
        onBlur: formik.handleBlur,
        error: formik.errors[name],
        helperText: formik.errors[name],
        disabled: formik.isSubmitting,
    };
}
