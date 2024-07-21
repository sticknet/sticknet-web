import React, {FC, ReactNode} from 'react';
import s from './style.css';

interface EmptyContentProps {
    icon?: ReactNode;
    text: string;
    action?: ReactNode;
}

const EmptyContent: FC<EmptyContentProps> = ({icon, text, action}) => {
    return (
        <div className={s.container}>
            {icon}
            <p className={s.text}>{text}</p>
            {action}
        </div>
    );
};

export default EmptyContent;
