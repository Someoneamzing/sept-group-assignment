/**
 *
 * @param {import('formik').FormikProps<{}>} formik
 * @param {string} label
 * @param {string} name
 * @returns
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
