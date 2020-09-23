import React from 'react'

import Header from '../Header';

const Layout = (props) => {
    return (
        <>
            <Header />
            {props.children}
        </>
        
    )
}

export default Layout
