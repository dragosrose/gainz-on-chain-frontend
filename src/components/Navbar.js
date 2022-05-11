import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <ul className={'flex justify-around bg-red-900 font-mono text-2xl'}>
            <li>
                <Link to={'/'}>App</Link>
            </li>
            <li>
                <Link to={'/about'}>Start Here</Link>
            </li>
            <li>
                <Link to={'/whitepaper'}>Whitepaper</Link>
            </li>
        </ul>
    );
}

export default Navbar;