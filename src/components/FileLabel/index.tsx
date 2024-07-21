import React, {FC} from 'react';
import s from './style.css';

interface FileLabelProps {
    file: {
        name: string;
    };
    small?: boolean;
}

const FileLabel: FC<FileLabelProps> = ({file, small}) => {
    const cut = small ? 4 : 8;
    const extension = file.name?.split('.').pop()?.split(' ')[0].toUpperCase().slice(0, cut);
    const size = small ? 32 : 100;
    const fontSize = small ? '10px' : '15px';
    return (
        <div className={s.extensionContainer} style={{width: size, height: size}}>
            <p style={{fontSize}}>{extension}</p>
        </div>
    );
};

export default FileLabel;
