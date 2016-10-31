/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Promoblock from 'components/Promoblock';
import Footer from 'components/Footer';

import styles from './styles.css';

function App(props) {
    return (
        <div className={styles['app__wrapper']}>
            <Helmet
                titleTemplate="%s - React.js Boilerplate"
                defaultTitle="React.js Boilerplate"
                meta={[
                    {
                        name: 'description', content: 'A React.js Boilerplate application'
                    }
                ]}
            />

            <Header/>

            <div className={styles['app__container']}>
                <Sidebar/>

                <div className={styles['app__content']}>
                    {React.Children.toArray(props.children)}
                </div>
            </div>

            <Promoblock/>

            <Footer/>
        </div>
    );
}

App.propTypes = {
    children: React.PropTypes.node,
};

export default App;
