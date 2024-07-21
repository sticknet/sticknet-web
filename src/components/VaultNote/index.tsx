import React, {useEffect, MouseEvent} from 'react';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {useHistory} from 'react-router-dom';
import {formatAMPM, formatDate, handleLinks} from '../../utils';

import s from './style.css';
import type {TVaultNote} from '../../types';

interface VaultNoteProps {
    note: TVaultNote;
    handleContextMenu: (e: MouseEvent<HTMLDivElement> | MouseEvent<SVGElement>, fromIcon?: boolean) => void;
}

const VaultNote: React.FC<VaultNoteProps> = (props) => {
    const {note, handleContextMenu} = props;
    const history = useHistory();

    useEffect(() => {
        handleLinks(note.id.toString());
    }, []);

    return (
        <div
            className={s.container}
            role='button'
            tabIndex={0}
            onContextMenu={(e) => handleContextMenu(e)}
            onClick={(e) => {
                if ((e.target as HTMLElement).tagName !== 'A') {
                    history.push('/vault/notes/create-note', {note});
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if ((e.target as HTMLElement).tagName !== 'A') {
                        history.push('/vault/notes/create-note', {note});
                    }
                }
            }}>
            <div>
                <p className={s.text} id={note.id.toString()}>
                    {note.text?.split('\n').slice(0, 3).join('\n')}
                </p>
                <p className={s.date}>{`${formatDate(note.timestamp)}, ${formatAMPM(note.timestamp)}`}</p>
            </div>
            <BiDotsHorizontalRounded
                size={24}
                color='grey'
                role='button'
                tabIndex={0}
                onClick={(e) => {
                    e.stopPropagation();
                    handleContextMenu(e, true);
                }}
            />
        </div>
    );
};

export default VaultNote;
