import React from 'react';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import Image from "../image/image";

function ImageDropzone(props) {
    const {onDrop} = props;
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/*'});
    return (
        <div {...getRootProps({className: 'image-dropzone'})}>
            <input {...getInputProps()} />
            {
                acceptedFiles.length > 0
                    ? <div className="preview">
                        {
                            acceptedFiles.map(file => (
                                <Image
                                    key={file.name}
                                    className="image-dropzone-preview"
                                    src={getPreviewUrl(file)} width="5rem" height="5rem"
                                />
                            ))
                        }
                    </div>
                    : <div className="message">Kéo thả ảnh vào đây để tải lên</div>
            }
        </div>
    );
}

function getPreviewUrl(file) {
    return URL.createObjectURL(file);
}


ImageDropzone.propTypes = {
    onDrop: PropTypes.func.isRequired,
};

export default ImageDropzone;