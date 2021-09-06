import {AddPhotoAlternate, Description} from '@material-ui/icons';
import React, {useEffect, useRef, useState} from 'react';

import './FilePicker.css';

/**
 * Promise adapter for the conversion of a HTML File to base64 encoded string
 * @param {File} file
 * @returns {string} Data URL representing the contents of the file.
 */
export function getFileDataURL(file) {
    if (!file) throw new TypeError('file must be provided.');
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
export function getDataURIMimeType(uri) {
    if (!uri) throw new TypeError('uri must be provided.');
    const match = uri.match(URI_TYPE_REGEX);
    return match[1] || 'text/plain';
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
    const active = useRef(false);
    const [value, setValue] = useState([]);
    // const [shouldLoad, setShouldLoad] = useState(false);
    function onChangeHandler(e) {
        // console.log();
        // let active = true;
        active.current = true;
        Promise.all([...e.target.files].map(getFileDataURL)).then(
            (dataURLS) => {
                if (active.current) {
                    setValue(dataURLS);
                    onChange?.(dataURLS);
                    active.current = false;
                }
            }
        );
    }
    useEffect(() => {
        // if (shouldLoad) return undefined;

        return () => {
            // console.log('Active set');
            active.current = false;
        };
    }, []);
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
                data-testid="file-input"
            />
        </div>
    );
}
