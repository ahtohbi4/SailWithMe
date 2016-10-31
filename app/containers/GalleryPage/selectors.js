/**
 * GalleryPage selectors
 */

import { createSelector } from 'reselect';

const selectGallery = () => (state) => state.get('gallery');

const selectEditable = () => createSelector(
    selectGallery(),
    (galleryState) => galleryState.get('editable')
);

const selectCatalogs = () => createSelector(
    selectGallery(),
    (galleryState) => galleryState.get('catalogs')
);

export {
    selectEditable,
    selectCatalogs
};
