import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import Dropzone from 'react-dropzone';

import ImgRemoverIcon from './img-remover-icon';
import DropZoneIcon from './drop-zone-icon';

import styles from './styles.css';

/**
 * @class
 * @extends Component
 *
 * @prop {Array} images
 * @prop {String} images[].src
 * @prop {String} [images[].thumbnail=images[].src]
 * @prop {Boolean} [editable=false]
 */
export default class Gallery extends Component {
    constructor() {
        super();

        this.state = {
            currentImage: 0,
            lightboxIsOpen: false,
            rejectedFiles: []
        };
    }

    /**
     * @static
     */
    static propTypes = {
        editable: PropTypes.bool,
        images: PropTypes.array.isRequired
    }

    /**
     * @static
     */
    static defaultProps = {
        editable: false
    }

    /**
     * Open the Lightbox with image.
     *
     * @param {Number} index - Index of displayed image.
     * @param {Object} event
     */
    openLightbox = (index, event) => {
        event.preventDefault();

        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }

    /**
     * Close the Lightbox.
     */
    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }

    /**
     * Show previous image.
     */
    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    /**
     * Show next image.
     */
    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    /**
     * Show image by index.
     */
    gotoImage = (index) => {
        this.setState({
            currentImage: index
        });
    }

    /**
     * Click on an image.
     */
    handleClickImage () {
        if (this.state.currentImage === this.props.images.length - 1) {
            return;
        }

        this.gotoNext();
    }

    /**
     * Remove image.
     */
    removeImage = (index, event) => {
        event.stopPropagation();
        event.preventDefault();

        this.props.onRemoveImage(index);
    }

    /**
     * Drop new images.
     *
     * @prop {Array} acceptedFiles
     * @prop {Array} rejectedFiles
     */
    onDrop = (acceptedFiles, rejectedFiles) => {
        if (!rejectedFiles.length) {
            if (acceptedFiles.length) {
                // Send a request to API
                console.log('Files were sended to server.');
            }
        } else {
            this.setState({
                rejectedFiles: rejectedFiles
            })
        }
    }

    renderImagesList() {
        return (
            this.props.images.map((image, i) => {
                return this.renderImage(image, i);
            })
        );
    }

    renderImage({ src, title = '', thumbnail = src }, index) {
        return (
            <a
                className={styles['gallery__img-container']}
                href={src}
                key={index}
                onClick={(e) => this.openLightbox(index, e)}
            >
                {this.props.editable ? (
                    <button
                        className={styles['gallery__img-remover']}
                        onClick={(e) => this.removeImage(index, e)}
                        type="button"
                    >{ImgRemoverIcon}</button>
                ) : null}

                <img
                    alt={title}
                    className={styles['gallery__img']}
                    src={thumbnail}
                />
            </a>
        );
    }

    renderDropZone() {
        return (
            <div className={styles['gallery__drop-zone']}>
                <Dropzone
                    accept="image/*"
                    className={styles['gallery__drop-zone-control']}
                    onDrop={this.onDrop}
                >
                    {DropZoneIcon}
                    <div className={styles['gallery__drop-zone-message']}>Drag & Drop here</div>
                </Dropzone>

                {this.state.rejectedFiles.length ? this.renderRejectedFiles() : null}
            </div>
        );
    }

    renderRejectedFiles() {
        return (
            <div className={styles['gallery__rejected-files']}>
                <p className={styles['gallery__rejected-files-alert']}>Next files could not be loaded:</p>

                <ul className={styles['gallery__rejected-files-list']}>
                    {this.state.rejectedFiles.map((file, index) => {
                        return (
                            <li
                                className={styles['gallery__rejected-files-item']}
                                key={index}
                            >{file.name}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <section
                className={styles.gallery}
            >
                {this.props.images.length ? this.renderImagesList() : <div className={styles['gallery__no-images-message']}>No images in the gallery.</div>}

                <Lightbox
                    currentImage={this.state.currentImage}
                    images={this.props.images}
                    isOpen={this.state.lightboxIsOpen}
                    onClickImage={this.handleClickImage}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    onClickThumbnail={this.gotoImage}
                    onClose={this.closeLightbox}
                    showThumbnails={true}/>

                {this.props.editable ? this.renderDropZone() : null}
            </section>
        );
    }
};
