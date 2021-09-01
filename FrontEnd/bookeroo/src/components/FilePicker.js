import {AddPhotoAlternate, Description} from '@material-ui/icons';
import React, {useRef, useState} from 'react';

import './FilePicker.css';

/**
 * Promise adapter for the conversion of a HTML File to base64 encoded string
 * @param {File} file
 * @returns {string} Data URL representing the contents of the file.
 */
function getFileDataURL(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.addEventListener('load', () => resolve(reader.result));
        reader.addEventListener('error', reject);
        reader.readAsDataURL(file);
    });
}

/**
 * A Regex to retrieve the MIME type of the Data URL
 */
const URI_TYPE_REGEX = /^data:([^;,]+)?[;,]/i;

/**
 * Gets the MIME type of a Data URL
 * @param {string} uri
 * @returns {string}
 */
function getDataURIMimeType(uri) {
    const match = uri.match(URI_TYPE_REGEX);
    return match[1];
}

/**
 * The list of accepted image types.
 */
export const VALID_IMAGE_TYPES = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
];

/**
 * A file picker that allows for previews of selected files. value of the field is the data URIs of the files.
 * @param {Object} props The components props
 * @returns A FilePicker component
 */
export default function FilePicker({onChange, className, ...props}) {
    const fileInput = useRef();
    const [value, setValue] = useState([]);
    async function onChangeHandler(e) {
        const dataURLS = await Promise.all(
            [...e.target.files].map(getFileDataURL)
        );
        console.log(dataURLS);
        setValue(dataURLS);
        onChange?.(dataURLS);
    }
    return (
        <div
            onClick={() => fileInput.current?.click()}
            className={`FilePicker-main ${className}`}
        >
            {value.length ? (
                <div className="FilePicker-preview">
                    {value.map((file) =>
                        VALID_IMAGE_TYPES.includes(getDataURIMimeType(file)) ? (
                            <img src={file} key={file} alt="An uploaded file" />
                        ) : (
                            <Description
                                style={{fontSize: '5rem'}}
                                key={file}
                            />
                        )
                    )}
                </div>
            ) : null}
            <span>Select some Cover Art</span>
            <AddPhotoAlternate style={{fontSize: '3em'}} color="disabled" />
            <input
                {...props}
                type="file"
                ref={fileInput}
                hidden
                onChange={onChangeHandler}
            />
        </div>
    );
}
