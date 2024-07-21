import React, {FC, useState, ReactNode, useEffect} from 'react';
import s from './style.css';

interface ModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    cancel?: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({visible, setVisible, cancel = () => {}, children}) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (visible && opacity === 0) {
            setTimeout(() => setOpacity(1), 0);
        } else if (!visible && opacity === 1) {
            setOpacity(0);
        }
    }, [visible, opacity]);

    if (!visible) return null;

    return (
        <div
            className={s.container}
            style={{opacity}}
            onClick={() => {
                cancel();
                setVisible(false);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    cancel();
                    setVisible(false);
                }
            }}
            role='button'
            tabIndex={0}>
            <div
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role='button'
                tabIndex={0}
                className={s.innerContainer}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
