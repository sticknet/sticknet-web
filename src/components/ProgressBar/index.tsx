import React from 'react';
import s from './style.css';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
    const progress = Math.max(0.01, props.progress);
    const maxWidth = 160;
    const filledWidth = maxWidth * progress;
    const emptyWidth = maxWidth - filledWidth;

    return (
        <div className={s.container}>
            <div className={s.filled} style={{width: `${filledWidth}px`}} />
            <div className={s.empty} style={{width: `${emptyWidth}px`}} />
        </div>
    );
};

export default ProgressBar;
