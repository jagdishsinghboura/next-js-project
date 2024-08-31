import React from 'react'
import Footer from './Footer'

export default function Layouts({ children }) {
    return (
        <div>
            <div className='p-5'>
                {children}

            </div>
            <Footer />
        </div>
    )
}
