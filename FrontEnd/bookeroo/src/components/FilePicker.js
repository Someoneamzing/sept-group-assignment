import {AddPhotoAlternate, Description} from '@material-ui/icons';
import React, {useRef, useState} from 'react';

import './FilePicker.css';

/**
 *
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

const URI_TYPE_REGEX = /^data:([^;,]+)?[;,]/i;

/**
 *
 * @param {string} uri
 * @returns {string}
 */
function getDataURIMimeType(uri) {
    const match = uri.match(URI_TYPE_REGEX);
    return match[1];
}

const VALID_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

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
