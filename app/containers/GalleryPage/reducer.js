/*
 * GalleryReducer
 *
 * The reducer takes care of our data. Using action, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
    SET_EDITABLE,
    REMOVE_IMAGE_FROM_CATALOG
} from './constants';

import { fromJS } from 'immutable';
import DATA from './_data';

const initialState = fromJS({
    editable: false,
    catalogs: DATA
});

function GalleryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EDITABLE:
            if (typeof action.value !== 'boolean') {
                return state;
            }

            return state.set('editable', action.value);

        /* @todo Think about removing by ID instead of indexes. */
        case REMOVE_IMAGE_FROM_CATALOG:
            return state.deleteIn([
                'catalogs', action.catalogIndex,
                'images', action.index
            ]);

        default:
            return state;
    }
}

export default GalleryReducer;
