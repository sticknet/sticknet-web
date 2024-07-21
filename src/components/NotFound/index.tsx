import React, {FC, useEffect} from 'react';
import {FaLink} from 'react-icons/fa';
import s from '../../global.css';

const NotFound: FC = () => {
    useEffect(() => {
        document.title = 'Sticknet | Not found';
    }, []);

    const isDesktop = window.innerWidth > window.innerHeight;

    return (
        <div className={s.main}>
            <div
                className={s.body}
                style={{
                    height: '80vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '30vh',
                }}>
                <FaLink style={{fontSize: isDesktop ? '5vw' : '20vw', textAlign: 'center'}} />
                <h1 style={{padding: '3vw', paddingBottom: '1vw'}}>404 Not Found</h1>
                <p>The page you're looking for does not exist...</p>
            </div>
        </div>
    );
};

export default NotFound;
