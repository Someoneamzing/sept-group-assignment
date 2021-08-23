import React from "react";
import { useFormik } from "formik";
import { TextField, Grid } from "@material-ui/core";

function inputProps(formik, name, label) {
  return {
    label,
    name,
    onChange: formik.onChange,
    value: formik.values[name],
    onBlur: formik.onBlur,
    error: formik.errors[name],
    helperText: formik.errors[name],
  };
}

/**
 * The form that handles adding Book entities to the system.
 * @note This form is not for the sale pages, just the definition of a book, with title author etc.
 */
export default function AddBookForm() {
  const formik = useFormik({
    initialValues: {
      bookTitle: "",
      author: "",
      publisher: "",
      publishDate: "",
      isbn: "",
      coverArtURL: "",
      tableOfContents: "",
    },
    onSubmit() {},
  });
  return (
    <Grid>
      <form onSubmit={formik.handleSubmit}>
        <TextField {...inputProps(formik, "Book Title", "bookTitle")} />
        <TextField {...inputProps(formik, "Author", "author")} />
        <TextField {...inputProps(formik, "Publisher", "publisher")} />
        <TextField
          {...inputProps(formik, "Publish Date", "publishDate")}
          type="date"
        />
        <TextField {...inputProps(formik, "ISBN", "isbn")} />
        <TextField
          {...inputProps(formik, "Table of Contents", "tableOfContents")}
          multiline
        />
      </form>
    </Grid>
  );
}
