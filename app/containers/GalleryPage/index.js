/*
 * GalleryPage
 *
 * Page with photos gallary
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import Immutable from 'immutable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createStructuredSelector } from 'reselect';

import {
    selectEditable,
    selectCatalogs
} from './selectors';

import * as actions from './actions';

import messages from './messages';
import { FormattedMessage } from 'react-intl';
import H1 from 'components/H1';
import Gallery from 'components/Gallery';

import styles from './styles.css';

/**
 * @class
 * @extends Component
 */
class GalleryPage extends Component {
    handleEdit = () => {
        this.props.actions.setEditable(true);
    }

    handleSave = () => {
        this.props.actions.setEditable(false);
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Gallery Page"
                    meta={[
                        {
                            name: 'description',
                            content: 'Feature page of React.js Boilerplate application'
                        }
                    ]}
                />
                <H1>
                    <FormattedMessage
                        {...messages.header}
                        values={{
                            state: (this.props.editable ? ' (editing…)' : '')
                        }}
                    />
                </H1>

                {this.props.editable ? (
                    <p>
                        <button
                            className={styles['gallery__editable-switcher']}
                            onClick={this.handleSave}
                        >Save</button>
                    </p>
                ) : (
                    <p>
                        <button
                            className={styles['gallery__editable-switcher']}
                            onClick={this.handleEdit}
                        >Edit</button>
                    </p>
                )}

                <Tabs className={styles['gallery__tabs']}>
                    <TabList>
                        {this.props.catalogs.map(catalog => {
                            const {id, name} = catalog.toObject();
                            const count = catalog.get('images').count();

                            return (
                                <Tab key={id}>
                                    <div className={`${styles['gallery__tab-content']} ${!count ? styles['gallery__tab-content_empty'] : ''}`}>
                                        {count ? `${name} (${count})` : name}
                                    </div>
                                </Tab>
                            );
                        })}
                    </TabList>

                    {this.props.catalogs.map((catalog, index) => {
                        return (
                            <TabPanel key={catalog.get('id')}>
                                <Gallery
                                    editable={this.props.editable}
                                    images={catalog.get('images').map(photo => Immutable.Map({
                                        src: photo.get('path')
                                    })).toJS()}
                                    onRemoveImage={(imageIndex) => {
                                        return this.props.actions.removeImageFromCatalog(index, imageIndex);
                                    }}
                                />
                            </TabPanel>
                        );
                    })}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    editable: selectEditable(),
    catalogs: selectCatalogs()
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GalleryPage);
