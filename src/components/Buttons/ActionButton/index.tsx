import React from 'react';
import s from './style.css';

interface ActionButtonProps {
    text: string;
    icon?: React.ReactNode;
    onClick?: (event: any) => void;
    style?: React.CSSProperties;
    htmlFor?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({text, icon, onClick, style, htmlFor}) => {
    return (
        <div
            className={s.container}
            style={style}
            onClick={onClick}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick?.(e);
                }
            }}>
            {icon && <div style={{marginRight: 6}}>{icon}</div>}
            <p className={s.text}>{text}</p>
        </div>
    );
};

export default ActionButton;
