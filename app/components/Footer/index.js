import React from 'react';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

import styles from './styles.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer__content']}>
                <FormattedMessage
                    {...messages.licenseMessage}
                    values={{
                        'year': 2016
                    }}
                />
            </div>
        </footer>
    );
}

export default Footer;
