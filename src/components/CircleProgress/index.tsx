import React from 'react';
import s from './style.css';

interface CircleProgressProps {
    progress?: number;
    strokeWidth?: number;
    size?: number;
    opacity?: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({progress = 0, strokeWidth = 4, size = 100, opacity = 1}) => {
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - progress * circumference;

    return (
        <svg width={size} height={size} style={{opacity}}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className={s.circleBase}
                strokeWidth={strokeWidth}
                fill='none'
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className={s.circleProgress}
                strokeWidth={strokeWidth}
                fill='none'
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </svg>
    );
};

export default CircleProgress;
