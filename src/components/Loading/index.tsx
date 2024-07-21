import React from 'react';
import s from './style.css';

interface LoadingProps {
    colored?: boolean;
    white?: boolean;
}

const Loading: React.FC<LoadingProps> = ({colored, white}) => {
    return <div className={`${s.loader} ${colored ? s.colored : white ? s.white : s.black}`} />;
};

export default Loading;
