import React from 'react';
import s from './style.css';

interface SettingsItemProps {
    icon: React.ReactNode;
    text: string;
    danger?: boolean;
    onClick: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({icon, text, danger, onClick}) => {
    return (
        <div
            className={s.item}
            role='button'
            tabIndex={0}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    onClick();
                }
            }}>
            {icon}
            <p className={s.text} style={{color: danger ? 'red' : '#0F0F28'}}>
                {text}
            </p>
        </div>
    );
};

export default SettingsItem;
