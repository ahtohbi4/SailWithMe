import React, { Component } from 'react';
import Img from '../Img';

import Banner from './banner.jpg';

import styles from './styles.css';

/**
 * @class
 * @extends Component
 */
export default class Promoblock extends Component {
    render() {
        return (
            <aside className={styles.promoblock}>
                <div className={styles['promoblock__content']}>
                    <Img
                        alt=""
                        className={styles['promoblock__banner']}
                        height="150"
                        src={Banner}
                        width="1170"/>
                </div>
            </aside>
        );
    }
};
