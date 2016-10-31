import React, { Component } from 'react';

import styles from './styles.css';

/**
 * @class
 * @extends Component
 */
export default class Sidebar extends Component {
    render() {
        return (
            <aside className={styles.sidebar}>
                <div className={styles['sidebar__box']}></div>

                <div className={`${styles['sidebar__box']} ${styles['sidebar__box_rounded']}`}></div>
            </aside>
        );
    }
};
